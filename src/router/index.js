import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '../pages/HomePage.vue';
import CounterPage from '@/pages/CounterPage.vue';
import CalculatorPage from '@/pages/CalculatorPage.vue';
import { useAuthStore } from '@/stores/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/calculator',
      name: 'calculator',
      component: CalculatorPage
    },
    {
      path: '/counter',
      name: 'counter',
      component: CounterPage
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../pages/LoginPage.vue')
    },
    {
      path: '/post/:id',
      name: 'post',
      component: () => import('../pages/PostPage.vue')
    }
  ],
})

router.beforeEach( (to, from, next) => {
  const authStore = useAuthStore();
  console.log(authStore.isAuth())
  if (!authStore.isAuth() && to.name !== 'login') {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
