<script lang="ts" setup>
import { RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { supabase } from './utils/supabase'
import { useRouter } from 'vue-router'
import { useMetaStore } from '@/stores/meta'
import TopBar from './components/TopBar.vue'

const router = useRouter()

const auth = useAuthStore()
const useMeta = useMetaStore()

supabase.auth.onAuthStateChange((event, session) => {
  auth.setUserInfo(session?.user)
})

router.beforeEach((to, from, next) => {
  if (Object.keys(to.meta).length > 0) {
    useMeta.setMetaInfo({ ...useMeta.getMetaInfo, ...to.meta })
  } else {
    useMeta.resetMeta()
  }
  next()
})
</script>

<template>
  <main class="app-main">
    <TopBar />

    <div class="app-default-layout">
      <RouterView />
    </div>
  </main>
</template>

<style lang="scss" scoped>
.app-main {
  background-color: var(--primary-color);
  height: 100vh;
  overflow: hidden;
}

.app-default-layout {
  @apply mx-6;
}
</style>
