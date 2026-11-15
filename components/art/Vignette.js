import styles from './Vignette.module.css';

// Page-header illustrations for the resort. Original artwork in plain SVG.
// Each motif is a silhouette against the same dusk sky, so pages feel like one evening.

const INK = '#14233a';
const GLOW = '#f9c86a';

function Lanterns({ points }) {
  return points.map(([x, y], i) => (
    <g key={i}>
      <circle cx={x} cy={y} r="12" fill="#f5b041" opacity=".22" />
      <rect x={x - 3.2} y={y - 4.5} width="6.4" height="9" rx="2.2" fill={GLOW} />
    </g>
  ));
}

function Lighthouse({ x, base, h = 170, lit = true }) {
  const top = base - h;
  return (
    <g>
      {lit && <path d={`M${x} ${top - 12} L${x + 420} ${top - 90} L${x + 420} ${top + 60}Z`} fill="url(#v-beam)" />}
      <g fill={INK}>
        <path d={`M${x - 22} ${base} L${x - 12} ${top} H${x + 12} L${x + 22} ${base}Z`} />
        <rect x={x - 18} y={top - 24} width="36" height="24" rx="3" />
        <path d={`M${x - 22} ${top - 24} H${x + 22} L${x} ${top - 46}Z`} />
        <rect x={x - 26} y={top - 3} width="52" height="6" rx="2" />
      </g>
      <rect x={x - 10} y={top - 20} width="20" height="15" rx="2" fill="#fff1c4" />
    </g>
  );
}


const BASE = 336;

