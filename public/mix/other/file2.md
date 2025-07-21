## 1、什么是大模型

考试前背了所有题库的学霸，但完全不懂题目是什么意思，只能靠记忆硬套答案 😅

<br/>

🧠 既然大模型像一个靠“记忆”答题的学霸，那它是怎么衡量自己看了多少题、写了多少答案的呢？

这就引出了我们常听到的概念 —— tokens。

<br/>

## 2、什么是tokens

Tokens是处理大模型文本时的**基本单位。**

大模型不会像人一样按“字”或“词”来理解语言；

它会把一段文本切分成一个一个的 token ，然后逐个处理这些 token。

**举个🌰：**

![Image](https://github.com/user-attachments/assets/3507019b-78e7-432b-8a41-0c34e97f5b54)

**除此之外API费用也是Tokens的维度进行收费：**

👉 可以把它想象成：

你给 AI 看一段文字（输入 tokens），它给你返回一段回答（输出 tokens）

看得多、回得多 → 花钱多

![Image](https://github.com/user-attachments/assets/f6107316-e63e-4f1c-941b-af19f7d2f033)

<br/>

🧠 不同的学霸记忆力不同，有的能记住整本词典，有的只记得一页纸的内容。

下面我们就来看看这些“AI 学霸”都有谁，以及他们各自的特点。 

<br/>

## 3、全球主流模型

全球主流的大型语言模型（LLM）已有数百种，涵盖开源、闭源、通用和垂直领域模型。

| 模型名称                  | 所属公司               | 中文支持 | 上下文长度     | 是否可本地部署 | 优点                                         | 缺点                                 |
|---------------------------|------------------------|----------|----------------|----------------|----------------------------------------------|--------------------------------------|
| Claude 3 Opus / Sonnet      | Anthropic              | ✅        | 200k tokens    | ❌             | 逻辑推理强、长文本处理顶级                    | 成本高，中文理解一般                 |
| ChatGPT-4 / GPT-4o         | OpenAI                 | ✅（API） | 128k tokens    | ❌             | 英文生态最强，插件丰富                        | 中文理解不如国产模型                 |
| Qwen3                     | 阿里巴巴（通义实验室） | ✅✅✅     | 128k tokens    | ✅（部分开源）  | 中文理解极佳，适合制造业文档生成               | 国际影响力有限                       |
| DeepSeek                  | DeepSeek AI            | ✅✅       | 64k~100k tokens| ✅（需申请）    | 性价比高，代码能力强                          | 生态资源较少                         |
| KIMI（Kimi Chat）          | 月之暗面（Moonshot AI）| ✅✅✅     | 100k tokens    | ✅（需申请）    | 中文理解好，长文本处理强                        | 商业 API 调用门槛略高               |
| 豆包（Doubao）             | 字节跳动               | ✅✅       | 32k tokens     | ❌             | 使用免费，界面友好                             | 功能偏轻量，不适合深度开发           |
| GLM-4 / GLM-Edge           | 智谱 AI               | ✅✅       | 32k tokens     | ✅（开源）      | 支持代码生成、对话、多模态                     | 社区活跃度不如 Qwen                 |
| 讯飞星火 Spark 3.5        | 科大讯飞               | ✅✅✅     | 16k tokens     | ✅（商业授权）   | 语音识别强，适合教育和制造业场景               | 海外影响力有限                       |
| 文心一言 4.5+             | 百度                   | ✅✅       | 16k tokens     | ⚠️              | 百度生态支持                                  | 开放性较弱                           |
| Llama 3                   | Meta                   | ⚠️        | 8k~32k tokens  | ✅（开源）      | 开源生态最好，适合研究与本地部署                | 中文支持较弱                         |

<br/>

🧠 了解了市面上常见的 AI 大模型，也知道了它们的中文支持、上下文长度和费用差异。

那么，我们该如何真正地“用上”这些模型呢？

主要有两种方式：

一种是**写好提示词（Prompt）来引导 AI 输出更准确的结果**,    另一种是是通过 **API 接口调用**。 

<br/>

## 4、使用大模型

### ✅ Prompt 工程（提示词工程）

👉 1. 什么是 Prompt 工程？
* 就是研究如何写提示词，让 AI 输出更准、更好、更快。
* 类似“怎么给 AI 写清楚需求”，才能得到靠谱的回答。

👉 2. Prompt 工程的基本结构 

举个🌰：

| 部分       | 说明                     | 示例                           |
|------------|--------------------------|--------------------------------|
| 角色设定   | 让 AI 明白它是谁         | “你是一个 Vue3 开发专家”        |
| 任务描述   | 明确你要它做什么         | “写一个工序管理页面”           |
| 输入内容   | 提供上下文信息           | “字段有：编号、名称、设备号、标准工时、负责人” |
| 格式要求   | 输出什么格式？语言？代码？表格？ | “使用 Vue 单文件组件，包含 template 和 script setup” |
| 示例输出   | 可选，给个例子更好       | “比如展示一个表格和响应式数据”   |
| 限制条件   | 控制输出范围             | “不要使用高级特性，保持简洁”     |


<br/>

### ✅ API 接口调用

**步骤 1：注册 AI 平台账号并获取 API Key**

示例：Qwen3 注册流程
* 访问 [Qwen3 官网](https://qwen.aliyun.com/)
* 注册阿里云账号
* 创建项目并获取 DashScope API Key

**步骤 2：在后端封装 AI 调用服务**

示例：Spring Boot 中封装 Qwen3 API 调用
```
@Service
public class AiService {

    private final String apiKey = "YOUR_QWEN3_API_KEY";
    private final RestTemplate restTemplate = new RestTemplate();

    public String generateCode(String prompt) {
        // 构造请求 JSON
        Map<String, Object> request = new HashMap<>();
        request.put("prompt", prompt);

        // 发送 POST 请求到 Qwen3 API
        ResponseEntity<String> response = restTemplate.postForEntity(
            "https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation ",
            request,
            String.class
        );

        return response.getBody();
    }
}
```


**步骤 3：前端通过后端接口调用 AI 功能**

示例：Vue3 中调用后端服务
```javascript

function callAi(prompt) {
  axios.post('/api/ai/generate', { prompt })
       .then(res => {
         codeResult.value = res.data;
       });
}
```

<br/>

## 5、附录

主流大模型官网链接，方便查阅

| 模型名称                  | 所属公司               | 官网链接                                      |
|---------------------------|------------------------|-----------------------------------------------|
| Claude 3 Opus / Sonnet      | Anthropic              | [https://claude.ai ](https://claude.ai )           |
| ChatGPT-4 / GPT-4o         | OpenAI                 | [https://openai.com ](https://openai.com )         |
| Qwen3                     | 阿里巴巴（通义实验室） | [https://qwen.aliyun.com ](https://qwen.aliyun.com ) |
| DeepSeek                  | DeepSeek AI            | [https://www.deepseek.com ](https://www.deepseek.com ) |
| KIMI（Kimi Chat）          | 月之暗面（Moonshot AI）| [https://kimi.moonshot.cn ](https://kimi.moonshot.cn ) |
| 豆包（Doubao）             | 字节跳动               | [https://www.doubao.com ](https://www.doubao.com ) |
| GLM-4 / GLM-Edge           | 智谱 AI               | [https://www.zhipuai.cn ](https://www.zhipuai.cn ) |
| 讯飞星火 Spark 3.5        | 科大讯飞               | [https://spark-api-open.xf-yun.com ](https://spark-api-open.xf-yun.com ) |
| 文心一言 4.5+             | 百度                   | [https://yiyan.baidu.com ](https://yiyan.baidu.com ) |
| Llama 3                   | Meta                   | [https://ai.meta.com/llama/ ](https://ai.meta.com/llama/ ) |

<br/>

