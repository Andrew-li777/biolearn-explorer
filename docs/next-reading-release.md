# 科研阅读路径深化：本地交付

## 基线与处理

基线为 a9fa917（网站应用 c806eb3 已发布）。历史评估中的大型 Hero、假阶段交互、通用 nf-core 选择器、仅反转标签的证据链均已在上一轮解决，本轮保留，不重复重建。

本轮新增：Hash URL 阶段/方法/比较组/案例/方向恢复，阅读链接复制，证据与蛋白组对应比较双向跳转；构建提交、时间、本地修改标记及逐项目验证日期；方法并列表、敏感性分母与 Jaccard、公开流程运行入口、图注上下文及待验证建议。历史审查补充实际发布记录。

来源保持固定公开提交 376d0f3，不重跑科学分析。四项目保持独立。数字引用公开摘要、方法文档与结果分析报告；Jaccard 由报告中的交集/并集展示计算。

## 阅读 URL 接口

- `#/bulk?stage=results&method=edger`
- `#/single-cell?stage=annotation&method=all`
- `#/workflow?stage=validation`
- `#/proteomics?stage=sensitivity&comparison=Ubi1_vs_Ctrl`
- `#/evidence?case=PIK3C2B&mode=forward`

阶段 ID 见 src/reading.tsx；默认输入阶段、全部方法/比较、RPS27A 倒序。未知参数安全回退。检索文本与摘要表排序是临时视图，不纳入分享 URL。版本信息由 Vite 构建时注入；未提交修改明确标为本地修改，提交链接只是基线而非完整本地源码。

## 验证与局限

本轮类型检查、4 项单元测试、公开来源哈希及案例校验通过。8 个浏览器测试涵盖八路由、刷新/历史、未知参数、缺图、真实案例、下载、主题及三个宽度。首轮限速测试发现阶段与组别连续更新丢参，已修复为合并浏览器当前 URL，复测 8/8 通过。最终日志见 artifacts/next-e2e-final.log。

根路径与 Pages 子路径分别构建；子路径深链接、刷新及资源检查见 artifacts/next-subpath.json。截图由浏览器测试生成；实际查看蛋白组桌面及移动深色首页截图，核对阶段、摘要、原图、图注与来源布局。截图和自动检查不代表完整 WCAG 审计或全面跨浏览器验收。

性能使用 scripts/measure-reading.mjs，在同一环境分别测量基线与新版各三次，冷缓存、390×844、4 倍 CPU 降速、150ms 延迟、200000 B/s。原始结果见 artifacts/next-performance.json。这是本地受控测量，不是公网真实用户指标。另保留未压缩服务器对照 artifacts/next-performance-uncompressed.json：基线中位 LCP 3064ms，新版 3056ms，均未达到 2.5s 目标；应在静态服务器启用 gzip/Brotli，而非删减科研内容。

未加入动态火山图、完整基因搜索、逐细胞点选、未公开比较图或在线计算，原因是公开底层数据不足。没有执行远端推送、部署或科研复算。

## 预览与部署包

`npm run dev` 启动本地开发预览；`npm run build && npm run preview` 预览根路径生产包。

artifacts/biolearn-next-static.zip 的内容可直接用作 Cloudflare Pages 或静态服务器发布目录；artifacts/biolearn-next-pages.zip 的内容用于 /biolearn-explorer/ 子路径。归档只含构建和公开数据；源码及测试保留在本目录。实际发布仍需用户授权。

### 本轮压缩部署测量

gzip 开启时，基线 LCP 三次为 [1848, 1600, 1676]ms，中位 1676ms；新版三次为 [1632, 1708, 1768]ms，中位 1708ms，CLS 均为 0。入口 JS gzip 从 111467 增至 114858 bytes（增加 3.04%），符合本轮预算；不能将微小差异解释为显著性能变化。

## 后续发布状态

用户随后授权更新：应用提交 `df91ec9` 已通过 [GitHub Pages 工作流](https://github.com/Andrew-li777/biolearn-explorer/actions/runs/41230086418) 上线。公网八路由、版本、案例链接与刷新检查通过。前文未发布描述为本地交付时的历史状态。
