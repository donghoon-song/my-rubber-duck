<script lang="ts" setup>
import { supabase } from '@/utils/supabase'

async function googleSignIn() {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/chat/list`
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
    <h1 class="home-title">Quack Chat</h1>
    <img
      class="mt-2"
      src="https://drpdbryplxlouwfdwkvh.supabase.co/storage/v1/object/public/assets/public/main-rubber-duck.png"
      alt="main-rubber-duck image"
    />

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
