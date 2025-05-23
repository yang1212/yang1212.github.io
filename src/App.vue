<template>
  <div id="app">
    <nav-bar />
    <router-view/>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'

export default {
  name: 'App',
  components: {
    NavBar
  },
  data() {
    return {
      categoryGroups: [
        {
          id: 'programming',
          name: '编程开发',
          isOpen: false,
          categories: [
            { id: 'language', name: '前端｜语言', description: '' },
            { id: 'framework', name: '前端｜框架', description: '' },
            { id: 'engineering', name: '前端｜工程化', description: '' },
            { id: 'mix', name: '前端｜混合', description: '' },
          ]
        },
        {
          id: 'tools',
          name: '工具效率',
          isOpen: false,
          categories: [
            { id: 'dev-tools', name: '开发工具', description: '' },
          ]
        },
        {
          id: 'learning',
          name: '学习成长',
          isOpen: false,
          categories: [
            { id: 'english', name: '英语学习', description: '' },
            { id: 'ai', name: 'AI 素材', description: '' }
          ]
        }
      ]
    }
  },
  created() {
    // Share categoryGroups with all child components
    this.$root.$data.categoryGroups = this.categoryGroups;
    console.log(1111, process.env.VUE_APP_GH_TOKEN);
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
