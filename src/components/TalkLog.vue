<template>
  <div class="flex items-center gap-2 rounded-full bg-[#FFF9C4] h-20 p-2 shadow-lg">
    <v-avatar>
      <v-img :src="IMAGE_URL.RUBBER_DUCK_LISTENING" alt="rubber duck avatar image"></v-img>
    </v-avatar>
    <div class="w-64 pr-3">
      <p class="break-keep text-ellipsis line-clamp-2">
        {{ talk.topic }}에 대해 {{ durationMinutes }} {{ durationSeconds }}동안 설명했어요!
      </p>
      <div class="text-xs text-right">
        {{ formatTime(talk.created_at, 'YYYY-MM-DD hh:mm') }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Talk } from '@/types/talk'
import { IMAGE_URL } from '@/utils/constants/image.js'
import { formatTime } from '@/utils/time'
import { secondsToTime } from '@/utils/time'
import { computed } from 'vue'

const props = defineProps<{ talk: Talk }>()

const durationMinutes = computed(() => {
  const minutes = secondsToTime(props.talk.duration).minutes
  return minutes > 0 ? `${minutes}분` : ''
})

const durationSeconds = computed(() => {
  const seconds = secondsToTime(props.talk.duration).seconds
  return seconds > 0 ? `${seconds}초` : ''
})
</script>

<style scoped></style>
