<template>
  <v-bottom-navigation style="bottom: 28px" bg-color="transparent" :elevation="0">
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

    <a href="/log">
      <v-btn value="nearby">
        <v-icon>mdi-duck</v-icon>
      </v-btn>
    </a>
  </v-bottom-navigation>
</template>

<script setup></script>

<style lang="scss" scoped></style>
