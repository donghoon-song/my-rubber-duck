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
  <v-row>
    <v-col :cols="12">
      <section class="flex flex-col items-center">
        <h1 class="home-title">내 손 안의 고무오리</h1>
        <img class="mt-2 w-[70%]" :src="IMAGE_URL.RUBBER_DUCK_PIXEL" alt="main-rubber-duck image" />
        <div class="text-center">
          <div class="text-2xl text-center mb-4">내가 잘 알고 있는 게 맞을까...?</div>
          <div class="text-3xl text-center">언제 어디서든 무엇이든</div>
          <div class="text-3xl text-center mb-4">고무오리에게 설명해보세요.</div>
        </div>
        <template v-if="isLoginSuccess"> 로그인 중입니다. </template>
        <template v-else>
          <button
            class="bg-black hover:bg-gray-500 text-white font-bold py-4 rounded-full w-full mt-4"
            @click="handleClickLoginButton"
          >
            구글 로그인
          </button>
        </template>
      </section>
    </v-col>
  </v-row>
</template>

<style lang="scss" scoped>
.home-title {
  @apply text-4xl font-bold text-center;
}
</style>
