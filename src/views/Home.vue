<template>
  <div class="home" tabindex="0">
    <header class="hero">
      <div class="hero-content">
        <h1 class="title float-in">个人知识库</h1>
        <p class="subtitle float-in delay">记录学习，分享经验，持续成长</p>
      </div>
    </header>
    
    <main class="main-content">
      <section v-for="group in $root.$data.categoryGroups" :key="group.id" class="category-section">
        <h2 class="section-title">{{ group.name }}</h2>
        <div class="category-grid">
          <div  v-for="category in group.categories"
            :key="category.id">
            <a
              v-if="category.id === 'english'"
              class="category-card"
              href="/english"
              title="英语学习工具 - 提高单词记忆与语法能力"
            >
              <div class="card-content">
                <div class="card-icon">
                  <i :class="category.icon || 'fas fa-book'"></i>
                </div>
                <h3>英语学习</h3>
              </div>
            </a>
            <a
              v-else-if="category.id === 'books'"
              class="category-card"
              href="/books"
              title="书籍推荐 - 提高阅读能力与知识储备"
            >
              <div class="card-content">
                <div class="card-icon">
                  <i :class="category.icon || 'fas fa-book'"></i>
                </div>
                <h3>书籍推荐</h3>
              </div>
            </a>
            <router-link v-else-if="category.id === 'language'"
              :to="'/language/js'"
              class="category-card"
              title="编程语言 - 探索多种编程语言的魅力"
            >
              <div class="card-content">
                <div class="card-icon">            
                  <i :class="category.icon || 'fas fa-code'"></i>
                </div>
                <h3>{{ category.name }}</h3>
              </div>
            </router-link>

            <router-link v-else-if="category.id === 'framework'"
              :to="'/framework'"
              class="category-card"
              title="前端框架 - 深入了解现代前端开发技术"
            >
              <div class="card-content">
                <div class="card-icon">
                  <i :class="category.icon || 'fas fa-cubes'"></i>
                </div>
                <h3>{{ category.name }}</h3>
              </div>
            </router-link>
            <router-link v-else-if="category.id === 'engineering'"
              :to="'/engineering'"
              class="category-card"
              title="工程化 - 探索前端工程化的最佳实践"
            >
              <div class="card-content">
                <div class="card-icon">
                  <i :class="category.icon || 'fas fa-tools'"></i>
                </div>
                <h3>{{ category.name }}</h3>
              </div>
            </router-link>
            <router-link v-else-if="category.id === 'mix'"
              :to="'/mix'"
              class="category-card"
              title="混合 - 探索前端混合开发的最佳实践"
            >
              <div class="card-content">
                <div class="card-icon">
                  <i :class="category.icon || 'fas fa-code-branch'"></i>
                </div>
                <h3>{{ category.name }}</h3>
              </div>
            </router-link>  
            <router-link v-else-if="category.id === 'psychology'"
              :to="'/psychology'"
              class="category-card"
              title="心理学 - 探索人类思维与行为"
            >
              <div class="card-content">
                <div class="card-icon">
                  <i :class="category.icon || 'fas fa-brain'"></i>
                </div>
                <h3>{{ category.name }}</h3>
              </div>
            </router-link>
            <router-link v-else-if="category.id === 'tool'"
              :to="'/tools'"
              class="category-card"
              title="工具 - 提高工作效率与生活质量"
            >
              <div class="card-content">
                <div class="card-icon">
                  <i :class="category.icon || 'fas fa-wrench'"></i>
                </div>
                <h3>{{ category.name }}</h3>
              </div>
            </router-link>
            <a
              v-else
              href="https://ai-yu.org/"
              class="category-card"
            >
              <div class="card-content">
                <div class="card-icon">
                  <i :class="category.icon || 'fas fa-book'"></i>
                </div>
                <h3>{{ category.name }}</h3>
                <!-- <p>{{ category.description }}</p> -->
              </div>
            </a>
          </div>
        </div>
      </section>
      <section class="about" style="background: #fff;max-width: 1160px; margin: 0 auto; color: #444;padding: 2rem; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <h2 style="font-weight: 700; font-size: 2rem; margin-bottom: 0.5em;">🪴 关于我们</h2>
        <p style="font-size: 1.1rem; line-height: 1.6; margin-bottom: 1em;">
          欢迎来到 <strong style="color: #333;">yangfu.asia</strong> —— 一个持续更新的知识库。系统整理思考、阅读、学习与项目实践，内容涵盖：
        </p>
        <ul style="list-style: none; padding-left: 0; margin-bottom: 1.5em;">
          <li style="margin-bottom: 0.5em;">🌐 网站开发与技术笔记</li>
          <li style="margin-bottom: 0.5em;">📚 阅读摘录与书籍分类</li>
          <li style="margin-bottom: 0.5em;">✍️ 写作灵感与表达练习</li>
          <li style="margin-bottom: 0.5em;">🎯 自我管理与价值探索</li>
        </ul>

        <h2 style="font-weight: 600; font-size: 1.5rem; margin-bottom: 0.4em;margin-top:2em">💖 为什么创建这个网站？</h2>
        <p style="font-weight: 600; margin-bottom: 1em;margin-top:1em">写下的，才是自己的。</p>
        <p style="margin-bottom: 1em;">
          碎片的信息，不如结构的积累。将日常所见所思，逐步整理成一个清晰的知识网络 ——  
        </p>
        <p style="margin-bottom: 1em;">既是留给自己的长期记忆，也希望能为同样在路上的你提供启发。</p>
        <p style="margin-bottom: 1em;">
          本站大部分内容为原创笔记、分类整理或经验总结。部分引用内容均注明出处，若有遗漏，欢迎指正。
        </p>

        <p>
          如需交流、建议或合作，可发送邮件至：<strong style="color: #1a73e8;">tibooyang@gmail.com</strong>
        </p>
      </section>
    </main>
    
    <footer class="site-footer">
      <div class="footer-content">
        <p>&copy; {{ new Date().getFullYear() }} 个人知识库. 保留所有权利.</p>
        <div class="footer-links">
          <router-link to="/privacy-policy" class="footer-link">隐私政策</router-link>
          <span class="separator">|</span>
          <router-link to="/terms-of-service" class="footer-link">服务条款</router-link>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      searchQuery: '',
      timer: null,
      clickCount: 0,
      showStats: false,
      visitCount: 0,
      todayVisits: 0,
      averageTime: 0,
      visitStartTime: null,
      keySequence: '',
    }
  },
  methods: {
    updateStats() {
      const stats = JSON.parse(localStorage.getItem('siteStats') || '{}');
      const today = new Date().toLocaleDateString();
      
      if (!stats.firstVisit) {
        stats.firstVisit = Date.now();
        stats.totalVisits = 0;
        stats.dailyVisits = {};
        stats.totalTime = 0;
      }
      
      stats.totalVisits++;
      stats.dailyVisits[today] = (stats.dailyVisits[today] || 0) + 1;
      
      if (this.visitStartTime) {
        const visitDuration = (Date.now() - this.visitStartTime) / 1000 / 60;
        stats.totalTime += visitDuration;
      }
      
      this.visitCount = stats.totalVisits;
      this.todayVisits = stats.dailyVisits[today] || 0;
      this.averageTime = Math.round(stats.totalTime / stats.totalVisits * 10) / 10;
      
      localStorage.setItem('siteStats', JSON.stringify(stats));
    }
  },
  created() {
    this.visitStartTime = Date.now();
    this.updateStats();
    window.addEventListener('beforeunload', this.updateStats);
  },
  beforeDestroy() {
    this.updateStats();
    window.removeEventListener('beforeunload', this.updateStats);
  }
}
</script>

