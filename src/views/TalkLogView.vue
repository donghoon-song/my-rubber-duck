<template>
  <div class="space-y-3">
    <template v-for="talk in talkList" :key="`talk-${talk.id}`">
      <TalkLog :talk="talk" />
    </template>
  </div>
</template>

<script lang="ts" setup>
import { supabase } from '@/utils/supabase'
import { onMounted } from 'vue'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import type { Talk } from '@/types/talk'
import TalkLog from '@/components/TalkLog.vue'

const auth = useAuthStore()
const talkList = ref<Talk[]>([])

onMounted(async () => {
  await fetchTalkList()
})

const fetchTalkList = async () => {
  try {
    if (auth.getUserInfo === null) {
      throw new Error('로그인이 필요합니다.')
    }
    const { data, error } = await supabase
      .from('talk')
      .select('*')
      .eq('user_id', auth.getUserInfo.id)
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
</script>

<style scoped></style>
