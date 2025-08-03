## 🌞 RegExp对象
原生JavaScript中表示正则表达式的对象

### 1、创建RexExp对象的两种方法
* 字面量
  ```
  var patt = /ab+c/i
  ```
* 构造函数
  ```
  var patt = new RegExp(/ab+c/, 'i')
  ```

### 2、RegExp 对象方法

### 1) exec
字符串中的正则表达式的匹配

* 匹配
  ````javaScript
  var str="Hello world!";
  var patt=/Hello/g;
  var result=patt.exec(str); // Hello 
  ````
* 不匹配
  ````javaScript
  var str="Hello world!";
  var patt=/Hello2/g;
  var result=patt.exec(str); // null
  ````

### 2) test
检测一个字符串是否匹配某个模式

* 匹配
  ````javaScript
  var str="Hello world!";
  var patt=/Hello/g;
  var result=patt.exec(str); // true
  ````
* 不匹配
  ````javaScript
  var str="Hello world!";
  var patt=/Hello2/g;
  var result=patt.exec(str); // false
  ````


### 3、支持正则表达式的 String 对象的方法

### 1)  replace
替换与正则表达式匹配的子串

* 执行一次替换，直到第一个 "yf" 被找到
    ```javaScript
    var str = "Visit yf, Visit yf";
    var n = str.replace("yf","ta");   // Visit ta, Visit yf
    ```
* 全局替换
    ```javaScript
    var str = "Visit yf, Visit yf";
    var n = str.replace(/yf/g,"ta");   // Visit ta, Visit ta
    ```
* 全局去除对应 '.',  '-'字符
    ```javaScript
    var str = "-2.7";
    var n = str.replace(/\./g, '').replace(/\-/g, '');   // 27
    ```

### 2) search
查询字符串中指定的或是与正则相匹配的子字符串,返回相匹配的 String 对象起始位置

* 找到与正则相匹配的字符串
    ```javaScript
    var str = "Visit yf";
    var n = str.search("yf");   // 6
    ```
* 找到指定字符串
    ```javaScript
    var str = "Visit yf";
    var n= str.search(/yf/);   // 6
    ```
* 未找到指定字符串
    ```javaScript
    var str= "Visit yf";
    var n= str.search("ta");   // -1
    ```


### 3) match
找到一个或多个匹配的字串，返回存放匹配结果的数组
* 找到与正则相匹配的字符串
    ```javaScript
    var str = "hello world world"; 
    var n = str.match(/world/g); // ['world', 'world']
    ```
* 未找到指定字符串
    ```javaScript
    var str= "hello world world"; 
    var n = str.match(/ahaha/g); // null
    ```

<br/>

## 🌞 正则通用

### 1、正则匹配常用的规则

### 常用元字符
```
\w | 查找数字、字母及下划线。
\d | 查找数字。
\D | 查找非数字字符。
\s | 查找空白字符。
\S | 查找非空白字符。
\0 | 查找 NULL 字符。
\n | 查找换行符。
````

### 常用量词
```
n?      |  零个或一个 n 的字符串
n*      |  零个或多个 n 的字符串
n+      |  至少一个 n 的字符串
n{X}    |  X 个 n 的序列的字符串
n{X,}   |  至少X 个 n 的序列的字符串
n{X,Y}  |  至少X 个, 至多 n 的序列的字符串
n$      |  任何以n结尾的字符串 
^n      |  任何以n开头的字符串 
```
###  [2、常用正则有哪些](https://segmentfault.com/a/1190000040086057)
1）最多两位小数
 ````javaScript
    let reg = /^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})?$/g
    // reg.test(1)  true
    // reg.test(1.2) true
    // reg.test(1.23) true
    // reg.test(1.234) false
````



