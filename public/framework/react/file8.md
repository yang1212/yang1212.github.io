简单、可扩展的状态管理库


## 在 React 项目中使用 

### 1、安装 MobX 相关库
```
yarn add mobx mobx-react mobx-react-lite
```

### 2、普通对象方式的完整示例

**创建store.js**

```javaScript
// store.js
import { observable, action } from 'mobx';

// 创建可观察状态
const counterStore = observable({
  count: 0,
});

// 单独定义动作函数
const increment = action(() => {
  counterStore.count++;
});

const decrement = action(() => {
  counterStore.count--;
});

export { counterStore, increment, decrement };

```

**在组件中引入并使用**

```javaScript
// CounterComponent.js
import React from 'react';
import { observer } from 'mobx-react-lite'; // MobX 的 observer 函数
import { counterStore, increment, decrement } from './store'; // 引入我们的状态和动作函数

const CounterComponent = observer(() => {
  return (
    <div>
      <h1>Count: {counterStore.count}</h1>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
});

export default CounterComponent;

```

### 3、类方式的完整示例

**创建store.js**

```javaScript
// store.js
import { makeAutoObservable } from 'mobx';

class CounterStore {
  count = 0;

  constructor() {
    makeAutoObservable(this);
  }

  increment() {
    this.count++;
  }

  decrement() {
    this.count--;
  }

  get doubleCount() {
    return this.count * 2;
  }
}

const counterStore = new CounterStore();
export default counterStore;

```

**在组件中引入并使用**

```javaScript

import React from 'react';
import { observer } from 'mobx-react-lite';
import counterStore from './store';

const Counter = observer(() => {
  return (
    <div>
      <p>Count: {counterStore.count}</p>
      <p>Double Count: {counterStore.doubleCount}</p>
      <button onClick={() => counterStore.increment()}>Increment</button>
      <button onClick={() => counterStore.decrement()}>Decrement</button>
    </div>
  );
});

export default Counter;

```

### 4、总结

- [ ] 简单易用，学习曲线低。
- [ ] 适合中小型应用
- [ ] 灵活性：[官方有很多灵活的配置](https://cn.mobx.js.org/intro/concepts.html)，以上是简单的使用方法。

<br/>

**以上内容皆服务于：** [今天只学一个知识点：hooks](https://github.com/yang1212/collection-about/issues/59) 