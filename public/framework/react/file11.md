了解一个名词，首先得了解它产生的背景～

### 1、虚拟DOM的背景

最早由开发者 Jordan Walke 在 2010 年提出，应用在React框架中。（这个概念提出居然有14年了～）

当时解决什么问题？

Web 应用开发中普遍存在的性能问题

就像： 频繁操作DOM --> 导致页面重绘 --> 页面卡顿

背景基本Get, 那什么是虚拟DOM？

### 2、什么是虚拟DOM？

上简单案例：

```javaScript
<div id="app">
  <p class="text">hello world!!!</p>
</div> 
```
上面的HTML转换成虚拟DOM如下：

```javaScript
const virtualDOM = {
  tag: 'div',
  props: {
    id: 'app'
  },
  children: [
    {
      tag: 'p',
      props: {
        className: 'text'
      },
      children: [
        'hello world!!!'
      ]
    }
  ]
}
```
从案例可知, 虚拟DOM：
* 包含了 tag、props、children 三个属性
* 是个对象
* 是对真实DOM的一种抽象表示


背景，概念结构基本已清晰，接着了解它是如何工作的？


### 3、虚拟 DOM 的工作原理

上简单案例：

假设我们有以下两个虚拟 DOM 树：
<img width="908" alt="Snipaste_2024-04-07_18-02-05" src="https://github.com/yang1212/collection-about/assets/17806205/e9785456-944e-4d68-aa81-5a79043e50bc">



首先：从图对比发现className 属性发生了变化，从 'text' 变为 'updated-text'。

其次：根据这个变化，那就得生成一个 DOM 操作指令来更新className

接着：将这个 DOM 操作指令应用到真实的 DOM 上，页面就更新了～

最后：用简单的话概括虚拟 DOM 的工作流程也就是:
* 先构建：虚拟 DOM 树
* 再比较：新旧树找差异
* 其次生成： DOM操作指令
* 最后将DOM操作指令：应用到真实DOM上

工作原理基本大致了解，接着再往深挖一层

上面我们是通过眼睛观察到className 属性发生了变化，那机器是基于什么原则来观察这个变化？

也就是新旧树找出差异是如何比较的？


### 4、闪亮登场 diff（差异比较）算法

都说diff算法复杂，可是复杂不是由简单构成的么，主打不为难自己

就先认识一个最简单的 diff 算法示例也可～

上简单案例：

一个简单的 diff 函数比较：

```javaScript
// 比较两个节点是否相同
function diff(oldNode, newNode) {
  if (!oldNode || !newNode) {
    // 如果有一个节点不存在，则返回替换节点的指令
    return { type: 'replace', newNode };
  }
  
  if (oldNode.tag !== newNode.tag) {
    // 如果两个节点的标签名不同，则返回替换节点的指令
    return { type: 'replace', newNode };
  }

  return null; // 节点相同，返回空指令
}

// 测试 diff 算法
const oldNode = new Node('div', { id: 'app' }, []);
const newNode = new Node('div', { id: 'app' }, []);
const patches = diff(oldNode, newNode);

console.log(patches); // 输出：null

```

```javaScript
// 定义节点的数据结构
class Node {
  constructor(tag, props, children) {
    this.tag = tag; // 标签名
    this.props = props; // 属性对象
    this.children = children; // 子节点数组
  }
}
```
在上面这个简单的示例中，定义了一个 diff 函数，它接受两个节点作为参数。

并比较它们的标签名是否相同。如果标签名不同，则返回一个表示替换节点的指令。

如果标签名相同，则返回空指令表示节点相同。

而在我们平时框架中的diff算法：
* 通常会结合[深度优先搜索](https://www.51cto.com/article/614590.html)、优化策略、最小化更新技术；
* 这三个概念在 diff 算法中起着重要作用，帮助实现虚拟 DOM 的快速更新和渲染
* 简言之：水有点深，先把简单的分掌握住，改日再挖～

以上就是对虚拟DOM产生背景、概念、工作原理的分层概述～

最后总结虚拟DOM的优点。

### 5、优点表彰

1）**性能提升：** 

在内存中进行 DOM 结构的比较和计算 ->  提高页面渲染性能。

2）**更好的跨平台兼容性：** 

也就是一次编写多端运行的能力。

可以在浏览器端使用 React 渲染虚拟 DOM，也可以在服务器端使用 Node.js 渲染相同的虚拟 DOM。
 
不需要修改虚拟 DOM 的结构或代码。





<br/>

**以上内容皆服务于：** [今天只学一个知识点：hooks](https://github.com/yang1212/collection-about/issues/59) 