<style scoped>
.home {
  min-height: 100vh;
  background: #f5f7fa;
}
.email-box {
  text-align: right;
  color:#fff;
  font-weight: bold;
  position: relative;
  top: -30px;
  right: 15px;
  font-size: 16px;
}
.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 80px 20px;
  color: white;
  text-align: center;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 700px;
  margin: auto;
}

.title {
  font-size: 3.6rem;
  font-weight: 900;
  margin-bottom: 0.5rem;
  opacity: 0;
  animation: fadeInUp 1s forwards;
}

.subtitle {
  font-size: 1.5rem;
  opacity: 0;
  animation: fadeInUp 1s 0.6s forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;
}

.category-section {
  margin-bottom: 60px;
}

.section-title {
  font-size: 2em;
  color: #2c3e50;
  margin-bottom: 30px;
  position: relative;
  padding-left: 15px;
}

.section-title::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 24px;
  background: #667eea;
  border-radius: 2px;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
}

.category-card {
  text-decoration: none;
  color: inherit;
}

.card-content {
  background: white;
  border-radius: 12px;
  padding: 30px;
  height: 100%;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.category-card:hover .card-content {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.card-icon {
  width: 50px;
  height: 50px;
  background: #f0f4ff;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5em;
  color: #667eea;
  margin-bottom: 5px;
}

.card-content h3 {
  font-size: 1.3em;
  color: #2c3e50;
  margin: 0;
}

.card-content p {
  color: #666;
  line-height: 1.6;
  flex-grow: 1;
}

.article-count {
  color: #667eea;
  font-size: 0.9em;
  font-weight: 500;
}

@media (max-width: 768px) {
  .hero {
    padding: 40px 20px;
  }

  .hero h1 {
    font-size: 2em;
  }

  .time-display {
    flex-wrap: wrap;
    gap: 15px;
  }

  .time-unit {
    padding: 10px 15px;
    min-width: 80px;
  }

  .time-number {
    font-size: 2em;
  }

  .time-separator {
    display: none;
  }

  .main-content {
    padding: 30px 15px;
  }

  .category-grid {
    grid-template-columns: 1fr;
  }

  .section-title {
    font-size: 1.6em;
  }
}

.stats-panel {
  position: fixed;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  animation: slideIn 0.3s ease;
}

.stats-content h3 {
  margin: 0 0 15px 0;
  color: #2c3e50;
  font-size: 1.2em;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}

.stats-item {
  text-align: center;
}

.stats-value {
  font-size: 1.8em;
  font-weight: 600;
  color: #667eea;
  margin-bottom: 5px;
}

.stats-label {
  font-size: 0.9em;
  color: #666;
}

@keyframes slideIn {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.stats-overlay {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 15px;
  margin-top: 15px;
  display: flex;
  gap: 20px;
  animation: fadeIn 0.3s ease;
}

.stats-overlay .stats-item {
  text-align: center;
  min-width: 80px;
}

.stats-overlay .stats-number {
  display: block;
  font-size: 1.5em;
  font-weight: 600;
  margin-bottom: 5px;
}

.stats-overlay .stats-label {
  font-size: 0.8em;
  opacity: 0.8;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translate(-50%, -10px);
  }
  to {
    opacity: 1;
    transform: translate(-50%, 0);
  }
}

/* 漂浮动画 */
@keyframes floatUpDown {
  0%, 100% {
    transform: translateY(-10px);
  }
  50% {
    transform: translateY(10px);
  }
}

/* 标题漂浮 */
.floating-text {
  animation: floatUpDown 3.5s ease-in-out infinite;
  margin: 0;
  color: white;
  text-shadow: 0 2px 8px rgba(0,0,0,0.3);
}

.floating-text.delay {
  animation-delay: 1.5s;
  font-weight: 400;
  font-size: 1.3rem;
  margin-top: 8px;
}
.site-footer {
  background-color: #2c3e50;
  color: white;
  padding: 2rem 0;
  margin-top: 3rem;
}

.footer-content {
  max-width: 1160px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.footer-links {
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
}

.footer-link {
  color: white;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-link:hover {
  color: #667eea;
}

.separator {
  color: rgba(255, 255, 255, 0.5);
}
</style>