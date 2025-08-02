<template>
  <div class="terms-page">
    <header class="page-header">
      <h1>服务条款</h1>
    </header>
    <main class="page-content">
      <section class="terms-section">
        <h2>1. 接受条款</h2>
        <p>通过访问或使用我们的网站，您同意遵守本服务条款。如果您不同意本条款的任何部分，请不要使用我们的网站。</p>
      </section>

      <section class="terms-section">
        <h2>2. 服务描述</h2>
        <p>我们的网站提供个人知识库服务，包括但不限于文章浏览、资源下载、信息查询等功能。我们保留随时修改、暂停或终止服务的权利，无需事先通知。</p>
      </section>

      <section class="terms-section">
        <h2>3. 用户责任</h2>
        <p>作为用户，您同意：</p>
        <ul>
          <li>遵守所有适用的法律法规</li>
          <li>不利用我们的服务进行任何非法活动</li>
          <li>不侵犯他人的知识产权或其他权利</li>
          <li>不干扰或破坏我们的服务或服务器</li>
        </ul>
      </section>

      <section class="terms-section">
        <h2>4. 知识产权</h2>
        <p>我们网站上的所有内容，包括但不限于文本、图像、音频、视频、软件等，均受知识产权法律保护。未经我们书面许可，您不得复制、分发、修改或使用这些内容。</p>
      </section>

      <section class="terms-section">
        <h2>5. 免责声明</h2>
        <p>我们的服务按"原样"提供，不提供任何明示或暗示的担保。我们不保证服务的准确性、完整性或可靠性，也不保证服务将不间断或无错误。</p>
      </section>

      <section class="terms-section">
        <h2>6. 责任限制</h2>
        <p>在法律允许的最大范围内，我们不对任何间接、偶然、特殊或后果性的损害承担责任，无论这些损害是否由于使用或无法使用我们的服务而引起。</p>
      </section>

      <section class="terms-section">
        <h2>7. 条款变更</h2>
        <p>我们可能会不时更新本服务条款。当我们进行更改时，我们将更新本页面上的条款，并在适当情况下通知您。您继续使用我们的服务即表示您接受经修订的条款。</p>
      </section>

      <section class="terms-section">
        <h2>8. 适用法律</h2>
        <p>本服务条款将依据您所在国家/地区的法律进行解释与适用。因本条款引起的或与本条款有关的任何争议，双方应首先通过友好协商解决；协商不成的，任何一方均可向有管辖权的法院提起诉讼。</p>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: 'TermsOfService',
  metaInfo: {
    title: '服务条款 - 个人知识库'
  }
}
</script>

<style scoped>
.terms-page {
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

.terms-section {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.terms-section h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #34495e;
  border-bottom: 2px solid #f5f7fa;
  padding-bottom: 0.5rem;
}

.terms-section p {
  margin-bottom: 1rem;
  line-height: 1.6;
  color: #444;
}

.terms-section ul {
  margin-bottom: 1rem;
  padding-left: 1.5rem;
}

.terms-section li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}
</style>