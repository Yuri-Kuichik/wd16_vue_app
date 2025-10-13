import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '../pages/HomePage.vue';
import CounterPage from '@/pages/CounterPage.vue';
import CalculatorPage from '@/pages/CalculatorPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
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
      path: '/post/post-not-found',
      name: 'postNotFound',
      component: () => import('../pages/PostNotFoundPage.vue')
    },
    {
      path: '/post/:id',
      name: 'post',
      component: () => import('../pages/PostPage.vue')
    }
  ],
})

export default router
