<script lang="ts" setup>
import { supabase } from '@/utils/supabase'
import { IMAGE_URL } from '@/utils/constants/image.js'
import { getURL } from '@/utils/url'

async function googleSignIn() {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${getURL()}/chat/list`
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
  <div>
    <h1 class="home-title">꽥! 챗</h1>
    <img class="mt-2" :src="IMAGE_URL.RUBBER_DUCK_LISTENING" alt="main-rubber-duck image" />

    <button
      class="bg-black hover:bg-gray-500 text-white font-bold py-4 rounded-full w-full mt-4"
      @click="handleClickLoginButton"
    >
      구글 로그인
    </button>
    <div class="text-center"></div>
  </div>
</template>

<style lang="scss" scoped>
.home-title {
  @apply text-5xl font-bold text-center mt-6;
}
</style>
