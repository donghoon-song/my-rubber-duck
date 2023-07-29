<template>
  <div class="flex flex-col items-center">
    <v-img :src="IMAGE_URL.RUBBER_DUCK_NO_RESULT" alt="empty talk image" width="80%" />
    <slot />
  </div>
</template>

<script setup lang="ts">
import { IMAGE_URL } from '@/utils/constants/image.js'
</script>

<style scoped></style>
