import { defineStore } from 'pinia'

export type RootState = {
  showTopBar: boolean
  metaInfo: {
    title: string | null
    showBackButton: boolean
  }
}

export const defaultMetaInfo = { title: '', showBackButton: true }

export const useMetaStore = defineStore('meta', {
  state: () =>
    ({
      showTopBar: true,
      metaInfo: defaultMetaInfo
    } as RootState),
  getters: {
    getShowTopBar: (state) => state.showTopBar,
    getMetaInfo: (state) => state.metaInfo,
    getMetaTitle: (state) => state.metaInfo.title,
    getShowBackButton: (state) => state.metaInfo.showBackButton
  },
  actions: {
    setShowTopBar(showTopBar: boolean) {
      this.showTopBar = showTopBar
    },
    setMetaInfo(metaInfo: RootState['metaInfo']) {
      this.metaInfo = metaInfo
    },
    setMetaTitle(title: string) {
      this.metaInfo.title = title
    },
    setShowBackButton(showBackButton: boolean) {
      this.metaInfo.showBackButton = showBackButton
    },
    resetMeta() {
      this.metaInfo = defaultMetaInfo
      this.showTopBar = true
    }
  }
})
