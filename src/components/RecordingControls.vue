<template>
  <div class="text-center w-full mx-auto rounded-lg">
    <div class="mb-3">
      <template v-if="!recording">
        <v-btn icon="mdi-microphone" size="x-large" @click="toggleRecording"> </v-btn>
      </template>
      <template v-if="recording">
        <div class="flex flex-col items-center">
          <v-btn icon="mdi-stop" size="x-large" class="mb-4" @click="toggleRecording"> </v-btn>
          <div class="text-2xl">
            {{ recordedTime }}
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import Recorder from '../lib/Recorder'
import { convertTimeMMSS, durationToSeconds } from '@/utils/time'

export default {
  name: 'RecordingControls',
  props: {
    time: { type: Number, default: 1 },
    bitRate: { type: Number, default: 128 },
    sampleRate: { type: Number, default: 44100 },
    afterRecording: { type: Function },
    successfulUpload: { type: Function },
    failedUpload: { type: Function },
    customUpload: { type: Function, default: null }
  },
  data() {
    return {
      recording: false,
      recordedAudio: null,
      recordedBlob: null,
      recorder: null,
      successMessage: null,
      errorMessage: null
    }
  },
  computed: {
    buttonClass() {
      return 'mx-auto h-14 w-14 fill-current text-black cursor-pointer rounded-50 border-2 m-4 p-2'
    },
    recordedTime() {
      if (this.time && this.recorder?.duration >= this.time * 60) {
        this.toggleRecording()
      }
      return convertTimeMMSS(this.recorder?.duration)
    }
  },
  methods: {
    toggleRecording() {
      this.recording = !this.recording
      if (this.recording) {
        this.initRecorder()
      } else {
        this.stopRecording()
      }
    },
    initRecorder() {
      this.recorder = new Recorder({
        micFailed: this.micFailed,
        bitRate: this.bitRate,
        sampleRate: this.sampleRate
      })
      this.recorder.start()
      this.successMessage = null
      this.errorMessage = null
    },
    stopRecording() {
      this.recorder.stop()
      const recordList = this.recorder.recordList()
      this.recordedAudio = recordList[0].url
      this.recordedBlob = recordList[0].blob
      if (this.recordedAudio) {
        this.successMessage = 'Recording completed.'
      }
      if (this.afterRecording) {
        this.afterRecording()
      }
    },
    micFailed() {
      this.recording = false
      this.errorMessage = 'Microphone permission is not granted.'
    },
    finishRecording() {
      const recordList = this.recorder.recordList()
      this.$emit('finish-recording', {
        duration: durationToSeconds(recordList[0].duration)
      })
    }
  }
}
</script>
