export default function DCSkylineBG() {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 480 860"
      preserveAspectRatio="xMidYMid slice"
      className="dc-skyline-bg"
    >
      <defs>
        {/* Midnight blue → warm amber horizon */}
        <linearGradient id="dcs-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#0d1428"/>
          <stop offset="50%"  stopColor="#141e35"/>
          <stop offset="78%"  stopColor="#261808"/>
          <stop offset="100%" stopColor="#4a2c0a"/>
        </linearGradient>
        {/* City light bloom at horizon */}
        <radialGradient id="dcs-hglow" cx="50%" cy="100%" r="70%" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor="#C9A227" stopOpacity="0.48"/>
          <stop offset="55%"  stopColor="#8B5E1A" stopOpacity="0.16"/>
          <stop offset="100%" stopColor="#C9A227" stopOpacity="0"/>
        </radialGradient>
        {/* Ground */}
        <linearGradient id="dcs-ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#281c08"/>
          <stop offset="100%" stopColor="#0a0604"/>
        </linearGradient>
        {/* Monument top glow */}
        <radialGradient id="dcs-mglow" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#C9A227" stopOpacity="0.65"/>
          <stop offset="100%" stopColor="#C9A227" stopOpacity="0"/>
        </radialGradient>
        {/* Capitol dome glow */}
        <radialGradient id="dcs-cglow" cx="50%" cy="80%" r="60%">
          <stop offset="0%"   stopColor="#C9A227" stopOpacity="0.22"/>
          <stop offset="100%" stopColor="#C9A227" stopOpacity="0"/>
        </radialGradient>
      </defs>

      {/* Sky */}
      <rect width="480" height="860" fill="url(#dcs-sky)"/>
      <rect width="480" height="860" fill="url(#dcs-hglow)"/>

      {/* Stars — only in clear sky above all buildings (y < 280) */}
      <circle cx="18"  cy="22"  r="1.2" fill="#fff" opacity="0.60"/>
      <circle cx="52"  cy="12"  r="1.5" fill="#fff" opacity="0.52"/>
      <circle cx="88"  cy="38"  r="1"   fill="#fff" opacity="0.65"/>
      <circle cx="130" cy="8"   r="1.3" fill="#fff" opacity="0.56"/>
      <circle cx="168" cy="32"  r="0.9" fill="#fff" opacity="0.50"/>
      <circle cx="210" cy="16"  r="1.4" fill="#fff" opacity="0.62"/>
      <circle cx="248" cy="46"  r="1"   fill="#fff" opacity="0.55"/>
      <circle cx="318" cy="36"  r="1.2" fill="#fff" opacity="0.52"/>
      <circle cx="360" cy="10"  r="1.3" fill="#fff" opacity="0.60"/>
      <circle cx="395" cy="40"  r="1"   fill="#fff" opacity="0.50"/>
      <circle cx="432" cy="18"  r="1.4" fill="#fff" opacity="0.56"/>
      <circle cx="462" cy="34"  r="1.1" fill="#fff" opacity="0.52"/>
      <circle cx="36"  cy="72"  r="1"   fill="#fff" opacity="0.44"/>
      <circle cx="75"  cy="58"  r="1.2" fill="#fff" opacity="0.48"/>
      <circle cx="115" cy="82"  r="0.9" fill="#fff" opacity="0.40"/>
      <circle cx="155" cy="62"  r="1.1" fill="#fff" opacity="0.45"/>
      <circle cx="200" cy="78"  r="0.8" fill="#fff" opacity="0.38"/>
      <circle cx="242" cy="66"  r="1"   fill="#fff" opacity="0.44"/>
      <circle cx="310" cy="84"  r="1.2" fill="#fff" opacity="0.42"/>
      <circle cx="355" cy="64"  r="0.9" fill="#fff" opacity="0.46"/>
      <circle cx="408" cy="76"  r="1.1" fill="#fff" opacity="0.40"/>
      <circle cx="448" cy="58"  r="1"   fill="#fff" opacity="0.44"/>
      <circle cx="22"  cy="118" r="0.9" fill="#fff" opacity="0.35"/>
      <circle cx="70"  cy="138" r="1"   fill="#fff" opacity="0.38"/>
      <circle cx="182" cy="148" r="0.8" fill="#fff" opacity="0.32"/>
      <circle cx="285" cy="22"  r="1.5" fill="#fff" opacity="0.58"/>
      <circle cx="440" cy="112" r="0.9" fill="#fff" opacity="0.34"/>
      <circle cx="466" cy="148" r="1"   fill="#fff" opacity="0.36"/>

      {/* ============================================================
          LINCOLN MEMORIAL  (far left, x=8–98)
          ============================================================ */}
      {/* Foundation steps */}
      <rect x="8"  y="547" width="90" height="13" fill="#362410" rx="1"/>
      <rect x="12" y="532" width="82" height="15" fill="#30200e"/>
      {/* 8 Doric columns */}
      {[0,1,2,3,4,5,6,7].map(i => (
        <rect key={i} x={15 + i * 10} y="496" width="6" height="36" fill="#2c1c0c" rx="1"/>
      ))}
      {/* Entablature */}
      <rect x="12" y="489" width="82" height="7" fill="#362410"/>
      {/* Pediment */}
      <polygon points="12,489 53,470 94,489" fill="#30200e"/>
      {/* Apex block */}
      <rect x="51" y="466" width="4" height="4" fill="#3a2812"/>

      {/* ============================================================
          WASHINGTON MONUMENT  (left-center, x=144–174)
          ============================================================ */}
      {/* Glow halo */}
      <ellipse cx="159" cy="306" rx="30" ry="22" fill="url(#dcs-mglow)"/>
      {/* Obelisk body */}
      <polygon points="147,560 171,560 167,318 151,318" fill="#2c1e0c"/>
      {/* Pyramidion */}
      <polygon points="151,318 167,318 159,302" fill="#382610"/>
      {/* Beacon */}
      <circle cx="159" cy="299" r="3.5" fill="#C9A227" opacity="0.90"/>
      <circle cx="159" cy="299" r="6"   fill="#C9A227" opacity="0.30"/>

      {/* ============================================================
          US CAPITOL  (center-right, x=202–348, center=275)
          ============================================================ */}
      {/* Capitol glow */}
      <ellipse cx="275" cy="430" rx="80" ry="60" fill="url(#dcs-cglow)"/>
      {/* Broad plaza steps */}
      <rect x="202" y="549" width="146" height="11" fill="#342210" rx="1"/>
      <rect x="210" y="534" width="130" height="15" fill="#2e1e0e"/>
      {/* Wings */}
      <rect x="210" y="470" width="130" height="64" fill="#281a0a"/>
      {/* Central portico block */}
      <rect x="234" y="448" width="82" height="22" fill="#2e200e"/>
      {/* Drum */}
      <rect x="248" y="414" width="54" height="34" fill="#281a0a"/>
      {/* Dome */}
      <path d="M238,414 C236,386 254,350 275,348 C296,350 314,386 312,414 Z" fill="#2e200e"/>
      {/* Dome colonnade ring */}
      <path d="M246,408 C246,384 260,362 275,360 C290,362 304,384 304,408"
            fill="none" stroke="#4a3418" strokeWidth="1.5" opacity="0.7"/>
      {/* Lantern */}
      <rect x="271" y="336" width="8" height="18" fill="#362410" rx="1"/>
      {/* Flag */}
      <line x1="275" y1="322" x2="275" y2="336" stroke="#3a2a10" strokeWidth="1.2"/>
      <rect x="275" y="322" width="11" height="7" fill="#2a2a6a" opacity="0.65"/>
      {/* Lit windows */}
      <rect x="218" y="490" width="5" height="7" fill="#C9A227" opacity="0.45" rx="1"/>
      <rect x="230" y="490" width="5" height="7" fill="#C9A227" opacity="0.35" rx="1"/>
      <rect x="244" y="490" width="5" height="7" fill="#C9A227" opacity="0.40" rx="1"/>
      <rect x="301" y="490" width="5" height="7" fill="#C9A227" opacity="0.40" rx="1"/>
      <rect x="315" y="490" width="5" height="7" fill="#C9A227" opacity="0.45" rx="1"/>
      <rect x="327" y="490" width="5" height="7" fill="#C9A227" opacity="0.35" rx="1"/>

      {/* ============================================================
          BACKGROUND BUILDINGS — right side
          ============================================================ */}
      {/* Library of Congress */}
      <rect x="354" y="482" width="52" height="78" fill="#2a1c0a" rx="1"/>
      <rect x="358" y="477" width="44" height="5"  fill="#32220e"/>
      <path d="M372,477 Q380,465 388,477 Z" fill="#2e1e0c"/>
      <rect x="360" y="500" width="5" height="8" fill="#C9A227" opacity="0.42" rx="1"/>
      <rect x="371" y="500" width="5" height="8" fill="#C9A227" opacity="0.34" rx="1"/>
      <rect x="382" y="500" width="5" height="8" fill="#C9A227" opacity="0.42" rx="1"/>
      <rect x="393" y="500" width="5" height="8" fill="#C9A227" opacity="0.32" rx="1"/>

      {/* Mid-right building */}
      <rect x="412" y="496" width="44" height="64" fill="#261808" rx="1"/>
      <rect x="416" y="491" width="36" height="5"  fill="#2e200e"/>
      <rect x="418" y="514" width="5" height="8"   fill="#C9A227" opacity="0.36" rx="1"/>
      <rect x="429" y="514" width="5" height="8"   fill="#C9A227" opacity="0.42" rx="1"/>
      <rect x="440" y="514" width="5" height="8"   fill="#C9A227" opacity="0.36" rx="1"/>

      {/* Far right filler */}
      <rect x="460" y="510" width="20" height="50" fill="#241608" rx="1"/>
      <rect x="462" y="505" width="16" height="5"  fill="#2c1e0c"/>

      {/* Between monument and memorial */}
      <rect x="104" y="514" width="30" height="46" fill="#261808" rx="1"/>
      <rect x="107" y="509" width="24" height="5"  fill="#2e1e0c"/>
      <rect x="109" y="528" width="4"  height="6"  fill="#C9A227" opacity="0.34" rx="1"/>
      <rect x="118" y="528" width="4"  height="6"  fill="#C9A227" opacity="0.34" rx="1"/>

      {/* Between monument and Capitol */}
      <rect x="185" y="522" width="22" height="38" fill="#261808" rx="1"/>
      <rect x="187" y="517" width="18" height="5"  fill="#2c1e0c"/>

      {/* ============================================================
          GROUND + POTOMAC
          ============================================================ */}
      <rect x="0" y="560" width="480" height="300" fill="url(#dcs-ground)"/>
      <rect x="0" y="557" width="480" height="6"   fill="#0e1828" opacity="0.55"/>
      <line x1="0" y1="562" x2="480" y2="562"      stroke="#C9A227" strokeWidth="0.8" opacity="0.18"/>
    </svg>
  )
}
