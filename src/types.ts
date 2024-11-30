interface Wind {
    deg: number;
    gust: number;
    speed: number;
}

interface Main {
    feels_like: number;
    grnd_level: number;
    humidity: number;
    pressure: number;
    sea_level: number;
    temp: number;
    temp_max: number;
    temp_min: number;
}

interface Weather {
    description: string;
    icon: string;
    id: number;
    main: string;
}

interface City {
    country: string;
    name: string;
    id: number;
    timezone: number;
}

export interface Link {
    to: string;
    name: string;
}

export interface WeatherInfo {
    clouds: {
        al: number
    };
    main: Main;
    name: string;
    visibility: number;
    weather: Weather[];
    wind: Wind;
}

export interface WeatherWeekInfo {
    city: City;
    list: WeatherInfo[];
}