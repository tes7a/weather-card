import {GetWeatherType, HourlyWeatherType, weatherAPI} from "../../api/api-weather";
import {AppRootType, AppThunkType} from "../store";
import {saveState} from "../../utils/local-storage";
import {uid} from "uid";
import axios from "axios";

//bll
const initialState: InitialStateType = {
    cardsWeather: null,
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
    hourlyWeather: null,
};

export const weatherReducer = (state = initialState, action: WeatherReducerType): InitialStateType => {
    switch (action.type) {
        case "SET-WEATHER":
            return {...state, cardsWeather: [...state.cardsWeather || [], action.city]}
        case "DELETE-CARD":
            return {...state, cardsWeather: state.cardsWeather?.filter(w => w.objID !== action.id) || []}
        case "UPDATE-CARD":
            return {
                ...state,
                cardsWeather: state.cardsWeather?.map(w => w.id === action.id ? {
                    ...action.city,
                    objID: w.objID
                } : w) || []
            }
        case "OPEN-CURRENT-CARD":
            const arr = state.cardsWeather?.filter(w => w.id === action.id) || []
            const {weather, clouds, wind, name, timezone, id, main, coord, visibility} = arr[0]
            return {...state, modalData: {name, clouds, weather, id, wind, timezone, main, coord, visibility}}
        case "SET-STATUS":
            return {...state, initialStatus: action.value}
        case "SET-ERROR-STATUS":
            return {...state, error: action.error}
        case "SET-HOURLY-WEATHER":
            return {...state, hourlyWeather: action.city}
        default:
            return state
    }
}

//actions
export const setWeatherAC = (city: GetWeatherType) => ({type: "SET-WEATHER", city} as const);
export const updateCardAC = (id: number, city: GetWeatherType) => ({type: "UPDATE-CARD", id, city} as const);
export const deleteCardAC = (id: string) => ({type: "DELETE-CARD", id} as const);
export const setStatusAC = (value: RequestStatusType) => ({type: "SET-STATUS", value} as const);
export const openCurrentCardAC = (id: number) => ({type: "OPEN-CURRENT-CARD", id} as const);
export const setErrorStatusAC = (error: string) => ({type: "SET-ERROR-STATUS", error} as const);
export const setHourlyWeatherAC = (city: HourlyWeatherType) => ({type: "SET-HOURLY-WEATHER",city} as const);

//types
type WeatherReducerType =
    | ReturnType<typeof setWeatherAC>
    | ReturnType<typeof deleteCardAC>
    | ReturnType<typeof updateCardAC>
    | ReturnType<typeof setStatusAC>
    | ReturnType<typeof openCurrentCardAC>
    | ReturnType<typeof setErrorStatusAC>
    | ReturnType<typeof setHourlyWeatherAC>

export type InitialStateType = {
    cardsWeather: GetWeatherType[] | null,
    initialStatus: RequestStatusType,
    modalData: ModalDataType,
    error: string | null,
    hourlyWeather: HourlyWeatherType | null
}

export type ModalDataType = {
    weather: [{
        id: number,
        main: string,
        description: string,
        icon: string
    }],
    clouds: { all: number },
    wind: { speed: number, deg: number, gust: number },
    id: number,
    name: string,
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
    timezone: number,
    coord: {
        lon: number,
        lat: number
    },
    visibility: number,
}
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

//thunks
export const getWeatherTC = (city: string) => (dispatch: AppThunkType, getState: () => AppRootType) => {
    dispatch(setStatusAC("loading"));
    weatherAPI.getWeather(city)
        .then(res => {
            const data = res.data
            data.objID = uid();
            dispatch(setWeatherAC(data));
            saveState(getState().weather.cardsWeather || []);
            dispatch(setStatusAC("succeeded"));
        })
        .catch(e => {
            dispatch(setErrorStatusAC(e.response.data.message));
            dispatch(setStatusAC("loading"));
            if (axios.isAxiosError(e)) {
                console.log(e.message);
            }
        })
        .finally(() => {
            dispatch(setStatusAC("succeeded"));
        })
}

export const getHourlyWeatherTC = (city: string) => (dispatch: AppThunkType, getState: () => AppRootType) => {
    weatherAPI.getWeatherByTheHour(city)
        .then(res => {
            dispatch(setHourlyWeatherAC(res.data))
            dispatch(setStatusAC("succeeded"));
        }).catch(e => {
        dispatch(setStatusAC("loading"));
        if (axios.isAxiosError(e)) {
            console.log(e.message);
        }
    })
        .finally(() => {
            dispatch(setStatusAC("succeeded"));
        })
}

export const updateCardTC = (city: string, id: number) => (dispatch: AppThunkType, getState: () => AppRootType) => {
    dispatch(setStatusAC("loading"));
    weatherAPI.getWeather(city)
        .then(res => {
            dispatch(updateCardAC(id, res.data));
            saveState(getState().weather.cardsWeather || [])
            dispatch(setStatusAC("succeeded"));
        })
        .catch(e => {
            dispatch(e.response.data.message);
            console.log(e.response.data.message);
            if (axios.isAxiosError(e)) {
                console.log(e.message);
                dispatch(setStatusAC("loading"));
            }
        })
        .finally(() => {
            dispatch(setStatusAC("succeeded"));
        })
}

export const removeCardTC = (id: string) => async (dispatch: AppThunkType, getState: () => AppRootType) => {
    dispatch(deleteCardAC(id));
    saveState(getState().weather.cardsWeather || []);
}