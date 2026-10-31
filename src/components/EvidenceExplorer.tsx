import {useState} from 'react';
import {Search} from 'lucide-react';
import type {Portal} from '../data';
import {search} from '../data';
import {caseStudies,tracks} from '../content';
import {EvidenceCases,SourceLink} from './Research';

export function EvidenceExplorer({data}:{data:Portal}){
 const [project,setProject]=useState('all');
 const [status,setStatus]=useState('public');
 const [query,setQuery]=useState('');
 const matches=(value:string)=>search(value,query.trim());
 const matchedProjects=data.entries.map((p,i)=>({p,i,track:tracks[i]})).filter(({p,track})=>(project==='all'||p.project===project)&&matches(p.title+' '+p.note+' '+track.stages.map(s=>Object.values(s).join(' ')).join(' ')));
 const local=data.artifacts.filter(a=>a.availability==='not_public'&&(project==='all'||a.path.includes(project))&&matches(a.path));
 const showCases=(project==='all'||project===data.entries[3].project)&&(!query.trim()||caseStudies.some(c=>matches(Object.values(c).join(' '))));
 return <>
  <div className="page-kicker">EVIDENCE / 结果追溯</div><h1>从判断到证据</h1>
  <p className="page-intro">按项目查看公开证据，或选择实际案例连接统计结果、样本观测、方法与限制。搜索仅覆盖公开摘要、阶段说明和两例摘录。</p>
  <div className="table-tools evidence-filters"><label className="search"><Search size={15}/><input aria-label="检索证据" placeholder="检索项目、阶段或案例" value={query} onChange={e=>setQuery(e.target.value)}/></label><select aria-label="证据项目" value={project} onChange={e=>setProject(e.target.value)}><option value="all">全部项目</option>{data.entries.map(p=><option key={p.project} value={p.project}>{p.title}</option>)}</select><select aria-label="证据状态" value={status} onChange={e=>setStatus(e.target.value)}><option value="public">公开摘要与案例</option><option value="local">未公开运行产物</option></select></div>
  {status==='local'?<section className="section-card"><h2>未公开运行产物</h2><p>以下是历史路径，不提供公开下载或伪造链接。</p>{local.map(a=><p key={a.path}><code>{a.path}</code></p>)}{!local.length&&<p>没有匹配的历史路径。</p>}</section>:<>
   {showCases&&<section aria-label="案例证据链"><EvidenceCases commit={data.commit} query={query}/></section>}
   {matchedProjects.length>0&&<section className="section-card"><span className="overline">PROJECT EVIDENCE / 按项目追溯</span><h2>项目阶段与公开依据</h2><p>展开阶段查看输入、方法、观察及限制；点击公开来源进一步核对。运行产物并非全部公开。</p>{matchedProjects.map(({p,track})=><article className="evidence-project" key={p.project}><h3>{p.title}</h3><p>{p.note}</p>{track.stages.map(stage=><details key={stage.title}><summary>{stage.title} · {stage.question}</summary><div className="evidence-detail"><p><strong>输入：</strong>{stage.input}</p><p><strong>方法：</strong>{stage.method}</p><p><strong>观察：</strong>{stage.observation}</p><p><strong>限制：</strong>{stage.limit}</p><SourceLink commit={data.commit} path={stage.source}/></div></details>)}</article>)}</section>}
   {!showCases&&!matchedProjects.length&&<div className="section-card"><p>没有匹配的公开摘要、阶段说明或案例。完整基因与细胞结果未纳入搜索。</p></div>}
  </>}
 </>
}
