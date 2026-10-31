import fs from 'node:fs';
const report=fs.readFileSync('public/data/sources/结果分析/项目结果分析报告.md','utf8');
const samples={},metrics={};
for(const name of ['RPS27A','PIK3C2B']){
 const part=report.split('案例：'+name)[1]?.split('来源：')[0];
 if(!part)throw Error('公开报告中缺少案例 '+name);
 const lines=part.split('\n').filter(x=>x.startsWith('| ')).map(x=>x.slice(1,-1).split('|').map(v=>v.trim()));
 const result=lines.find(row=>row[0]===name);
 if(!result||result.length!==7)throw Error('案例结果表格式异常 '+name);
 metrics[name]=Object.fromEntries(['gene','mainEffect','mainFdr','sensitivityEffect','sensitivityFdr','nTreatment','nControl'].map((key,i)=>[key,result[i]]));
 samples[name]=lines.filter(row=>row.length===4&&/^(Ctrl|Ubi[146])_\d+$/.test(row[0])).map(row=>Object.fromEntries(['sample','raw','vsn','imputed'].map((key,i)=>[key,row[i]])));
 if(samples[name].length!==6)throw Error('案例样本数异常 '+name);
}
for(const [filename,value] of [['src/sample-values.json',samples],['src/case-metrics.json',metrics]]){
 if(process.argv.includes('--check')){
  if(JSON.stringify(JSON.parse(fs.readFileSync(filename,'utf8')))!==JSON.stringify(value))throw Error('案例摘录与公开报告不一致: '+filename);
 }else fs.writeFileSync(filename,JSON.stringify(value,null,2)+'\n');
}
console.log('PASS: 公开报告的案例统计与逐样本摘录');
