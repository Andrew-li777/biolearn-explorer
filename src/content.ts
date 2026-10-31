/** Interpretive metadata from the public, pinned scientific README, methods and report.
 * Numeric summaries remain in portal.json. Stage text is explanatory, not new analysis. */
export type Stage={title:string;question:string;input:string;method:string;observation:string;limit:string;source:string;figures:number[]};
export type Track={short:string;type:string;goal:string;input:string;design:string;direction:string;limit:string;stages:Stage[]};
export const tracks:Track[]=[
 {short:'Bulk RNA-seq',type:'差异表达',goal:'药物处理是否与气道细胞的基因表达变化相关？',input:'airway 现成计数矩阵',design:'8 个样本，4 个 cell 分别有处理与对照',direction:'trt 对 untrt；设计 ~ cell + dex',limit:'从已有计数矩阵开始；未验证 airway 原始 FASTQ 的质控与比对。',stages:[
 {title:'样本与设计',question:'样本与处理如何对应？',input:'airway 计数矩阵与样本信息',method:'~ cell + dex，控制配对细胞系；trt 对 untrt',observation:'4 个细胞系各有处理与对照；分析包含配对因素。',limit:'样本数不是独立配对个体数；此入口不包含原始测序数据。',source:'projects/01-airway-bulk/README.md',figures:[]},
 {title:'过滤与归一化',question:'哪些基因进入差异检验？',input:'已有基因计数',method:'DESeq2 / PyDESeq2 使用计数预过滤；edgeR 使用 filterByExpr 与 TMM',observation:'方法的预过滤基因数不同，见下方摘要表。',limit:'过滤与统计方法不同，显著结果数量不能单独衡量方法优劣。',source:'projects/01-airway-bulk/docs/bulk-methods.md',figures:[]},
 {title:'样本关系',question:'样本整体表达如何分布？',input:'预过滤基因的 VST 表达',method:'PCA 使用高变基因；颜色标识 dex',observation:'查看样本在主要变异方向上的相对位置，结合配对设计阅读。',limit:'PCA 是探索性结果；不能单独证明差异基因或因果关系。',source:'projects/01-airway-bulk/docs/bulk-methods.md',figures:[0]},
 {title:'差异与比较',question:'三种方法如何描述差异表达？',input:'过滤后的表达计数和设计矩阵',method:'DESeq2、edgeR、PyDESeq2；FDR < 0.1，不叠加效应阈值',observation:'三种方法的显著数量不同；表格给出同一输入下各自结果。',limit:'三种方法不是独立实验验证；火山图仅对应 DESeq2。',source:'projects/01-airway-bulk/docs/bulk-methods.md',figures:[1]}]},
 {short:'Single-cell RNA-seq',type:'单细胞分析',goal:'两条单细胞路线如何划分并解释 PBMC3k 细胞？',input:'PBMC3k 已过滤 UMI 矩阵',design:'同一输入；Seurat 与 Scanpy',direction:'质量过滤 → 聚类 → marker 支持的推定注释',limit:'不包含空液滴；细胞类型是推定标签，细胞不是独立受试者重复。',stages:[
 {title:'输入与 QC',question:'过滤前后保留了哪些细胞？',input:'10x 已过滤 UMI 矩阵',method:'依据基因数及线粒体比例进行 QC',observation:'两条路线的输入细胞及 QC 后保留数见结果表。',limit:'输入已经过滤，不能据此审查空液滴；未独立验证全部细胞。',source:'projects/02-pbmc3k-single-cell/docs/pbmc3k-methods.md',figures:[]},
 {title:'特征与聚类',question:'两条分析路线如何划分细胞？',input:'QC 后细胞与高变基因',method:'分别进行降维、邻居图与聚类',observation:'两条路线的簇数见表；不同设置会改变分群。',limit:'相同簇数不代表细胞分配相同；簇数不是验收目标。',source:'projects/02-pbmc3k-single-cell/docs/pbmc3k-methods.md',figures:[]},
 {title:'注释与比较',question:'聚类是否由 marker 支持？',input:'聚类与 marker 表达',method:'结合 marker 推定细胞类型；用 ARI/NMI 比较分群',observation:'UMAP 的颜色显示推定标签；ARI/NMI 见项目说明。',limit:'不同 UMAP 坐标不可逐点比较；标签不是独立实验真值。',source:'projects/02-pbmc3k-single-cell/docs/pbmc3k-methods.md',figures:[0,1]}]},
 {short:'RNA-seq Workflow',type:'流程验证',goal:'固定版本的官方小型测试能否完成并通过独立验收？',input:'nf-core/rnaseq 官方 test 数据',design:'Nextflow，test,docker；固定版本',direction:'独立流程测试，非 airway 原始数据复现',limit:'任务完成和文件回读不等于科学结论或 airway FASTQ 复现。',stages:[
 {title:'输入与配置',question:'运行的是什么测试？',input:'nf-core/rnaseq 官方小型测试',method:'nf-core/rnaseq 3.27.0；test,docker',observation:'使用固定流程提交和隔离容器；本次网页展示历史记录。',limit:'不能将官方测试输入当作 airway 原始 reads。',source:'projects/03-nfcore-rnaseq-test/docs/nfcore-test.md',figures:[]},
 {title:'任务与输出',question:'工作流是否完成？',input:'历史运行状态及 trace 汇总',method:'Nextflow 执行；产物独立读取',observation:'任务数与退出码见运行摘要表。',limit:'结构示意不是实际任务 DAG，也不是实时状态。',source:'projects/03-nfcore-rnaseq-test/README.md',figures:[]},
 {title:'独立验收',question:'哪些交付产物经过检查？',input:'历史验收汇总',method:'逐项核验输出与状态',observation:'独立验收结果见表；详细完整报告是本地运行产物。',limit:'通过不证明原始测试数据具有某种生物学意义。',source:'projects/03-nfcore-rnaseq-test/docs/nfcore-test.md',figures:[]}]},
 {short:'Proteomics',type:'蛋白互作富集',goal:'不同处理组相对 Ctrl 的蛋白组富集是否改变？',input:'UbiLength 蛋白组 LFQ 强度矩阵',design:'4 组各 3 次重复，处理组各自比较 Ctrl',direction:'Ubi1 / Ubi4 / Ubi6 − Ctrl；正效应表示处理组富集',limit:'蛋白互作富集不等于全细胞蛋白表达变化，也不能单独证明机制。',stages:[
 {title:'输入与过滤',question:'哪些蛋白组进入模型？',input:'MaxQuant 蛋白组 LFQ，零值视为缺失',method:'剔除反向库、污染物、仅位点鉴定；至少一组完整',observation:'公开摘要显示每个比较的检验蛋白组数。',limit:'蛋白组 ID 可包含多个蛋白；基因名不等于唯一蛋白。',source:'projects/04-proteomics-matrix/docs/methods.md',figures:[]},
 {title:'归一化与缺失',question:'缺失值怎样影响样本比较？',input:'过滤后的线性 LFQ',method:'VSN；主路线 MinProb q=0.01，seed=42',observation:'PCA 在 VSN 与 MinProb 插补后计算；图中各组重复样本各自相邻。',limit:'低信号缺失是假设；缺失不能直接视为真实零丰度。',source:'projects/04-proteomics-matrix/docs/methods.md',figures:[0]},
 {title:'差异富集',question:'各处理组相对 Ctrl 有什么变化？',input:'VSN 与 MinProb 后的矩阵',method:'逐比较 limma；BH FDR < 0.05，另标记 |log2FC| ≥ 1',observation:'表中分别列出 FDR 显著数与叠加效应阈值数量。',limit:'效应阈值是筛选，不是区间零假设检验；图仅公开 Ubi4。',source:'projects/04-proteomics-matrix/docs/methods.md',figures:[1,2]},
 {title:'敏感性分析',question:'不插补后结论是否稳定？',input:'相同过滤和 VSN，不插补',method:'每比较两组各至少两个观测；在共同可检验集合比较',observation:'Ubi1 的显著集合重合度较低；具体数值与分母见公开报告。',limit:'可检验集合及经验贝叶斯估计不同，不能把全部差异归因于插补。',source:'结果分析/项目结果分析报告.md',figures:[]}]}
];
export const reportPath='结果分析/项目结果分析报告.md';
export const caseStudies=[
 {name:'RPS27A',comparison:'Ubi4 vs Ctrl',id:'P62979',kind:'相对稳健',samples:'两组各 3 个真实观测；这六个值其 VSN 值与插补后值相同，未被直接填补。',interpret:'两条路线方向与显著判定一致，支持本实验中的差异富集描述。',counter:'整体 VSN 和经验贝叶斯建模仍会影响结果；未做留一法或独立验证。不能据此称为关键调控因子。'},
 {name:'PIK3C2B',comparison:'Ubi1 vs Ctrl',id:'F5GWN5;O00750;Q5SW97;Q5SW98',kind:'显著性敏感',samples:'两组各 3 个真实观测；该对象的六个 VSN 值与插补后值相同。',interpret:'主路线提示差异富集，但不插补路线的 BH 未达到 0.05。',counter:'两路线效应相同，不可简单归因于该对象自身被插补；可检验集合、经验贝叶斯估计和校正集合不同。不能据此声称通路激活。'}
];

export const stageScripts=[
 ['projects/01-airway-bulk/scripts/01_bulk_deseq2.R','projects/01-airway-bulk/scripts/02_bulk_edger.R','projects/01-airway-bulk/scripts/01_bulk_deseq2.R','projects/01-airway-bulk/scripts/04_bulk_report.py'],
 ['projects/02-pbmc3k-single-cell/scripts/10_pbmc_prepare.py','projects/02-pbmc3k-single-cell/scripts/12_pbmc_scanpy.py','projects/02-pbmc3k-single-cell/scripts/13_pbmc_annotate.py'],
 ['projects/03-nfcore-rnaseq-test/scripts/run_nfcore_test.sh','projects/03-nfcore-rnaseq-test/scripts/nfcore_status.py','projects/03-nfcore-rnaseq-test/scripts/verify_nfcore.py'],
 ['projects/04-proteomics-matrix/scripts/common.R','projects/04-proteomics-matrix/scripts/analyze.R','projects/04-proteomics-matrix/scripts/analyze.R','projects/04-proteomics-matrix/scripts/validate.R']
];
