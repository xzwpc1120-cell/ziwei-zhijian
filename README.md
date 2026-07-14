# 紫微知见 Vercel 试用版

## 部署

1. 将本目录导入 Vercel，或在目录内运行 `npx vercel`。
2. 在 Vercel 项目的 Environment Variables 添加 `OPENAI_API_KEY`。
3. 可选添加 `OPENAI_MODEL`，默认使用 `gpt-5.6-luna`。
4. 添加环境变量后重新部署。

API Key 只存在服务端环境变量中，不能放进 `index.html`。

当前命盘为交互验证用示例结构，不能当作正式排盘结果。正式上线前需要接入并测试确定性排盘引擎。
