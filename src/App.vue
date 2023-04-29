<script setup lang="ts">
import {RouterView} from 'vue-router'
</script>

<template>
    <main class="app-main">
        <div class="app-default-layout">
            <RouterView/>
        </div>
    </main>
</template>

<style lang="scss" scoped>
.app-main {
  background-color: var(--primary-color);
  min-height: 100vh;
  overflow: auto;
}

.app-default-layout {
  @apply mx-6;
}
</style>