function House({ x, w = 70, h = 60, roof = 28, win = true }) {
  return (
    <g>
      <path fill={INK} d={`M${x} ${BASE} V${BASE - h} L${x + w / 2} ${BASE - h - roof} L${x + w} ${BASE - h} V${BASE}Z`} />
      {win && <rect x={x + w / 2 - 7} y={BASE - h + 12} width="14" height="20" rx="2" fill={GLOW} opacity=".9" />}
    </g>
  );
}
function Tree({ x, r = 46 }) {
  return <path fill={INK} d={`M${x - r} ${BASE} C${x - r * 1.15} ${BASE - r * 1.3} ${x - r * 0.5} ${BASE - r * 2.3} ${x} ${BASE - r * 2.6} C${x + r * 0.5} ${BASE - r * 2.3} ${x + r * 1.15} ${BASE - r * 1.3} ${x + r} ${BASE}Z`} />;
}
function Palm({ x, h = 80, flip = false }) {
  const d = flip ? -1 : 1;
  const tx = x + d * 8, ty = BASE - h;
  return (
    <g>
      <path d={`M${x} ${BASE} C${x + d * 4} ${BASE - h * 0.5} ${x + d * 2} ${BASE - h * 0.8} ${tx} ${ty}`} fill="none" stroke={INK} strokeWidth="5" strokeLinecap="round" />
      <path fill={INK} d={`M${tx} ${ty} c-24 -14 -42 -8 -54 6 c22 -10 40 -6 54 -6 c-4 -24 -20 -34 -38 -34 c22 2 36 18 38 34 c12 -22 32 -26 48 -18 c-20 0 -36 8 -48 18 c24 -4 42 6 48 22 c-12 -14 -30 -20 -48 -22Z`} />
    </g>
  );
}
function Wheel({ x, r = 62 }) {
  const cy = BASE - r - 12;
  return (
    <g>
      <circle cx={x} cy={cy} r={r} fill="none" stroke={INK} strokeWidth="5" />
      <path stroke={INK} strokeWidth="2.2" d={`M${x} ${cy - r}V${cy + r}M${x - r} ${cy}H${x + r}M${x - r * 0.7} ${cy - r * 0.7}L${x + r * 0.7} ${cy + r * 0.7}M${x + r * 0.7} ${cy - r * 0.7}L${x - r * 0.7} ${cy + r * 0.7}`} />
      <path fill={INK} d={`M${x} ${cy} L${x - 26} ${BASE} H${x + 26}Z`} />
    </g>
  );
}
function Coaster({ x, w = 300, h = 130, loop = false }) {
  const a = x, b = x + w;
  const track = `M${a} ${BASE} C${a + w * 0.12} ${BASE - h * 1.6} ${a + w * 0.3} ${BASE - h * 1.6} ${a + w * 0.42} ${BASE - h * 0.35} C${a + w * 0.52} ${BASE - h * 1.1} ${a + w * 0.66} ${BASE - h * 1.1} ${a + w * 0.76} ${BASE - h * 0.3} C${a + w * 0.84} ${BASE - h * 0.7} ${a + w * 0.94} ${BASE - h * 0.6} ${b} ${BASE}`;
  const posts = [0.1, 0.2, 0.3, 0.52, 0.62, 0.86].map((t) => a + w * t);
  return (
    <g fill="none" stroke={INK} strokeLinecap="round">
      <path d={track} strokeWidth="7" />
      {posts.map((px, i) => <path key={i} d={`M${px} ${BASE}V${BASE - h * [0.75, 1.1, 0.95, 0.72, 0.72, 0.42][i]}`} strokeWidth="3" />)}
      {loop && <circle cx={a + w * 0.42} cy={BASE - h * 0.75} r={h * 0.38} strokeWidth="7" />}
    </g>
  );
}
function Tower({ x, h = 190, lit = true }) {
  return (
    <g>
      <rect x={x - 7} y={BASE - h} width="14" height={h} fill={INK} />
      <path fill={INK} d={`M${x - 16} ${BASE - h} H${x + 16} L${x} ${BASE - h - 22}Z`} />
      <rect x={x - 30} y={BASE - h * 0.62} width="60" height="16" rx="5" fill={INK} />
      {lit && <rect x={x - 22} y={BASE - h * 0.62 + 5} width="44" height="5" rx="2" fill={GLOW} opacity=".85" />}
    </g>
  );
}
function Crane({ x, h = 170, flip = false }) {
  const d = flip ? -1 : 1;
  return (
    <g fill="none" stroke={INK} strokeWidth="6" strokeLinejoin="round">
      <path d={`M${x - 16} ${BASE} L${x} ${BASE - h} L${x + 16} ${BASE}M${x - 9} ${BASE - h * 0.4}H${x + 9}M${x - 5} ${BASE - h * 0.7}H${x + 5}`} />
      <path d={`M${x - d * 40} ${BASE - h + 14} L${x} ${BASE - h} L${x + d * 150} ${BASE - h - 34}`} />
      <path d={`M${x + d * 120} ${BASE - h - 27} V${BASE - h + 46}`} strokeWidth="2.5" />
      <rect x={x + d * 120 - 13} y={BASE - h + 46} width="26" height="20" fill={INK} stroke="none" />
    </g>
  );
}
function Ship({ x, s = 1 }) {
  return (
    <g transform={`translate(${x} ${BASE}) scale(${s})`} fill={INK}>
      <path d="M-70 -6 H74 L52 22 H-52Z" /><rect x="-3" y="-120" width="5" height="116" /><rect x="-42" y="-92" width="4" height="88" /><rect x="36" y="-84" width="4" height="80" />
      <path d="M2 -114 C40 -100 40 -60 2 -40Z" /><path d="M-38 -88 C-10 -78 -10 -50 -38 -36Z" /><path d="M40 -80 C64 -70 64 -46 40 -34Z" />
    </g>
  );
}
function Dome({ x, r = 90 }) {
  return (
    <g>
      <path fill={INK} d={`M${x - r} ${BASE} A${r} ${r} 0 0 1 ${x + r} ${BASE}Z`} />
      <rect x={x - 3} y={BASE - r - 26} width="6" height="28" fill={INK} />
      <g fill="#f7fbfb" opacity=".8">
        <circle cx={x - r * 0.45} cy={BASE - r * 0.5} r="2" /><circle cx={x + r * 0.2} cy={BASE - r * 0.72} r="2.4" /><circle cx={x + r * 0.5} cy={BASE - r * 0.35} r="1.8" /><circle cx={x - r * 0.1} cy={BASE - r * 0.3} r="1.6" />
      </g>
    </g>
  );
}
function SlideTower({ x, h = 170, flumes = 2 }) {
  const top = BASE - h;
  return (
    <g>
      <rect x={x - 26} y={top} width="52" height={h} fill={INK} />
      <path fill={INK} d={`M${x - 36} ${top} H${x + 36} L${x} ${top - 30}Z`} />
      <g fill="none" stroke={INK} strokeWidth="11" strokeLinecap="round">
        <path d={`M${x - 24} ${top + 20} C${x - 150} ${top + 30} ${x - 60} ${BASE - 40} ${x - 210} ${BASE - 8}`} />
        {flumes > 1 && <path d={`M${x + 24} ${top + 34} C${x + 170} ${top + 50} ${x + 70} ${BASE - 50} ${x + 230} ${BASE - 8}`} />}
        {flumes > 2 && <path d={`M${x + 24} ${top + 70} C${x + 100} ${top + 90} ${x + 60} ${BASE - 30} ${x + 130} ${BASE - 8}`} />}
      </g>
    </g>
  );
}
function Umbrella({ x }) {
  return (
    <g fill={INK}>
      <path d={`M${x - 30} ${BASE - 40} A30 22 0 0 1 ${x + 30} ${BASE - 40}Z`} /><rect x={x - 1.5} y={BASE - 42} width="3" height="42" />
    </g>
  );
}
function Cloud({ x, y, s = 1, bolt = false }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path fill="#1c1f47" opacity=".85" d="M-90 20 C-110 20 -112 -8 -88 -10 C-86 -36 -46 -44 -32 -24 C-18 -50 30 -48 36 -18 C62 -26 86 -4 70 20Z" />
      {bolt && <path fill="#fff1c4" d="M-6 20 L-22 58 H-8 L-18 92 L16 46 H2 L12 20Z" />}
    </g>
  );
}
const Ground = ({ d = `M0 ${BASE} H1440 V420 H0Z` }) => <path fill={INK} d={d} />;
const Sea = ({ from = 0, to = 1440 }) => <rect x={from} y={BASE - 2} width={to - from} height="90" fill="url(#v-sea)" />;

