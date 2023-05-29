<template>
  <!-- TODO: tailwind 색상값 변경 -->
  <div class="bg-[#ffaa39] rounded-xl py-1 px-3 text-white" v-html="content"></div>
</template>

<script setup lang="ts">
import type { Message } from '@/types/message'

// TODO : String as () => Pick<Message, 'content'>이 왜 안되는지 알아보기
defineProps({
  content: {
    type: String,
    required: true
  }
})
</script>

<style scoped></style>
