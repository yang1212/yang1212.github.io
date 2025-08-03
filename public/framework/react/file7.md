## 副作用
"副作用" 在计算机科学中源自函数式编程范式，指的是**函数除返回值外对其他部分产生的影响。**

懂了，好像又没懂！！！

在了解副作用前，先熟悉一下纯函数组件。

<br/>

### 1、什么是纯函数组件？

纯函数组件是 React 中的一个概念，它是指满足以下条件的组件：

* **相同的 props 总是产生相同的渲染结果**：只要 props 相同，组件的渲染结果就一定相同。

* **没有副作用**：组件不会修改外部状态或依赖外部状态。

* **没有内部状态**：组件不依赖于 useState 或 useReducer 管理的内部状态。

顺手补充内部状态：

如果一个组件的渲染结果依赖于内部状态，那么它就不是纯函数组件。例如：

```javascript
function Counter() {
  const [count, setCount] = useState(0); // 内部状态

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

```

这个组件的渲染结果依赖于内部状态 count。

即使 props 相同，count 的变化也会导致渲染结果不同。

因此，这个组件不是纯函数组件。


<br/>


接着继续说react中的副作用~

对于组件而言，需要访问外部数据、修改外部状态、订阅事件等

这些操作会导致组件的行为不再只由输入参数决定，破坏了纯函数的特性。

而这些操作，就是我们所说的副作用。

<br/>

### 3、所以在React中副作用就是：

* 组件渲染过程中执行的操作，即在useEffect中执行的这些操作（useEffect 本身就是为了处理副作用而设计的）

* 如获取数据、更新 DOM 、订阅事件（监听窗口滚动事件、键盘事件等）等 

<br/>

### 4、再顺手一挖：
只有useEffect执行副作用操作，还有没有其他钩子？
```
useEffectOnce: 自定义 Hook，用于只执行一次副作用操作。
useEffectWithCleanup: 自定义 Hook，用于在组件卸载时执行清理操作的副作用函数。
useLayoutEffect:  在浏览器布局（DOM）更新之后同步调用副作用函数。
```
没怎么用过对不对，问题不大

这些Hook 基本就是useEffect的别名

通过命名明确 Hook 让开发者更清晰知道这些 Hook 的用途

而不是都全部都叫useEffect 

但这又增加了丢丢学习成本

不过这都随团队的开发习惯来选择使用标准

无需过度关注～



<br/>

**以上内容皆服务于：** [今天只学一个知识点：hooks](https://github.com/yang1212/collection-about/issues/59) 