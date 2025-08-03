## 关注点分离困难
拗口的名词

在react中的关注点关注啥？

* 状态管理：管理组件的内部状态，例如表单输入、组件显示状态等。
* 生命周期管理：处理组件的挂载、更新、卸载等生命周期事件。
* UI 渲染逻辑：定义组件的UI结构和展示方式。
* 副作用处理：处理与组件状态无关的逻辑，例如数据获取、订阅事件等。

所以react中的关注点就是我们熟悉的：状态管理、生命周期管理、UI 渲染逻辑、副作用处理

分离困难?

组件不清晰、难理解、难维护就是我们经常想吐槽的困难~

### 1、定义总结：

**关注点分离困难**

指的是在类组件中，状态管理、生命周期管理和 UI 渲染逻辑交织在一起，难以清晰地分离和管理这些不同关注点的逻辑。
导致代码结构不清晰、难理解、难维护等问题。

### 2、定义清晰了，上案例：

类组件实现：
```javascript
import React, { Component } from 'react';

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  componentDidMount() {
    console.log('Component did mount');
    this.timerId = setInterval(() => {
      this.setState((prevState) => ({ count: prevState.count + 1 }));
    }, 1000);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('Component did update');
    if (prevState.count !== this.state.count) {
      console.log('Count updated:', this.state.count);
    }
  }

  componentWillUnmount() {
    console.log('Component will unmount');
    clearInterval(this.timerId);
  }

  render() {
    return <div>Count: {this.state.count}</div>;
  }
}

export default Counter;

```

在componentDidMount 中启动定时器

在componentDidUpdate 中检查状态更新

在componentWillUnmount 中清除定时器等

包含componentDidMount、componentDidUpdate 和 componentWillUnmount 三个生命周期方法，相对分散。

<br/>

**再来对比看下函数组件实现：**
```javascript
import React, { useState, useEffect } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('Component did mount');
    const timerId = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 1000);
    return () => {
      console.log('Component will unmount');
      clearInterval(timerId);
    };
  }, []);

  useEffect(() => {
    console.log('Component did update'，count);
  }, [count]);

  return <div>Count: {count}</div>;
};

export default Counter;

```

useEffect Hook 实现类组件中对应的生命周期逻辑

useEffect Hook 的第二个参数控制[副作用](https://github.com/yang1212/collection-about/issues/63)的执行，即更新时机。

逻辑清晰 -> 组件关注点集中 -> 代码结构简洁易读。（类似vue2到vue3的进阶，看来这些框架干的事几乎都差不多）


<br/>

**以上内容皆服务于：** [今天只学一个知识点：hooks](https://github.com/yang1212/collection-about/issues/59) 
