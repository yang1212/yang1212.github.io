在 React 里，受控组件指的是表单元素的值由 React 组件的状态（state）管理，
而不是让 DOM 自己存储值。

简单理解：
📌 受控组件 = React 通过 state 管理输入值，React 说了算！
📌 非受控组件 = React 不存这个值，让浏览器自己管理，React 只是在需要时去“偷看”一下。


**一个简单的 受控组件 的示例：**
```javaScript
import React, { useState } from 'react';

function ControlledInput() {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <input type="text" value={value} onChange={handleChange} />
  );
}
export default ControlledInput;
```
这个案例在 React 中模拟类似双向数据绑定的效果

通过将表单元素的值与 React 组件的状态进行绑定

并在状态发生变化时更新表单元素的值，实现数据同步更新

<br/>

**来看 非受控组件 的代码：**

```javascript
import { useRef } from "react";

function MyForm() {
  const inputRef = useRef(); // 只是获取 DOM

  return <input type="text" ref={inputRef} />;
}
```

🔹 这里 没有 value 绑定，没有 onChange，React 只是获取 DOM，但不控制输入框的值。

那输入框的值谁在管理？

🔸 浏览器在管！

你输入啥，浏览器就自动存住
你按 退格键，浏览器自动删掉
React 完全没干涉
如果你想拿到输入的值，你得手动去 DOM 里拿。
React 只是在需要的时候去 inputRef.current.value 里取值，而不是一直管理这个值。
