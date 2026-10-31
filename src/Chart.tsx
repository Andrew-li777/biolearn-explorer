import {useEffect,useRef} from 'react';
import {init,use} from 'echarts/core';
import {BarChart} from 'echarts/charts';
import {TooltipComponent,GridComponent} from 'echarts/components';
import {CanvasRenderer} from 'echarts/renderers';
use([BarChart,TooltipComponent,GridComponent,CanvasRenderer]);
export default function Chart({labels,values}:{labels:string[];values:number[]}){
 const ref=useRef<HTMLDivElement>(null);
 useEffect(()=>{const chart=init(ref.current!);const update=()=>{const dark=document.documentElement.dataset.theme==='dark';const color=dark?'#abc0bb':'#526a6b';chart.setOption({tooltip:{trigger:'axis'},grid:{left:55,right:20,bottom:50,top:20},xAxis:{type:'category',data:labels,axisLabel:{color,interval:0}},yAxis:{type:'value',axisLabel:{color},splitLine:{lineStyle:{color:dark?'#34484a':'#dce4e4'}}},series:[{type:'bar',data:values,barMaxWidth:55,itemStyle:{color:dark?'#7bd1c5':'#126d70',borderRadius:[4,4,0,0]}}]})};update();const observer=new ResizeObserver(()=>chart.resize());observer.observe(ref.current!);const theme=new MutationObserver(update);theme.observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});return()=>{observer.disconnect();theme.disconnect();chart.dispose()}},[labels.join(),values.join()]);
 return <div ref={ref} style={{height:250}} role="img" aria-label="统计比较图，准确数值见下方表格"/>;
}
