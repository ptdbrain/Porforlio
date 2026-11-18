import {useRef} from 'react';
import {localize as l} from '../../content/copy';
import {capabilities} from '../../content/workV4.mjs';
import {Arrow} from './Shared';

export function Capabilities({activeId,language,copy,onChange,onRelated}) {
  const tabs=useRef([]);
  const active=capabilities.find(cap=>cap.id===activeId)||capabilities[0];
  function keyboard(event,index){
    const keys=['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Home','End'];
    if(!keys.includes(event.key))return;
    event.preventDefault();
    const next=event.key==='Home'?0:event.key==='End'?capabilities.length-1:(index+(['ArrowDown','ArrowRight'].includes(event.key)?1:-1)+capabilities.length)%capabilities.length;
    onChange(capabilities[next].id);tabs.current[next]?.focus();
  }
  const vi=language==='vi';
  return <section className="v4-section v4-capabilities capability-workspace" id="capabilities" aria-labelledby="v4-cap-title">
    <span id="skills" className="v4-anchor"/><span id="manifesto" className="v4-anchor"/>
    <div className="page-width">
      <div className="v4-section-heading" data-work-reveal><span className="v4-label">{copy.capLabel}</span><h2 id="v4-cap-title">{copy.capTitle}</h2><p className="v4-lead">{vi?'Bạn cần giải quyết điều gì? Chọn một hướng để xem cách tôi tiếp cận và phần việc có thể đảm nhận.':'What do you need to solve? Choose an area to explore my approach and the work I can take on.'}</p></div>
      <div className="capability-layout" data-work-reveal>
        <div className="capability-selector"><span className="capability-selector-label">{vi?'CHỌN HƯỚNG TIẾP CẬN':'CHOOSE AN AREA'}</span><div className="v4-tabs" role="tablist" aria-label={copy.capTabs} aria-orientation="vertical">
          {capabilities.map((cap,index)=><button key={cap.id} ref={node=>tabs.current[index]=node} className="v4-tab" role="tab" id={`v4-tab-${cap.id}`} aria-selected={cap.id===active.id} aria-controls="v4-cap-panel" tabIndex={cap.id===active.id?0:-1} onClick={()=>onChange(cap.id)} onKeyDown={event=>keyboard(event,index)}><span aria-hidden="true">0{index+1}</span><strong>{l(cap.title,language)}</strong><Arrow/></button>)}
        </div><p className="capability-selector-note">{vi?'Từ dữ liệu đầu vào đến đầu ra có thể kiểm tra.':'From input data to outputs you can inspect.'}</p></div>
        <div className="v4-cap-panel" id="v4-cap-panel" role="tabpanel" tabIndex="0" aria-labelledby={`v4-tab-${active.id}`}>
          {capabilities.map((cap,index)=><div key={cap.id} className={`v4-cap-layer ${active.id===cap.id?'is-active':''}`} aria-hidden={active.id!==cap.id} inert={active.id!==cap.id?'':undefined}>
            <div className="capability-brief"><span className="v4-label">0{index+1} / {vi?'BÀI TOÁN':'THE PROBLEM'}</span><h3>{l(cap.heading,language)}</h3><p>{l(cap.work,language)}</p></div>
            <ol className="v4-cap-flow" aria-label={vi?'Cách tiếp cận':'Approach'}>{l(cap.flow,language).map((step,i)=><li key={step}><span aria-hidden="true">0{i+1}</span><strong>{step}</strong></li>)}</ol>
            <div className="capability-delivery"><div><span className="v4-label">{vi?'BẠN NHẬN ĐƯỢC':'WHAT YOU GET'}</span><p>{l(cap.output,language)}</p></div><div><span className="v4-label">{copy.tools}</span><ul className="v4-tool-list">{cap.tools.map(tool=><li key={tool}>{tool}</li>)}</ul></div></div>
            <div className="v4-cap-footer"><span>{vi?'Xem cách tiếp cận này trong dự án thực tế.':'See this approach in an actual project.'}</span><button className="button button-outline" onClick={()=>onRelated(cap.id)}>{copy.related}<Arrow/></button></div>
          </div>)}
        </div>
      </div>
    </div>
  </section>;
}
