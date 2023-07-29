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
    <v-app-bar color="#ffd700" density="default" rounded="true" :elevation="0">
      <div class="flex flex-col items-center w-full">
        <h1 class="text-2xl">
          {{ useMeta.getMetaTitle }}
        </h1>
      </div>
    </v-app-bar>
    <v-main class="self-center w-full max-w-sm">
      <v-container class="py-0 px-4">
        <RouterView />
      </v-container>
    </v-main>
    <BottomNavigation />
  </v-app>
</template>

<style lang="scss" scoped></style>
