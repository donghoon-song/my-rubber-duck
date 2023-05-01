<template>
  <div class="flex items-end">
    <v-avatar class="mr-2">
      <v-img :src="message.user.avatar_img" alt="user avatar image"></v-img>
    </v-avatar>
    <chat-message :content="message.content"></chat-message>
  </div>
</template>

<script setup lang="ts">
import ChatMessage from './ChatMessage.vue'
import type { Message } from '@/types/message'

interface MessageWithUserImage extends Message {
  user: {
    avatar_img: string
  }
}

defineProps({
  message: {
    type: Object as () => MessageWithUserImage,
    required: true
  }
})
</script>

<style scoped></style>
