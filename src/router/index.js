import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '../components/home.vue'
import AboutPage from '../components/about.vue'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/about',
      name: 'AboutPage',
      component: AboutPage
    }
  ]
})