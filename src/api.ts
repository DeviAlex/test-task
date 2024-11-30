const API_KEY_OW = '11c448991b0001727e0eb16ae3181fdb'; // API-ключ OpenWeatherMap

export default function useApi() {  
  // Получение данных о погоде 
  async function getWeatherData(city: string) {
    const API_URL_OW = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY_OW}&units=metric&lang=ru`;
    const response = await fetch(API_URL_OW);
    const dataWeather = await response.json();

    return dataWeather;
  }
  
// Получение данных о погоде на неделю
  async function getWeatherWeekData(city: string) {
    const cityCoords = await getCoordinates(city)
    const API_URL_OW = `https://api.openweathermap.org/data/2.5/forecast?lat=${cityCoords[0].lat}&lon=${cityCoords[0].lon}&cnt=7&appid=${API_KEY_OW}&units=metric&lang=ru`;
    const response = await fetch(API_URL_OW);
    const dataWeather = await response.json();

    return dataWeather;
  }  

  return {
    getWeatherData,
    getWeatherWeekData
  }
}

// Определение координат города
async function getCoordinates(city: string) {
  const API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY_OW}`;
  const response = await fetch(API_URL);
  const coordinates = await response.json();

  return coordinates;
}