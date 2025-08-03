在分析之前，先熟悉Vue和React的数据流～

### 1、数据流

在 Vue 和 React 中，数据流都是单向的。

**单向：** 也就意味从父组件传递数据到子组件，而子组件无法直接修改父组件的数据。

**需要修改数据：** 子组件触发事件通知父组件更新数据，实现数据同步。

这就是平时在日常开发中单向数据流的简要描述。


### 2、双向数据绑定

可能我们都有过类似疑问，平时用react不也是使用v-model指令

为什么很少听到React聊双向数据绑定？

* 那是因为在 React 中，v-model 不是原生支持的语法，需要依赖第三方库或者自定义组件来实现类似双向绑定功能，

* 很多 UI 库（比如 Ant Design、Material-UI 等）提供类似 v-model 的 API，

* 通过这些 API 可以在 React 中实现类似 Vue 中 v-model 的双向数据绑定效果。


而在Vue 中，v-model 是内置指令，**可以直接用于 input、textarea、select 等表单元素**，以实现双向数据绑定。

也是因我们日常开发都是基于UI 库，所以没有几乎注意到这个差别～


那在React中，不依赖第三方库，能不能实现双向数据绑定？

这就需要引入一个新概念：[受控组件](https://github.com/yang1212/collection-about/issues/72)。

举个例子如下：

```javaScript
import React, { useState } from 'react';

function App() {
  // 定义一个状态来保存输入框的值
  const [inputValue, setInputValue] = useState('');

  // 定义一个处理输入变化的事件处理函数
  const handleChange = (event) => {
    // 当输入框的值发生变化时，更新状态中保存的值
    setInputValue(event.target.value);
  };

  return (
    <div>
      {/* 使用受控组件，value 属性绑定到状态中保存的值，并且通过 onChange 事件更新状态 */}
      <input type="text" value={inputValue} onChange={handleChange} />
      {/* 显示输入框的值 */}
      <p>Input value: {inputValue}</p>
    </div>
  );
}

export default App;

```

创建一个受控文本输入框，其值由组件状态 inputValue 控制。

当输入框的值发生变化时，handleChange 函数会更新组件的状态，从而实现数据的双向绑定。

通过以上案例可知：相对于 Vue 来说，**在React中需要更多的代码来实现数据的双向绑定。**

**React的设计理念更加注重单向数据流。**

我想这也是为什么很少听到在React中讨论双向数据绑定的原因吧～

