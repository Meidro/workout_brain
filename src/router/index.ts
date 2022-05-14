import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'

const routes: Array<RouteRecordRaw> = [
   // {
   //   path: '/',
   //   name: 'home',
   //   component: HomeView
   // },
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
