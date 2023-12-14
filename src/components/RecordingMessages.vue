<template>
  <div class="min-h-12 text-lg break-keep">
    <div>{{ successMessage }}</div>
    <div>{{ instructionMessage }}</div>
    <div class="text-red-600">{{ errorMessage }}</div>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'RecordingMessages',
  props: {
    successMessage: { type: String, default: '' },
    errorMessage: { type: String, default: '' },
    instructionMessage: { type: String, default: '' }
  },
  data() {
    return {}
  }
})
</script>

<style scoped>
.text-red-600 {
  color: red;
}
</style>
