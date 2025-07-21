## [IOS环境](https://reactnative.cn/docs/environment-setup)
**1、brew install watchman**
* 出现某个包下载出错：[升级](https://blog.devhitao.com/2020/01/18/homebrew-usage/)brew到4.x可解决
* 出现一直卡着不动：[更换源可解决](https://zhuanlan.zhihu.com/p/475756310)（阿里的比清华下载要快）

**2、Ruby安装指定版本**
* macOS 12.5.1 自带的 Ruby 版本是 2.6.8，但这并不是 React Native 所需的版本，React Native 需要的版本 [记录在此](https://github.com/facebook/react-native/blob/v0.71.4/.ruby-version)
* 升级Ruby依赖RVM，故先安装RVM，[对着文档执行命令行](https://cloud.tencent.com/developer/beta/article/1194612)

**3、Xcode安装，ios模拟器安装**
* 自 2023 年 4 月起，所有提交至 App Store 的 iOS 和 iPadOS App 都必须使用 Xcode 14.1 和 iOS 16.1 SDK 来构建
* Xcode版本：Version 14.3 

**4、安装[cocoapods](https://juejin.cn/post/6844903731008536590)**
* 基于ruby 的gem命令： sudo gem install cocoapods （选brew安装就是无底洞的巨坑。。brew install CocoaPods）

**5、初始化项目如果一直报错（可逐步运行）**
* npx react-native init testproject --skip-install
* cd testproject
* yarn install
* cd ios
* bundle install （M1执行这个--》 arch -arm64 bundle install）
* bundle exec pod install （M1执行这个--》 arch -arm64 bundle exec pod install）

**6、错误集合**
* 执行brew xx 操作时，[Command failed with exit 128: git 异常处理](https://juejin.cn/post/7122343112604647437)
* 执行命令行时：[Failed to connect to raw.githubusercontent.com port 443](https://github.com/hawtim/hawtim.github.io/issues/10), 添加[Host配置](https://www.jianshu.com/p/752211238c1b)即可
* 启动权限错误：No permission handler detected.
    执行如下
    ```
    cd ios: pod deintegrate
    根目录：npx react-native setup-ios-permissions
    cd ios: pod install -->M1执行这个(arch -arm64 bundle install, arch -arm64 bundle exec pod install)
    ```
    <img width="1107" alt="企业微信截图_6061b3e3-32e5-4309-9b27-0b9b1653b1f2" src="https://github.com/yang1212/collection-about/assets/17806205/5a8fa6a6-fe75-479a-ade8-de23ee7703d5">
