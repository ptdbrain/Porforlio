import { useCallback, useEffect, useRef, useState } from 'react';

export function NeuralIntro({ language, onComplete }) {
  const [muted, setMuted] = useState(true);
  const [exiting, setExiting] = useState(false);
  const videoRef = useRef(null);
  const skipRef = useRef(null);
  const finishTimer = useRef(null);
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const finish = useCallback(() => {
    if (finishTimer.current !== null) return;
    setExiting(true);
    finishTimer.current = window.setTimeout(onComplete, 520);
  }, [onComplete]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    skipRef.current?.focus({ preventScroll: true });
    if (reduced) {
      onComplete();
      return () => { document.body.style.overflow = previousOverflow; };
    }

    const video = videoRef.current;
    const playback = video?.play();
    playback?.catch(finish);
    return () => {
      if (finishTimer.current !== null) window.clearTimeout(finishTimer.current);
      document.body.style.overflow = previousOverflow;
    };
  }, [finish, onComplete, reduced]);

  return <div className={`neural-intro ${exiting ? 'is-exiting' : ''}`} role="dialog" aria-modal="true" aria-label={language === 'vi' ? 'Video giới thiệu portfolio' : 'Portfolio intro video'} onKeyDown={event => { if (event.key === 'Escape') finish(); }}>
    <video
      ref={videoRef}
      className="neural-intro-video"
      src="/neural-intro.mp4"
      poster="/neural-intro-poster.jpg"
      autoPlay
      playsInline
      preload="auto"
      muted={muted}
      aria-label={language === 'vi' ? 'Mạng neural lắp ráp thành bộ não rồi mở ra portfolio' : 'A neural network assembles into a brain and opens into the portfolio'}
      onTimeUpdate={event => { if (event.currentTarget.currentTime >= 7.02) finish(); }}
      onEnded={finish}
      onError={finish}
    />
    <div className="neural-video-controls">
      <span className="neural-brand">PTD<span>.</span> / INTRO</span>
      <div className="neural-video-actions">
        <button className="neural-audio" type="button" aria-pressed={!muted} onClick={() => setMuted(value => !value)}>{muted ? (language === 'vi' ? 'Bật âm thanh' : 'Enable sound') : (language === 'vi' ? 'Tắt âm thanh' : 'Mute')}</button>
        <button ref={skipRef} className="neural-skip" type="button" onClick={finish}>{language === 'vi' ? 'Bỏ qua' : 'Skip'} <span aria-hidden="true">↗</span></button>
      </div>
    </div>
  </div>;
}
