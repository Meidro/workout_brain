import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import StartPage from '@/views/StartPage.vue'
import GamePage from '@/views/GamePage.vue'

const routes: Array<RouteRecordRaw> = [
   {
      path: '/',
      component: StartPage,
   },
   {
      path: '/game',
      component: GamePage,
   },
]

const router = createRouter({
   history: createWebHistory(process.env.BASE_URL),
   routes,
})

export default router
