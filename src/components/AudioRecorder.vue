<template>
  <!-- TODO: 컴포넌트 분리 -->
  <div class="text-center w-full mx-auto rounded-lg">
    <div class="mb-3">
      <v-btn v-if="recording" icon="mdi-stop" size="x-large" @click="toggleRecording"> </v-btn>
      <v-btn v-else icon="mdi-microphone" size="x-large" @click="toggleRecording"> </v-btn>
    </div>
    <div class="min-h-12 break-keep">
      <div class="text-sm font-bold">{{ successMessage }}</div>
      <div class="text-sm">{{ instructionMessage }}</div>
      <div>{{ recordedTime }}</div>
      <div class="text-sm text-red-600">{{ errorMessage }}</div>
    </div>
    <figure class="flex justify-center w-full">
      <audio controls :src="recordedAudio" type="audio/mpeg" class="mx-auto">
        사용하시는 브라우저가
        <code>audio</code> element 요소를 지원하지 않습니다.
      </audio>
    </figure>
  </div>
</template>

// TODO: js파일 ts로 변경
<script>
import Recorder from '../lib/Recorder'
import { convertTimeMMSS } from '@/utils/time'
import { IMAGE_URL } from '@/utils/constants/image.js'
import { durationToSeconds } from '@/utils/time'

const INSTRUCTION_MESSAGE = '학습을 시작하려면 녹음 버튼을 누르세요.'
const INSTRUCTION_MESSAGE_STOP = '학습을 끝내려면 정지 버튼을 누르세요.'
const ERROR_MESSAGE =
  '마이크 사용권한이 없습니다. 새로고침 후 다시 시도하시거나 마이크 사용권한을 허용해주세요.'
const SUCCESS_MESSAGE = '녹음이 완료되었어요. 다시 들어보셔도 좋아요.'
const SUCCESS_MESSAGE_SUBMIT = 'Successfully submitted audio message! Thank you!'
const ERROR_SUBMITTING_MESSAGE = 'Error submitting audio message! Please try again later.'

export default {
  name: 'AudioRecorder',
  props: {
    // in minutes
    time: { type: Number, default: 1 },
    bitRate: { type: Number, default: 128 },
    sampleRate: { type: Number, default: 44100 },
    backendEndpoint: { type: String },
    buttonColor: { type: String, default: 'green' },

    // callback functions
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
      errorMessage: null,
      instructionMessage: INSTRUCTION_MESSAGE
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
  beforeUnmount() {
    if (this.recording) {
      this.stopRecorder()
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
      this.instructionMessage = INSTRUCTION_MESSAGE_STOP
    },
    stopRecording() {
      this.recorder.stop()
      const recordList = this.recorder.recordList()
      this.recordedAudio = recordList[0].url
      this.recordedBlob = recordList[0].blob
      if (this.recordedAudio) {
        this.successMessage = SUCCESS_MESSAGE
        this.instructionMessage = null
        this.$emit('finish-recording', { duration: durationToSeconds(recordList[0].duration) })
      }
      if (this.afterRecording) {
        this.afterRecording()
      }
    },
    async sendData() {
      if (!this.recordedBlob) {
        return
      }

      let result = null
      if (this.customUpload) {
        result = await this.customUpload(this.recordedBlob)
      } else {
        result = await this.service.postBackend(this.recordedBlob)
      }

      if (result) {
        this.errorMessage = null
        this.successMessage = SUCCESS_MESSAGE_SUBMIT
        if (this.successfulUpload) {
          this.successfulUpload()
        }
      } else {
        // error uploading
        this.successMessage = null
        this.errorMessage = ERROR_SUBMITTING_MESSAGE
        if (this.failedUpload) {
          this.failedUpload()
        }
      }
    },
    micFailed() {
      this.recording = false
      this.instructionMessage = INSTRUCTION_MESSAGE
      this.errorMessage = ERROR_MESSAGE
    }
  }
}
</script>

<style lang="scss" scoped>
audio::-webkit-media-controls-panel {
  background-color: var(--primary-color);
}
</style>
