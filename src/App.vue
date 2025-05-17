<template>
  <div id="app">
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
            { id: 'language', name: '前端｜语言', description: '前端框架、工具和最佳实践' },
            { id: 'framework', name: '前端｜框架', description: '服务端技术和架构设计' },
            { id: 'engineering', name: '前端｜工程化', description: '移动应用开发技术和经验' },
            { id: 'mix', name: '前端｜混合', description: '数据库设计和优化' },
          ]
        },
        {
          id: 'tools',
          name: '工具效率',
          isOpen: false,
          categories: [
            { id: 'dev-tools', name: '开发工具', description: '提升开发效率的各类工具' },
          ]
        },
        {
          id: 'learning',
          name: '学习成长',
          isOpen: false,
          categories: [
            { id: 'english', name: '英语学习', description: '提升英语水平的方法和资源' },
            { id: 'ai', name: 'AI 素材', description: '人工智能相关资源' }
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

@media print {
  #app {
    background: white;
  }
}
</style>
