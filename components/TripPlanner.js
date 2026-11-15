'use client';

import { useState } from 'react';
import Link from 'next/link';
import plan from '@/content/plan.json';
import styles from './TripPlanner.module.css';

const HOTELS = [...new Set(plan.rooms.map((r) => r.hotel_name))];
const money = (n) => `$${Math.round(n).toLocaleString('en-US')}`;
const STEPS = ['Your party', 'Where you stay', 'Park tickets', 'Review'];

function addDays(iso, n) {
  const d = new Date(`${iso}T12:00:00`);
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
}
function nice(iso) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' });
}

export default function TripPlanner() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [trip, setTrip] = useState({ arrive: '2027-03-12', nights: 4, adults: 2, children: 2, hotel: 'Hacienda Coral', room: 'Garden Two Queen', days: 3, water: false });
  const set = (patch) => setTrip((t) => ({ ...t, ...patch }));

  const party = trip.adults + trip.children;
  const offSite = trip.hotel === 'off';
  const rooms = plan.rooms.filter((r) => r.hotel_name === trip.hotel);
  const room = rooms.find((r) => r.room_type_name === trip.room) || rooms[0];
  const fits = offSite || (room && room.sleeps >= party);
  const maxDays = Math.min(8, trip.nights + 1);
  const days = Math.min(trip.days, maxDays);
  const adultTicket = plan.adult_tickets.find((t) => t.ticket_days === days && t.includes_water_park === trip.water).price;
  const childTicket = Math.round(adultTicket * plan.child_ratio);
  const roomTotal = offSite ? 0 : room.nightly_rate * trip.nights;
  const ticketTotal = adultTicket * trip.adults + childTicket * trip.children;
  const total = roomTotal + ticketTotal;

  const pickHotel = (h) => {
    if (h === 'off') return set({ hotel: 'off', room: '' });
    const list = plan.rooms.filter((r) => r.hotel_name === h);
    const best = list.find((r) => r.sleeps >= party) || list[list.length - 1];
    set({ hotel: h, room: best.room_type_name });
  };

  if (done) {
    const booking = {
      booking_id: '(not assigned)', household_id: '(not assigned)', booking_date: new Date().toISOString().slice(0, 10),
      arrival_date: trip.arrive, departure_date: addDays(trip.arrive, trip.nights), nights: trip.nights, nights_booked: trip.nights,
      trip_type: offSite ? 'off-site stay' : 'resort hotel', party_size: party, booking_channel: 'website', ticket_days: days,
      includes_water_park: String(trip.water), promo_code: '', return_voucher_redeemed: 'false', is_first_visit: 'true', status: '(never happened)',
    };
    return (
      <div className={styles.ending}>
        <h2 className={styles.endTitle}>This is where a real resort would ask for your card</h2>
        <p>
          Isla Velaluz does not exist, so there is nothing to pay for. Nothing you entered was sent anywhere or saved, and
          no trip was booked.
        </p>
        <p>
          The resort is the setting for a free practice dataset. If it were real, the trip you just planned would become
          one row in a table called <code>bookings</code>, and it would look like this:
        </p>
        <div className={styles.scroll} tabIndex={0} role="region" aria-label="Your trip as a row of data">
          <table className={styles.row}>
            <thead><tr>{Object.keys(booking).map((k) => <th key={k} scope="col">{k}</th>)}</tr></thead>
            <tbody><tr>{Object.values(booking).map((v, i) => <td key={i}>{v}</td>)}</tr></tbody>
          </table>
        </div>
        <p>
          {offSite ? 'It' : <>It would also add a row to <code>hotel_stays</code> for the {room.room_type_name} at {trip.hotel}, and it</>} would
          add {party} rows to <code>tickets</code>, one per person. The real dataset holds about two million trips like this one,
          along with every ride, meal and purchase that followed.
        </p>
        <p className={styles.endActions}>
          <Link href="/data/" className={styles.primary}>See the dataset</Link>
          <Link href="/data/tables/bookings/" className={styles.secondary}>Look at the bookings table</Link>
          <button type="button" className={styles.link} onClick={() => { setDone(false); setStep(0); }}>Plan another trip</button>
        </p>
      </div>
    );
  }

  return (
    <div className={styles.planner}>
      <p className={styles.notice} role="note">
        <strong>Practice run.</strong> Isla Velaluz is fictional. Nothing on this page is booked, charged or saved, and it
        never asks for your name, email or card.
      </p>
      <ol className={styles.steps}>
        {STEPS.map((s, i) => (
          <li key={s} className={i === step ? styles.current : i < step ? styles.past : undefined} aria-current={i === step ? 'step' : undefined}>{s}</li>
        ))}
      </ol>

      {step === 0 && (
        <fieldset className={styles.panel}>
          <legend className={styles.legend}>Who is coming, and when?</legend>
          <div className={styles.fields}>
            <label>Arrival date<input type="date" value={trip.arrive} min="2026-01-01" max="2029-12-31" onChange={(e) => e.target.value && set({ arrive: e.target.value })} /></label>
            <label>Nights<select value={trip.nights} onChange={(e) => set({ nights: Number(e.target.value) })}>{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => <option key={n}>{n}</option>)}</select></label>
            <label>Adults<select value={trip.adults} onChange={(e) => set({ adults: Number(e.target.value) })}>{[1, 2, 3, 4].map((n) => <option key={n}>{n}</option>)}</select></label>
            <label>Children (3 to 9)<select value={trip.children} onChange={(e) => set({ children: Number(e.target.value) })}>{[0, 1, 2, 3, 4].map((n) => <option key={n}>{n}</option>)}</select></label>
          </div>
          <p className={styles.hint}>Arriving {nice(trip.arrive)} and leaving {nice(addDays(trip.arrive, trip.nights))}.</p>
        </fieldset>
      )}

      {step === 1 && (
        <fieldset className={styles.panel}>
          <legend className={styles.legend}>Where would you like to stay?</legend>
          <div className={styles.choices}>
            {HOTELS.map((h) => {
              const list = plan.rooms.filter((r) => r.hotel_name === h);
              return (
                <label key={h} className={`${styles.choice} ${trip.hotel === h ? styles.picked : ''}`}>
                  <input type="radio" name="hotel" checked={trip.hotel === h} onChange={() => pickHotel(h)} />
                  <span className={styles.choiceName}>{h}</span>
                  <span>{list[0].tier[0].toUpperCase() + list[0].tier.slice(1)}, from {money(Math.min(...list.map((r) => r.nightly_rate)))} a night</span>
                </label>
              );
            })}
            <label className={`${styles.choice} ${offSite ? styles.picked : ''}`}>
              <input type="radio" name="hotel" checked={offSite} onChange={() => pickHotel('off')} />
              <span className={styles.choiceName}>Staying off the island</span>
              <span>Tickets only</span>
            </label>
          </div>
          {!offSite && (
            <label className={styles.roomPick}>Room type
              <select value={room.room_type_name} onChange={(e) => set({ room: e.target.value })}>
                {rooms.map((r) => <option key={r.room_type_name} value={r.room_type_name}>{r.room_type_name}, sleeps {r.sleeps}, {money(r.nightly_rate)} a night</option>)}
              </select>
            </label>
          )}
          {!fits && <p className={styles.warn} role="alert">The {room.room_type_name} sleeps {room.sleeps} and your party is {party}. Choose a larger room or go back and change the party.</p>}
        </fieldset>
      )}

      {step === 2 && (
        <fieldset className={styles.panel}>
          <legend className={styles.legend}>How many days in the parks?</legend>
          <div className={styles.fields}>
            <label>Park days<select value={days} onChange={(e) => set({ days: Number(e.target.value) })}>{Array.from({ length: maxDays }, (_, i) => i + 1).map((n) => <option key={n}>{n}</option>)}</select></label>
            <label className={styles.check}><input type="checkbox" checked={trip.water} onChange={(e) => set({ water: e.target.checked })} /> Add Playa Zambulla, the water park</label>
          </div>
          <p className={styles.hint}>{days}-day ticket: {money(adultTicket)} for each adult, {money(childTicket)} for each child. The price per day drops as you add days.</p>
        </fieldset>
      )}

      {step === 3 && (
        <div className={styles.panel}>
          <h2 className={styles.legend}>Your trip</h2>
          <dl className={styles.review}>
            <dt>Dates</dt><dd>{nice(trip.arrive)} to {nice(addDays(trip.arrive, trip.nights))}, {trip.nights} {trip.nights === 1 ? 'night' : 'nights'}</dd>
            <dt>Party</dt><dd>{trip.adults} {trip.adults === 1 ? 'adult' : 'adults'}{trip.children ? `, ${trip.children} ${trip.children === 1 ? 'child' : 'children'}` : ''}</dd>
            <dt>Stay</dt><dd>{offSite ? 'Off the island' : `${room.room_type_name} at ${trip.hotel}`}</dd>
            <dt>Tickets</dt><dd>{days}-day tickets for {party}{trip.water ? ', with the water park' : ''}</dd>
          </dl>
          <table className={styles.bill}>
            <tbody>
              {!offSite && <tr><th scope="row">Room, {trip.nights} x {money(room.nightly_rate)}</th><td>{money(roomTotal)}</td></tr>}
              <tr><th scope="row">Tickets</th><td>{money(ticketTotal)}</td></tr>
              <tr className={styles.total}><th scope="row">Estimated total, before tax</th><td>{money(total)}</td></tr>
            </tbody>
          </table>
          <p className={styles.hint}>Prices are what guests typically paid in 2025, taken from the dataset.</p>
        </div>
      )}

      <div className={styles.nav}>
        {step > 0 ? <button type="button" className={styles.secondary} onClick={() => setStep(step - 1)}>Back</button> : <span />}
        {step < 3
          ? <button type="button" className={styles.primary} disabled={step === 1 && !fits} onClick={() => setStep(step + 1)}>Next: {STEPS[step + 1].toLowerCase()}</button>
          : <button type="button" className={styles.primary} onClick={() => setDone(true)}>See what happens next</button>}
      </div>
    </div>
  );
}
