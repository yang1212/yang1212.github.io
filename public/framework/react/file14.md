## 一、实际场景使用
###  挂载：

### **1、constructor**

组件的构造函数，在组件创建时被调用

**类组件**
```javascript
import React, { Component } from 'react';
class Example extends Component {
   state = {
        count: 0,
    };
    render() {
        return null;
    }
}

export default Example;
```
**函数组件**
```javascript
import React, { useState } from 'react';

function Example() {
  const [count, setCount] = useState(0);
  return null;
}

export default Example;
```

<br/>


### **2、componentDidMount**

异步操作请求数据

**类组件**
```javascript
import React, { Component } from 'react';

class Example extends Component {
  componentDidMount() {
    console.log('I am mounted!');
  }
  render() {
    return null;
  }
}

export default Example;
```

**函数组件**

```javascript
import React, { useEffect } from 'react';

function Example() {
  // useEffect 第二个参数传入空数组
  useEffect(() => {
    console.log('I am mounte')
  }, [])
}
 
export default Example;
```

<br/>

### 更新：

### 1、shouldComponentUpdate

决定组件是否需要重新渲染，优化组件性能

**类组件**
```javascript
import React, { Component } from 'react';

class Example extends Component {
  state = {
    count: 0,
  };

  handleClick = () => {
    this.setState({ count: this.state.count + 1 });
  };

  shouldComponentUpdate(nextProps, nextState) {
    // 仅当 count 值发生变化时才重新渲染组件
    if (this.state.count !== nextState.count) {
      return true;
    }
    return false;
  }

  render() {
    console.log('Component re-rendered'); // 仅当 count 值变化时才输出
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.handleClick}>Increase Count</button>
      </div>
    );
  }
}

export default Example;

```

**函数组件**
```javascript
import React, { useState } from 'react';

const MyComponent = React.memo(({ count }) => {
  console.log('Component rendered');

  return (
    <div>
      <p>Count: {count}</p>
    </div>
  );
});

function Example() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <MyComponent count={count} />
      <button onClick={handleClick}>Increment</button>
    </div>
  );
}

export default Example;

```

<br/>

### 2、componentDidUpdate

组件更新完成后调用，可进行DOM操作或处理更新后的状态数据

**类组件**

```javascript
import React, { Component } from 'react';

class Example extends Component {
  constructor(props) {
    state = {
      count: 0,
      message: ''
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.count !== prevState.count ) {
      this.setState({ message: `Count updated from ${prevState.count} to ${this.state.count}` });
    }
  }

  handleIncrement = () => {
    this.setState(prevState => ({ count: prevState.count + 1 }));
  };

  render() {
    return (
      <div>
        <h1>Count: {this.state.count}</h1>
        <button onClick={this.handleIncrement}>Increment Count</button>
        <p>{this.state.message}</p>
      </div>
    );
  }
}
export default Example;

```

**函数组件**

```javascript
// 在useEffect的回调函数中比较前后状态执行相应操作模拟

import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);
  const [prevCount, setPrevCount] = useState(0);

  useEffect(() => {
    // 在组件更新时执行的逻辑
    console.log('Component updated');

    // 比较前后状态
    if (count !== prevCount) {
      console.log(`Count changed from ${prevCount} to ${count}`);
      setPrevCount(count); // 更新 prevCount
    }
  }, [count, prevCount]); // 依赖项包括 count 和 prevCount

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

export default Example;

```
<br/>

### 卸载：

### 1、componentWillUnmount

组件即将卸载时调用，处理定时器清除等操作

**类组件**

```javascript
import React, { Component } from 'react';

class Example extends Component {
  componentWillUnmount() {
    console.log('I am Unmount!');
  }
  render() {
    return null;
  }
}

export default Example;
```

**函数组件**
```javascript
import React, { useEffect } from 'react';

function Example() {
  useEffect(() => {
    // 清除函数，模拟 componentWillUnmount
    return () => {
      console.log('Component unmounted');
    };
  }, []); // 空依赖数组表示只在组件挂载和卸载时执行

  return <div>My Component</div>;
}

export default Example;
```

<br/>


## 二、类组件粗归类

### 1、挂载

-constructor：组件的构造函数，**在组件创建时被调用**

-componentDidMount: 组件挂载完后，进行**异步操作请求数据**


### 2、更新

-static getDerivedStateFromProps: 静态方法，在组件接收新的props时调用，返回新的状态值。

-shouldComponentUpdate： 决定组件是否需要重新渲染的方法，可优化组件的性能。

-componentDidUpdate：组件更新完成后调用，可**进行DOM操作或处理更新后的状态**等。


### 3、卸载

-componentWillUnmount：组件即将卸载时调用，**处理定时器清除等操作**。


### 4、小总结
之前写类组件时，就算是常用的，也经常记不住这个方法名。

开发过程中不以为然，可笔试时写不出觉得这分丢的太冤枉。

常用三个不可出岔子：componentDidMount、componentDidUpdate、componentWillUnmount


<br/>

**以上内容皆服务于：** [今天只学一个知识点：hooks](https://github.com/yang1212/collection-about/issues/59) 


