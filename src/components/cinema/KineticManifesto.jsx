import { localize as l } from '../../content/copy';
export function KineticManifesto({cinema,language,c}){
 return <section className="kinetic-manifesto cinema-cream" id="manifesto" data-cinema-scene="manifesto"><div className="page-width"><span className="eyebrow">{c.manifesto}</span><div className="manifesto-lines">{cinema.manifesto.map((item,index)=><article className={`manifesto-line manifesto-${index+1}`} key={item.word}><span className="manifesto-index">0{index+1}</span><h2>{item.word}<span>.</span></h2><p>{l(item.text,language)}</p></article>)}</div><p className="manifesto-coda">Research / Build / Evaluate / Iterate</p></div></section>;
}
