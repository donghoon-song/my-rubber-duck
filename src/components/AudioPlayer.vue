<template>
  <div class="min-h-12 text-lg break-keep">
    <audio controls :src="recordedAudio" type="audio/mpeg" class="mx-auto">
      Your browser does not support the <code>audio</code> element.
    </audio>
  </div>
</template>

<script>
export default {
  name: 'AudioPlayer',
  props: {
    recordedAudio: { type: String, required: true },
    onPlaybackEnd: { type: Function, default: null }
  },
  data() {
    return {
      playing: false,
      errorMessage: null
    }
  },
  methods: {
    playAudio() {
      this.playing = true
    },
    pauseAudio() {
      this.playing = false
    },
    handlePlaybackError() {
      this.errorMessage = 'Error playing back audio. Please try again.'
    }
  },
  watch: {
    recordedAudio() {
      this.playing = false
    }
  }
}
</script>
