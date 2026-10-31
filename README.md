# BioLearn · Bioinformatics Analysis Explorer

已实现可独立构建的静态只读门户：八个页面、深浅主题、响应式导航、摘要图表、方法/组别筛选、表格排序检索下载、原图放大与下载、公开来源浏览和正逆向证据阅读。科学结果来自固定公开提交；未重新运行生信分析。

## 本地启动

在本目录运行（Node 版本见 `.node-version`）：

```bash
npm ci
npm run data:check
npm run dev
```

打开终端显示的本地地址（通常 http://localhost:5173）。生产预览：

```bash
npm run build
npm run preview -- --port 4173
```

访问 http://localhost:4173 。不要直接双击 dist/index.html：数据 fetch 与模块加载需要 HTTP 服务。`vite preview` 不作为生产服务器。

## 验证

```bash
npm run typecheck
npm test
npm run data:check
```

浏览器测试：首次设置 `PLAYWRIGHT_BROWSERS_PATH=$PWD/.cache/ms-playwright npx playwright install chromium`。在当前本机，已将缺失 Linux 图形库和测试中文字体解压至 `.cache/browser-libs`，无需系统安装，运行 `bash scripts/browser-test.sh`。其他机器应提供可用的 Chromium 运行库及字体；不保证直接复制本机缓存跨系统兼容。

## 产物与文档

- `dist/`：根路径生产静态包。
- `artifacts/biolearn-static.zip`：根路径部署压缩包。
- `artifacts/biolearn-pages.zip`：`/biolearn-explorer/` 子路径包；实际仓库名称不同时重新构建。
- `artifacts/biolearn-source.zip`：独立源码包，不含依赖、浏览器及本地科研结果。
- [部署说明](deploy/README.md)：GitHub Pages、Cloudflare Pages、Nginx/Caddy。
- [验收记录](docs/validation.md)、[进度](docs/progress.md)、[完整规格](BioLearn-Web完整开发提示词.md)。

## 数据更新和边界

普通构建仅使用 public 中的自包含快照。显式 `npm run data:sync` 才只读访问父分析仓库固定提交；迁出后若需更新，须先配置同步脚本中的来源仓库路径并审阅版本及哈希变化。来源清单为 [data-source-map.json](data-source-map.json)。

下载仅包括公开摘要、报告、方法和原图。未公开完整差异表、逐细胞坐标与表达矩阵，所以没有全基因库搜索、动态散点图、细胞点选或 marker 表达浏览。Evidence Explorer 提供来源、结论及公开报告下载；不是交互式 AI 推理服务。

UI 采用 React/Tailwind、Lucide 与 Radix 可访问 Dialog 原语，遵循 shadcn 的组件组合方式，没有引入整套模板。摘要图表按需加载 ECharts。独立前端仓库为 https://github.com/Andrew-li777/biolearn-explorer ，通过 GitHub Pages 部署；未绑定自定义域名。`.github/workflows/pages.yml` 需将本目录作为独立仓库根后才适用。
