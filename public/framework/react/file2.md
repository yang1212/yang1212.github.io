跟着逻辑走，遇到困难就拆👊

<br/>

## 1、首先拆解hooks出现的背景？

1）hooks是什么？

钩子 ->  react16.8引入的新特性  ->  函数组件好帮手

2）在此之前函数组件主要用于？

展示静态内容或简单的用户界面。

3）为何之前只能干简单的事？

缺少状态管理 和生命周期。

4）那复杂的实现谁做？

类组件做。

5）为何又不让类组件做了？

复杂的类组件导致：代码结构混乱 -> 组件复用性降低。

<br/>


通过以上几个问题简单梳理后

我已经出现很多虚虚实实以前从未注意到的概念

就像：react16.8之前函数组件是用来展示静态内容或简单的用户界面


<br/>

### 1.1、 静态内容是怎么理解静态这两个字？

静态的内容 --> 固定的内容  --> 也就是没有交互性的内容

<br/>

### 1.2、简单的用户界面怎么定义这个简单?

简单的用户界面 --> 简单的交互性

**也就是：**

* 不需要复杂的状态管理、生命周期处理或异步操作，可以使用函数组件来实现

反之简单就是：**不需要复杂的状态管理、生命周期处理或异步操作的函数组件就是简单的用户界面。**

附案例理解场景：如下计数器应用，用户可点击按钮增加或减少计数。
```javascript
import React, { useState } from 'react';

const SimpleCounter = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      {/* 点击按钮调用 setCount 更新 count 状态 */}
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  );
};

export default SimpleCounter;

```

<br/>

以上已熟悉了React在16.8之前函数组件主要用于：展示静态内容或简单的用户界面。

原因是因为：缺少状态管理和生命周期

<br/>

### 1.3、那什么叫状态管理?

状态管理? 

就是管理状态 --> 也就是管理应用程序中状态的变化 --> 像页面登录状态，页面展示状态

如何管理?

React 中的 Context API、Redux、[MobX](https://github.com/yang1212/collection-about/issues/64)都可

<br/>

### 1.4、什么叫生命周期?

公共概念里: 程序、软件或系统在运行过程中经历的不同阶段或状态。

前端开发中: 指的是组件的生命周期，即创建、挂载、更新和销毁过程中所经历的不同阶段。


对生命周期的概念理解后，又生出问题，就像：
```
a: 类组件生命周期有哪些？

b: 类组件、函数组件生命周期具体如何使用？
```

想进一步挖掘？ **[🔥 单独篇幅解惑](https://github.com/yang1212/collection-about/issues/58)**

<br/>

以上已熟悉React在16.8之前函数组件因为缺少状态管理和生命周期

所以复杂的需求实现都是基于类组件

可类组件会导致代码结构混乱和组件复用性的降低

<br/>

### 1.5、那为什么类组件会导致代码的结构混乱和组件复用性降低

* 代码冗余：需定义 constructor、render 方法，尤其是对于简单UI组件很不友好。

* this指向：事件处理函数需手动绑定this，或使用箭头函数避免this指向，增加复杂性和学习成本。

* 复杂的继承关系：复杂的组件层级结构，增加组件之间耦合度，降低灵活性和复用性。

* 关注点分离困难：状态管理、生命周期和UI渲染逻辑，使组件不清晰、难理解、难维护。

<br/>

1）代码冗余 -> 余在哪

每次都要写constructor、render，很实在的理由。

2）this 指向问题 -> 是缺点？

相对认可，this，一颗难找规律的奇怪炸弹

3）复杂的继承关系 -> 这怎么就复杂了？

单继承限制：类组件只能通过单一继承来复用，如组件需要继承多个类或父类，会遇到限制。

复杂的继承链：大型应用类组件继承关系相对较复杂，组件之间耦合度高，不利于代码灵活性和扩展性。 

**而这些概念又生出问题，就像：**

```
a: 类组件为什么只能单一继承？

b: 函数组件怎么处理这个继承关系？

c: 既然类组件有那么多缺点，还需要使用类组件吗？
```
想进一步挖掘？ **[🔥 单独篇幅解惑](https://github.com/yang1212/collection-about/issues/60)**

4）关注点分离困难 -> 困难在哪里？

想进一步挖掘？ **[🔥 单独篇幅解惑](https://github.com/yang1212/collection-about/issues/62)**

 

<br/>

通过上面的挖掘，已经理解： 为何类组件会导致代码的结构混乱和组件复用性降低

**逻辑推理也很简单：**

代码冗余 --> this指向摸不透 --> 复杂继承关系学不懂  --> 关注点分离困难(东一块，西一块)  --> 混乱
 
<br/>

至此基于hooks出现的背景衍生出的疑惑基本摸了个大概了～

再看看它的使用场景～

<br/>



## 2、[它的使用](https://zh-hans.react.dev/reference/react/useEffect)

### 2.1 先分类看看react 中hooks有哪些：

**1、经常用：**
useState：函数组件中添加状态管理能力。
useEffect：函数组件中执行副作用操作，比如数据获取、订阅更新等。

**2、偶尔用：**
useMemo：函数组件中缓存计算结果，提升性能。
useContext：函数组件中访问 React 上下文。

**3、很少用：**
useReducer：函数组件中管理复杂状态逻辑，类似于Redux。
useRef：函数组件中创建可变引用，类似于在类组件中使用 ref。
useLayoutEffect：类似于 useEffect，但会在 DOM 更新之后同步调用 effect。


**4、没印象：**
useCallback：函数组件中缓存回调函数，避免不必要的重新创建。
useImperativeHandle：在使用 ref 进行父子组件通信时，限制子组件暴露给父组件的实例值和函数。
useDebugValue：用于在 React 开发者工具中显示自定义 Hook 的标签和值。


### 2.2 解剖常用、偶尔用的hook使用场景与踩坑

[useState](https://github.com/yang1212/collection-about/issues/65) -> [useEffect](https://github.com/yang1212/collection-about/issues/34)  -> [useMemo](https://github.com/yang1212/collection-about/issues/34) -> [useContext](https://github.com/yang1212/collection-about/issues/6) -> [useCallback](https://github.com/yang1212/collection-about/issues/35)





