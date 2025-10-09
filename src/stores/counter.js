import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  // data
  state() {
    return {
      count: 0,
      data: []
    }
  },

  // computed
  getters: {
    doubleCount() {
      return this.count * 2
    },
    double: (state) => state.count * 2
  },

  // methods
  actions: {
    increment() {
      this.count++
    },

    decrement() {
      this.count--
    }
  }
})
