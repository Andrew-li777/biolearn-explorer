# 静态发布说明

以下命令均在独立前端根目录执行。先 `npm ci`、`npm run data:check`、`npm test`、`npm run build`。不会执行生信分析。

- GitHub Pages：把本目录作为独立仓库根；配置 Pages 来源为 GitHub Actions，再手动运行 `.github/workflows/pages.yml`。项目站路径取仓库名；自定义域名或用户站应将 WEB_BASE 改为 `/`。本项目独立仓库为 https://github.com/Andrew-li777/biolearn-explorer 。
- Cloudflare Pages：连接独立仓库，构建命令 `npm run build`，输出 `dist`，WEB_BASE=`/`。或者使用预构建包直接上传；Git 集成与 Direct Upload 的项目模式约束以平台为准，不自动混用。不需要 Functions。
- Nginx/Caddy：解压 `dist` 到配置的静态根目录，参考本目录配置；Node、R、Python 不需常驻。HTTPS、实际域名和服务器权限由部署环境配置。

本地根路径：`npm run preview -- --port 4173`。
子路径验证：`WEB_BASE=/biolearn-explorer/ npm run build`，在匹配路径的静态服务上检查。页面使用 Hash 路由。

`vite preview` 不是生产服务。上传包不含依赖、缓存、测试浏览器或本地原始结果。页面源码链接会访问 GitHub；站点内容本身来自静态包。
