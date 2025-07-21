处理缓存时，查阅[RN官方文档](https://reactnative.cn/docs/asyncstorage)已标记AsyncStorage处理缓存已过时，推荐[使用npm包](https://reactnative.directory/?search=storage)。

<img width="907" alt="Snipaste_2023-08-03_10-24-00" src="https://github.com/yang1212/collection-about/assets/17806205/af4d4459-f6cc-4d21-82ba-8241cd88d2db">


## [@react-native-async-storage/async-storage](https://react-native-async-storage.github.io/async-storage/docs/install/)

跟 localStorage 类似，API 也几乎一样, 个人推这个，其他npm包试了下晦涩难懂～

````javaScript
// 缓存值
const storeData = async (key:string, value:any) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(key, jsonValue)
  } catch (e) {
    // saving error
  }
}
// 缓存取值
const getData = async (key:string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key)
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
    // error reading value
  }
} 
````
````javaScript
storeData('userInfo', {name: 'ahaha'})

const getInfo = async () => {
  const userInfo = await getData('userInfo')
  console.log(userInfo)
} 
````

### [注意点：](https://react-native-async-storage.github.io/async-storage/docs/help/troubleshooting)
引用该包后，如果遇到项目启动时一直卡住，在metro.config.js加入如下配置：
```
module.exports = {
   transformer: {
     getTransformOptions: async () => ({
       transform: {
         experimentalImportSupport: false,
         inlineRequires: true,
+        nonInlinedRequires: [
+          "@react-native-async-storage/async-storage",
+          'React',
+          'react',
+          'react-native',
+        ],
       },
     }),
   },
 };
```

<br/>

### 参考资料
* [@react-native-async-storage/async-storage Github](https://github.com/react-native-async-storage/async-storage)
* [@react-native-async-storage/async-storage 文档](https://react-native-async-storage.github.io/async-storage/docs/install/)

<br/>
