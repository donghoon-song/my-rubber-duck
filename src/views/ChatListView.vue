<script setup lang="ts">
import { ref } from 'vue'
import { supabase } from '@/utils/supabase'
import { useAuthStore } from '@/stores/auth'
import { onMounted } from 'vue'
import ChatListItem from '@/components/ChatListItem.vue'

const dialog = ref(false)
const topic = ref('')
const isLoading = ref(false)
const chatList = ref<any>([])

const auth = useAuthStore()

onMounted(() => {
  fetchChatList()
})

async function fetchChatList() {
  try {
    const { data } = await supabase.from('chat').select(`id, topic, user_id`)
    chatList.value = data
  } catch (error) {
    console.error(error)
  }
}

function handleClickStartNewChatButton() {
  openDialog()
}

async function handleClickStartChatButton() {
  try {
    if (auth.getUserInfo.id === null) {
      throw new Error('로그인이 필요합니다.')
    }
    await createNewChat(topic.value, auth.getUserInfo.id)
    closeDialog()
  } catch (error) {
    console.error(error)
  }
}

function openDialog() {
  dialog.value = true
}

function closeDialog() {
  dialog.value = false
}

function required(value: string) {
  return !!value
}

function validateTopic() {
  return required(topic.value)
}

function startLoading() {
  isLoading.value = true
}

function finishLoading() {
  isLoading.value = false
}

async function createNewChat(topic: string, userId: string) {
  try {
    startLoading()
    if (!topic) {
      throw new Error('토픽은 비어 있을 수 없습니다.')
    }
    if (topic.length > 255) {
      throw new Error('토픽이 너무 깁니다.')
    }
    const { error } = await supabase.from('chat').insert([
      {
        topic: topic,
        user_id: userId
      }
    ])
    if (error) {
      throw new Error('채팅을 생성하지 못했습니다. 다시 시도해주세요.')
    }
  } catch (error) {
    console.error(error)
    throw error
  } finally {
    finishLoading()
  }
}
</script>

<template>
  <div class="max-h-screen">
    <div class="space-y-4 mt-6">
      <router-link
        class="block"
        v-for="chat in chatList"
        :to="{ name: 'chat', params: { chatId: chat.id } }"
        :key="chat.id"
      >
        <ChatListItem :chat="chat" />
      </router-link>
    </div>

    <button
      class="bg-black hover:bg-gray-500 text-white font-bold py-4 rounded-full w-full mt-6"
      @click="handleClickStartNewChatButton"
    >
      새로 배운 주제 설명하기
    </button>
    <v-dialog v-model="dialog" width="auto">
      <v-card>
        <v-card-text> 고무오리에게 들려줄 주제를 입력해주세요. </v-card-text>
        <v-text-field
          v-model="topic"
          :readonly="isLoading"
          class="mb-2"
          clearable
          placeholder="어떤 이야기를 들려주고 싶으신가요?"
        ></v-text-field>
        <v-card-actions>
          <v-btn
            color="primary"
            block
            :loading="isLoading"
            :disabled="!validateTopic()"
            @click="handleClickStartChatButton"
            >대화 시작하기
          </v-btn>
        </v-card-actions>
        <v-card-actions>
          <v-btn color="primary" block @click="closeDialog">닫기</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style></style>
