<template>
  <div>
    <div class="max-h-100dvh overflow-y-scroll">
      <template v-if="step === 1">
        <div class="flex flex-col justify-center">
          <img
            class="mt-[4.5rem] mb-2"
            :src="IMAGE_URL.RUBBER_DUCK_LISTENING"
            alt="main-rubber-duck image"
          />
          <v-text-field
            v-model="topic"
            :hide-details="true"
            :readonly="isLoading"
            class="mb-4"
            clearable
            placeholder="고무오리에게 설명할 주제를 입력하세요."
          ></v-text-field>
          <button
            class="bg-black hover:bg-gray-500 text-white font-bold py-4 rounded-full px-8 mt-2 disabled:opacity-50"
            :disabled="!validateTopic()"
            @click="handleStartNewTalk"
          >
            다음
          </button>
        </div>
      </template>
      <template v-else-if="step === 2">
        <talk-recording-step :topic="topic" @finish-talk="handleFinishTalk" />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IMAGE_URL } from '@/utils/constants/image.js'
import { ref } from 'vue'
import TalkRecordingStep from '@/components/TalkRecordingStep.vue'
import { supabase } from '@/utils/supabase'
import { useAuthStore } from '@/stores/auth'

const defaultStep = 1

const topic = ref('')
const isLoading = ref(false)

const step = ref(defaultStep)

const useAuth = useAuthStore()

function handleStartTalk() {
  step.value = 2
}

function resetInput() {
  topic.value = ''
}

function required(value: string) {
  return !!value
}

function validateTopic() {
  return required(topic.value)
}

function resetStep() {
  step.value = defaultStep
}

function reset() {
  resetInput()
  resetStep()
}

async function handleFinishTalk(recordData: { duration: number }) {
  await handleUploadTalk(recordData)
  reset()
}

const handleUploadTalk = async (recordData: { duration: number }) => {
  try {
    if (!useAuth.getUserInfo) {
      throw new Error('로그인이 필요합니다.')
    }
    if (!recordData.duration) {
      throw new Error('녹음된 데이터가 없습니다.')
    }
    await supabase.from('talk').insert({
      topic: topic.value,
      duration: recordData.duration,
      speaker_id: useAuth.getUserInfo.id
    })
  } catch (error) {
    console.error(error)
  }
}

function handleStartNewTalk() {
  try {
    if (!topic.value) {
      throw new Error('토픽은 비어 있을 수 없습니다.')
    }
    if (topic.value.length > 255) {
      throw new Error('토픽이 너무 깁니다.')
    }
    handleStartTalk()
  } catch (error) {
    console.error(error)
  }
}
</script>

<style></style>
