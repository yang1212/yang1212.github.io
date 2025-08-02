import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '../views/Home.vue'
import ArticleList from '../views/ArticleList.vue'
import ArticleDetail from '../views/ArticleDetail.vue'
import FileViewer from '../views/FileViewer.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
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
      path: '/docs/:categoryId*',
      name: 'docsList',
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
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('../views/About.vue')
    },
    {
      path: '/psychology',
      name: 'Psychology',
      component: () => import('../views/Psychology.vue')
    },
    {
      path: '/language/:type/:file?',
      name: 'Language',
      component: () => import('../views/Language.vue'),
      props: true
    },
    {
      path: '/framework',
      name: 'Framework',
      component: () => import('../views/Framework.vue')
    },
    {
      path: '/engineering',
      name: 'Engineering',
      component: () => import('../views/Engineering.vue')
    },
    {
      path: '/mix',
      name: 'Mix',
      component: () => import('../views/Mix.vue')
    },
    {
      path: '/tools',
      name: 'Tools',
      component: () => import('../views/Tools.vue')
    },
    {
      path: '/privacy-policy',
      name: 'PrivacyPolicy',
      component: () => import('../views/PrivacyPolicy.vue')
    },
    {
      path: '/terms-of-service',
      name: 'TermsOfService',
      component: () => import('../views/TermsOfService.vue')
    }
  ]
})