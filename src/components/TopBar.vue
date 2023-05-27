<template>
  <header class="mx-6 flex items-center h-16">
    <v-btn
      icon="mdi-arrow-left"
      variant="plain"
      size="medium"
      class="hidden-xs-only mr-2"
      @click="router.back()"
    >
    </v-btn>
    <template v-if="useMeta.getMetaTitle">
      <h1 class="text-2xl">
        {{ useMeta.getMetaTitle }}
      </h1>
    </template>
    <template v-else>
      <div role="status" class="max-w-sm animate-pulse flex items-center">
        <div class="bg-[#E0C533] rounded-full w-48 h-8"></div>
      </div>
    </template>
  </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useMetaStore } from '@/stores/meta'

const router = useRouter()
const useMeta = useMetaStore()
</script>

<style></style>
