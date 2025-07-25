## uniapp使用
**1、初始化**

* [基于uniapp的默认模板](https://github.com/yang1212/build-demo/tree/master/4%E3%80%81%E5%B0%8F%E7%A8%8B%E5%BA%8F/uniapp-demo)


**[2、生命周期](https://blog.csdn.net/qq_37291064/article/details/87913066)**

onLoad、onReady的执行顺序：

* [小程序中： onLoad先于onReady，onReady在页面初次渲染完调用。为啥就要另起炉灶与原生JS不一样，wtm大雨。](https://juejin.cn/post/6844903928400707591)
* 原生JS中： onReady先于onLoad, onReady代表文档结构加载完成、onLoad代表页面初次渲染完。

**[3、webview](https://uniapp.dcloud.net.cn/component/web-view.html#web-view)**

* [webview -嵌套H5](https://www.aliyue.net/10218.html)
* [webview -在h5中使用小程序api](https://juejin.cn/post/6844904061842653191)
* [webview -在h5中跳支付](https://developers.weixin.qq.com/community/develop/article/doc/0008e22ff80d088bcd9c8b42156c13)(登录&支付需基于原生才可)
* webview -在h5中跳转链接

    [链接为微信公众号](https://developers.weixin.qq.com/community/develop/doc/0002e28d800ab084efad2e5c158400)
    ： 去公众号后台关联小程序，小程序才能通过web-view访问关联公众号的文章(指定文章的链接)，没关联的访问不了。
  
    [链接为其它网页](https://www.abwuliu.com/news/99137.html)： 需登录小程序管理后台配置业务域名
    
* [webview -开放平台业务域名配置](https://www.abwuliu.com/news/99137.html)
* webview -踩坑

    web-view的销毁：v-if控制页面的重载, 而销毁需要过程，故销毁与重载之间需添加setTimeout, 否则页面会报错不支持多个web-view。

    [h5中包含腾讯地图报错](https://forum.alipay.com/mini-app/post/13701013)：打开跳转显示页面访问受限，需基于小程序授权位置信息，获取经纬度，并通过路由参数将经纬度传给H5。


**[4、全局变量](https://ask.dcloud.net.cn/article/35021)**

**[5、微信公众号关注组件](https://developers.weixin.qq.com/miniprogram/dev/component/official-account.html)**

**[6、获取手机号码](https://www.jianshu.com/p/9aceb1fcb3a0)**

**7、蓝牙**
* [经典蓝牙与低功耗蓝牙](https://zhuanlan.zhihu.com/p/149244010)
* [蓝牙-支付宝](https://opendocs.alipay.com/mini/api/bluetooth-intro)
* [蓝牙-微信](https://developers.weixin.qq.com/miniprogram/dev/framework/device/ble.html)([api](https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth-ble/wx.writeBLECharacteristicValue.html))
* [蓝牙-uniApp](https://uniapp.dcloud.net.cn/api/system/bluetooth.html)

**[8、自定义tabBar](https://developers.weixin.qq.com/miniprogram/dev/framework/ability/custom-tabbar.html)**

**[9、下拉刷新scroll-view](https://blog.csdn.net/houruoyu3/article/details/112481762)**

**[10、转发&分享](https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html#onShareAppMessage-Object-object)**
* [H5微信自定义分享只在对应场景才生效](https://developers.weixin.qq.com/community/develop/doc/00004c7ff500f8527f2d9656951800)

<br/>

## 概念理解
**[1、一文搞懂openid和unionid](https://cloud.tencent.com/developer/article/1708827)**
* openid：将用户信息录入数据库中，就得有一个唯一标记区分用户，这个标记就是openid。


## 支付宝小程序
## [使用](https://opendocs.alipay.com/mini/developer)
**初始化**
* 使用实名认证的支付宝账号登录[开放平台](https://open.alipay.com/platform/developerIndex.htm)
* 将认证的支付宝账号(即邮箱) 发给开放平台对应管理员授权
* [下载支付宝小程序开发者工具](https://opendocs.alipay.com/mini/ide/download)
* 打开开发者工具载入项目，关联小程序即可开启项目


**打包发布**
* [分包加载](https://opendocs.alipay.com/mini/framework/subpackages)：按需将小程序划分为若干个不同的子包,  启动时只加载主包，使用时按需下载分包，不用一次性下载整个代码包，以提升首页启动速度；

* 主包：只保留最常用的核心页面（首页、tabBar 页面和其它公共资源)；

* 分包:  将小程序中不经常使用的页面放到多个分包中；

* 分包预下载：经常访问的待跳转页面，尽可能将该页面所在的分包配置成分包预下载，以提升页面跳转速度；

* [提审、灰度测试、发布](https://opendocs.alipay.com/mini/introduce/release)


**[小程序互跳](https://opendocs.alipay.com/mini/0090ty)**


