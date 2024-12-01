<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import WeatherCard from '../components/Card.vue'
import { useStore } from '@/stores/info'
import { useLoadingStore } from '@/stores/loading'
import type { WeatherWeekInfo } from '../types'
import useApi from '@/api';

const store = useStore()
const loading = useLoadingStore()
const api = useApi()

const city = ref<string>(store.getCity)
const weatherWeekData = ref<WeatherWeekInfo>(store.getWeatherWeek)
const show = ref<number>()

const currentDate = new Date();

const getData = async (city: string) => {  
  loading.started()
  await api.getWeatherWeekData(city)
    .then((res) => {
      weatherWeekData.value = res
      store.setWeatherWeek(weatherWeekData.value)
    })
    .finally(() => {
      setTimeout(() => {
        loading.finished()
      }, 100);
    })
}

const getWeekDate = (weekDay: number) => {
  const newDay = new Date()
  newDay.setDate(currentDate.getDate() + weekDay)
  return newDay.toLocaleString('ru', { day: 'numeric', month: 'long', weekday: 'long', })
}

const showInfo = (index: number) => {
  if (show.value === index) {
    show.value = undefined
    return
  }
  show.value = index
}

const checkData = (city: string) => {
  if (Object.keys(weatherWeekData.value).length === 0 || city !== store.city) {
    getData(store.city)
  }
}

watch(store, () => {
  checkData(city.value)
  setTimeout(() => {
    city.value = store.getCity
  }, 100);
})

onMounted(() => {
  if (city.value) {
    checkData(weatherWeekData.value?.city?.name)
  }
})
</script>

<template>
  <div class="page">
    <div v-if="Object.keys(weatherWeekData).length !== 0" class="wrapper" :class="{'loading': loading.isLoading}">
      <h1 class="title">{{ city }}</h1>
      <WeatherCard v-for="weatherData, index in weatherWeekData.list" :key="index" @click="showInfo(index)">
        {{ getWeekDate(index) }}
        <div class="weather-status">
          <img id="wicon" :src="`http://openweathermap.org/img/w/` + `${weatherData.weather[0]?.icon}` + `.png`" alt="Weather icon">
          {{ weatherData.weather[0].description }}
        </div>
        <h2>{{ Math.round(weatherData.main.temp_min)}}°C/{{ Math.round(weatherData.main.temp_max)}}°C</h2>
        <transition name="slide-fade">
          <div v-if="show === index" class="full-width">
            <div class="weather-info">
              <h2>{{ getWeekDate(index) }}</h2>
              <span>Ощущается как {{ weatherData.main.feels_like }}</span>
              <span>Атмосферное давление {{ weatherData.main.pressure }} hPa</span>
              <span>Влажность {{ weatherData.main.humidity }}</span>
              <span>Видимость {{ Math.round(weatherData.visibility/1000) }} Км</span>
              <span>Скорость ветра {{ weatherData.wind.speed }} м/с</span>
            </div>
          </div>
        </transition>
      </WeatherCard>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.title {
  width: 100%;
  text-align: center;
  padding: 20px 0;
}

.wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  position: relative;
}

.weather-info {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--el-border-color-hover);
  border-radius: 5px;
  padding: 15px 20px 20px;
  width: fit-content;

  h2 {
    margin-bottom: 5px;
  }
}

.slide-fade-enter-active {
  transition: all .3s ease-out;
}

.slide-fade-leave-active {
  transition: all .8s;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

.card {
  cursor: pointer;
  position: relative;

  &:hover {
    box-shadow: 0 0 0 1px var(--el-border-color-hover) inset;
    background-color: rgb(0 0 0 / 50%);
  }
}

.full-width {
  display: flex;
  justify-content: center;
  position: absolute;
  top: calc(100% + 20px);
  left: 0;
  width: 100%;
  align-items: center;
  z-index: 2;
  background-color: #181818;
}
</style>
