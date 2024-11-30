<script setup lang="ts">
import { RouterView } from 'vue-router'
import {ref} from 'vue'
import { useLoadingStore } from '@/stores/loading'
import Header from './components/Header.vue'

const loading = useLoadingStore()

const links = ref([
  {
    to: '/',
    name: 'Главная'
  },
  {
    to: 'week',
    name: 'За неделю'
  },
])
</script>

<template>
  <Header :nav-links="links"/>
  <RouterView />
  <div
    v-if="loading.isLoading"
    class="loading"
  ></div>
</template>

<style scoped>
.loading {
  cursor: progress;
  background: rgba(66, 119, 183, 0.1);
  position: fixed;
  z-index: 9001;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}
</style>
