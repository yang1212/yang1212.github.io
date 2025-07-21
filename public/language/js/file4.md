每次遇到计算出问题时，一般都是旧项目又出bug了。     
急急忙忙只想找个第三方包解决问题，
一看文档迷迷糊糊, 如下图所示，
场面一度陷入混乱~

<img width="692" height="506" alt="Image" src="https://github.com/user-attachments/assets/df471f88-0ca7-4fe5-8c08-a5e712200d20" />

<br/>

在整理前，顺便先复习下精度丢失的原因**👊**

## 一、精度为何丢失

**举个栗子： 0.1 + 0.2**
```
0.1（ 转化后是以0011无限循环，二进制为满一进一，所以末尾为01 ）
转二进制后：       0.0 0011 0011 0011 0011 0011 0011 0011 0011 0011 0011 0011 0011 0011 01

0.2
转二进制后：       0.0 0110 0110 0110 0110 0110 0110 0110 0110 0110 0110 0110 0110 0110 10

相加得到的值：     0.0 1001 1001 1001 1001 1001 1001 1001 1001 1001 1001 1001 1001 1001 11
```

将相加得到的二进制[转换](https://tool.oschina.net/hexconvert)为十进制： 0.30000000000000004

由此可得出在四则运算中，浮点数转换成二进制后如果**存在无限循环小数**，都会出现精度异常的情况~

<br/>

## 二、如何解决？
### 1）[Big.js](http://mikemcl.github.io/big.js/) 
- 轻量，满足基本功能；
- 未压缩版本：约 52 KB 左右；
- 压缩版本：约 18 KB 左右；

````javaScript
npm install big.js --save

const { Big } = require('big.js');

// Eg1: 加
let val = new Big(0.1)
let res = val.add(0.2)
console.log(res.toString()) // 0.3

// Eg2: 减
let val = new Big(0.2)
let res = val.minus(0.1)
console.log(res.toString()) // 0.1

// Eg3: 乘
let val = new Big(4)
let res = val.mul(3)
console.log(res.toString()) // 12

// Eg4: 除
let val = new Big(8)
let res = val.div(4)
console.log(res.toString()) // 2

// Eg5: 取余
let val = new Big(3)
let res = val.mod(2)
console.log(res.toString()) // 1

// Eg6: 累加
let total = new Big(0);
const numbers = [10, 20, 30, 40, 50];
for (let i = 0; i < numbers.length; i++) {
  total = total.add(numbers[i]);
}
console.log(total.toString()); // 150
````

### 2）[bignumber.js](https://mikemcl.github.io/bignumber.js/)
- 轻量，满足基本功能，兼处理大数；
- 未压缩版本：约 53 KB 左右；
- 压缩版本：约 18 KB 左右；
````javaScript
npm install bignumber.js --save

const { BigNumber } = require('bignumber.js');

// Eg1: 加
let val = new BigNumber(0.1);
let res = val.plus(0.2);
console.log(res.toString()); // 0.3

// Eg2: 减
let val = new BigNumber(0.2);
let res = val.minus(0.1);
console.log(res.toString()); // 0.1

// Eg3: 乘
let val = new BigNumber(4)
let res = val.times(3)
console.log(res.toString()) // 12

// Eg4: 除
let val = new BigNumber(8)
let res = val.dividedBy(4)
console.log(res.toString()) // 2

// Eg5: 取余
let val = new BigNumber(3)
let res = val.modulo(2)
console.log(res.toString()) // 1

// Eg6: 累加
let total = new BigNumber(0);
const numbers = [10, 20, 30, 40, 50];
for (let i = 0; i < numbers.length; i++) {
  total = total.plus(numbers[i]);
}
console.log(total.toString()); // 150

````

### 3）[mathjs](https://mathjs.org/docs/)
- 内置功能丰富，就是包有点大；
- 未压缩版本：约 1.4 MB 左右；
- 压缩版本：约 371 KB 左右；
````javaScript
npm install mathjs --save

import { create, all } from 'mathjs'
const math = create(all);

// Eg1: 加
let num1 = 0.2;
let num2 = 0.1;
let result = math.add(num1, num2); // 0.3

// Eg2: 减
let num1 = 0.3;
let num2 = 0.1;
let result = math.subtract(num1, num2); // 0.2

// Eg3: 乘
let num1 = 0.3;
let num2 = 0.1;
let result = math.multiply(num1, num2); // 0.03

// Eg4: 除
let num1 = 3;
let num2 = 1;
let result = math.divide(num1, num2); // 3

// Eg5: 取余
let num1 = 3;
let num2 = 2;
let result = math.mod(num1, num2); // 1

// Eg6: 累加
const numbers = [10, 20, 30, 40, 50];
const total = numbers.reduce((accumulator, currentValue) => {
  return math.add(accumulator, currentValue);
}, 0); // 150

````
**小数位处理：**
````javaScript
import { create, all } from 'mathjs'

const config = {
  number: 'number',
  precision: 16,
}
const math = create(all, config)

// Eg1: 基于原生的计算，格式化处理保留2位小数
let temp = 0.1 + 0.2
let result = math.format(temp, {
    notation: 'fixed',
    precision: 2,
})  // 0.30

// Eg2: 基于大数计算（math实例配置此时也需调整 number: 'bignumber'）, 格式化处理保留2位小数
let temp = math.add(math.bignumber(1000), math.bignumber(2000)
let result = math.format(temp, {
    notation: 'fixed',
    precision: 2,
}) // 3000.00
````

### 4）[decimal.js](https://mikemcl.github.io/decimal.js/)
- 未压缩版本：约 95 KB 左右
- 压缩版本：约 26 KB 左右
````javaScript
npm install decimal.js --save

import { Decimal } from 'decimal.js';

// Eg1: 加
let result = Decimal.add(0.1, 0.2);
console.log(result.toString()); // 0.3

// Eg2: 减
let result = Decimal.sub(0.2, 0.1);
console.log(result.toString()); // 0.1

// Eg3: 乘
let result = Decimal.mul(2, 1);
console.log(result.toString()); // 2

// Eg4: 除
let result = Decimal.div(2, 1);
console.log(result.toString()); // 2

// Eg5: 取余
let result = Decimal.mod(3, 2);
console.log(result.toString()); // 1

// Eg6: 累加
let numbers = [10, 20, 30, 40, 50];
let result = numbers.reduce((accumulator, currentValue) => {
  return new Decimal(accumulator).add(currentValue);
}, 0); // 150

````

<br/>

## 三、题外话

### 1、封装方法

有时候我们不想引包，想自己封装方法，这时存在一个容易踩的坑

防止精度丢失，是不是将目标转化为整数就可以？

如：35.41，乘以100， 转化为整数是不是就可以？

事实是：35.41 * 100 结果为 3540.9999999999995，

因35.41转换为二进制的时候就丢失了精度，

故大多都是借助转换成字符串格式进行化整。

### 2、toFixed存在丢失精度

大多数情况下, toFixed方法满足数学概念中的四舍五入，但它偶尔也会宕机

比如：1.335.toFixed(2) === 1.33

**那咋办，只得自定义tofixed方法：**

````javaScript
toFixedFn (val, n) {
  if (!n) { return Math.round(val) }
  val = Math.round(val * Math.pow(10, n)) / Math.pow(10, n)
  return val.toFixed(n)  (此处需要基于原生toFixed补0操作，如1.30保留两位小数时经过上面处理后为1.3)
}
````
