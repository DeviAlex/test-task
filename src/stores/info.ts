import { defineStore } from 'pinia';
import type { WeatherInfo, WeatherWeekInfo } from '../types'

interface State {
  weather: WeatherInfo;
  city: string;
  weatherWeek: WeatherWeekInfo;
}

export const useStore = defineStore({
  id: 'info',

  state: (): State => ({
    city: '',
    weather: {} as WeatherInfo,
    weatherWeek: {} as WeatherWeekInfo
  }),

  getters: {
    getCity: (state: State) => state.city,
    getWeather: (state: State) => state.weather,
    getWeatherWeek: (state: State) => state.weatherWeek,
  },

  actions: {
    chooseCity(city: string): void {
      this.city = city
    },
    setWeather(weather: WeatherInfo): void {
      this.weather = weather
    },
    setWeatherWeek(weatherWeek: WeatherWeekInfo): void {
      this.weatherWeek = weatherWeek
    },
  },
});
