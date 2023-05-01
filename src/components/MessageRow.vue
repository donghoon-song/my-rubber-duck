<template>
  <div class="flex items-start gap-2" :class="positionClass">
    <v-avatar>
      <v-img :src="message.user.avatar_img" alt="user avatar image"></v-img>
    </v-avatar>
    <chat-message :content="message.content"></chat-message>
  </div>
</template>

<script setup lang="ts">
import ChatMessage from './ChatMessage.vue'
import type { Message } from '@/types/message'
import { computed } from 'vue'

const props = defineProps({
  message: {
    type: Object as () => MessageWithUserImage,
    required: true
  },
  position: {
    type: String,
    default: 'left'
  }
})

const positionClass = computed(() => {
  return props.position === 'right' && 'flex-row-reverse'
})

interface MessageWithUserImage extends Message {
  user: {
    avatar_img: string
  }
}
</script>

<style scoped></style>
