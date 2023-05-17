import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => {
    return { userInfo: null }
  },
  getters: {
    getUserInfo: (state) => state.userInfo
  },
  actions: {
    setUserInfo(userInfo: any) {
      this.userInfo = userInfo
    }
  }
})
