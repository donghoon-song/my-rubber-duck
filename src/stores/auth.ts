import { defineStore } from 'pinia'

export type RootState = {
  userInfo: {
    id: string | null
    email: string | null
  }
}

export const useAuthStore = defineStore('auth', {
  state: () =>
    ({
      userInfo: {
        id: null,
        email: null
      }
    } as RootState),
  getters: {
    getUserInfo: (state) => state.userInfo
  },
  actions: {
    setUserInfo(userInfo: any) {
      this.userInfo = userInfo
    }
  }
})
