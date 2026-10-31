# 技术架构与部署

## 技术选型

React + Vite + TypeScript；Tailwind CSS；按需引入 shadcn/ui；React Router Hash 路由；Lucide 图标；ECharts 按需引入柱状/条形等摘要图组件。第一版只读静态网站，无账户、数据库、Node 常驻服务、服务端科研计算或定时轮询。

本机已有 Node 24.21.0、npm 11.19.0，但本轮未安装依赖。实施时验证所选版本兼容性，锁定实际依赖到 package-lock.json，并记录 .node-version；不写“最新”作为复现规格。

后续结构：src/app 管理布局/路由；src/pages 八个页面；src/components 通用交互；src/data 包含 schema、适配器和类型化仓库接口；content 保存规范化文案与结论；public/data、public/figures 保存公开快照；scripts 提供显式同步与校验；tests、docs、deploy、.github 均位于前端根内。

数据流：固定提交的公开来源 → 白名单导入与哈希检查 → 类型化统计/文案/证据 → 数据访问接口 → UI。组件不访问父目录或实时 GitHub。保留数据适配器接口以便将来接入 API，但本版不开发 FastAPI。Markdown 渲染禁用原始 HTML，不执行来源中的脚本。

## 三种部署

| 目标 | 构建与运行 | 路由及资源 |
|---|---|---|
| GitHub Pages | 独立仓库 .github/workflows 内执行 npm ci、校验、构建并部署 dist | HashRouter；Vite base 为 /仓库名/，用户站或独立域名为 / |
| Cloudflare Pages | 优先 Git 集成：构建 npm run build，输出 dist；另提供预构建上传方案 | base 为 /；无需 Pages Functions |
| Nginx/Caddy | 在构建机生成 dist，服务器仅提供静态文件 | 根或配置的子路径均须验证；无需 Node/R/Python 常驻 |

建议通过 WEB_BASE 环境变量控制 Vite base，所有 fetch、图片、下载和内部资源链接均通过统一 base 处理。Hash 深链接刷新无需服务器重写。页面过滤状态可编码在 hash 路由查询参数中，保证分享后状态可恢复。

为服务器准备 gzip/Brotli、内容哈希资源长缓存、HTML 短缓存配置；Cloudflare 可提供 _headers。GitHub Pages 无自定义服务端缓存配置时使用平台行为，不宣称相同缓存头已生效。vite preview 仅本地预览。

Cloudflare 的 Git 集成和 Direct Upload 是项目创建时的重要模式选择；不把它们描述为同一项目随时自由切换。部署说明应按官方当前支持方式验证。凭据放平台 secrets，不写源码。本轮不创建项目、远端或自定义域名，不启用 Sites 托管。

## 性能策略与预算

分路由加载页面，图表模块单独加载；图片声明尺寸、下方内容延迟加载，预览可用保留溯源的衍生缩略图，原图保持可下载。搜索只针对小型公开快照，不轮询、不加载本地大矩阵。

初始 JS gzip 目标≤250KB（包括首屏实际请求，不能仅以拆包规避）；重图表延迟加载。LCP≤2.5 秒、CLS≤0.1 为受控移动端测试目标，记录浏览器、CPU/网络模拟、缓存状态和设备。交互响应以受控测试中的筛选/排序≤200ms 为目标；不把实验室结果冒充线上 INP。若未达标先优化资源/渲染，不以删掉已承诺功能作为默认解法。

## 官方依据

- [Vite 静态部署](https://vite.dev/guide/static-deploy.html)：dist、base 与 preview 使用边界。
- [Cloudflare React](https://developers.cloudflare.com/pages/framework-guides/deploy-a-react-site/)：React 静态构建部署。
- [Cloudflare Direct Upload](https://developers.cloudflare.com/pages/get-started/direct-upload/)：预构建上传及项目模式约束。
- [GitHub Pages 限制](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)：部署体积和配额等应在实际发布前核验。

文档核查日期 2026-10-31；上述为部署方案，不是线上部署完成记录。
