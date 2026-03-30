import type { FC } from 'react'
import senatorUrl from '../assets/senator-character.png'
import faceHappyUrl from '../assets/face-happy.png'
import faceNervousUrl from '../assets/face-nervous.png'

export type Expression = 'neutral' | 'smirk' | 'sweat' | 'nervous' | 'celebrate'
export type AnimateType = '' | 'bob' | 'sweat' | 'celebrate'

interface SenatorProps {
  expression?: Expression
  animate?: AnimateType
  showGoldBar?: boolean
}

// ---------------------------------------------------------------------------
// Sub-renderers
// ---------------------------------------------------------------------------

// Face photo overlays handle all expressions — Eyes component no longer needed but kept for extensibility
function Eyes(_: { expression: Expression }) { return null }

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

const Senator: FC<SenatorProps> = ({
  expression = 'neutral',
  animate = '',
  showGoldBar = false,
}) => {
  const charClass =
    animate === 'bob'       ? 'sen-bob'       :
    animate === 'sweat'     ? 'sen-shake'     :
    animate === 'celebrate' ? 'sen-celebrate' : ''

  return (
    <svg
      viewBox="0 0 315 460"
      xmlns="http://www.w3.org/2000/svg"
      overflow="visible"
      role="img"
      aria-label="Senator Bob Menendez"
      style={{ width: '100%', height: '100%' }}
    >
      <defs>
        <style>{`
          @keyframes sen-bob {
            0%,100% { transform: translateY(0px); }
            50%      { transform: translateY(-8px); }
          }
          @keyframes sen-shake {
            0%,100% { transform: translateX(0px) rotate(0deg); }
            20%     { transform: translateX(-7px) rotate(-2deg); }
            40%     { transform: translateX(7px)  rotate(2deg); }
            60%     { transform: translateX(-5px) rotate(-1deg); }
            80%     { transform: translateX(5px)  rotate(1deg); }
          }
          @keyframes sen-celebrate {
            0%,100% { transform: rotate(0deg)   translateY(0px); }
            25%     { transform: rotate(-6deg)  translateY(-5px); }
            75%     { transform: rotate(6deg)   translateY(-5px); }
          }
          @keyframes sen-drop-bar {
            0%   { transform: translateY(-1200px); animation-timing-function: ease-in; }
            70%  { transform: translateY(0px);     animation-timing-function: ease-out; }
            80%  { transform: translateY(-22px);   animation-timing-function: ease-in; }
            89%  { transform: translateY(0px);     animation-timing-function: ease-out; }
            94%  { transform: translateY(-8px);    animation-timing-function: ease-in; }
            100% { transform: translateY(0px); }
          }
          @keyframes sen-sweat {
            0%   { transform: translateY(0px);  opacity: 0.9; }
            100% { transform: translateY(48px); opacity: 0; }
          }
          .sen-bob       { animation: sen-bob 2s ease-in-out infinite;
                           transform-box: fill-box; transform-origin: center bottom;
                           will-change: transform; }
          .sen-shake     { animation: sen-shake 0.34s ease-in-out infinite;
                           transform-box: fill-box; transform-origin: center center;
                           will-change: transform; }
          .sen-celebrate { animation: sen-celebrate 0.55s ease-in-out infinite;
                           transform-box: fill-box; transform-origin: center bottom;
                           will-change: transform; }
          .sen-drop-bar  { animation: sen-drop-bar 1.4s cubic-bezier(0.23,1,0.32,1) forwards;
                           transform-box: fill-box; transform-origin: center top;
                           will-change: transform; }
          .sen-sweat1 { animation: sen-sweat 1.15s ease-in 0.00s infinite; will-change: transform, opacity; }
          .sen-sweat2 { animation: sen-sweat 1.15s ease-in 0.38s infinite; will-change: transform, opacity; }
          .sen-sweat3 { animation: sen-sweat 1.15s ease-in 0.76s infinite; will-change: transform, opacity; }
        `}</style>
      </defs>

      {/* ---- CHARACTER ---- */}
      <g className={charClass || undefined}>

        {/* === COMBINED CHARACTER — Bob's head on South Park body ===
            senator-character.png: 212×582 px (head 212×255 + body 212×352, 25px overlap)
            Displayed at x=73 y=0 width=168 height=460 (scale=0.790)
            Eyes pixel-scanned: LX=116 RX=194 EY=118 */}
        <image
          href={senatorUrl}
          x="73" y="0"
          width="168" height="460"
          preserveAspectRatio="xMidYMid meet"
        />

        {/* === FACE REACTION OVERLAY — replaces head for non-neutral expressions === */}
        {(expression === 'smirk' || expression === 'celebrate') && (
          <image
            href={faceHappyUrl}
            x="73" y="0"
            width="168" height="211"
            preserveAspectRatio="xMidYMin meet"
          />
        )}
        {(expression === 'nervous' || expression === 'sweat') && (
          <image
            href={faceNervousUrl}
            x="73" y="0"
            width="168" height="216"
            preserveAspectRatio="xMidYMin meet"
          />
        )}

        {/* === FLAG PIN — right lapel, below head (head ends ~SVG y=202) === */}
        <g transform="translate(187,208) scale(1.25)">
          <rect width="17" height="12" rx="1" fill="#B22234" />
          {([1.6, 4.8, 8.0, 10.4] as number[]).map(y => (
            <rect key={y} x="0" y={y} width="17" height="1.5" fill="white" />
          ))}
          <rect x="0" y="0" width="7" height="6.8" fill="#3C3B6E" />
          {([[1.5,1.4],[3.8,1.4],[6.0,1.4],[1.5,4.2],[3.8,4.2],[6.0,4.2]] as [number,number][]).map(([sx,sy],i) => (
            <circle key={i} cx={sx} cy={sy} r="0.8" fill="white" />
          ))}
        </g>

        {/* === EYES — overlay for non-neutral expressions === */}
        <Eyes expression={expression} />

        {/* === SWEAT DROPS === */}
        {expression === 'sweat' && (
          <>
            <g className="sen-sweat1">
              <path d="M 97 90 Q 93 98 97 106 Q 101 98 97 90 Z" fill="#60B8E0" />
            </g>
            <g className="sen-sweat2">
              <path d="M 215 84 Q 211 92 215 100 Q 219 92 215 84 Z" fill="#60B8E0" />
            </g>
            <g className="sen-sweat3">
              <path d="M 157 48 Q 153 56 157 64 Q 161 56 157 48 Z" fill="#60B8E0" />
            </g>
          </>
        )}

      </g>

      {/* ---- GOLD BAR — rendered after character so it appears in front ---- */}
      {showGoldBar && (
        <g className="sen-drop-bar">
          <ellipse cx="157" cy="288" rx="37" ry="6" fill="black" opacity="0.18" />
          <rect x="120" y="250" width="74" height="38" rx="5" fill="#C8960C" stroke="#8B6914" strokeWidth="1.5" />
          <rect x="125" y="254" width="64" height="30" rx="4" fill="#F0C030" />
          <path d="M 128 257 Q 148 252 168 257" fill="none" stroke="#FDE68A" strokeWidth="2.5" strokeLinecap="round" />
          <text x="157" y="273" textAnchor="middle" fontSize="13" fontWeight="bold"
                fill="#78530A" fontFamily="Georgia, serif" letterSpacing="1">AU</text>
          <text x="157" y="283" textAnchor="middle" fontSize="7.5"
                fill="#78530A" fontFamily="sans-serif">400 oz</text>
        </g>
      )}
    </svg>
  )
}

export default Senator
