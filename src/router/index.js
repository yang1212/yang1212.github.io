import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '../views/Home.vue'
import ArticleList from '../views/ArticleList.vue'
import ArticleDetail from '../views/ArticleDetail.vue'
import FileViewer from '../views/FileViewer.vue'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePage
    },
    {
      path: '/category/:categoryId*',
      name: 'ArticleList',
      component: ArticleList,
      props: true
    },
    {
      path: '/article/:id*',
      name: 'ArticleDetail',
      component: ArticleDetail,
      props: true
    },
    {
      path: '/file/:path*',
      name: 'FileViewer',
      component: FileViewer,
      props: true
    }
  ]
})