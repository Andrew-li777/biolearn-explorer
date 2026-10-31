import {useState} from 'react';
export const stageIds=[['input','normalization','samples','results'],['input','clustering','annotation'],['configuration','execution','validation'],['input','normalization','results','sensitivity']];
export function ShareReading(){const [message,setMessage]=useState('');return <div className="reading-share"><button onClick={()=>navigator.clipboard.writeText(location.href).then(()=>setMessage('已复制阅读链接')).catch(()=>setMessage('请复制浏览器地址栏中的完整链接'))}>复制当前阅读链接</button><span role="status">{message}</span></div>}
