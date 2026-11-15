"""Build the site's content JSON from the published dataset.

Reads the Sample-size Parquet files and the data dictionary from a copy of the Kaggle
download, and writes one JSON file per page type into content/. Run it again whenever
the dataset changes, then commit the JSON. The website build never needs Python.

    python tools/build_content.py --data "C:/path/to/isla-velaluz-kaggle"

Needs: pip install duckdb
"""
import argparse
import csv
import datetime
import json
import re
import unicodedata
from pathlib import Path

import duckdb

SITE = Path(__file__).resolve().parent.parent
OUT = SITE / "content"

FOOD_TYPES = {"table service restaurant", "quick service restaurant", "snack stand", "cafe", "bar"}
MENU_ORDER = ["Entrees", "Sides & Starters", "Kids Meals", "Snacks", "Desserts & Sweets", "Beverages", "Beer, Wine & Spirits"]


def slugify(text):
    text = unicodedata.normalize("NFKD", text).encode("ascii", "ignore").decode()
    text = text.lower().replace("&", " and ").replace("'", "")
    return re.sub(r"[^a-z0-9]+", "-", text).strip("-")


def clean(value):
    """Make a database value safe for JSON."""
    if isinstance(value, (datetime.date, datetime.datetime)):
        return value.isoformat(sep=" ") if isinstance(value, datetime.datetime) else value.isoformat()
    if isinstance(value, float):
        if value != value:  # NaN
            return None
        return round(value, 2)
    return value


def rows(con, sql):
    cur = con.execute(sql)
    cols = [d[0] for d in cur.description]
    return [{c: clean(v) for c, v in zip(cols, r)} for r in cur.fetchall()]


