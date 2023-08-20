<template>
  <div class="mb-4 text-center">
    <div class="text-2xl">
      <span class="text-[#0027ff]">{{ topic }}</span
      >에 대해 설명해주세요.
    </div>
  </div>
  <div class="text-center">
    <audio-recorder @finish-recording="handleFinishRecording" @exit-talk="$emit('exit-talk')" />
  </div>
</template>

<script setup lang="ts">
import AudioRecorder from '@/components/AudioRecorder.vue'

defineProps<{
  topic: string
}>()

const emit = defineEmits(['finish-talk', 'exit-talk'])

const handleFinishRecording = (data: { duration: number }) => {
  emit('finish-talk', data)
}
</script>

<style></style>
