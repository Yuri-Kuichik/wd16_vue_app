import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  const counter = ref(0)
  const doubleCounter = computed(() => counter.value * 2)
  
  const increment = () => { counter.value++ }
  const decrement = () => { counter.value-- }

  return { counter, doubleCounter, increment, decrement }
})
