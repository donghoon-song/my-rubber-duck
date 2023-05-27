import { defineStore } from 'pinia'

export type RootState = {
  metaInfo: {
    title: string | null
  }
}

export const useMetaStore = defineStore('meta', {
  state: () =>
    ({
      metaInfo: {
        title: ''
      }
    } as RootState),
  getters: {
    getMetaTitle: (state) => state.metaInfo.title
  },
  actions: {
    setMetaTitle(title: string) {
      this.metaInfo.title = title
    }
  }
})
