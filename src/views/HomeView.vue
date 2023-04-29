<script setup lang="ts">
import {ref} from "vue";
import {supabase} from "@/utils/supabase";

const dialog = ref(false);
const topic = ref('');
const isLoading = ref(false);

const TEMPORARY_USER_ID = 1;

function openDialog() {
    dialog.value = true;
}

function closeDialog() {
    dialog.value = false;
}

function handleClickStartNewChatButton() {
    openDialog()
}

function required(value: string) {
    return !!value
};

function validateTopic() {
    return required(topic.value)
}

function startLoading() {
    isLoading.value = true;
}

function finishLoading() {
    isLoading.value = false;
}

async function createNewChat(topic: string, userId: Number) {
    try {
        startLoading();
        if (!topic) {
            throw new Error('토픽은 비어 있을 수 없습니다.')
        }
        if (topic.length > 255) {
            throw new Error('토픽이 너무 깁니다.')
        }
        const {data, error} = await supabase.from("Chat").insert([
            {
                topic: topic,
                user_id: userId
            }
        ]);
        if (error) {
            throw new Error('채팅을 생성하지 못했습니다. 다시 시도해주세요.');
        }
    } catch (error) {
        console.error(error)
        throw error;
    } finally {
        finishLoading();
    }
}

async function handleClickStartChatButton() {
    try {
        await createNewChat(topic.value, TEMPORARY_USER_ID);
        closeDialog()
    } catch (error) {
        console.error(error)
    }
}

</script>

<template>
    <div>
        <h1 class="home-title">Quack Chat</h1>
        <img class="mt-2"
             src="https://drpdbryplxlouwfdwkvh.supabase.co/storage/v1/object/public/assets/public/main-rubber-duck.png"
             alt="main-rubber-duck image"/>
        <button class="bg-black hover:bg-gray-500 text-white font-bold py-4 rounded-full w-full mt-6"
                @click="handleClickStartNewChatButton">
            새로운 대화 시작
        </button>
        <button class="bg-black hover:bg-gray-500 text-white font-bold py-4 rounded-full w-full mt-4">
            대화 목록
        </button>
        <div class="text-center">
            <v-dialog
                    v-model="dialog"
                    width="auto"
            >
                <v-card>
                    <v-card-text>
                        고무오리에게 들려줄 주제를 입력해주세요.
                    </v-card-text>
                    <v-text-field
                            v-model="topic"
                            :readonly="isLoading"
                            class="mb-2"
                            clearable
                            placeholder="어떤 이야기를 들려주고 싶으신가요?"
                    ></v-text-field>
                    <v-card-actions>
                        <v-btn color="primary" block :loading="isLoading" :disabled="!validateTopic()"
                               @click="handleClickStartChatButton">대화
                            시작하기
                        </v-btn>
                    </v-card-actions>
                    <v-card-actions>
                        <v-btn color="primary" block @click="closeDialog">닫기</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.home-title {
  @apply text-5xl font-bold text-center mt-6;
}
</style>
