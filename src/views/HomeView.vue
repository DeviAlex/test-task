<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import WeatherCard from '../components/Card.vue'
import { useStore } from '@/stores/info'
import { useLoadingStore } from '@/stores/loading'
import type { WeatherInfo } from '../types'
import useApi from '@/api';

const store = useStore()
const loading = useLoadingStore()
const api = useApi()

const city = ref<string>(store.getCity)
const weatherData = ref<WeatherInfo>(store.getWeather)

let currentDate = new Date();
const day = currentDate.toLocaleString('ru', { day: 'numeric', month: 'long', weekday: 'long', });

const getData = async (city: string) => {  
  loading.started()
  await api.getWeatherData(city)
    .then((res) => {
      weatherData.value = res      
      store.setWeather(weatherData.value)
    })
    .finally(() => {
      setTimeout(() => {        
        loading.finished()
      }, 100);
    })
}

const checkData = () => {
  if (Object.keys(weatherData.value).length === 0 || weatherData.value.name !== store.city) {
    getData(store.city)
  }
}

watch(store, () => {
  checkData()
  setTimeout(() => {
    city.value = store.getCity
  }, 100);
})

onMounted(() => {
  if (city.value) {
    checkData()
  }
})
</script>

<template>
  <main class="page">
    <div v-if="Object.keys(weatherData).length !== 0" class="wrapper" :class="{'loading': loading.isLoading}">
      <WeatherCard>
        <template #heading>{{ city }} {{ Math.round(weatherData.main.temp)}}°C</template>
        {{ day }}
        <div class="weather-status">
          <img :src="`http://openweathermap.org/img/w/` + `${weatherData.weather[0]?.icon}` + `.png`" alt="Weather icon">
          {{ weatherData.weather[0].description }}
        </div>
        <h2>{{ Math.round(weatherData.main.temp_min)}}°C/{{ Math.round(weatherData.main.temp_max)}}°C</h2>
      </WeatherCard>
    </div>
  </main>
</template>
