**模块联邦** ： Webpack 5 提供的一种动态共享代码机制，让多个独立的 Web 应用共享代码。

**达到**： 降低构建时间、减少重复代码的效果。

**核心思路**：是让子应用的代码在运行时动态加载，而不是构建时固定打包。

<br/>


### 🚀 1、为什么需要模块联邦？

在传统的微前端架构中：

📌 多个子应用 可能有 相同的依赖（比如 React、Vue），**会导致 重复打包，浪费带宽**。

📌 不同团队开发的应用 可能需要共享组件，但以前只能通过 npm package 或 CDN 共享，**更新不够灵活**。

📌 代码更新后，老版本的子应用可能无法及时获取新模块，**导致兼容性问题**。

💡 **Webpack 5 的模块联邦可以解决这些问题：**

📌 多个 Web 应用可以共享模块（比如 React、Vue、组件库等）

📌 动态加载远程模块，实现 按需更新，减少构建体积

📌 独立开发、独立部署，但还能共享最新的功能

<br/>


### 🚀  2、如何实现？

1️⃣ 一个远程应用（提供模块的应用）

```javascript
// webpack.config.js
module.exports = {
  name: "remoteApp", // 远程应用名称
  filename: "remoteEntry.js", // 入口文件
  exposes: {
    "./Button": "./src/Button", // 暴露一个 Button 组件
  },
  shared: ["react", "react-dom"], // 共享依赖
};
```
👉 这里 exposes 说明 Button 组件可以被别的项目远程使用。

2️⃣ 使用远程模块的应用（可以 动态加载远程组件）

```javascript
// webpack.config.js
module.exports = {
  name: "hostApp", 
  remotes: {
    remoteApp: "remoteApp@http://localhost:8081/remoteEntry.js",
  },
  shared: ["react", "react-dom"],
};
```
然后，在代码里动态加载 remoteApp 提供的 Button

```javascript
import React, { lazy, Suspense } from "react";

const RemoteButton = lazy(() => import("remoteApp/Button"));

export default function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RemoteButton />
    </Suspense>
  );
}
```
💡 这样，RemoteButton 就是从 远程应用动态加载过来的组件！

<br/>

### 🚀 3、你能用在哪里？
📌  大型企业前端架构（多个团队开发多个应用，但能共享 UI 组件）

📌 渐进式重构（先拆分部分代码为远程模块，逐步迁移）

📌 低代码 / 业务组件库（开发一套远程组件，多个应用共用）

📌 插件化系统（动态加载不同的功能模块，按需加载）

<br/>

### 🎯 4、简要总结核心优势

✅ 减少重复打包
👉 shared: ["react", "react-dom"] 让多个应用共享 React 依赖，避免每个应用重复打包。

✅ 动态加载最新模块
👉 import("remoteApp/Button") 是 运行时加载，不用重新打包整个应用。

✅ 独立部署，独立开发
👉 每个子应用可以单独发布 （比如 remoteApp 和 hostApp 分别由不同团队维护）。

✅ 兼容微前端架构
👉 模块联邦让微前端变得更简单，不需要 iframe，直接共享组件。

<br/>
