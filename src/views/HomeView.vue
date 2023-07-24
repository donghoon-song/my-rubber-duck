<script lang="ts" setup>
import { supabase } from '@/utils/supabase'
import { IMAGE_URL } from '@/utils/constants/image.js'
import { useRouter } from 'vue-router'
import { watch } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { getURL } from '@/utils/url'
import { onMounted } from 'vue'

const router = useRouter()
const useAuth = useAuthStore()

const isLoginSuccess = router.currentRoute.value.query.login === 'success'

onMounted(async () => {
  if (useAuth.getUserInfo) {
    router.push({ name: 'talk' })
  }
})

watch(
  () => useAuth.getUserInfo,
  (newVal) => {
    if (newVal) {
      router.push({ name: 'talk' })
    }
  }
)

async function googleSignIn() {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${getURL()}?login=success`
      }
    })
    if (error) {
      // 로그인 실패
      throw error
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function handleClickLoginButton() {
  try {
    await googleSignIn()
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <section class="flex flex-col items-center">
    <div class="flex flex-col items-center w-[70vw]">
      <h1 class="home-title">꽥! 챗</h1>
      <img class="mt-2" :src="IMAGE_URL.RUBBER_DUCK_PIXEL" alt="main-rubber-duck image" />

      <template v-if="isLoginSuccess"> 로그인 중입니다. </template>
      <template v-else>
        <button
          class="bg-black hover:bg-gray-500 text-white font-bold py-4 rounded-full w-full mt-4"
          @click="handleClickLoginButton"
        >
          구글 로그인
        </button>
      </template>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.home-title {
  @apply text-5xl font-bold text-center;
}
</style>
