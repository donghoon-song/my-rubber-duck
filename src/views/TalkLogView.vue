<template>
  <section class="space-y-3 py-2">
    <NoResult v-if="talkList.length === 0">
      <p class="text-center text-3xl my-4">아직 학습기록이 없어요!</p>
      <v-btn size="x-large" class="primary-button w-full" @click="goToTalk"> 학습하러 가기 </v-btn>
    </NoResult>
    <template v-for="talk in talkList" :key="`talk-${talk.id}`">
      <TalkLog :talk="talk" />
    </template>
  </section>
</template>

<script lang="ts" setup>
import { supabase } from '@/utils/supabase'
import { onMounted } from 'vue'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import type { Talk } from '@/types/talk'
import TalkLog from '@/components/TalkLog.vue'
import NoResult from '@/components/NoResult.vue'
import { useRouter } from 'vue-router'

const useAuth = useAuthStore()
const router = useRouter()
const talkList = ref<Talk[]>([])

onMounted(async () => {
  await fetchTalkList()
})

const fetchTalkList = async () => {
  try {
    if (!useAuth.getUserInfo) {
      throw new Error('로그인이 필요합니다.')
    }
    const { data, error } = await supabase
      .from('talk')
      .select('*')
      .eq('user_id', useAuth.getUserInfo.id)
      .order('created_at', { ascending: false })
    if (error) {
      throw error
    }
    if (data) {
      talkList.value = data
    }
  } catch (error) {
    console.error(error)
  }
}

const goToTalk = () => {
  router.push({ name: 'talk' })
}
</script>

<style scoped></style>
