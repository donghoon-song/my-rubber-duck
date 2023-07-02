import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        showTopBar: false
      },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/chat/list',
      name: 'chatList',
      meta: {
        title: '채팅 목록',
        showBackButton: false
      },
      component: () => import('../views/ChatListView.vue')
    },
    {
      path: '/chat/:chatId',
      name: 'chat',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ChatView.vue')
    },
    {
      path: '/talk',
      name: 'talk',
      meta: {
        title: '학습하기',
        showBackButton: false
      },
      component: () => import('../views/TalkView.vue')
    }
  ]
})

export default router
