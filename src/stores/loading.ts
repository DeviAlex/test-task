import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLoadingStore = defineStore('loading', () => {
  let loadingCount = 0
  const isLoading = ref<boolean>(false)

  const started = () => {
    loadingCount++
    if (!isLoading.value) {
      isLoading.value = true
    }
  }

  const finished = () => {
    loadingCount--
    if (loadingCount <= 0) {
      loadingCount = 0
      isLoading.value = false
    }
  }

  return { isLoading, started, finished }
})
