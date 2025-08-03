## 批处理
在React中， 批处理指的是将多个状态更新合并为单个更新操作

概念很好理解，但对这个过程有点不清晰，比如：

### 1、日常开发中哪些状态的操作会合并
* 当同个状态值执行更新操作连续发生时
  ```javaScript
  const [count, setCount] = useState(0);
  const incrementTwice = () => {
    setCount(count + 1); // 第一次更新
    setCount(count + 1); // 第二次更新，但实际上会合并为单个更新
  };
  ```
 * 或是多个状态值更新操作时
    ```javaScript
     const [count1, setCount1] = useState(0);
     const [count2, setCount2] = useState(0);
     const incrementTwice = () => {
      setCount1(count1 + 1);
      setCount2(count2 + 1);
    };
    ```


### 2、总结

* 批处理也就是将多个状态更新合并为单个更新操作。
* 减少对真实 DOM 的直接操作次数，减少不必要的重复渲染。


### 3、补充

* 虽然批处理机制可以减少直接对真实 DOM 的操作次数。

* 但[虚拟 DOM](https://github.com/yang1212/collection-about/issues/68) 的引入也阔以进一步优化这个过程。



<br/>

**以上内容皆服务于：** [今天只学一个知识点：hooks](https://github.com/yang1212/collection-about/issues/59) 