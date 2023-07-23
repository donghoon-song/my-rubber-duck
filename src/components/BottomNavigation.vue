<template>
  <v-bottom-navigation
    density="default"
    bg-color="#FFD700"
    :elevation="0"
    rounded="rounded-lg"
    class="items-center border-t border-gray-200"
  >
    <!-- <a href="/">
      <v-btn value="recent">
        <v-icon>mdi-home</v-icon>
      </v-btn>
    </a> -->

    <a href="/talk">
      <v-btn value="favorites">
        <v-icon>mdi-account-voice</v-icon>
      </v-btn>
    </a>

    <a href="/talk/log">
      <v-btn value="nearby">
        <v-icon>mdi-duck</v-icon>
      </v-btn>
    </a>
  </v-bottom-navigation>
</template>

<script setup></script>

<style lang="scss" scoped></style>
