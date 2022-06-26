import axios from "axios";

//dal
const instance = axios.create({
    baseURL: "https://api.openweathermap.org/data/2.5/",
})

const key = "8cdfcbac6e6a0c64340e9606209f34a3";

export const weatherAPI = {
    getWeather(city: string) {
        return instance.get<GetWeatherType>(`weather?q=${city}&lang=ru&units=metric&appid=${key}`)
    },
    getWeatherByTheHour(city: string) {
        return instance.get<HourlyWeatherType>(`forecast?q=${city}&lang=ru&units=metric&appid=${key}`)
    }
}

//types
export type GetWeatherType = {
    coord: {
        lon: number,
        lat: number
    },
    weather: [
        {
            id: number,
            main: string,
            description: string,
            icon: string
        }
    ],
    base: string,
    main: {
        temp: number,
        grnd_level: number,
        sea_level: number,
        feels_like: number,
        temp_min: number,
        temp_max: number,
        pressure: number,
        humidity: number
    },
    visibility: number,
    wind: {
        speed: number,
        deg: number,
        gust: number
    },
    clouds: {
        all: number
    },
    dt: number,
    sys: {
        type: number,
        id: number,
        message: number,
        country: string,
        sunrise: number,
        sunset: number
    },
    timezone: number,
    id: number,
    name: string,
    cod: number,
    objID: string,
}
export type HourlyWeatherType = {
    cod: string,
    message: number,
    cnt: number,
    list: ObjectHourlyWeatherTypeType[],
    city: {
        id: number,
        name: string,
        coord: {
            lat: number,
            lon: number
        },
        country: string,
        population: number,
        timezone: number,
        sunrise: number,
        sunset: number
    }
}
export type ObjectHourlyWeatherTypeType = {
    dt: number,
    main: {
        temp: number,
        feels_like: number,
        temp_min: number,
        temp_max: number,
        pressure: number,
        sea_level: number,
        grnd_level: number,
        humidity: number,
        temp_kf: number
    },
    weather: [
        {
            id: number,
            main: string,
            description: string,
            icon: string
        }
    ],
    clouds: {
        all: number
    },
    wind: {
        speed: number,
        deg: number
        gust: number
    },
    visibility: number,
    pop: number,
    rain: {
        "3h": number
    },
    sys: {
        "pod": string
    },
    dt_txt: string
}