import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../view/HomePage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/product',
    name: 'product',
    component: () => import('../view/ProductPage.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
