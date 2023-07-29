import { defineStore } from 'pinia'

export type RootState = {
  userInfo: {
    id: string
    email?: string
  } | null
}

export const useAuthStore = defineStore('auth', {
  state: () =>
    ({
      userInfo: null
    } as RootState),
  getters: {
    getUserInfo: (state) => state.userInfo,
    isUser: (state) => !!state.userInfo
  },
  actions: {
    setUserInfo(userInfo: any) {
      this.userInfo = userInfo
    }
  }
})
