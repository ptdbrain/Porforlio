import { useEffect, useMemo, useState } from 'react';

const statusText = [
  { max: 30, label: 'Initializing Neural System...' },
  { max: 70, label: 'Assembling Intelligence...' },
  { max: 100, label: 'Loading Portfolio...' },
];

export default function BrainIntro({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isWarping, setIsWarping] = useState(false);

  const fragments = useMemo(
    () => Array.from({ length: 34 }, (_, index) => ({
      id: index,
      x: `${8 + ((index * 17) % 86)}%`,
      y: `${12 + ((index * 29) % 76)}%`,
      tx: `${Math.cos(index * 1.7) * (160 + (index % 5) * 42)}px`,
      ty: `${Math.sin(index * 1.3) * (130 + (index % 6) * 34)}px`,
      delay: `${index * 42}ms`,
      size: `${5 + (index % 5) * 2}px`,
    })),
    [],
  );

  const neuralNodes = useMemo(
    () => [
      ['22%', '30%'], ['36%', '20%'], ['53%', '18%'], ['70%', '30%'],
      ['25%', '48%'], ['42%', '44%'], ['58%', '42%'], ['74%', '50%'],
      ['34%', '66%'], ['52%', '70%'], ['66%', '64%'],
    ],
    [],
  );

  const label = statusText.find((item) => progress <= item.max)?.label || statusText.at(-1).label;

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setProgress(100);
      const reducedTimer = window.setTimeout(onComplete, 350);
      return () => window.clearTimeout(reducedTimer);
    }

    const duration = 5600;
    let animationFrame = 0;
    const startedAt = performance.now();

    function tick(now) {
      const elapsed = now - startedAt;
      const nextProgress = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(nextProgress);

      if (nextProgress < 100) {
        animationFrame = requestAnimationFrame(tick);
      } else {
        setIsWarping(true);
        window.setTimeout(onComplete, 1250);
      }
    }

    animationFrame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrame);
  }, [onComplete]);

  return (
    <div className={`brain-intro ${isWarping ? 'is-warping' : ''}`} aria-label="Portfolio neural loading intro">
      <div className="intro-grid" />
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
            }}
          />
        ))}
      </div>

      <div className="brain-stage">
        <svg className="brain-svg" viewBox="0 0 420 320" role="img" aria-label="Assembling neon neural brain">
          <defs>
            <filter id="brainGlow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feColorMatrix
                in="blur"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0.95 1 0 0 0 1 1 0 0 0 0.88 0"
                result="cyanGlow"
              />
              <feMerge>
                <feMergeNode in="cyanGlow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <path
            className="brain-outline left"
            d="M207 77 C170 30 92 46 82 101 C45 108 31 154 57 184 C44 225 76 267 121 261 C144 294 194 279 205 241"
          />
          <path
            className="brain-outline right"
            d="M213 77 C250 30 328 46 338 101 C375 108 389 154 363 184 C376 225 344 267 299 261 C276 294 226 279 215 241"
          />
          <path className="brain-stem" d="M191 238 C191 274 173 292 150 301 M229 238 C229 274 247 292 270 301" />
          <path className="brain-core" d="M125 126 C154 94 189 123 165 153 C204 143 211 188 174 198 C150 223 101 205 116 164" />
          <path className="brain-core delay" d="M295 126 C266 94 231 123 255 153 C216 143 209 188 246 198 C270 223 319 205 304 164" />
          <path className="brain-core delay-2" d="M151 78 C178 78 189 103 174 123 M269 78 C242 78 231 103 246 123 M181 218 C199 198 221 198 239 218" />

          <g className="neural-lines">
            <path d="M92 150 L145 112 L205 152 L271 112 L329 150" />
            <path d="M104 205 L168 184 L212 221 L260 182 L319 205" />
            <path d="M145 112 L168 184 L271 112 L260 182" />
          </g>

          <g className="neural-nodes">
            {neuralNodes.map(([cx, cy], index) => (
              <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={index % 3 === 0 ? 5 : 4} />
            ))}
          </g>
        </svg>
      </div>

      <div className="intro-copy">
        <p className="intro-status">{label}</p>
        <div className="intro-progress-row">
          <span>{progress}%</span>
          <div className="intro-progress">
            <div style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}
