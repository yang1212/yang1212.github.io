[RN官方网站](https://reactnative.cn/docs/signed-apk-android)安卓打包基于命令行生成签名密钥，打包等过程不仅经常报乱七八糟的错误，而且打包时间非常非常长，实践证明，最优方案得选android studio。（下面的操作大多是参考android开发者官网）

## [Android 开发者官网](https://developer.android.com/studio/publish/app-signing?hl=zh-cn)

### 为新应用签名并将其发布到 Google Play 时可能需要采取的步骤

1、[**生成上传密钥和密钥库**](https://developer.android.com/studio/publish/app-signing?hl=zh-cn#generate-key)
* 菜单栏中，依次点击 Build > Generate Signed Bundle/APK > create new
* 除了密钥库的保存路径( 可将生成的路径指向项目内，如下图 )和密码需要自定义
![image](https://github.com/yang1212/collection-about/assets/17806205/4be87454-c18c-42fe-a655-f6d56f8e4315)


<br/>

2、**创建signing.properties文件，并放到项目对应目录下**

* signing.properties：也就是用于存储签名配置文本文件，里面的内容也就是上一步创建的密钥库对应的密码等信息
* 安全起见，记得在.gitignore添加，不要把密码这些配置信息上传。。。

  <img width="642" alt="企业微信截图_16856992305272" src="https://github.com/yang1212/collection-about/assets/17806205/046b72e5-f70c-496d-9fcf-df39a061e417">
  
  ![image](https://github.com/yang1212/collection-about/assets/17806205/525c8750-914b-435e-90e0-61ff3a420ed3)

<br/>

**3、把签名配置加入到项目的 gradle 配置中**
* android/app/build.gradle，添加如下的签名配置
  ```
  // 导入属性文件
  def signingPropertiesFile = rootProject.file("signing.properties")
  def signingProperties = new Properties()
  if (signingPropertiesFile.exists()) { signingProperties.load(new FileInputStream(signingPropertiesFile)) }

  android {
      ...
      defaultConfig { ... }
      signingConfigs {
          release {
              if (signingPropertiesFile.exists()) {
                  keyAlias signingProperties['keyAlias']
                  keyPassword signingProperties['keyPassword']
                  storeFile file(signingProperties['storeFile'])
                  storePassword signingProperties['storePassword']
              }
          }
      }
      buildTypes {
          release {
              ...
              signingConfig signingConfigs.release
          }
      }
  }
  ```
  
  ![image](https://github.com/yang1212/collection-about/assets/17806205/69208075-f710-46cb-a55f-96b8957ec965)

<br/>

4、**打包**
* 根据需求生成对应的包格式
* Google Play 现在要求 AAB 格式，而国内的应用市场目前仅支持 APK 格式

  ![image](https://github.com/yang1212/collection-about/assets/17806205/90730349-6491-4c87-9abc-b89e80c7734f)

  <img width="586" alt="企业微信截图_16856998838972" src="https://github.com/yang1212/collection-about/assets/17806205/7498a0f9-28f5-47d7-88cc-77811e521508">

* 如果发现打的包是debug包，请调下这个配置

  ![image](https://github.com/yang1212/collection-about/assets/17806205/ea388fd3-184e-4641-8974-e059db589523)


<br/>

5、[**登录google play 管理中心，填写信息**](https://play.google.com/console/u/0/signup)( [将google play设置为中文版本](https://juejin.cn/post/6881884822378774541))
  <img width="1260" alt="image" src="https://github.com/yang1212/collection-about/assets/17806205/8bf07f6f-63ef-46fe-b7bc-833ac2d92b85">


6、[**内部测试的发布测试流程**](https://blog.csdn.net/shulianghan/article/details/118995120)
* versionCode为整数值，且不能重复，类似索引的感觉，不改的话上传包的时候会拦截
  <img width="663" alt="企业微信截图_16843265732247" src="https://github.com/yang1212/collection-about/assets/17806205/ecad7f71-8cb3-4107-88ae-ef8f8f4c7797">
* 安卓机需要必备google play环境且翻墙状态下才能下载走内部测试环境下载对应包

<br/>

## 解惑

1、 Build > Generate Signed Bundle/APK为应用签名
* 上面步骤没有走这步的原因是已在步骤2,3配置，达到在构建流程中为应用的发布版本自动签名。

  ![image](https://github.com/yang1212/collection-about/assets/17806205/b3407027-6f15-47bd-8add-6dfb692a6b73)
  
  ![image](https://github.com/yang1212/collection-about/assets/17806205/c32b791f-211c-435c-b3c3-466f25dd0123)

<br/>

## 辅助技能
**1、更改包名称**
* google play 不同项目不允许包名称一致
  <img width="352" alt="企业微信截图_16843998674069" src="https://github.com/yang1212/collection-about/assets/17806205/9d9272da-3df6-47cf-bc1e-db73691cf873">
  <img width="849" alt="企业微信截图_16843998953364" src="https://github.com/yang1212/collection-about/assets/17806205/18cdb3dd-0510-41d2-a29c-b492647d7b99">
* 如果遇到这个报错：compileSdkVersion is not specified. Please add it to build.gradle，更改值重新编译
  <img width="824" alt="企业微信截图_16843999874369" src="https://github.com/yang1212/collection-about/assets/17806205/2e21818d-2566-46c3-aebf-5a37d3172627">
  <img width="951" alt="image" src="https://github.com/yang1212/collection-about/assets/17806205/78e15644-a34f-4876-b062-f2a13e67e4ec">



