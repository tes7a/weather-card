import {GetWeatherType} from "../api/api-weather";
import {ModalDataType} from "../bll/reducers/weather-reducer";
import {AppRootType} from "../bll/store";

//local storage
export const loadValue = () => {
    try {
        const value = localStorage.getItem('cities')
        if (value === null) {
            return undefined
        }

        return JSON.parse(value)
    } catch (err) {
        return undefined
    }
}

export const saveState = (arr: GetWeatherType[]) => {
    try {
        localStorage.setItem('cities', JSON.stringify(arr))
    } catch {}
}

export const preloadedState: AppRootType = {
    weather: {
        cardsWeather: loadValue() ? loadValue() : [],
        initialStatus: "loading",
        modalData: {
            weather: [{
                id: 0,
                main: '',
                description: '',
                icon: ''
            }],
            clouds: { all: 0 },
            wind: { speed: 0, deg: 0, gust: 0 },
            id: 0,
            name: "",
            main: {
                temp: 0,
                grnd_level: 0,
                sea_level: 0,
                feels_like: 0,
                temp_min: 0,
                temp_max: 0,
                pressure: 0,
                humidity: 0
            },
            timezone: 0,
            coord: {
                lon: 0,
                lat: 0
            },
            visibility: 0,} as ModalDataType,
        error: null,
        hourlyWeather: null
    }
}

