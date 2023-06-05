<template>
  <div>
    <div class="max-h-[calc(100dvh-64px-56px)] mb-2">
      <div class="has-arrow">
        <div
          class="bg-[#E0C533] rounded-lg mt-4 pa-4 space-y-2 overflow-y-scroll max-h-[calc(100dvh-64px-56px-56px-3rem)]"
        >
          <div v-for="message in messages" :key="message.id">
            <message-row :message="message" position="left" />
          </div>
        </div>
      </div>
      <div class="w-full flex justify-end mt-4">
        <img :src="IMAGE_URL.RUBBER_DUCK_LISTENING" class="w-[20%]" />
      </div>
    </div>
    <div class="flex justify-center align-center">
      <v-text-field
        class="w-[80%] rounded-lg"
        placeholder="메시지를 입력하세요"
        hide-details
        :autofocus="true"
        no-resize
        rows="1"
        v-model="content"
        :disabled="isLoading"
        @keydown.enter.prevent="handleSubmitMessage"
      />
      <v-btn icon="mdi-duck" variant="plain" @click="handleSubmitMessage" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { supabase } from '@/utils/supabase'
import { useAuthStore } from '@/stores/auth'
import MessageRow from '@/components/MessageRow.vue'
import { IMAGE_URL } from '@/utils/constants/image.js'
import { useMetaStore } from '@/stores/meta'

const router = useRouter()
const useAuth = useAuthStore()
const useMeta = useMetaStore()

onMounted(async () => {
  await fetchChat()
  useMeta.setMetaTitle(topic.value)
  fetchMessages()
})

const route = useRoute()
const chatId = ref(route.params.chatId)
// TODO : type 정의
const messages = ref()
const content = ref('')
const topic = ref('')
const isLoading = ref(false)

async function fetchChat() {
  try {
    const { data } = await supabase.from('chat').select('*').eq('id', chatId.value).single()
    topic.value = data?.topic
  } catch (error) {
    console.error(error)
  }
}

async function fetchMessages() {
  try {
    const { data } = await supabase
      .from('message')
      .select(`id, content, sender_id, user:sender_id (avatar_img)`)
      .eq('chat_id', chatId.value)

    messages.value = data
  } catch (error) {
    console.error(error)
  }
}

// supabase chat channel
async function subscribeChat() {
  const channel = supabase.channel('table-db-changes')
  channel
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'message'
      },
      (payload) => {
        messages.value.push(payload.new)
      }
    )
    .subscribe()
}

async function sendMessage() {
  try {
    if (!content.value) {
      throw new Error('메시지를 입력해주세요.')
    }
    const { data, error } = await supabase.from('message').insert([
      {
        content: content.value,
        chat_id: chatId.value,
        sender_id: useAuth.getUserInfo.id
      }
    ])
    if (error) {
      throw new Error('메시지를 전송하지 못했습니다. 다시 시도해주세요.')
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}
function startLoading() {
  isLoading.value = true
}
function endLoading() {
  isLoading.value = false
}
function resetContent() {
  content.value = ''
}
async function handleSubmitMessage() {
  try {
    startLoading()
    await sendMessage()
    resetContent()
    await fetchMessages()
  } catch (error) {
    console.error(error)
  } finally {
    endLoading()
  }
}
</script>

<script lang="ts">
export default {
  name: 'ChatView',
  components: { MessageRow }
}
</script>

<style lang="scss" scoped>
.has-arrow {
  position: relative;
  &:after {
    content: '';
    @apply absolute bottom-0 right-6 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-4 h-4 bg-[#e0c533] border-r border-b border-[#e0c533];
  }
}
</style>
