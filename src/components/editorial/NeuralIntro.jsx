import { useCallback, useEffect, useRef, useState } from 'react';

export function NeuralIntro({ language, onReveal, onComplete }) {
  const [muted, setMuted] = useState(true);
  const [exiting, setExiting] = useState(false);
  const videoRef = useRef(null);
  const skipRef = useRef(null);
  const finishTimer = useRef(null);
  const mounted = useRef(false);
  const finishing = useRef(false);
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const finish = useCallback(() => {
    if (!mounted.current || finishing.current) return;
    finishing.current = true;
    videoRef.current?.pause();
    onReveal();
    setExiting(true);
    finishTimer.current = window.setTimeout(onComplete, 420);
  }, [onComplete,onReveal]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    mounted.current = true;
    finishing.current = false;
    document.body.style.overflow = 'hidden';
    skipRef.current?.focus({ preventScroll: true });
    if (reduced) {
      onReveal();
      onComplete();
      return () => { mounted.current=false;document.body.style.overflow = previousOverflow; };
    }

    const video = videoRef.current;
    let disposed=false,loadTimer,stallTimer,started=false;
    const clearGuards=()=>{clearTimeout(loadTimer);clearTimeout(stallTimer);};
    const playing=()=>{started=true;clearGuards();};
    const waiting=()=>{if(started&&!document.hidden){clearTimeout(stallTimer);stallTimer=setTimeout(finish,2500);}};
    const play=()=>{if(finishing.current||document.hidden)return;loadTimer=setTimeout(finish,4500);video.play()?.catch(()=>{if(!disposed)finish();});};
    const visibility=()=>{clearGuards();if(document.hidden)video.pause();else play();};
    video.addEventListener('playing',playing);video.addEventListener('waiting',waiting);document.addEventListener('visibilitychange',visibility);play();
    return () => {
      disposed=true;mounted.current=false;clearGuards();video.pause();
      video.removeEventListener('playing',playing);video.removeEventListener('waiting',waiting);document.removeEventListener('visibilitychange',visibility);
      if (finishTimer.current !== null) window.clearTimeout(finishTimer.current);
      finishTimer.current=null;
      document.body.style.overflow = previousOverflow;
    };
  }, [finish, onReveal, onComplete, reduced]);

  return <div className={`neural-intro ${exiting ? 'is-exiting' : ''}`} role="dialog" aria-modal="true" aria-label={language === 'vi' ? 'Video giới thiệu portfolio' : 'Portfolio intro video'} onKeyDown={event => {
    if(event.key==='Escape'){event.stopPropagation();finish();}
    if(event.key==='Tab'){const buttons=[...event.currentTarget.querySelectorAll('button')];const first=buttons[0],last=buttons[buttons.length-1];if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}}
  }}>
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