const MOTIFS = {
  // Plaza del Faro: the square, the strings of lanterns, the carousel roof and the lighthouse at the end
  'lighthouse-plaza': () => (
    <>
      <Lighthouse x={1040} base={330} h={210} />
      <g fill={INK}>
        <path d="M0 330 H1440 V420 H0Z" />
        {/* shopfronts left */}
        <path d="M120 330 V262 L170 236 L220 262 V330Z" />
        <path d="M228 330 V276 H330 V330Z" /><path d="M222 276 L279 250 L336 276Z" />
        <path d="M344 330 V254 L392 226 L440 254 V330Z" />
        {/* carousel */}
        <path d="M560 330 V270 H720 V330Z" /><path d="M540 270 L640 214 L740 270Z" /><rect x="636" y="196" width="8" height="20" />
        {/* shopfronts right */}
        <path d="M1180 330 V268 H1290 V330Z" /><path d="M1172 268 L1235 240 L1298 268Z" />
        <path d="M1304 330 V250 L1350 224 L1396 250 V330Z" />
      </g>
      <g fill={GLOW} opacity=".9">
        <rect x="150" y="286" width="16" height="22" rx="2" /><rect x="254" y="292" width="16" height="20" rx="2" /><rect x="292" y="292" width="16" height="20" rx="2" />
        <rect x="384" y="278" width="16" height="24" rx="2" /><rect x="1212" y="288" width="16" height="20" rx="2" /><rect x="1250" y="288" width="16" height="20" rx="2" />
        <rect x="1342" y="276" width="16" height="24" rx="2" />
        <rect x="584" y="284" width="10" height="46" /><rect x="612" y="284" width="10" height="46" /><rect x="660" y="284" width="10" height="46" /><rect x="688" y="284" width="10" height="46" />
      </g>
      <path d="M170 236 C320 290 480 250 640 214 C800 262 900 190 1040 150" fill="none" stroke={INK} strokeWidth="1.5" opacity=".6" />
      <Lanterns points={[[230, 258], [300, 268], [372, 266], [446, 256], [520, 242], [590, 226], [700, 228], [770, 234], [840, 226], [910, 204], [976, 178]]} />
    </>
  ),
  // Costa Encandela: lighthouse, storybook rooftops and the glowing forest
  'park-skyline': () => (
    <>
      <g transform="translate(1440 0) scale(-1 1)">
      <Lighthouse x={300} base={336} h={190} />
      <g fill={INK}>
        <path d="M0 336 C240 316 520 322 760 330 C1000 338 1220 322 1440 332 V420 H0Z" />
        {/* village rooftops */}
        <path d="M470 336 V286 L500 258 L530 286 V336Z" /><path d="M536 336 V272 L572 236 L608 272 V336Z" /><rect x="566" y="214" width="12" height="26" />
        <path d="M614 336 V292 L640 268 L666 292 V336Z" /><path d="M672 336 V278 H730 V336Z" /><path d="M664 278 L701 246 L738 278Z" />
        {/* forest */}
        <path d="M860 336 C852 280 876 236 900 220 C924 236 948 280 940 336Z" /><path d="M930 336 C920 270 950 214 980 194 C1010 214 1040 270 1030 336Z" />
        <path d="M1020 336 C1014 290 1034 250 1056 236 C1078 250 1098 290 1092 336Z" /><path d="M1084 336 C1076 276 1102 228 1130 210 C1158 228 1184 276 1176 336Z" />
        {/* wheel far right */}
        <circle cx="1300" cy="262" r="62" fill="none" stroke={INK} strokeWidth="5" />
        <path d="M1300 262 L1274 336 H1326Z" />
      </g>
      <g stroke={INK} strokeWidth="2.2"><path d="M1300 200V324M1238 262H1362M1256 218L1344 306M1344 218L1256 306" /></g>
      <g fill={GLOW} opacity=".9">
        <rect x="492" y="298" width="12" height="18" rx="2" /><rect x="564" y="290" width="14" height="20" rx="2" /><rect x="634" y="302" width="12" height="16" rx="2" /><rect x="694" y="296" width="14" height="20" rx="2" />
      </g>
      <g fill="#bfe8c9" opacity=".85">
        <circle cx="892" cy="268" r="3" /><circle cx="912" cy="296" r="2.4" /><circle cx="972" cy="246" r="3.2" /><circle cx="996" cy="284" r="2.6" /><circle cx="1050" cy="276" r="2.8" />
        <circle cx="1122" cy="258" r="3.2" /><circle cx="1146" cy="298" r="2.4" /><circle cx="960" cy="306" r="2.2" /><circle cx="1104" cy="302" r="2.2" />
      </g>
      <Lanterns points={[[360, 300], [410, 306], [760, 304], [808, 310]]} />
      </g>
    </>
  ),
  // Casa Faroluz: the hotel around its harbor, lighthouse across the water
  'harbor-hotel': () => (
    <>
      <Lighthouse x={1180} base={318} h={150} />
      <g fill={INK}>
        <path d="M1090 318 C1140 304 1230 304 1290 318Z" />
        <path d="M0 336 H820 V420 H0Z" />
        {/* hotel wings */}
        <g transform="translate(0 67.2) scale(1 0.8)">
          <path d="M150 336 V226 H330 V336Z" /><path d="M138 226 L240 176 L342 226Z" />
          <path d="M330 336 V196 H560 V336Z" /><path d="M318 196 L445 136 L572 196Z" /><rect x="436" y="108" width="18" height="34" /><path d="M430 108 L445 90 L460 108Z" />
          <path d="M560 336 V236 H740 V336Z" /><path d="M548 236 L650 190 L752 236Z" />
        </g>
        {/* dock and boats */}
        <rect x="820" y="330" width="170" height="6" /><rect x="850" y="330" width="5" height="34" /><rect x="950" y="330" width="5" height="34" />
        <path d="M884 326 H936 L926 340 H894Z" /><rect x="908" y="290" width="3" height="36" /><path d="M911 292 L934 322 H911Z" />
      </g>
      <g fill={GLOW} opacity=".9" transform="translate(0 67.2) scale(1 0.8)">
        {[176, 214, 252, 290].map((x) => <rect key={x} x={x} y="248" width="16" height="22" rx="2" />)}
        {[176, 214, 252, 290].map((x) => <rect key={`b${x}`} x={x} y="290" width="16" height="22" rx="2" />)}
        {[358, 400, 442, 484, 526].map((x) => <rect key={x} x={x} y="216" width="16" height="24" rx="2" />)}
        {[358, 400, 484, 526].map((x) => <rect key={`b${x}`} x={x} y="262" width="16" height="24" rx="2" />)}
        <path d="M430 336 V296 A15 15 0 0 1 460 296 V336Z" />
        {[586, 624, 662, 700].map((x) => <rect key={x} x={x} y="258" width="16" height="22" rx="2" />)}
        {[586, 662, 700].map((x) => <rect key={`b${x}`} x={x} y="298" width="16" height="22" rx="2" />)}
      </g>
      <Lanterns points={[[836, 316], [872, 312], [962, 314]]} />
    </>
  ),

  village: () => (
    <>
      <Ground />
      <House x={90} w={70} h={48} roof={30} /><House x={170} w={90} h={64} roof={38} /><House x={270} w={64} h={44} roof={30} />
      <House x={880} w={80} h={70} roof={46} /><House x={968} w={110} h={104} roof={54} /><rect x={1016} y={150} width="14" height="34" fill={INK} /><House x={1086} w={76} h={62} roof={40} />
      <House x={1170} w={96} h={86} roof={48} /><House x={1276} w={70} h={56} roof={34} />
      <g fill="none" stroke={INK} strokeWidth="2"><path d="M1140 120 l26 -34 l-34 8z" fill={GLOW} stroke="none" /><path d="M1132 94 C1100 150 1070 190 1040 232" /><path d="M1290 150 l22 -30 l-30 8z" fill="#e58aa5" stroke="none" /><path d="M1282 128 C1262 170 1246 200 1230 250" /></g>
      <Lanterns points={[[360, 300], [420, 306], [480, 300], [800, 306], [846, 298]]} />
    </>
  ),
  'glow-forest': () => (
    <>
      <Ground d={`M0 ${BASE} C300 322 700 330 1440 326 V420 H0Z`} />
      <Tree x={110} r={40} /><Tree x={190} r={52} /><Tree x={290} r={38} />
      <Tree x={820} r={54} /><Tree x={920} r={72} /><Tree x={1030} r={58} /><Tree x={1130} r={80} /><Tree x={1240} r={62} /><Tree x={1340} r={74} />
      <g fill="#bfe8c9" opacity=".9">
        {[[840, 262], [880, 230], [932, 196], [966, 270], [1010, 240], [1060, 286], [1110, 200], [1150, 250], [1196, 290], [1236, 226], [1290, 270], [1330, 208], [1370, 256], [180, 250], [210, 286], [124, 280]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={2 + (i % 3) * 0.7} />)}
      </g>
      <Coaster x={420} w={330} h={70} />
    </>
  ),
  lagoon: () => (
    <>
      <Sea from={200} to={1240} />
      <Ground d={`M0 ${BASE} H330 C340 350 300 380 260 420 H0Z`} /><Ground d={`M1440 ${BASE} H1110 C1100 350 1140 380 1180 420 H1440Z`} />
      <House x={70} w={96} h={60} roof={30} /><House x={176} w={70} h={46} roof={26} />
      <path fill={INK} d="M1180 336 C1190 250 1240 214 1300 214 C1360 214 1410 250 1420 336Z" /><path fill={GLOW} opacity=".85" d="M1270 336 V296 A30 30 0 0 1 1330 296 V336Z" />
      <g fill="none" stroke="#bfe0ea" strokeWidth="3" strokeLinecap="round" opacity=".8">
        <path d="M720 336 C716 250 700 220 680 210" /><path d="M720 336 C724 250 740 220 760 210" /><path d="M640 336 C638 290 628 270 614 264" /><path d="M800 336 C802 290 812 270 826 264" /><path d="M720 336 V190" />
      </g>
      <Lanterns points={[[420, 322], [520, 326], [920, 326], [1020, 322]]} />
    </>
  ),
  'old-port': () => (
    <>
      <Sea from={560} to={1440} />
      <Ground d={`M0 ${BASE} H600 V420 H0Z`} />
      <House x={60} w={84} h={58} roof={30} /><House x={150} w={110} h={76} roof={36} /><House x={268} w={76} h={50} roof={28} />
      <g fill={INK}><rect x="600" y="330" width="240" height="7" /><rect x="640" y="330" width="6" height="40" /><rect x="720" y="330" width="6" height="40" /><rect x="800" y="330" width="6" height="40" /></g>
      <Ship x={1020} s={1.25} />
      <Ship x={1300} s={0.7} />
      <Lanterns points={[[400, 300], [470, 306], [540, 300], [660, 316], [760, 316]]} />
    </>
  ),
  'star-dome': () => (
    <>
      <Ground />
      <Dome x={1020} r={150} /><Dome x={1270} r={84} /><Tower x={780} h={230} />
      <House x={110} w={90} h={50} roof={24} /><House x={210} w={70} h={40} roof={22} />
      <g fill="none" stroke="#f7fbfb" strokeWidth="1.4" opacity=".7"><path d="M980 60 L1040 30 L1110 70 L1170 40 L1230 90" /><path d="M1040 30 L1060 110" /></g>
      <g fill="#fff1c4">{[[980, 60], [1040, 30], [1110, 70], [1170, 40], [1230, 90], [1060, 110]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="3.5" />)}</g>
    </>
  ),
  pier: () => (
    <>
      <Sea />
      <Ground d={`M0 ${BASE} H360 V420 H0Z`} />
      <g fill={INK}><rect x="360" y="326" width="1080" height="10" />{[420, 520, 620, 720, 820, 920, 1020, 1120, 1220, 1320, 1420].map((x) => <rect key={x} x={x} y="330" width="7" height="60" />)}</g>
      <g transform="translate(0 -10)"><Wheel x={1150} r={88} /></g>
      <g transform="translate(0 -10)">
        <rect x="857" y="196" width="6" height="140" fill={INK} /><path fill={INK} d="M800 200 H920 L860 168Z" />
        <g stroke={INK} strokeWidth="1.6">{[-52, -30, -8, 14, 36, 56].map((dx, i) => <path key={i} d={`M${860 + dx} 200 L${860 + dx * 1.5} 268`} />)}</g>
        <g fill={GLOW}>{[-52, -30, -8, 14, 36, 56].map((dx, i) => <rect key={i} x={860 + dx * 1.5 - 4} y="266" width="8" height="10" rx="2" />)}</g>
      </g>
      <House x={90} w={110} h={54} roof={24} /><House x={210} w={90} h={44} roof={22} />
      <Lanterns points={[[400, 312], [480, 308], [560, 312], [640, 308], [720, 312]]} />
    </>
  ),
  shipyard: () => (
    <>
      <Sea from={900} to={1440} />
      <Ground d={`M0 ${BASE} H940 V420 H0Z`} />
      <Crane x={1040} h={210} flip /><Crane x={820} h={170} />
      <Tower x={1290} h={250} />
      <g fill={INK}><rect x="80" y="266" width="230" height="70" /><path d="M80 266 L130 236 L130 266 L180 236 L180 266 L230 236 L230 266 L280 236 L310 266Z" /><rect x="250" y="190" width="18" height="80" /><rect x="286" y="210" width="14" height="60" /></g>
      <g fill={GLOW} opacity=".9">{[100, 140, 180, 220, 260].map((x) => <rect key={x} x={x} y="290" width="18" height="14" />)}</g>
      <Coaster x={420} w={340} h={84} />
    </>
  ),
  'whirl-coaster': () => (
    <>
      <Sea from={0} to={1440} />
      <Ground d={`M0 ${BASE} C120 320 240 326 380 ${BASE} V420 H0Z`} /><Ground d={`M1440 ${BASE} C1300 316 1100 316 780 ${BASE} V420 H1440Z`} />
      <Coaster x={800} w={520} h={150} loop />
      <g fill="none" stroke="#7fb3c0" strokeWidth="3" opacity=".7" strokeLinecap="round"><path d="M520 372 C560 352 640 352 680 372 C650 392 560 394 540 378 C560 366 630 366 650 376" /></g>
      <Palm x={150} h={84} /><Palm x={250} h={64} flip />
      <Lanterns points={[[420, 322], [480, 326], [720, 326]]} />
    </>
  ),
  'ridge-towers': () => (
    <>
      <Ground d={`M0 ${BASE} C300 330 520 300 760 250 C940 214 1180 206 1440 220 V420 H0Z`} />
      <g transform="translate(0 -110)"><Tower x={1060} h={200} /><Tower x={1330} h={150} /></g>
      <g transform="translate(0 -96)"><Coaster x={760} w={560} h={120} /></g>
      <House x={120} w={90} h={46} roof={24} />
      <g fill="none" stroke={INK} strokeWidth="6"><path d="M1200 228 L1200 96" /><path d="M1200 96 C1160 150 1170 200 1250 214" /></g>
      <Lanterns points={[[260, 314], [330, 310], [400, 306]]} />
    </>
  ),
  'storm-outpost': () => (
    <>
      <Cloud x={1050} y={70} s={1.9} bolt /><Cloud x={1300} y={110} s={1.3} /><Cloud x={820} y={120} s={1.2} />
      <Ground d={`M0 ${BASE} C400 326 900 316 1440 300 V420 H0Z`} />
      <g fill={INK}><path d="M960 318 A70 46 0 0 1 1100 314 Z" /><rect x="1024" y="210" width="8" height="70" /><path d="M1028 214 m-34 0 a34 20 -20 0 0 68 -14Z" />
        <rect x="1140" y="244" width="150" height="64" rx="8" /><rect x="1290" y="266" width="60" height="40" rx="6" /></g>
      <g fill={GLOW} opacity=".9">{[1160, 1196, 1232].map((x) => <rect key={x} x={x} y="262" width="20" height="14" rx="2" />)}</g>
      <Coaster x={420} w={420} h={96} loop />
      <House x={110} w={84} h={44} roof={20} />
    </>
  ),
  'storm-point': () => (
    <>
      <Cloud x={980} y={80} s={1.7} bolt /><Cloud x={1280} y={60} s={1.4} /><Cloud x={760} y={130} s={1.1} />
      <Sea from={0} to={420} />
      <Ground d={`M360 420 C380 360 400 340 440 ${BASE} H1440 V420Z`} />
      <Coaster x={520} w={420} h={110} loop />
      <Tower x={1040} h={250} />
      <Wheel x={1230} r={70} />
      <Crane x={1380} h={160} flip />
      <g fill={INK}><rect x="120" y="328" width="300" height="8" /><rect x="160" y="330" width="6" height="50" /><rect x="260" y="330" width="6" height="50" /><rect x="360" y="330" width="6" height="50" /></g>
      <Lanterns points={[[150, 314], [230, 314], [310, 314]]} />
    </>
  ),
  'water-park': () => (
    <>
      <Sea from={0} to={700} />
      <Ground d={`M1440 ${BASE} H640 C600 350 560 380 520 420 H1440Z`} />
      <SlideTower x={1040} h={200} flumes={3} />
      <Palm x={760} h={90} /><Palm x={1330} h={110} flip /><Palm x={1390} h={76} />
      <Umbrella x={700} /><Umbrella x={640} />
      <g fill="none" stroke="#bfe0ea" strokeWidth="3" opacity=".7" strokeLinecap="round"><path d="M80 366 q30 -16 60 0 t60 0 t60 0" /><path d="M300 392 q30 -16 60 0 t60 0" /></g>
    </>
  ),
  'wave-beach': () => (
    <>
      <Sea from={0} to={820} />
      <Ground d={`M1440 ${BASE} H760 C700 356 640 386 600 420 H1440Z`} />
      <Umbrella x={860} /><Umbrella x={960} /><Umbrella x={1060} />
      <Palm x={1180} h={120} /><Palm x={1270} h={90} flip /><Palm x={1380} h={104} />
      <g fill="none" stroke="#bfe0ea" strokeWidth="3.5" opacity=".75" strokeLinecap="round">
        <path d="M60 356 q40 -22 80 0 t80 0 t80 0 t80 0" /><path d="M160 384 q40 -22 80 0 t80 0 t80 0" /><path d="M40 408 q40 -20 80 0 t80 0" />
      </g>
    </>
  ),
  'slide-tower': () => (
    <>
      <path d={`M560 ${BASE - 2} H1440 V424 H560Z`} fill="url(#v-sea)" />
      <Ground d={`M0 ${BASE} H600 C640 350 660 380 680 420 H0Z`} />
      <g fill={INK}>
        <rect x="1010" y="96" width="14" height="250" /><rect x="1096" y="96" width="14" height="250" />
        <rect x="992" y="96" width="136" height="12" /><rect x="992" y="170" width="136" height="10" /><rect x="992" y="244" width="136" height="10" />
        <path d="M982 96 H1138 L1060 52Z" /><rect x="1056" y="30" width="6" height="26" /><path d="M1062 30 l26 8 l-26 8z" fill={GLOW} />
        <g stroke={INK} strokeWidth="3" fill="none"><path d="M1024 108 L1096 170 M1096 180 L1024 244 M1024 254 L1096 330" /></g>
      </g>
      <g fill="none" strokeLinecap="round">
        <path d="M1000 112 C860 118 900 220 800 236 C720 248 740 320 660 338" stroke="#2d5a86" strokeWidth="15" />
        <path d="M1122 112 C1290 120 1210 230 1320 250 C1390 262 1380 320 1420 338" stroke="#24486a" strokeWidth="15" />
        <path d="M1000 186 C920 196 930 292 860 338" stroke="#3a6c98" strokeWidth="13" />
        <path d="M1122 258 C1180 268 1170 320 1230 338" stroke="#2d5a86" strokeWidth="13" />
      </g>
      <g fill="none" stroke="#bfe0ea" strokeWidth="3" opacity=".75" strokeLinecap="round">
        <path d="M640 352 q14 -14 28 0 M846 352 q14 -14 28 0 M1216 352 q14 -14 28 0 M1404 352 q12 -12 24 0" /><path d="M720 384 q30 -14 60 0 t60 0 M1000 392 q30 -14 60 0 t60 0" />
      </g>
      <Palm x={420} h={96} /><Palm x={500} h={66} flip /><Umbrella x={180} /><Umbrella x={270} />
    </>
  ),
  'kids-cove': () => (
    <>
      <path d={`M520 ${BASE - 2} H1440 V424 H520Z`} fill="url(#v-sea)" />
      <Ground d={`M0 ${BASE} H560 C600 350 620 380 640 420 H0Z`} />
      {/* play structure */}
      <g fill={INK}>
        <rect x="900" y="230" width="12" height="116" /><rect x="1010" y="230" width="12" height="116" /><rect x="1100" y="262" width="10" height="84" />
        <rect x="884" y="230" width="154" height="12" /><rect x="1022" y="262" width="100" height="10" />
        <path d="M876 230 H1046 L961 180Z" /><path d="M1012 262 H1130 L1071 226Z" />
      </g>
      <g fill="none" strokeLinecap="round">
        <path d="M900 244 C830 250 820 316 760 338" stroke="#3a6c98" strokeWidth="13" />
        <path d="M1110 274 C1170 280 1170 326 1220 338" stroke="#2d5a86" strokeWidth="12" />
      </g>
      {/* tipping bucket */}
      <g transform="rotate(-24 961 160)"><path d="M936 138 H986 L978 176 H944Z" fill={GLOW} /></g>
      <g stroke="#bfe0ea" strokeWidth="2.5" opacity=".85" strokeLinecap="round" fill="none"><path d="M932 178 l-6 22 M946 184 l-4 24 M960 188 l-2 24" /></g>
      {/* shell and sprays */}
      <path fill={INK} d="M1290 346 C1290 300 1322 276 1352 276 C1382 276 1414 300 1414 346Z" />
      <g fill="none" stroke="#14233a" strokeWidth="2.5" opacity=".0" />
      <g stroke={GLOW} strokeWidth="3" opacity=".7" fill="none"><path d="M1352 280 V346 M1322 292 L1338 346 M1382 292 L1366 346" /></g>
      <g fill="none" stroke="#bfe0ea" strokeWidth="2.5" opacity=".8" strokeLinecap="round">
        <path d="M680 346 C680 312 694 302 706 298 M680 346 C680 312 666 302 654 298" /><path d="M1260 346 C1260 322 1250 314 1242 312" />
        <path d="M700 384 q30 -14 60 0 t60 0 M980 392 q30 -14 60 0 t60 0 M1240 386 q24 -12 48 0" />
      </g>
      <Umbrella x={150} /><Umbrella x={240} /><Umbrella x={330} /><Palm x={460} h={84} />
    </>
  ),
  'ridge-slides': () => (
    <>
      <Ground d={`M0 ${BASE} H560 C760 330 900 250 1080 200 C1220 162 1340 160 1440 170 V420 H0Z`} />
      <g fill="none" stroke="#24486a" strokeWidth="14" strokeLinecap="round">
        <path d="M1180 172 C1080 220 1060 260 940 286 C860 304 800 300 720 330" /><path d="M1300 162 C1260 230 1150 250 1100 300 C1070 326 1010 330 960 334" />
      </g>
      <g fill={INK}><rect x="1160" y="110" width="60" height="62" /><path d="M1148 110 H1232 L1190 80Z" /><rect x="1284" y="112" width="44" height="50" /><path d="M1274 112 H1338 L1306 88Z" /></g>
      <path d={`M560 ${BASE} H1000 V354 H560Z`} fill="url(#v-sea)" />
      <Palm x={180} h={96} /><Palm x={280} h={70} flip /><Umbrella x={420} />
    </>
  ),
  'palm-court': () => (
    <>
      <Ground />
      <g fill={INK}><rect x="820" y="250" width="220" height="86" /><rect x="1040" y="230" width="260" height="106" /><rect x="1300" y="262" width="140" height="74" /><rect x="812" y="242" width="236" height="10" /><rect x="1032" y="222" width="276" height="10" /></g>
      <g fill={GLOW} opacity=".9">
        {[840, 880, 920, 960, 1000].map((x) => <rect key={x} x={x} y="268" width="16" height="18" rx="2" />)}{[840, 880, 960, 1000].map((x) => <rect key={`b${x}`} x={x} y="300" width="16" height="18" rx="2" />)}
        {[1060, 1100, 1140, 1180, 1220, 1260].map((x) => <rect key={x} x={x} y="248" width="16" height="18" rx="2" />)}{[1060, 1100, 1180, 1220, 1260].map((x) => <rect key={`b${x}`} x={x} y="286" width="16" height="18" rx="2" />)}
        {[1320, 1360, 1400].map((x) => <rect key={x} x={x} y="282" width="16" height="18" rx="2" />)}
      </g>
      <Palm x={720} h={120} /><Palm x={640} h={84} flip /><Palm x={160} h={104} /><Palm x={250} h={72} flip />
      <path d={`M330 ${BASE} H600 V350 H330Z`} fill="url(#v-sea)" /><Umbrella x={300} />
      <Lanterns points={[[360, 318], [450, 318], [540, 318]]} />
    </>
  ),
  hacienda: () => (
    <>
      <Ground />
      <g fill={INK}>
        <rect x="800" y="236" width="420" height="100" /><path d="M790 236 H1230 L1210 214 H810Z" />
        <rect x="1220" y="180" width="80" height="156" /><path d="M1210 180 H1310 L1260 140Z" /><rect x="1256" y="118" width="8" height="26" />
        <rect x="1300" y="260" width="140" height="76" /><path d="M1292 260 H1440 V244 H1310Z" />
      </g>
      <g fill={GLOW} opacity=".9">
        {[830, 900, 970, 1040, 1110, 1170].map((x) => <path key={x} d={`M${x} 336 V292 A18 18 0 0 1 ${x + 36} 292 V336Z`} />)}
        {[836, 906, 976, 1046, 1116, 1176].map((x) => <rect key={`t${x}`} x={x} y="250" width="14" height="16" rx="2" />)}
        <path d="M1246 230 A14 14 0 0 1 1274 230 V256 H1246Z" /><rect x="1330" y="282" width="16" height="20" rx="2" /><rect x="1380" y="282" width="16" height="20" rx="2" />
      </g>
      <g fill="none" stroke="#bfe0ea" strokeWidth="2.5" opacity=".8" strokeLinecap="round"><path d="M620 336 C620 296 606 286 592 282" /><path d="M620 336 C620 296 634 286 648 282" /><path d="M620 336 V270" /></g>
      <path fill={INK} d="M580 336 H660 L650 322 H590Z" />
      <Palm x={720} h={110} /><Palm x={170} h={96} /><Palm x={260} h={70} flip />
      <Lanterns points={[[420, 316], [500, 316]]} />
    </>
  ),
  'grand-hotel': () => (
    <>
      <Sea from={0} to={760} />
      <Ground d={`M1440 ${BASE} H700 C680 356 660 386 640 420 H1440Z`} />
      <g fill={INK}>
        <rect x="900" y="176" width="300" height="160" /><rect x="820" y="230" width="80" height="106" /><rect x="1200" y="230" width="90" height="106" />
        <path d="M890 176 H1210 L1180 150 H920Z" /><rect x="1036" y="112" width="28" height="42" /><path d="M1026 112 H1074 L1050 84Z" />
        <rect x="700" y="318" width="120" height="8" />
      </g>
      <g fill={GLOW} opacity=".9">
        {[0, 1, 2].map((r) => [924, 972, 1020, 1068, 1116, 1164].map((x) => <rect key={`${r}${x}`} x={x} y={196 + r * 40} width="18" height="24" rx="2" />))}
        {[836, 868].map((x) => <rect key={x} x={x} y="250" width="16" height="22" rx="2" />)}{[1216, 1252].map((x) => <rect key={x} x={x} y="250" width="16" height="22" rx="2" />)}
        <path d="M1030 336 V300 A20 20 0 0 1 1070 300 V336Z" />
      </g>
      <Palm x={1360} h={120} flip /><Palm x={780} h={90} />
      <Lanterns points={[[716, 306], [760, 306], [804, 306]]} />
    </>
  ),
  'paseo-night': () => (
    <>
      <Sea from={1000} to={1440} />
      <Ground d={`M0 ${BASE} H1040 V420 H0Z`} />
      <House x={70} w={90} h={60} roof={26} /><House x={166} w={110} h={78} roof={30} /><House x={282} w={86} h={56} roof={24} />
      <House x={640} w={96} h={66} roof={28} /><House x={742} w={120} h={84} roof={32} /><House x={868} w={90} h={58} roof={26} />
      <g fill={INK}><rect x="1040" y="328" width="260" height="8" /><rect x="1100" y="330" width="6" height="50" /><rect x="1200" y="330" width="6" height="50" /><rect x="1290" y="330" width="6" height="50" />
        <path d="M1180 328 V262 H1300 V328Z" /><path d="M1170 262 H1310 L1240 232Z" /></g>
      <path fill={GLOW} opacity=".85" d="M1196 328 V284 H1284 V328Z" />
      <path d="M368 262 C460 300 560 300 640 270" fill="none" stroke={INK} strokeWidth="1.5" opacity=".6" />
      <Lanterns points={[[400, 276], [440, 286], [484, 292], [528, 292], [572, 288], [612, 278], [1060, 314], [1120, 314]]} />
    </>
  ),
};

