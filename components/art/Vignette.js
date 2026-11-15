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
};

export default function Vignette({ motif = 'park-skyline', label }) {
  const Draw = MOTIFS[motif] || MOTIFS['park-skyline'];
  return (
    <svg className={styles.vignette} viewBox="0 0 1440 600" preserveAspectRatio="xMidYMax slice" role="img" aria-label={label}>
      <defs>
        <linearGradient id="v-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a2a5c" /><stop offset="0.5" stopColor="#5a3a72" />
          <stop offset="0.82" stopColor="#c64a6c" /><stop offset="1" stopColor="#f2a65a" />
        </linearGradient>
        <linearGradient id="v-beam" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff1c4" stopOpacity="0.7" /><stop offset="1" stopColor="#fff1c4" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="v-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1b4a5c" /><stop offset="1" stopColor="#0d2b3c" />
        </linearGradient>
      </defs>
      <rect width="1440" height="600" fill="url(#v-sky)" />
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
