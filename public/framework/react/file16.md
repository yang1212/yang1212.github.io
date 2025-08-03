 🚀 React 提供的一个 Hook，用于缓存函数，达到优化性能。

### 1. 为什么需要 useCallback？

在 React 中，每次组件渲染时，函数组件内部的函数都会被重新创建。

如果这些函数被传递给子组件，可能会**导致子组件不必要的重新渲染，即使子组件的 props 没有实际变化。**

useCallback 的作用是缓存函数，只有在依赖项发生变化时才会重新创建函数，从而减少不必要的重新渲染。

<br/>

### 2、 useCallback 的基本用法
```javascript
const memoizedCallback = useCallback(
  () => {
    // 函数逻辑
  },
  [dependency1, dependency2], // 依赖项数组
);
```
**第一个参数：** 需要缓存的函数。

**第二个参数：** 依赖项数组。**只有当依赖项发生变化时，才会重新创建函数**。

**依赖数组:**   决定了 useCallback 何时重新创建函数：

如果依赖数组为空（[]）：函数只会在组件挂载时创建一次，之后不会重新创建。

如果依赖数组不为空：只有当依赖项发生变化时，才会重新创建函数。

如果省略依赖数组：每次组件渲染时都会重新创建函数。

<br/>

### 3、 useCallback 的主要应用场景

**1）优化子组件的渲染：**

当父组件将一个函数作为 props 传递给子组件时，如果父组件重新渲染，

导致子组件即使使用了 React.memo 也会重新渲染。

```javascript
const Child = React.memo(({ onClick }) => {
    console.log('Child 渲染了');
    return <button onClick={onClick}>点击</button>;
});

function Parent() {
    const [count, setCount] = useState(0);

    const handleClick = useCallback(() => {
        console.log('按钮被点击了');
    }, []); // 空依赖数组，函数不会重新创建

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>增加 Count</button>
            <Child onClick={handleClick} />
        </div>
    );
}


```
**📍 如果你移除 useCallback：**

当你点击“增加 Count”按钮时， Parent 组件的 count 状态会更新，导致 Parent 组件重新渲染。

每次 Parent 组件重新渲染时，handleClick 函数都会重新创建，导致 Child 组件的 onClick prop 发生变化，

从而触发 Child 组件的重新渲染。


<br/>


