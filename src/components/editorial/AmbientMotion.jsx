// Decorative companion stays in the page gutters, outside the reading column.
// CSS owns the loops; there are no timers or per-frame React updates.
export function AmbientMotion({work,paused}) {
  return <div className={`ambient-motion ${work?'ambient-tech':'ambient-warm'}`} aria-hidden="true" data-paused={paused}>
    <div className="ambient-rail ambient-rail-left"><i className="ambient-stream"/><i className="ambient-stream ambient-stream-late"/></div>
    <div className="ambient-rail ambient-rail-right"><i className="ambient-stream"/>
      <div className="ambient-companion"><svg viewBox="0 0 40 40" focusable="false">
        <ellipse className="ambient-wing ambient-wing-left" cx="12" cy="17" rx="9" ry="5"/>
        <ellipse className="ambient-wing ambient-wing-right" cx="28" cy="17" rx="9" ry="5"/>
        <circle className="ambient-halo" cx="20" cy="22" r="16"/>
        <path className="ambient-antenna" d="M17 13 14 8M23 13 26 8"/>
        <rect className="ambient-body" x="12" y="12" width="16" height="20" rx="8"/>
        <g className="ambient-eyes"><circle cx="17" cy="20" r="1.4"/><circle cx="23" cy="20" r="1.4"/></g>
        <path className="ambient-smile" d="M18 24Q20 26 22 24"/>
      </svg></div>
    </div>
    <div className="ambient-motes">{Array.from({length:6},(_,index)=><i key={index} style={{'--mote':index}}/>)}</div>
  </div>;
}
