import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/superheroes',
    name: 'Superheroes',
    component: () => import('@/views/Superheroes.vue')
  },
  {
    path: '/superheroes/:name/:id',
    name: 'Hero',
    component: () => import('@/views/Hero.vue')
  },
  {
    path: '/comics',
    name: 'Comics',
    component: () => import('@/views/Comics.vue')
  },
  {
    path: '/comics/:id',
    name: 'Comic',
    component: () => import('@/views/Comic.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
})

export default router
