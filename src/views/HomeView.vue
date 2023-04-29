<script setup lang="ts">
</script>

<template>
    <div>
        <h1 class="home-title">Quack Chat</h1>
        <img class="mt-2"
             src="https://drpdbryplxlouwfdwkvh.supabase.co/storage/v1/object/public/assets/public/main-rubber-duck.png"
             alt="main-rubber-duck image"/>
        <button class="bg-black hover:bg-gray-500 text-white font-bold py-4 rounded-full w-full mt-6">
            새로운 대화 시작
        </button>
        <button class="bg-black hover:bg-gray-500 text-white font-bold py-4 rounded-full w-full mt-4">
            대화 목록
        </button>
    </div>
</template>

<style lang="scss" scoped>
.home-title {
  @apply text-5xl font-bold text-center mt-6;
}
</style>
