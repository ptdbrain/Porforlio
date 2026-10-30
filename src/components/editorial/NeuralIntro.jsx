import { useEffect, useRef, useState } from 'react';

const brainHalf = 'M210 42 C194 31 174 34 160 45 C138 35 111 43 100 61 C76 61 56 79 54 101 C34 113 36 140 45 158 C32 177 37 203 54 217 C52 240 72 259 96 263 C111 283 138 288 158 278 C178 294 198 284 210 270 Z';

function random(seed) {
  let value = seed;
  return () => {
    value = (value * 1664525 + 1013904223) % 4294967296;
    return value / 4294967296;
  };
}

function makeNodes() {
  const rand = random(271828);
  const points = [];
  for (const side of [-1, 1]) {
    let attempts = 0;
    while (points.filter(point => point.side === side).length < 31 && attempts < 3000) {
      attempts++;
      const x = 46 + rand() * 159;
      const y = 46 + rand() * 240;
      const nx = (x - 130) / 84;
      const ny = (y - 168) / 126;
      if (nx * nx + ny * ny > 0.91 || x > 205) continue;
      const px = side < 0 ? x : 420 - x;
      points.push({ x: px, y, side, index: points.length });
    }
  }
  return points;
}

const nodes = makeNodes();
const edges = (() => {
  const seen = new Set();
  const result = [];
  nodes.forEach((node, index) => {
    const nearest = nodes.map((other, otherIndex) => ({
      other,
      otherIndex,
      distance: Math.hypot(node.x - other.x, node.y - other.y),
    })).filter(item => item.otherIndex !== index && (item.other.side === node.side || Math.abs(item.other.x - 210) < 16 && Math.abs(node.x - 210) < 16))
      .sort((a, b) => a.distance - b.distance).slice(0, 2);
    nearest.forEach(({ other, otherIndex, distance }) => {
      if (distance > 59) return;
      const key = [Math.min(index, otherIndex), Math.max(index, otherIndex)].join(':');
      if (seen.has(key)) return;
      seen.add(key);
      result.push({ from: node, to: other, index: result.length });
    });
  });
  return result;
})();

const shardHalf = [
  '210,47 184,55 205,79', '183,58 154,48 163,83', '151,53 123,59 145,91',
  '119,66 91,70 124,101', '82,77 59,104 105,112', '57,112 47,145 93,143',
  '47,155 50,190 91,174', '54,205 72,235 104,195', '80,245 111,267 126,218',
  '120,274 155,278 151,227', '164,278 199,270 177,221', '191,94 164,111 198,126',
  '155,104 132,124 171,139', '117,117 94,135 137,153', '77,146 69,177 119,169',
  '102,185 81,218 132,203', '139,163 115,190 161,205', '166,151 143,177 190,192',
];
const shards = [...shardHalf.map(points => ({ points, side: -1 })), ...shardHalf.map(points => ({
  side: 1,
  points: points.split(' ').map(pair => {
    const [x, y] = pair.split(',').map(Number);
    return `${420 - x},${y}`;
  }).join(' '),
}))].map((shard, index) => {
  const rand = random(index + 54321);
  const inward = index % 2 ? 1 : -1;
  const centerY = shard.points.split(' ').reduce((sum, pair) => sum + Number(pair.split(',')[1]), 0) / 3;
  const delay = Math.round((1 - centerY / 330) * 480 + rand() * 170);
  return { ...shard, index, dx: `${Math.round((120 + rand() * 210) * inward)}px`, dy: `${Math.round((120 + rand() * 220) * (rand() > .5 ? 1 : -1))}px`, rotate: `${Math.round((rand() - .5) * 90)}deg`, delay: `${delay}ms` };
});

const particles = Array.from({ length: 34 }, (_, index) => {
  const rand = random(index + 8008);
  return {
    index,
    x: `${Math.round(rand() * 100)}%`,
    y: `${Math.round(rand() * 100)}%`,
    size: `${1 + rand() * 2.2}px`,
    delay: `${-Math.round(rand() * 7000)}ms`,
    duration: `${5 + rand() * 8}s`,
    hue: index % 3 === 0 ? 'violet' : 'cyan',
  };
});

