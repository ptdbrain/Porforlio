import { useEffect, useMemo, useRef, useState } from 'react';

const INTRO_DURATION = 6800;
const PORTAL_DURATION = 1500;

const phases = [
  { max: 10, label: 'Initializing Neural System...', className: 'phase-boot' },
  { max: 45, label: 'Building Hemispheres...', className: 'phase-forming' },
  { max: 75, label: 'Synchronizing Intelligence...', className: 'phase-syncing' },
  { max: 100, label: 'Neural Core Complete', className: 'phase-complete' },
];

const networkNodes = [
  { id: 'n1', x: 118, y: 92, r: 4 }, { id: 'n2', x: 156, y: 64, r: 3.6 },
  { id: 'n3', x: 205, y: 78, r: 4.4 }, { id: 'n4', x: 255, y: 64, r: 3.6 },
  { id: 'n5', x: 302, y: 94, r: 4 }, { id: 'n6', x: 86, y: 142, r: 4.6 },
  { id: 'n7', x: 145, y: 132, r: 3.8 }, { id: 'n8', x: 202, y: 138, r: 5.4, portal: true },
  { id: 'n9', x: 258, y: 134, r: 3.8 }, { id: 'n10', x: 334, y: 145, r: 4.6 },
  { id: 'n11', x: 112, y: 194, r: 4 }, { id: 'n12', x: 165, y: 210, r: 3.8 },
  { id: 'n13', x: 215, y: 218, r: 4.6 }, { id: 'n14', x: 270, y: 206, r: 3.8 },
  { id: 'n15', x: 318, y: 196, r: 4 }, { id: 'n16', x: 182, y: 263, r: 3.8 },
  { id: 'n17', x: 236, y: 263, r: 3.8 },
];

const networkConnections = [
  'M118 92 C138 72 142 70 156 64',
  'M156 64 C174 82 185 82 205 78',
  'M205 78 C222 82 236 80 255 64',
  'M255 64 C274 72 288 78 302 94',
  'M86 142 C104 116 126 116 145 132',
  'M145 132 C164 118 184 120 202 138',
  'M202 138 C220 120 242 119 258 134',
  'M258 134 C284 116 313 120 334 145',
  'M112 194 C126 172 142 168 165 210',
  'M165 210 C182 190 198 196 215 218',
  'M215 218 C232 196 250 190 270 206',
  'M270 206 C290 176 302 176 318 196',
  'M145 132 C128 160 128 176 112 194',
  'M202 138 C190 166 188 190 165 210',
  'M258 134 C244 162 238 190 215 218',
  'M334 145 C316 165 312 182 318 196',
  'M165 210 C164 238 170 252 182 263',
  'M270 206 C268 238 254 252 236 263',
  'M202 138 C205 166 207 194 215 218',
];

function getPhase(progress) {
  return phases.find((phase) => progress <= phase.max) || phases.at(-1);
}

function ParticleField() {
  const fragments = useMemo(
    () => Array.from({ length: 54 }, (_, index) => ({
      id: index,
      x: `${6 + ((index * 23) % 88)}%`,
      y: `${8 + ((index * 31) % 80)}%`,
      tx: `${Math.cos(index * 1.37) * (180 + (index % 7) * 36)}px`,
      ty: `${Math.sin(index * 1.61) * (150 + (index % 6) * 32)}px`,
      delay: `${index * 34}ms`,
      size: `${4 + (index % 5) * 2}px`,
      rotate: `${(index * 37) % 180}deg`,
    })),
    [],
  );

  return (
    <div className="intro-particles" aria-hidden="true">
      {fragments.map((fragment) => (
        <span
          key={fragment.id}
          className="intro-fragment"
          style={{
            '--x': fragment.x,
            '--y': fragment.y,
            '--tx': fragment.tx,
            '--ty': fragment.ty,
            '--delay': fragment.delay,
            '--size': fragment.size,
            '--rotate': fragment.rotate,
          }}
        />
      ))}
    </div>
  );
}

