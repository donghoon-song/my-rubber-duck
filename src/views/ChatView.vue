<template>
  <div class="max-h-screen">
    <div class="mt-4">
      <v-btn icon="mdi-arrow-left" variant="flat" density="compact" @click="router.push('/')" />
    </div>
    <div class="bg-[#E0C533] rounded-lg mt-4 pa-4 space-y-2 overflow-y-scroll max-h-[80vh]">
      <div v-for="message in messages" :key="message.id">
        <message-row
          :message="message"
          :position="message.sender_id === mockUserId ? 'left' : 'right'"
        />
      </div>
    </div>
    <div class="flex justify-center align-center mt-4">
      <v-textarea
        class="w-[80%] rounded-lg"
        placeholder="메시지를 입력하세요"
        hide-details
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
import MessageRow from '@/components/MessageRow.vue'

const router = useRouter()

const mockUserId = 1
const mockRubberDuckUserId = 2

onMounted(() => {
  fetchMessages()
})

const route = useRoute()
const chatId = ref(route.params.chatId)
// TODO : type 정의
const messages = ref()
const content = ref('')
const isLoading = ref(false)

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

function generateRandomKwak(): string {
  const length = Math.floor(Math.random() * 5) + 1
  let kwak = ''

  for (let i = 0; i < length; i++) {
    kwak += '꽥'
  }

  return kwak
}

async function sendRubberDuckMessage() {
  try {
    const { data, error } = await supabase.from('message').insert([
      {
        content: generateRandomKwak(),
        chat_id: chatId.value,
        sender_id: mockRubberDuckUserId,
        receiver_id: mockUserId
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
async function sendMessage() {
  try {
    if (!content.value) {
      throw new Error('메시지를 입력해주세요.')
    }
    const { data, error } = await supabase.from('message').insert([
      {
        content: content.value,
        chat_id: chatId.value,
        sender_id: mockUserId,
        receiver_id: mockRubberDuckUserId
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
    await sendRubberDuckMessage()
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

<style scoped></style>
