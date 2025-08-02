<template>
  <div class="policy-page">
    <header class="page-header">
      <h1>隐私政策</h1>
    </header>
    <main class="page-content">
      <section class="policy-section">
        <h2>1. 引言</h2>
        <p>欢迎访问我们的网站。我们重视您的隐私，并致力于保护您的个人信息。本隐私政策旨在帮助您了解我们如何收集、使用和保护您提供的信息。</p>
      </section>

      <section class="policy-section">
        <h2>2. 信息收集与使用</h2>
        <p>当您访问我们的网站时，我们可能会收集以下类型的信息：</p>
        <ul>
          <li><strong>个人识别信息</strong>：当您联系我们或注册账户时，可能会收集您的姓名、电子邮件地址等。</li>
          <li><strong>使用数据</strong>：我们可能会收集有关您如何使用我们网站的信息，例如访问的页面、点击的链接等。</li>
          <li><strong>设备信息</strong>：我们可能会收集有关您使用的设备的信息，例如IP地址、浏览器类型、操作系统等。</li>
        </ul>
      </section>

      <section class="policy-section">
        <h2>3. 信息存储与保护</h2>
        <p>我们采用适当的技术和组织措施来保护您的个人信息免受未经授权的访问、使用或披露。您的信息将仅在实现本隐私政策所述目的所需的时间内保留。</p>
      </section>

      <section class="policy-section">
        <h2>4. 信息共享与披露</h2>
        <p>我们不会向第三方出售、交易或出租您的个人信息。我们可能会在以下情况下共享您的信息：</p>
        <ul>
          <li>获得您的明确许可</li>
          <li>遵守适用的法律、法规或法律程序</li>
          <li>保护我们的权利、财产或安全，以及我们用户或公众的权利、财产或安全</li>
        </ul>
      </section>

      <section class="policy-section">
        <h2>5. 您的权利</h2>
        <p>您有权访问、更正或删除我们持有的关于您的个人信息。如果您想行使这些权利，请通过以下联系方式与我们联系。</p>
      </section>

      <section class="policy-section">
        <h2>6. 变更通知</h2>
        <p>我们可能会不时更新本隐私政策。当我们进行更改时，我们将更新本页面上的隐私政策，并在适当情况下通知您。</p>
      </section>

      <section class="policy-section">
        <h2>7. 联系方式</h2>
        <p>如果您对本隐私政策有任何疑问或 concerns，请通过以下方式与我们联系：</p>
        <p>电子邮件：<a href="mailto:tibooyang@gmail.com">tibooyang@gmail.com</a></p>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: 'PrivacyPolicy',
  metaInfo: {
    title: '隐私政策 - 个人知识库'
  }
}
</script>

<style scoped>
.policy-page {
  max-width: 1160px;
  margin: 0 auto;
  padding: 2rem;
}

.page-header {
  margin-bottom: 2rem;
  text-align: center;
}

.page-header h1 {
  font-size: 2.5rem;
  color: #2c3e50;
}

.policy-section {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.policy-section h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #34495e;
  border-bottom: 2px solid #f5f7fa;
  padding-bottom: 0.5rem;
}

.policy-section p {
  margin-bottom: 1rem;
  line-height: 1.6;
  color: #444;
}

.policy-section ul {
  margin-bottom: 1rem;
  padding-left: 1.5rem;
}

.policy-section li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.policy-section a {
  color: #1a73e8;
  text-decoration: none;
}

.policy-section a:hover {
  text-decoration: underline;
}
</style>