const STORM = new Set(['storm-point', 'storm-outpost', 'pier', 'shipyard', 'whirl-coaster', 'ridge-towers']);
const BRIGHT = new Set(['water-park', 'wave-beach', 'slide-tower', 'kids-cove', 'ridge-slides', 'palm-court']);
const SKIES = {
  dusk: ['#2a2a5c', '#5a3a72', '#c64a6c', '#f2a65a'],
  storm: ['#1b1d45', '#3a2f6b', '#8a3f7a', '#e0736a'],
  bright: ['#3b4f8f', '#8a6aa8', '#ef8f7a', '#ffd08a'],
};

export default function Vignette({ motif = 'park-skyline', label }) {
  const sky = SKIES[STORM.has(motif) ? 'storm' : BRIGHT.has(motif) ? 'bright' : 'dusk'];
  const Draw = MOTIFS[motif] || MOTIFS['park-skyline'];
  return (
    <svg className={styles.vignette} viewBox="0 0 1440 600" preserveAspectRatio="xMidYMax slice" role="img" aria-label={label}>
      <defs>
        <linearGradient id={`v-sky-${motif}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={sky[0]} /><stop offset="0.5" stopColor={sky[1]} />
          <stop offset="0.82" stopColor={sky[2]} /><stop offset="1" stopColor={sky[3]} />
        </linearGradient>
        <linearGradient id="v-beam" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff1c4" stopOpacity="0.7" /><stop offset="1" stopColor="#fff1c4" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="v-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1b4a5c" /><stop offset="1" stopColor="#0d2b3c" />
        </linearGradient>
      </defs>
      <rect width="1440" height="600" fill={`url(#v-sky-${motif})`} />
      <g fill="#f7fbfb">
        <circle cx="120" cy="50" r="1.5" opacity=".8" /><circle cx="420" cy="84" r="1.2" opacity=".6" /><circle cx="760" cy="40" r="1.4" opacity=".7" />
        <circle cx="1080" cy="70" r="1.1" opacity=".55" /><circle cx="1330" cy="46" r="1.6" opacity=".8" /><circle cx="900" cy="110" r="1" opacity=".5" />
      </g>
      <g transform="translate(0 180)">
        {motif === 'harbor-hotel' && <rect y="334" width="1440" height="86" fill="url(#v-sea)" />}
        <Draw />
      </g>
    </svg>
  );
}