function NeuralBrain() {
  return (
    <div className="brain-stage">
      <svg className="brain-svg" viewBox="0 0 420 330" role="img" aria-label="Assembling neon neural cyber brain">
        <defs>
          <filter id="brainGlow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="3.2" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0.96 1 0 0 0 1 1 0 0 0 0.72 0"
              result="cyanGlow"
            />
            <feMerge>
              <feMergeNode in="cyanGlow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="portalGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#EAFBFF" stopOpacity="0.96" />
            <stop offset="42%" stopColor="#00F5FF" stopOpacity="0.74" />
            <stop offset="100%" stopColor="#8A2BE2" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="leftBrainFill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#76FFE3" stopOpacity="0.72" />
            <stop offset="100%" stopColor="#00F5FF" stopOpacity="0.14" />
          </linearGradient>
          <linearGradient id="rightBrainFill" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8A2BE2" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#00F5FF" stopOpacity="0.08" />
          </linearGradient>
        </defs>

        <g className="brain-halo">
          <ellipse cx="210" cy="160" rx="170" ry="118" />
          <ellipse cx="210" cy="160" rx="122" ry="84" />
        </g>

        <g className="hemisphere hemisphere-left">
          <path
            className="brain-surface left-surface"
            d="M207 58 C180 27 122 27 100 63 C65 62 42 89 47 123 C23 141 25 184 56 199 C47 238 78 270 116 264 C138 302 190 291 205 254 C206 219 207 94 207 58 Z"
          />
          <path
            className="brain-outline left"
            d="M207 58 C180 27 122 27 100 63 C65 62 42 89 47 123 C23 141 25 184 56 199 C47 238 78 270 116 264 C138 302 190 291 205 254 C206 219 207 94 207 58"
          />
          <g className="brain-folds left-folds">
            <path d="M89 94 C126 82 154 90 178 114 C142 112 122 131 104 157" />
            <path d="M76 153 C113 143 145 153 164 181 C130 174 103 187 83 213" />
            <path d="M121 229 C150 214 177 221 196 245" />
            <path d="M137 72 C158 82 171 94 181 115" />
            <path d="M70 122 C96 126 112 116 118 95" />
            <path d="M64 190 C92 196 116 181 126 163" />
            <path d="M105 255 C122 239 136 232 158 235" />
          </g>
          <g className="organic-nodes">
            {networkNodes.filter((node) => node.x < 202).map((node, index) => (
              <circle
                key={`left-${node.id}`}
                cx={node.x}
                cy={node.y}
                r={node.r}
                style={{ '--node-delay': `${1050 + index * 105}ms` }}
              />
            ))}
          </g>
        </g>

        <g className="hemisphere hemisphere-right">
          <path
            className="brain-surface right-surface"
            d="M213 58 C240 27 298 27 320 63 C355 62 378 89 373 123 C397 141 395 184 364 199 C373 238 342 270 304 264 C282 302 230 291 215 254 C214 219 213 94 213 58 Z"
          />
          <path
            className="brain-outline right"
            d="M213 58 C240 27 298 27 320 63 C355 62 378 89 373 123 C397 141 395 184 364 199 C373 238 342 270 304 264 C282 302 230 291 215 254 C214 219 213 94 213 58"
          />
          <g className="brain-folds right-folds">
            <path d="M331 94 C294 82 266 90 242 114 C278 112 298 131 316 157" />
            <path d="M344 153 C307 143 275 153 256 181 C290 174 317 187 337 213" />
            <path d="M299 229 C270 214 243 221 224 245" />
          </g>
          <g className="circuit-traces">
            <path d="M220 82 H248 V66 H274" />
            <path d="M224 110 H268 V92 H316" />
            <path d="M218 138 H256 V120 H302 V144 H348" />
            <path d="M222 166 H280 V150 H330" />
            <path d="M218 194 H250 V214 H298 V194 H346" />
            <path d="M222 226 H272 V248 H318" />
            <path d="M246 82 V104 H232 V124" />
            <path d="M294 92 V120 H312 V136" />
            <path d="M250 166 V188 H232 V210" />
            <path d="M312 144 V174 H332 V190" />
            <path d="M274 214 V238 H258 V258" />
          </g>
          <g className="organic-nodes right-nodes">
            {networkNodes.filter((node) => node.x > 210).map((node, index) => (
              <circle
                key={`right-${node.id}`}
                cx={node.x}
                cy={node.y}
                r={node.r}
                style={{ '--node-delay': `${1100 + index * 105}ms` }}
              />
            ))}
          </g>
        </g>

        <g className="neural-core-network">
          <path className="brain-seam" d="M210 60 C202 92 219 115 208 146 C200 174 221 192 211 224 C206 239 212 252 210 266" />
          <path className="brain-stem" d="M186 250 C187 280 169 299 147 308 M234 250 C233 280 251 299 273 308" />
          <g className="neural-lines">
          {networkConnections.map((path) => (
            <path d={path} key={path} />
          ))}
          </g>
          <g className="neural-energy">
            {networkConnections.slice(4, 12).map((path) => (
              <path d={path} key={`energy-${path}`} />
            ))}
          </g>
          <g className="neural-bridges">
            <path d="M184 112 C196 105 202 105 210 112 C218 105 224 105 236 112" />
            <path d="M180 166 C194 158 201 158 210 166 C219 158 226 158 240 166" />
            <path d="M187 218 C198 210 203 210 210 218 C217 210 222 210 233 218" />
          </g>
          <circle className="portal-node" cx="210" cy="166" r="6" />
          <rect className="portal-slit" x="204" y="82" width="12" height="172" rx="6" />
          <circle className="portal-core" cx="210" cy="166" r="30" fill="url(#portalGradient)" />
        </g>
      </svg>
    </div>
  );
}

