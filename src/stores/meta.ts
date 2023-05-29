import { defineStore } from 'pinia'

export type RootState = {
  metaInfo: {
    title: string | null
    showBackButton: boolean
    showTopBar: boolean
  }
}

export const defaultMetaInfo = { title: '', showBackButton: true, showTopBar: true }

export const useMetaStore = defineStore('meta', {
  state: () =>
    ({
      metaInfo: defaultMetaInfo
    } as RootState),
  getters: {
    getShowTopBar: (state) => state.metaInfo.showTopBar,
    getMetaInfo: (state) => state.metaInfo,
    getMetaTitle: (state) => state.metaInfo.title,
    getShowBackButton: (state) => state.metaInfo.showBackButton
  },
  actions: {
    setShowTopBar(showTopBar: boolean) {
      this.metaInfo.showTopBar = showTopBar
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
    }
  }
})
