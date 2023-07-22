<script lang="ts" setup>
import { RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { supabase } from './utils/supabase'
import { useRouter } from 'vue-router'
import { useMetaStore } from '@/stores/meta'
import TopBar from './components/TopBar.vue'
import BottomNavigation from './components/BottomNavigation.vue'

const router = useRouter()

const auth = useAuthStore()
const useMeta = useMetaStore()

supabase.auth.onAuthStateChange((event, session) => {
  auth.setUserInfo(session?.user)
})

router.beforeEach((to, from, next) => {
  useMeta.resetMeta()
  useMeta.setMetaInfo({ ...useMeta.getMetaInfo, ...to.meta })

  next()
})
</script>

<template>
  <v-app>
    <main class="app-main">
      <div class="app-default-layout">
        <TopBar v-if="useMeta.getShowTopBar" />
        <div v-else class="h-16"></div>

        <RouterView />

        <BottomNavigation />
      </div>
    </main>
  </v-app>
</template>

<style lang="scss" scoped>
.app-main {
  background-color: var(--primary-color);
  min-height: 100dvh;
  @apply flex flex-col items-center;
}

.app-default-layout {
  @apply mx-6 max-w-sm;
}
</style>
