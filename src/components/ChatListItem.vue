<template>
  <div class="flex items-center gap-2 rounded-full bg-[#FFF9C4] h-12 p-2">
    <v-avatar>
      <v-img :src="IMAGE_URL.RUBBER_DUCK_AVATAR" alt="rubber duck avatar image"></v-img>
    </v-avatar>
    <div class="text-2xl">
      {{ chat.topic }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Chat } from '@/types/chat'
import { IMAGE_URL } from '@/utils/constants/image.js'

defineProps<{
  chat: Chat
}>()
</script>

<style></style>
