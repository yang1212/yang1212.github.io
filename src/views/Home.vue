<template>
  <div class="home" @keydown="handleKeyPress" tabindex="0">
    <header class="hero">
      <div class="hero-content">
        <h1>个人知识库</h1>
        <p class="subtitle">记录学习，分享经验，持续成长</p>
        <div class="time-display" @click="handleTimeClick">
          <div class="time-unit">
            <span class="time-number">{{ currentTime.hours }}</span>
            <span class="time-label">时</span>
          </div>
          <div class="time-separator">:</div>
          <div class="time-unit">
            <span class="time-number">{{ currentTime.minutes }}</span>
            <span class="time-label">分</span>
          </div>
          <div class="time-separator">:</div>
          <div class="time-unit">
            <span class="time-number">{{ currentTime.seconds }}</span>
            <span class="time-label">秒</span>
          </div>
        </div>
        <div class="search-box">
          <input type="text" placeholder="搜索文章..." v-model="searchQuery">
          <button class="search-btn">
            <i class="fas fa-search"></i>
          </button>
        </div>
      </div>
    </header>

    <main class="main-content">
      <section v-for="group in $root.$data.categoryGroups" :key="group.id" class="category-section">
        <h2 class="section-title">{{ group.name }}</h2>
        <div class="category-grid">
          <router-link
            v-for="category in group.categories"
            :key="category.id"
            :to="'/category/' + category.id"
            class="category-card"
          >
            <div class="card-content">
              <div class="card-icon">
                <i :class="category.icon || 'fas fa-book'"></i>
              </div>
              <h3>{{ category.name }}</h3>
              <!-- <p>{{ category.description }}</p> -->
            </div>
          </router-link>
        </div>
      </section>
    </main>

    <div v-if="showStats" class="stats-panel">
      <div class="stats-content">
        <h3>访问统计</h3>
        <div class="stats-grid">
          <div class="stats-item">
            <div class="stats-value">{{ visitCount }}</div>
            <div class="stats-label">总访问量</div>
          </div>
          <div class="stats-item">
            <div class="stats-value">{{ todayVisits }}</div>
            <div class="stats-label">今日访问</div>
          </div>
          <div class="stats-item">
            <div class="stats-value">{{ averageTime }}分钟</div>
            <div class="stats-label">平均访问时长</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      searchQuery: '',
      currentTime: {
        hours: '00',
        minutes: '00',
        seconds: '00'
      },
      timer: null,
      clickCount: 0,
      clickTimer: null,
      showStats: false,
      visitCount: 0,
      todayVisits: 0,
      averageTime: 0,
      visitStartTime: null,
      keySequence: '',
    }
  },
  methods: {
    updateTime() {
      const now = new Date();
      this.currentTime = {
        hours: String(now.getHours()).padStart(2, '0'),
        minutes: String(now.getMinutes()).padStart(2, '0'),
        seconds: String(now.getSeconds()).padStart(2, '0')
      };
    },
    handleTimeClick() {
      this.clickCount++;
      
      // 清除之前的定时器
      if (this.clickTimer) {
        clearTimeout(this.clickTimer);
      }
      
      // 设置新的定时器，1.5秒后重置点击计数
      this.clickTimer = setTimeout(() => {
        this.clickCount = 0;
      }, 1500);
      
      // 如果连续点击5次，切换统计面板显示状态
      if (this.clickCount === 5) {
        this.showStats = !this.showStats;
        this.clickCount = 0;
        if (this.showStats) {
          this.updateStats();
        }
      }
    },
    handleKeyPress(event) {
      this.keySequence += event.key;
      if (this.keySequence.length > 5) {
        this.keySequence = this.keySequence.substring(1);
      }
      // 当输入 'stats' 时显示统计面板
      if (this.keySequence === 'stats') {
        this.showStats = !this.showStats;
        this.keySequence = '';
      }
    },
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
    this.updateTime();
    this.timer = setInterval(this.updateTime, 1000);
    this.visitStartTime = Date.now();
    this.updateStats();
    window.addEventListener('beforeunload', this.updateStats);
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    if (this.clickTimer) {
      clearTimeout(this.clickTimer);
    }
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

.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 80px 20px;
  color: white;
  text-align: center;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero h1 {
  font-size: 3em;
  margin-bottom: 20px;
  font-weight: bold;
}

.subtitle {
  font-size: 1.2em;
  margin-bottom: 30px;
  opacity: 0.9;
}

.time-display {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-bottom: 40px;
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.time-unit {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 15px 20px;
  min-width: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.3s ease;
}

.time-unit:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.time-number {
  font-size: 2.8em;
  font-weight: 600;
  line-height: 1;
  margin-bottom: 5px;
  color: white;
}

.time-label {
  font-size: 0.9em;
  opacity: 0.8;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.time-separator {
  font-size: 2.8em;
  font-weight: 300;
  opacity: 0.5;
  margin-top: -10px;
}

.search-box {
  display: flex;
  max-width: 500px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 50px;
  padding: 6px;
  transition: all 0.3s ease;
}

.search-box:hover {
  background: rgba(255, 255, 255, 0.2);
}

.search-box input {
  flex: 1;
  border: none;
  padding: 12px 20px;
  font-size: 1.1em;
  background: transparent;
  outline: none;
  color: white;
}

.search-box input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

.search-btn {
  background: white;
  color: #667eea;
  border: none;
  padding: 12px 25px;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.1em;
}

.search-btn:hover {
  background: #f8f9fa;
  transform: translateY(-1px);
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
</style> 