def write(name, data):
    OUT.mkdir(exist_ok=True)
    path = OUT / f"{name}.json"
    path.write_text(json.dumps(data, indent=1, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"  {name}.json: {len(data)} entries")


def hour_label(h):
    return f"{(h - 1) % 12 + 1} {'AM' if h < 12 else 'PM'}"


def build_resort(con, S):
    parks = rows(con, f"select * from '{S}/parks.parquet' order by opened_date")
    lands = rows(con, f"select * from '{S}/lands.parquet' order by land_id")
    attractions = rows(con, f"select * from '{S}/attractions.parquet' order by attraction_id")
    hotels = rows(con, f"select * from '{S}/hotels.parquet' order by hotel_id")
    room_types = rows(con, f"select * from '{S}/room_types.parquet' order by room_type_id")
    venues = rows(con, f"select * from '{S}/venues.parquet' order by venue_id")

    park_slug = {p["park_code"]: slugify(p["park_name"]) for p in parks}
    park_name = {p["park_code"]: p["park_name"] for p in parks}
    land_by_id = {l["land_id"]: l for l in lands}
    hotel_by_id = {h["hotel_id"]: h for h in hotels}

    for l in lands:
        l["slug"] = slugify(l["land_name"])
        l["park_slug"] = park_slug[l["park_code"]]
        l["park_name"] = park_name[l["park_code"]]
    for h in hotels:
        h["slug"] = slugify(h["hotel_name"])
        h["room_types"] = [{"name": r["room_type_name"], "sleeps": r["sleeps"]} for r in room_types if r["hotel_id"] == h["hotel_id"]]

    # Usual opening hours in the latest year, per park
    for p in parks:
        p["slug"] = park_slug[p["park_code"]]
        hrs = rows(con, f"""
            select open_hour, close_hour, count(*) day_count from '{S}/park_hours.parquet'
            where park_code = '{p["park_code"]}' and is_open and year(date) = (select max(year(date)) from '{S}/park_hours.parquet')
            group by all order by day_count desc""")
        p["usual_open"] = hour_label(hrs[0]["open_hour"])
        p["usual_close"] = hour_label(hrs[0]["close_hour"])
        p["latest_close"] = hour_label(max(h["close_hour"] for h in hrs))
        p["open_days_latest_year"] = sum(h["day_count"] for h in hrs)
        p["lands"] = [l["slug"] for l in lands if l["park_code"] == p["park_code"]]

    for a in attractions:
        land = land_by_id[a["land_id"]]
        a["slug"] = slugify(a["attraction_name"])
        a.update(land_slug=land["slug"], land_name=land["land_name"], park_slug=land["park_slug"], park_name=land["park_name"])

    # What each venue sells: products rung up there in the latest year, at today's price
    sold = rows(con, f"""
        with latest as (select max(year(transacted_at)) y from '{S}/transactions.parquet')
        select distinct t.venue_id, p.product_name, p.department, p.category_name, pp.price
        from '{S}/transaction_lines.parquet' l
        join '{S}/transactions.parquet' t using (transaction_id)
        join '{S}/products.parquet' p using (product_id)
        join '{S}/product_prices.parquet' pp on pp.product_id = p.product_id and pp.effective_to is null
        where year(t.transacted_at) = (select y from latest)
        order by t.venue_id, p.category_name, p.product_name""")
    by_venue = {}
    for s in sold:
        by_venue.setdefault(s["venue_id"], []).append(s)

    for v in venues:
        v["slug"] = slugify(v["venue_name"])
        v["kind"] = "dining" if v["venue_type"] in FOOD_TYPES else "shopping"
        land = land_by_id.get(v["land_id"])
        hotel = hotel_by_id.get(v["hotel_id"])
        v["land_slug"] = land["slug"] if land else None
        v["land_name"] = land["land_name"] if land else None
        v["park_slug"] = land["park_slug"] if land else None
        v["park_name"] = land["park_name"] if land else None
        v["hotel_slug"] = hotel["slug"] if hotel else None
        v["hotel_name"] = hotel["hotel_name"] if hotel else None
        groups = {}
        for s in by_venue.get(v["venue_id"], []):
            groups.setdefault(s["category_name"], []).append({"name": s["product_name"], "price": s["price"]})
        order = sorted(groups, key=lambda c: (MENU_ORDER.index(c) if c in MENU_ORDER else 99, c))
        v["offerings"] = [{"category": c, "items": groups[c]} for c in order]

    for h in hotels:
        h["venues"] = [{"slug": v["slug"], "name": v["venue_name"], "type": v["venue_type"], "kind": v["kind"]} for v in venues if v["hotel_id"] == h["hotel_id"]]
    for l in lands:
        l["attractions"] = [a["slug"] for a in attractions if a["land_id"] == l["land_id"]]
        l["venues"] = [v["slug"] for v in venues if v["land_id"] == l["land_id"]]

    # Event series. Concert seasons are already one series each; yearly festivals are grouped by year.
    events = rows(con, f"""
        select event_series, year(start_date) yr, any_value(event_type) event_type, any_value(location) location,
               bool_or(registration_required) registration_required, min(start_date) first_date, max(end_date) last_date, count(*) nights
        from '{S}/events.parquet' group by event_series, year(start_date) order by first_date""")
    series = {}
    for e in events:
        base = re.sub(r"\s+(Spring|Fall)\s+\d{4}$", "", e["event_series"])
        s = series.setdefault(base, {"name": base, "slug": slugify(base), "event_type": e["event_type"], "location": e["location"],
                                     "registration_required": e["registration_required"], "runs": []})
        label = e["event_series"] if e["event_series"] != base else f"{base} {e['yr']}"
        s["runs"].append({"label": label, "first_date": e["first_date"], "last_date": e["last_date"], "nights": e["nights"]})

    # Passes on sale today, with the price most holders paid in the latest year
    passes = rows(con, f"""
        select p.*, (select mode(a.price_paid) from '{S}/annual_passes.parquet' a
                     where a.pass_product_id = p.pass_product_id and a.price_paid > 0
                       and year(a.start_date) = (select max(year(start_date)) from '{S}/annual_passes.parquet' where pass_product_id = p.pass_product_id)) price
        from '{S}/pass_products.parquet' p where p.sold_until is null order by price""")
    prices = rows(con, f"""
        select ticket_price_tier tier, min(adult_one_day_price) low, max(adult_one_day_price) high, count(*) day_count
        from '{S}/calendar.parquet' where year = (select max(year) from '{S}/calendar.parquet') group by all order by low""")
    write("tickets", {"passes": passes, "one_day_prices": prices})

    write("parks", parks)
    write("lands", lands)
    write("attractions", attractions)
    write("hotels", hotels)
    write("venues", venues)
    write("events", list(series.values()))


def build_dictionary(con, S, data):
    md = (data / "DATA_DICTIONARY.md").read_text(encoding="utf-8")

    # Area, grain and row counts from the "Tables at a glance" table
    glance = {}
    for m in re.finditer(r"^\| ([^|]+) \| \[(\w+)\]\(#\w+\) \| ([^|]+) \| ([\d,]+) \| ([\d,]+) \| ([\d,]+) \|$", md, re.M):
        area, table, grain, full, standard, sample = m.groups()
        glance[table] = {"area": area.strip(), "grain": grain.strip(),
                         "rows": {"full": int(full.replace(",", "")), "standard": int(standard.replace(",", "")), "sample": int(sample.replace(",", ""))}}

    # One-paragraph description under each "### table" heading
    described = {m.group(1): m.group(2).strip() for m in re.finditer(r"^### (\w+)\n\n(.+?)\n\n\|", md, re.M | re.S)}

    links = [m.groups() for m in re.finditer(r"^\| (\w+) \| `(\w+)` \| (\w+)\.`(\w+)` \|$", md, re.M)]

    columns = {}
    with open(data / "data_dictionary.csv", newline="", encoding="utf-8") as f:
        for r in csv.DictReader(f):
            columns.setdefault(r["table"], []).append({
                "name": r["column"], "type": r["type"], "key": r["key"],
                "can_be_empty": r["can_be_empty"] == "yes", "description": r["description"], "values": r["values_or_range"]})

    tables = []
    for name, g in glance.items():
        desc = described.get(name, "")
        desc = re.sub(r"\s*Key: .*$", "", desc.replace("\n", " ")).replace("`", "")
        src = S / f"{name}.parquet"
        src = f"'{src}'" if src.exists() else f"'{S}/{name}/*.parquet'"
        sample_rows = rows(con, f"select * from {src} limit 5")
        for r in sample_rows:
            for k, v in r.items():
                if isinstance(v, str) and len(v) > 90:
                    r[k] = v[:87].rstrip() + "..."
        tables.append({
            "name": name, **g, "description": desc, "columns": columns.get(name, []),
            "links_to": [{"column": c, "table": t, "target_column": tc} for (s, c, t, tc) in links if s == name],
            "linked_from": [{"table": s, "column": c, "target_column": tc} for (s, c, t, tc) in links if t == name],
            "sample_rows": sample_rows})
    write("tables", tables)


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--data", required=True, help="Folder holding sample/, DATA_DICTIONARY.md and data_dictionary.csv")
    args = ap.parse_args()
    data = Path(args.data)
    S = data / "sample"
    con = duckdb.connect()
    print("Writing content/")
    build_resort(con, S.as_posix())
    build_dictionary(con, S, data)


if __name__ == "__main__":
    main()