function ProgressHUD({ progress, label, onSkip }) {
  return (
    <div className="intro-copy">
      <div>
        <p className="intro-kicker">AI neural boot sequence</p>
        <p className="intro-status">{label}</p>
      </div>
      <div className="intro-progress-row">
        <span>{progress}%</span>
        <div className="intro-progress" aria-label={`Loading ${progress}%`}>
          <div style={{ width: `${progress}%` }} />
        </div>
      </div>
      <button className="intro-skip" type="button" onClick={onSkip}>Skip intro</button>
    </div>
  );
}

function PortalTransition() {
  return (
    <div className="portal-transition" aria-hidden="true">
      <span className="portal-aperture" />
      <span className="portal-speed speed-a" />
      <span className="portal-speed speed-b" />
      <span className="portal-speed speed-c" />
    </div>
  );
}

export default function BrainIntro({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isWarping, setIsWarping] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const lastProgress = useRef(-1);
  const completeTimer = useRef(0);

  const phase = getPhase(progress);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setProgress(100);
      const reducedTimer = window.setTimeout(onComplete, 280);
      return () => window.clearTimeout(reducedTimer);
    }

    let animationFrame = 0;
    const startedAt = performance.now();

    function tick(now) {
      const elapsed = now - startedAt;
      const nextProgress = Math.min(100, Math.floor((elapsed / INTRO_DURATION) * 100));

      if (nextProgress !== lastProgress.current) {
        lastProgress.current = nextProgress;
        setProgress(nextProgress);
      }

      if (nextProgress < 100) {
        animationFrame = requestAnimationFrame(tick);
        return;
      }

      setIsWarping(true);
      completeTimer.current = window.setTimeout(() => {
        setIsExiting(true);
        window.setTimeout(onComplete, 260);
      }, PORTAL_DURATION);
    }

    animationFrame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(animationFrame);
      window.clearTimeout(completeTimer.current);
    };
  }, [onComplete]);

  function skipIntro() {
    setProgress(100);
    setIsWarping(true);
    window.setTimeout(onComplete, 360);
  }

  return (
    <div
      className={`brain-intro ${phase.className || 'phase-online'} ${isWarping ? 'is-warping' : ''} ${isExiting ? 'is-exiting' : ''}`}
      aria-label="Portfolio neural loading intro"
    >
      <div className="intro-grid" />
      <ParticleField />
      <NeuralBrain />
      <PortalTransition />
      <ProgressHUD progress={progress} label={phase.label} onSkip={skipIntro} />
    </div>
  );
}
