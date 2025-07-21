懒加载（Lazy Loading） 主要用于特定页面、组件或模块，通常是在需要时才加载，以减少首屏加载时间，提高性能。

**懒加载可以应用在：**

📌 路由级懒加载（按页面划分）
📌 组件级懒加载（按组件划分）
📌 模块级懒加载（按函数/逻辑划分）

<br/>

## 🚀 Webpack 懒加载完整案例（路由级、组件级、模块级）

### 1️⃣ 路由级懒加载（按需加载页面）
适用于**单页面应用（SPA）**，如 Vue Router、React Router。

### 📍 代码示例（Vue Router）
```js
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('./pages/Home.vue') // 懒加载 Home 页面
  },
  {
    path: '/about',
    component: () => import('./pages/About.vue') // 懒加载 About 页面
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
```

### 📍 Webpack 配置
```js
// webpack.config.js
module.exports = {
  entry: './src/index.js', // 入口文件
  output: {
    filename: '[name].bundle.js', // 入口文件
    chunkFilename: '[name].[contenthash].chunk.js', // 异步加载模块的输出文件名
    path: __dirname + '/dist', // 输出目录
  },
};

```
---
### 2️⃣ 组件级懒加载（按需加载组件）
适用于**大型组件（如大表单、大图表等）**。

### 📍 代码示例（Vue）
```js
<template>
  <div>
    <button @click="showComponent = true">加载组件</button>
    <Suspense>
      <LazyComponent v-if="showComponent" />
    </Suspense>
  </div>
</template>

<script setup>
import { ref, defineAsyncComponent } from 'vue';

const showComponent = ref(false);

// 只有点击按钮，才会加载这个组件
const LazyComponent = defineAsyncComponent(() => import('./components/BigComponent.vue'));
</script>
```
---
### 3️⃣ 模块级懒加载（按需加载 JS 逻辑）
适用于**业务代码、第三方库**（如 ECharts、Lodash 等）。

### 📍 实际场景 1：点击按钮后才加载 ECharts
```js
<template>
  <div>
    <button @click="loadChart">加载 ECharts 并渲染</button>
    <div ref="chartContainer" style="width: 400px; height: 300px"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chartInstance: null,
    };
  },
  methods: {
    async loadChart() {
      const echarts = await import('echarts'); // 只有点击时才加载 ECharts
      this.chartInstance = echarts.init(this.$refs.chartContainer);
      this.chartInstance.setOption({
        title: { text: 'ECharts 示例' },
        tooltip: {},
        xAxis: { data: ['A', 'B', 'C', 'D'] },
        yAxis: {},
        series: [{ type: 'bar', data: [5, 20, 36, 10] }],
      });
    },
  },
};
</script>
```

### 📍 实际场景 2：按需加载 Lodash
```js
<script>
export default {
  data() {
    return {
      text: '',
      debounceFn: null,
    };
  },
  async mounted() {
    // ✅ 组件挂载时才加载 Lodash
    const _ = await import('lodash'); 
    this.debounceFn = _.debounce(this.sendRequest, 1000);
  },
  methods: {
    handleInput() {
      if (this.debounceFn) {
        this.debounceFn();
      }
    },
    sendRequest() {
      console.log('发送请求:', this.text);
    },
  },
};
</script>
```
---




<br/>

## 🚀 Vite 懒加载完整案例（路由级、组件级、模块级）

**不需要额外配置：**
在开发时，Vite 使用 原生 ES 模块（ESM），
只要你使用了 import()，Vite 会自动进行懒加载和拆分，不需要配置 chunkFilename 或插件来优化拆分。
页面使用的import方式同上。

<br/>