function NeuralArtwork({ progress, zooming }) {
  return <div className={`neural-camera ${zooming ? 'is-zooming' : ''}`}>
    <div className="neural-warp" aria-hidden="true" />
    <div className="neural-brain-wrap">
      <svg className="neural-brain" viewBox="0 0 420 330" role="img" aria-label="A neural network forming into a brain">
        <defs>
          <linearGradient id="brain-left" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#83f4ff" stopOpacity=".13"/><stop offset="1" stopColor="#42a9ff" stopOpacity=".015"/></linearGradient>
          <linearGradient id="brain-right" x1="1" x2="0" y1="0" y2="1"><stop stopColor="#c8a2ff" stopOpacity=".13"/><stop offset="1" stopColor="#7b66ff" stopOpacity=".015"/></linearGradient>
          <filter id="node-glow" x="-300%" y="-300%" width="700%" height="700%"><feGaussianBlur stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>
        <g className="brain-fill">
          <path d={brainHalf} fill="url(#brain-left)" />
          <path d={brainHalf} fill="url(#brain-right)" transform="translate(420 0) scale(-1 1)" />
        </g>
        <g className="brain-shards">{shards.map(shard => <polygon key={shard.index} points={shard.points} className={`brain-shard ${shard.side < 0 ? 'is-cyan' : 'is-violet'}`} style={{ '--dx': shard.dx, '--dy': shard.dy, '--rotate': shard.rotate, '--delay': shard.delay }} />)}</g>
        <g className={`neural-edges ${progress >= 30 ? 'is-connected' : ''}`}>
          {edges.map(edge => <line key={edge.index} x1={edge.from.x} y1={edge.from.y} x2={edge.to.x} y2={edge.to.y} pathLength="1" style={{ '--edge-delay': `${edge.index * 5}ms` }} />)}
        </g>
        <g className={`neural-nodes ${progress >= 70 ? 'is-awake' : ''}`} filter={progress >= 70 ? 'url(#node-glow)' : undefined}>
          {nodes.map(node => <circle key={node.index} cx={node.x} cy={node.y} r={node.index % 5 === 0 ? 2.8 : 1.8} className={node.side < 0 ? 'is-cyan' : 'is-violet'} style={{ '--node-delay': `${node.index * 8}ms` }} />)}
        </g>
        <g className="brain-folds" aria-hidden="true">
          <path d="M196 89 C170 74 146 81 141 103 S166 130 188 118 M183 142 C156 127 127 143 132 162 S159 181 183 166 M185 190 C158 181 139 199 147 218 S170 232 190 215 M174 245 C158 233 139 239 135 257" />
          <path d="M224 89 C250 74 274 81 279 103 S254 130 232 118 M237 142 C264 127 293 143 288 162 S261 181 237 166 M235 190 C262 181 281 199 273 218 S250 232 230 215 M246 245 C262 233 281 239 285 257" />
        </g>
        <g className="brain-outline"><path d={brainHalf} pathLength="1"/><path d={brainHalf} pathLength="1" transform="translate(420 0) scale(-1 1)"/><path d="M210 48 C205 92 216 120 209 153 C203 189 218 223 210 278" pathLength="1" className="brain-midline"/></g>
      </svg>
    </div>
  </div>;
}

export function NeuralIntro({ language, onComplete }) {
  const [progress, setProgress] = useState(0);
  const [running, setRunning] = useState(false);
  const [zooming, setZooming] = useState(false);
  const [exiting, setExiting] = useState(false);
  const skipRef = useRef(null);
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const status = progress < 30 ? 'Initializing Neural System...' : progress < 70 ? 'Assembling Intelligence...' : 'Loading Portfolio...';

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    skipRef.current?.focus({ preventScroll: true });
    if (reduced) {
      onComplete();
      return () => { document.body.style.overflow = ''; };
    }
    let frame;
    let finishTimer;
    let exitTimer;
    let start;
    let lastPercent = -1;
    const duration = 6200;
    setRunning(true);
    const tick = now => {
      if (start === undefined) start = now;
      const amount = Math.min(1, (now - start) / duration);
      const value = Math.round(amount * 100);
      if (value !== lastPercent) { lastPercent = value; setProgress(value); }
      if (amount < 1) frame = requestAnimationFrame(tick);
      else {
        setZooming(true);
        finishTimer = window.setTimeout(() => setExiting(true), 1150);
        exitTimer = window.setTimeout(onComplete, 1750);
      }
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(finishTimer);
      clearTimeout(exitTimer);
      document.body.style.overflow = '';
    };
  }, [onComplete, reduced]);

  function skip() {
    if (exiting) return;
    setExiting(true);
    window.setTimeout(onComplete, 360);
  }

  return <div className={`neural-intro ${running ? 'is-running' : ''} ${zooming ? 'is-zooming' : ''} ${exiting ? 'is-exiting' : ''}`} data-phase={progress < 30 ? '1' : progress < 70 ? '2' : '3'} role="dialog" aria-modal="true" aria-labelledby="neural-intro-title" onKeyDown={event=>{if(event.key==='Escape')skip();}}>
    <div className="neural-atmosphere" aria-hidden="true"><div className="neural-grid"/>{particles.map(particle => <i key={particle.index} className={`neural-particle ${particle.hue}`} style={{ left: particle.x, top: particle.y, width: particle.size, height: particle.size, '--delay': particle.delay, '--duration': particle.duration }}/>)}</div>
    <div className="neural-topline"><span className="neural-brand">PTD<span>.</span> / SYSTEM INTRO</span><button ref={skipRef} className="neural-skip" type="button" onClick={skip}>{language === 'vi' ? 'Bỏ qua intro' : 'Skip intro'} <span aria-hidden="true">↗</span></button></div>
    <div className="neural-center">
      <p className="neural-kicker" id="neural-intro-title">ONE PERSON / TWO STORIES</p>
      <NeuralArtwork progress={progress} zooming={zooming}/>
      <span className="neural-layout-spacer" aria-hidden="true"/>
      <div className="neural-caption"><span className="neural-caption-line"/><span>{language === 'vi' ? 'MỞ RA ĐỂ KHÁM PHÁ' : 'OPEN TO EXPLORE'}</span><span className="neural-caption-line"/></div>
    </div>
    <div className="neural-status">
      <div className="neural-status-row"><span role="status" aria-live="polite" aria-atomic="true">{status}</span><span className="neural-percent">{String(progress).padStart(2, '0')}<small>%</small></span></div>
      <div className="neural-progress-track" role="progressbar" aria-label="Intro animation" aria-valuemin="0" aria-valuemax="100" aria-valuenow={progress}><span style={{ transform: `scaleX(${progress / 100})` }}/></div>
      <div className="neural-status-foot"><span>NEURAL INTERFACE</span><span>VI / EN · PTD 01</span></div>
    </div>
    <div className="neural-flash" aria-hidden="true"/>
  </div>;
}
