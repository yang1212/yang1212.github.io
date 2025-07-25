<template>
  <div class="about-page">
    <transition name="fade-slide" appear>
      <div class="content">
        <h1>关于我们</h1>
        <p>
          欢迎来到 <strong>www.yangfu.asia</strong> —— 一个持续更新的个人知识库。
        </p>

        <p>
          这里是对思考、阅读、学习与项目实践的系统整理，内容涵盖：
        </p>

        <ul>
          <li>📚 阅读摘录与书籍分类</li>
          <li>🌐 网站开发与技术笔记</li>
          <li>✍️ 写作灵感与表达练习</li>
          <li>🎯 自我管理与价值探索</li>
        </ul>

        <h2>📝 为什么创建这个网站？</h2>
        <p>
          写下的，才是自己的。
          <br />
          碎片的信息不如结构的积累，本站旨在将日常所见所思，逐步整理成一个清晰的知识网络——既是留给自己的长期记忆，也希望能为同样在路上的你提供些许启发。
        </p>

        <h2>📌 内容说明</h2>
        <p>
          本站大部分内容为原创笔记、分类整理或经验总结。部分引用内容均注明出处，若有遗漏，欢迎指出。
        </p>

        <h2>📬 联系方式</h2>
        <p>
          如需交流、建议或合作，可发送邮件至：
          <br />
          <code>tibooyang@gmail.com</code>
        </p>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'AboutPage'
}
</script>

<style scoped>
.about-page {
  background: #f9fafb;
  color: #333;
  min-height: 100vh;
  padding: 3rem 1.5rem;
  font-size: 17px;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  line-height: 1.8;
  display: flex;
  justify-content: center;
}

.content {
  max-width: 800px;
  width: 100%;
}

h2 {
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  font-size: 1.3rem;
  color: #2563eb;
  border-left: 4px solid #93c5fd;
  padding-left: 0.5rem;
  background-color: #eff6ff;
  border-radius: 4px;
}

ul {
  list-style: none;
  padding-left: 0;
  margin-top: 1rem;
}

ul li {
  margin: 0.4rem 0;
  padding-left: 1.2em;
  position: relative;
}

ul li::before {
  content: '🔹';
  position: absolute;
  left: 0;
  top: 0;
}

code {
  background-color: #f3f4f6;
  padding: 2px 5px;
  border-radius: 3px;
  font-family: monospace;
  color: #1f2937;
}

.fade-slide-enter-active {
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.fade-slide-enter-to {
  opacity: 1;
  transform: translateY(0);
}
</style>
