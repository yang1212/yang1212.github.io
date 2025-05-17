<template>
  <div id="app">
    <nav class="navbar">
      <div class="nav-content">
        <router-link to="/" class="logo">
          个人知识库
        </router-link>
        <div class="nav-categories">
          <div class="category-group" v-for="group in categoryGroups" :key="group.id">
            <div class="category-trigger" @mouseenter="group.isOpen = true" @mouseleave="group.isOpen = false">
              {{ group.name }}
              <span class="arrow" :class="{ 'arrow-open': group.isOpen }">▼</span>
              <div class="dropdown-menu" v-show="group.isOpen">
                <router-link 
                  v-for="category in group.categories" 
                  :key="category.id"
                  :to="'/category/' + category.id"
                  class="dropdown-item"
                  @click.native="group.isOpen = false"
                >
                  {{ category.name }}
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      categoryGroups: [
        {
          id: 'programming',
          name: '编程开发',
          isOpen: false,
          categories: [
            { id: 'frontend', name: '前端开发', description: '前端框架、工具和最佳实践' },
            { id: 'backend', name: '后端开发', description: '服务端技术和架构设计' },
            { id: 'mobile', name: '移动开发', description: '移动应用开发技术和经验' },
            { id: 'database', name: '数据库', description: '数据库设计和优化' },
            { id: 'architecture', name: '架构设计', description: '系统架构设计和最佳实践' }
          ]
        },
        {
          id: 'tools',
          name: '工具效率',
          isOpen: false,
          categories: [
            { id: 'dev-tools', name: '开发工具', description: '提升开发效率的各类工具' },
            { id: 'productivity', name: '效率工具', description: '让工作更高效的软件和方法' },
            { id: 'cli-tools', name: '命令行工具', description: '常用命令行工具使用技巧' },
            { id: 'ide', name: '编辑器', description: '代码编辑器和 IDE 使用指南' }
          ]
        },
        {
          id: 'learning',
          name: '学习成长',
          isOpen: false,
          categories: [
            { id: 'english', name: '英语学习', description: '提升英语水平的方法和资源' },
            { id: 'reading', name: '读书笔记', description: '技术书籍和经典著作笔记' },
            { id: 'career', name: '职业发展', description: '职业规划和成长经验' },
            { id: 'interview', name: '面试总结', description: '技术面试经验和解题思路' }
          ]
        }
      ]
    }
  },
  created() {
    // Share categoryGroups with all child components
    this.$root.$data.categoryGroups = this.categoryGroups;
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  background: #f5f7fa;
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.navbar {
  background: white;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-size: 1.5em;
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}

.nav-categories {
  display: flex;
  gap: 30px;
}

.category-group {
  position: relative;
}

.category-trigger {
  color: #2c3e50;
  cursor: pointer;
  padding: 5px 0;
  display: flex;
  align-items: center;
  gap: 5px;
}

.arrow {
  font-size: 0.8em;
  transition: transform 0.3s ease;
}

.arrow-open {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 8px 0;
  min-width: 160px;
  margin-top: 10px;
}

.dropdown-menu::before {
  content: '';
  position: absolute;
  top: -6px;
  left: 50%;
  transform: translateX(-50%);
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 6px solid white;
}

.dropdown-item {
  display: block;
  padding: 8px 16px;
  color: #2c3e50;
  text-decoration: none;
  transition: background-color 0.3s ease;
  white-space: nowrap;
}

.dropdown-item:hover {
  background-color: #f5f7fa;
}

@media (max-width: 768px) {
  .nav-content {
    flex-direction: column;
    height: auto;
    padding: 15px 20px;
  }

  .logo {
    margin-bottom: 15px;
  }

  .nav-categories {
    width: 100%;
    flex-direction: column;
    gap: 10px;
  }

  .category-trigger {
    width: 100%;
    justify-content: space-between;
    padding: 10px;
    background: #f5f7fa;
    border-radius: 6px;
  }

  .dropdown-menu {
    position: static;
    transform: none;
    box-shadow: none;
    margin-top: 5px;
    margin-left: 10px;
    border-left: 2px solid #e0e0e0;
  }

  .dropdown-menu::before {
    display: none;
  }

  .dropdown-item {
    padding: 8px 16px;
  }
}

@media print {
  .navbar {
    display: none !important;
  }
}
</style>
