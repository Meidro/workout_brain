import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'

import StartPage from '@/views/StartPage.vue'

const routes: Array<RouteRecordRaw> = [
   {
      path: '/',
      component: StartPage,
   },
   // {
   //   path: '/about',
   //   name: 'about',
   //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
   // }
]

const router = createRouter({
   history: createWebHistory(process.env.BASE_URL),
   routes,
})

export default router
