# 本地交付验收

验证日期：2026-10-31。科学来源固定为 376d0f36ba33fd7e0db3091c247ee259247c04f4；网站测试不是新的科学验收。

## 通过项

- Node 24.21.0、npm 11.19.0；实际依赖锁定于 package-lock.json。
- TypeScript 与 Vite 生产构建通过；日志 artifacts/build-release.log。
- 3 个 Vitest 测试通过：数字排序、大小写检索、四项目/七图及非公开来源状态。
- 来源数据检查通过：四项目行列结构、7 张图和38项公开源内容 SHA-256；artifacts/data-release.log。
- 5 个 Playwright 场景通过，包含八页面访问、组别切换、主题、模态框、下载、390/768/1440 视口与无横向溢出；artifacts/e2e-release.log。
- 已检查中文移动端截图及桌面布局；测试字体放本项目缓存内，网页依赖客户端系统字体。深浅主题截图保存在 artifacts/overview*.png。
- 根路径与 /biolearn-explorer/ 子路径的生产资源、深链接和刷新检查通过；artifacts/subpath-check.json。
- artifacts/standalone 是不含父科研资料的验证副本：npm ci、数据检查、单元测试、生产构建通过。其源码使用公开快照而非读取父目录。

## 性能实测与局限

生产构建首页入口 JS gzip 104.68 KB、CSS gzip 3.64 KB；ECharts 块另为153.39 KB，进入相应专业页才加载。不是全站 JS 总大小低于250KB。

Chromium、390×844、4倍 CPU 减速、150ms 模拟延迟、200000 bytes/s 下载限制下，首页 LCP=1700ms、CLS=0；记录 artifacts/performance.json。单次实验室测量，不代表所有真实设备、线上 INP 或服务端吞吐量；筛选/排序延迟尚未单独形成基准。

浏览器首次未下载完及缺失图形库导致早期失败，日志保留；已在本目录内补齐并重测通过，未修改系统包。生产构建的依赖 use-client 指令忽略警告来自第三方包，本应用为客户端静态构建。

未进行跨浏览器全面测试、完整 WCAG 审计、真实部署或真实服务器负载测试。移动导航有 Escape 与焦点循环，图像弹窗由 Radix 管理焦点。无公开完整点数据的功能依照规格保留不可用说明。

所有工作写在 web/；原分析项目保持只读。部署配置就绪不代表已上线。

## 2026-10-31 后续状态

上文是首次本地交付时的记录，其中“未进行真实部署”是当时状态；旧版网站随后已发布到 GitHub Pages，见 [进度记录](progress.md)。本次科研阅读体验改版仅本地验证，未覆盖已发布版本；本次检查、性能及限制见 [审查与改版记录](review-and-redesign-20261031.md)。
