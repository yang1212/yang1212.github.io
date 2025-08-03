## useState

在函数组件中：保存和更新状态数据


### 1、先看最简单的基本用法
```javaScript
function Content() {
  const [count, setCount] = useState(2);
  const fn = () => {
    setCount(count + 1)
  }
  return(
    <div>
      {count}
      <p onClick={fn}>Test</p>
    </div>
  )
}
```
以上是一个最简单的案例

如果想在设置完值后同步获取最新值，那该如何做？

<br/>


### 2、一个常用获取最新值的案例
```javaScript
function Content() {
  const [count, setCount] = useState(2);

  const fn = () => {
    setCount(count + 1);
  };

  useEffect(() => {
    // 在 count 变化时执行操作
    console.log('Count updated:', count);
  }, [count]); // 仅在 count 发生变化时触发 useEffect

  return (
    <div>
      {count}
      <p onClick={fn}>Test</p>
    </div>
  );
}
```
在react中，更新状态是异步的，调用setCount后，不能立即获取值。

这个时候react会对状态更新做[批处理](https://github.com/yang1212/collection-about/issues/66)

如果非的拿这个值了，通过 useEffect监听 count 的变化，模拟状态的同步更新，如上案例

总对这种实现不是很满意，一种在代码里面写了监听的既视感。

继续查资料，找到基于回调函数形式，如下：

<br/>

### 3、基于回调函数形式获取最新值

```javaScript
function MyComponent() {
  const [count, setCount] = useState(0);

  const handleUpdateCount = () => {
    setCount((prevCount) => {
      const updatedCount = prevCount + 1;
      console.log(updatedCount); // 这里可以获取到更新后的值
      return updatedCount;
    });
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleUpdateCount}>Increment</button>
    </div>
  );
}
```

这样就可确保在状态更新完成后立即获取最新的值，这看上去舒服多了

甚至想着假如调用接口，可不可以也这样写：
```javaScript
const handleIncrement = () => {
  setCount((prevCount) => {
    const updatedCount = prevCount + 1;
    sendRequest(updatedCount); // 发送网络请求
    return updatedCount; // 返回新的状态值
  });
};
```
本想美滋滋以后就这么搞，但这种方式是不推荐的，

如果 sendRequest 是异步的，状态更新和请求是并行的，可能会导致逻辑问题。

如果请求失败，状态仍然会更新，导致数据不一致。

**除非你需要处理的是同步数据，可以这样写：**

```javascript
const handleIncrement = () => {
  setCount((prevCount) => {
    const updatedCount = prevCount + 1;
    
    // 同步数据处理
    processData(updatedCount); // 例如：更新本地缓存、计算衍生数据等
    
    return updatedCount; // 返回新的状态值
  });
};
```

<br/>



### 4、总结
1、对于回调函数形式
* 不建议进行网络请求等副作用操作，更适合的做法是处理与状态更新直接相关的同步数据处理
* 如更新相关状态、处理简单的业务操作提示等

2、涉及到复杂逻辑或异步操作的场景
* 应考虑使用 useEffect Hook 来处理

<br/>

### 5、其它
顺手补充[类组件setState](https://github.com/yang1212/collection-about/issues/12)

<br/>

**以上内容皆服务于：** [今天只学一个知识点：hooks](https://github.com/yang1212/collection-about/issues/59) 