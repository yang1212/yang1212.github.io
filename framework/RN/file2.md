## [设置RN未来付款](https://stripe.com/docs/payments/save-and-reuse?platform=react-native&ui=payment-sheet#react-native-card-scanning)

**1、依赖安装**

* yarn add @stripe/stripe-react-native
* 对于 iOS，前往 ios 目录并运行 pod install，确保您也安装了所需的本地依赖项。
* 对于 Android，无需安装其他依赖项。

**2、使用 StripeProvider 组件包裹您的支付界面**
````javaScript
<StripeProvider publishableKey={publishableKey}>
  <View>
    <TouchableOpacity
      onPress={handlePaymentSheet}
    >
      <Text>Add Card</Text>
    </TouchableOpacity>
  </View>
</StripeProvider>
````
**3、从 useStripe hook 调用 initPaymentSheet**
````javaScript
import { useStripe, StripeProvider } from '@stripe/stripe-react-native';

function CardList(): JSX.Element {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [publishableKey, setPublishableKey] = useState('')
  
  const handlePaymentSheet = async () => {
    // 后端提供接口（getPaymentSheetInfo）返回密钥相关信息
    getPaymentSheetInfo().then((res:any) => {
      const { code, body, message } = res
      if (code === '0000000') {
        setPublishableKey(body.publishableKey)
        initializePaymentSheet(body)
        return
      }
      Alert.alert('error', message)
    }).catch((error:any) => {
      Alert.alert('error', error)
    })
  }
  const initializePaymentSheet = async (body:any) => {
    const { error } = await initPaymentSheet({
      merchantDisplayName: "appName",
      customerId: body.customer,
      customerEphemeralKeySecret: body.ephemeralKey,
      setupIntentClientSecret: body.setupIntent,
    });
    openPaymentSheet()
  }
  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();
    if (error) {
      error.code !== 'Canceled' ? Alert.alert(`Error code: ${error.code}`, error.message) : ''
    } else {
      Alert.alert('Added success');
      // 调用后端接口获取已绑定的卡列表
    }
  }
}

````
**4、[测试环境提供测试卡](https://stripe.com/docs/testing?from_wecom=1)**

![Snipaste_2023-08-02_19-12-31](https://github.com/yang1212/collection-about/assets/17806205/71cc1699-f24f-48d1-805b-bd4835928080)


**5、[API密钥](https://stripe.com/docs/keys)**

* Stripe 会利用您账户的 API 密钥验证您的 API 请求。其中密钥分为公钥(pk_test)与私钥（sk_test)
* 客户端使用的publishableKey就是公钥(已pk_test开头)，需要注意后端接口返回是否正常，若错误返回的私钥会导致调用绑卡页面异常。

  <img width="745" alt="Snipaste_2023-08-02_19-03-46" src="https://github.com/yang1212/collection-about/assets/17806205/fac1cc16-efb9-41e5-ad8c-3b6eb2be016f">
  <img width="760" alt="Snipaste_2023-08-02_19-04-22" src="https://github.com/yang1212/collection-about/assets/17806205/0db7ce6e-6620-4777-94e7-5560c962b99c">


<br/>

### 参考资料
* [Stripe Github](https://github.com/stripe/stripe-react-native)
* [Stripe文档](https://stripe.com/docs/payments/save-and-reuse?platform=react-native&ui=payment-sheet#react-native-card-scanning)

<br/>