import styles from './DuskScene.module.css';

// The island at lantern hour. Original artwork, drawn as plain SVG.
export default function DuskScene() {
  const lanterns = [
    [318, 372], [372, 356], [430, 366], [492, 350], [556, 362], [622, 346], [690, 358],
    [760, 344], [828, 356], [896, 342], [962, 352],
  ];
  return (
    <svg className={styles.scene} viewBox="0 0 1440 620" preserveAspectRatio="xMidYMax slice" role="img"
      aria-label="Illustration of an island at dusk: a lighthouse, a roller coaster and a wheel in silhouette, with a string of lanterns along the shore.">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a2a5c" />
          <stop offset="0.5" stopColor="#5a3a72" />
          <stop offset="0.78" stopColor="#c64a6c" />
          <stop offset="1" stopColor="#f2a65a" />
        </linearGradient>
        <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1b4a5c" />
          <stop offset="1" stopColor="#0d2b3c" />
        </linearGradient>
        <radialGradient id="sun" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffe3a3" />
          <stop offset="0.55" stopColor="#f9c26b" stopOpacity="0.85" />
          <stop offset="1" stopColor="#f2a65a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="beam" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff1c4" stopOpacity="0.75" />
          <stop offset="1" stopColor="#fff1c4" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect width="1440" height="470" fill="url(#sky)" />
      <g fill="#f7fbfb">
        <circle cx="140" cy="70" r="1.6" opacity=".8" /><circle cx="310" cy="130" r="1.2" opacity=".6" />
        <circle cx="520" cy="60" r="1.4" opacity=".7" /><circle cx="820" cy="95" r="1.1" opacity=".55" />
        <circle cx="1010" cy="50" r="1.7" opacity=".8" /><circle cx="1290" cy="120" r="1.3" opacity=".6" />
        <circle cx="1380" cy="45" r="1.1" opacity=".5" /><circle cx="690" cy="150" r="1" opacity=".45" />
      </g>
      <circle cx="640" cy="452" r="150" fill="url(#sun)" />

      {/* far headland */}
      <path d="M0 440 C160 410 300 425 430 446 L430 470 L0 470Z" fill="#3b2f63" opacity=".75" />

      {/* lighthouse beam, the one moving thing on the page */}
      <g className={styles.beam}>
        <path d="M1128 232 L1440 150 L1440 300Z" fill="url(#beam)" />
      </g>

      {/* island silhouette */}
      <g fill="#14233a">
        <path d="M250 470 C330 420 430 392 560 384 C700 374 820 380 930 372 C1030 364 1110 372 1190 400 C1250 420 1300 446 1340 470Z" />
        {/* coaster */}
        <path d="M420 392 C470 250 540 250 580 360 C610 290 650 290 690 372 L690 384 L420 400Z" fill="none" stroke="#14233a" strokeWidth="7" strokeLinejoin="round" />
        <g stroke="#14233a" strokeWidth="3">
          <path d="M452 392V330M484 392V288M516 392V270M548 392V300M604 380V326M636 378V304M668 378V340" />
        </g>
        {/* wheel */}
        <circle cx="850" cy="300" r="74" fill="none" stroke="#14233a" strokeWidth="6" />
        <g stroke="#14233a" strokeWidth="2.5">
          <path d="M850 226V374M776 300H924M798 248L902 352M902 248L798 352" />
        </g>
        <path d="M850 300 L818 380 H882Z" />
        <circle cx="850" cy="300" r="9" />
        {/* palms */}
        <path d="M1010 372 C1014 340 1012 320 1004 300" fill="none" stroke="#14233a" strokeWidth="5" strokeLinecap="round" />
        <path d="M1004 300 C980 286 962 292 950 306 C972 296 990 300 1004 300 C1000 276 984 266 966 266 C988 268 1002 284 1004 300 C1016 278 1036 274 1052 282 C1032 282 1016 290 1004 300 C1028 296 1046 306 1052 322 C1040 308 1022 302 1004 300Z" />
        {/* lighthouse */}
        <path d="M1108 396 L1118 250 H1140 L1150 396Z" />
        <rect x="1112" y="226" width="34" height="24" rx="3" />
        <path d="M1108 226 H1150 L1129 204Z" />
        <rect x="1104" y="248" width="50" height="6" rx="2" />
      </g>
      <rect className={styles.lamp} x="1119" y="230" width="20" height="16" rx="2" fill="#fff1c4" />

      {/* lantern string along the shore */}
      <path d="M300 364 C420 392 560 340 700 366 C820 388 900 330 980 350" fill="none" stroke="#14233a" strokeWidth="1.5" opacity=".0" />
      <g>
        {lanterns.map(([x, y], i) => (
          <g key={i} className={styles.lantern} style={{ animationDelay: `${0.25 + i * 0.12}s` }}>
            <circle cx={x} cy={y} r="13" fill="#f5b041" opacity=".22" />
            <rect x={x - 3.5} y={y - 5} width="7" height="10" rx="2.5" fill="#f9c86a" />
          </g>
        ))}
      </g>

      {/* water */}
      <rect y="468" width="1440" height="152" fill="url(#sea)" />
      <g stroke="#f9c26b" strokeLinecap="round" opacity=".55">
        <path d="M560 492H720" strokeWidth="3" /><path d="M590 512H700" strokeWidth="2.5" />
        <path d="M610 534H676" strokeWidth="2" /><path d="M624 556H660" strokeWidth="1.6" />
      </g>
      <g stroke="#7fb3c0" strokeLinecap="round" opacity=".35" strokeWidth="2">
        <path d="M120 520H250M980 506H1130M300 566H380M1180 560H1290M840 590H930" />
      </g>
    </svg>
  );
}
