## 函数组件

**1） 基于prop传值(父传子)**

  ````javaScript
  // 父组件
  export default function Content() {
    const orderData = {name: 'yf'}
    return (
      <div>
        <son orderData={orderData}/>
      </div>
    )
  }

  // 子组件
  const ListContent = (props) => {
    const orderData = props.orderData
    return (
      <div>{orderData.name}</div>
    )
  }

export default ListContent
  ````

**2） useContext(父子组件深层传值)**
* 跨越组件层级直接传递变量，实现共享
* 参考[此文](https://zh-hans.reactjs.org/docs/hooks-reference.html#usecontext)

````javaScript
// MyContext.js

// 将 Context 单独提取到一个文件中，方便其他组件引用：

import { createContext } from 'react';

const MyContext = createContext();

export default MyContext;


// Parent.js

// Parent 组件负责管理状态，并通过 MyContext.Provider 传递数据：

import React, { useState } from 'react';
import Child from './Child';
import MyContext from './MyContext';

function Parent() {
  const [count, setCount] = useState(2);

  return (
    <div className="header">
      <p onClick={() => { setCount(count + 1) }}>点击</p>
      <MyContext.Provider value={count}>
        <Child />
      </MyContext.Provider>
    </div>
  );
}

export default Parent;



// Child.js
// Child 组件作为中间组件，渲染 GrandChild 组件：

import React from 'react';
import GrandChild from './GrandChild';

function Child() {
  return (
    <div className="header">
      <GrandChild />
    </div>
  );
}

export default Child;


// GrandChild.js
// GrandChild 组件通过 useContext 获取 count 的值并显示：

import React, { useContext } from 'react';
import MyContext from './MyContext';

function GrandChild() {
  const count = useContext(MyContext);

  return (
    <div className="header">
      {count}
    </div>
  );
}

export default GrandChild;

````

**3）[使用第三方库 Mobx](https://github.com/yang1212/collection-about/issues/64)**

<br/>


## 类组件

**1） 基于prop传值(父传子)**
````javaScript
// 父组件
import * as React from 'react'
import Son from './son'

export default class HeaderNav extends React.Component {
  message = {name: "yf", interset: "hj"};
  render() {
    return (
      <div className="header">
        <Son myProp={this.message}/>
      </div>
    )
  }
}

````
````javaScript
// 子组件
import * as React from 'react'
export default class Son extends React.Component {
  message = this.props.myProp;
  render() {
    return (
      <div className="header">
        {this.message.interset}
      </div>
    )
  }
}
````
**2） 上下文Context(父传子)**

* Context 提供了一个无需为每层组件手动添加 props，就能在组件树间进行数据传递的方法

* Attention: 需基于同一个上下文React.createContext(), 故需在同一个文件内使用

* 参考[此文](https://zh-hans.reactjs.org/docs/context.html)
````javaScript
import React, { createContext } from 'react';
const myContext = createContext();

class Index extends React.Component {
  message = {name: "yf", interset: "hj"};
  render() {
    return (
      <div className="header">
        <myContext.Provider value={this.message}>
          <Son/>
        </myContext.Provider>
      </div>
    )
  }
}

class Son extends React.Component {
  render() {
    return (
      <div className="header">
        <Sonson />
      </div>
    )
  }
}

class Sonson extends React.Component {
  // 在需要获取祖代传递的 context 值的后代组件中，声明 contextType 静态属性，值为之前创建的 context;
  static contextType = myContext;
  render() {
    return (
      <div className="header">
        {this.context.name}
      </div>
    )
  }
}

export default Index

````



<br/>
