<template>
  <div class="mb-2 text-center">
    <div class="text-2xl">
      <span class="text-[#0027ff]">{{ topic }}</span
      >에 대해 설명해주세요.
    </div>
  </div>
  <div class="text-center">
    <audio-recorder @finish-recording="handleFinishRecording" />
  </div>
  <button
    class="bg-black hover:bg-gray-500 text-white font-bold py-4 rounded-full px-8 mt-4 w-full"
    @click="handleClickFinishButton"
  >
    종료
  </button>
</template>

<script setup lang="ts">
import AudioRecorder from '@/components/AudioRecorder.vue'
import { IMAGE_URL } from '@/utils/constants/image.js'
import { ref } from 'vue'

const recordData = ref({})

defineProps<{
  topic: string
}>()

const emit = defineEmits(['finish-talk'])

function handleClickFinishButton() {
  emit('finish-talk', recordData.value)
}

const handleFinishRecording = (data: { duration: number }) => {
  recordData.value = data
}
</script>

<style></style>
