<script lang="ts" setup>
import { RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { supabase } from './utils/supabase'
import { useRouter } from 'vue-router'
import { useMetaStore } from '@/stores/meta'
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
  <v-app class="bg-[--primary-color]">
    <v-main>
      <v-container class="py-0 px-4">
        <RouterView />
      </v-container>
    </v-main>
    <BottomNavigation />
  </v-app>
</template>

<style lang="scss" scoped></style>
