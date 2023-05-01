<template>
  <div class="bg-[#00ced1] rounded-xl py-1 px-2 text-white">
    {{ content }}
  </div>
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
