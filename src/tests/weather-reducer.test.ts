import {
    deleteCardAC,
    InitialStateType, ModalDataType, openCurrentCardAC, setErrorStatusAC, setHourlyWeatherAC,
    setStatusAC,
    setWeatherAC,
    updateCardAC,
    weatherReducer
} from "../bll/reducers/weather-reducer";
import {HourlyWeatherType, ObjectHourlyWeatherTypeType} from "../api/api-weather";

let initialState: InitialStateType;

beforeEach(() => {
    initialState = {cardsWeather: null, initialStatus: "loading", modalData: {
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
            visibility: 0,} as ModalDataType, error: null, hourlyWeather: null}
})

test("Get Weather Card", () => {

    const endState = weatherReducer(initialState, setWeatherAC({
        weather: [{id: 800, main: "Clear", description: "чисте небо", icon: "01d"}],
        clouds: {
            all: 0
        },
        cod: 200,
        main: {
            feels_like: 300.8,
            grnd_level: 983,
            humidity: 42,
            pressure: 1016,
            sea_level: 1016,
            temp: 300.98,
            temp_max: 300.98,
            temp_min: 300.98
        },
        coord: {
            lat: 50,
            lon: 36.25
        },
        name: "Kharkiv",
        dt: 1655641696,
        id: 706483,
        wind: {
            deg: 305,
            gust: 3.13,
            speed: 3.92,
        },
        timezone: 10800,
        visibility: 10000,
        base: "stations",
        sys: {
            country: "UA",
            sunrise: 1655601920,
            sunset: 1655660835,
            message: 3,
            id: 3,
            type: 23
        },
        objID: "1EED"
    }));

    expect(initialState.cardsWeather?.length).toBe(undefined);
    expect(endState.cardsWeather?.length).toBe(1);
    expect(endState.cardsWeather?.length && endState.cardsWeather[0].name).toBe("Kharkiv");
    expect(endState.cardsWeather?.length && endState.cardsWeather[0].id).toBe(706483);
})

test("Delete Current Weather Card", () => {
    initialState.cardsWeather = [
        {
            weather: [{id: 800, main: "Clear", description: "чисте небо", icon: "01d"}],
            clouds: {
                all: 0
            },
            cod: 200,
            main: {
                feels_like: 300.8,
                grnd_level: 983,
                humidity: 42,
                pressure: 1016,
                sea_level: 1016,
                temp: 300.98,
                temp_max: 300.98,
                temp_min: 300.98
            },
            coord: {
                lat: 50,
                lon: 36.25
            },
            name: "Kharkiv",
            dt: 1655641696,
            id: 706483,
            wind: {
                deg: 305,
                gust: 3.13,
                speed: 3.92,
            },
            timezone: 10800,
            visibility: 10000,
            base: "stations",
            sys: {
                country: "UA",
                sunrise: 1655601920,
                sunset: 1655660835,
                message: 3,
                id: 3,
                type: 23
            },
            objID: "1EED"
        }, {
            weather: [{id: 800, main: "Clear", description: "чисте небо", icon: "01d"}],
            clouds: {
                all: 0
            },
            cod: 200,
            main: {
                feels_like: 300.8,
                grnd_level: 983,
                humidity: 42,
                pressure: 1016,
                sea_level: 1016,
                temp: 300.98,
                temp_max: 300.98,
                temp_min: 300.98
            },
            coord: {
                lat: 50,
                lon: 36.25
            },
            name: "Lviv",
            dt: 1655641696,
            id: 7051267,
            wind: {
                deg: 305,
                gust: 3.13,
                speed: 3.92,
            },
            timezone: 10800,
            visibility: 10000,
            base: "stations",
            sys: {
                country: "UA",
                sunrise: 1655601920,
                sunset: 1655660835,
                message: 3,
                id: 3,
                type: 23
            },
            objID: "1EEDWE"
        }
    ];

    const endState = weatherReducer(initialState, deleteCardAC("1EEDWE"));

    expect(initialState.cardsWeather.length).toBe(2);
    expect(initialState.cardsWeather[0].name).toBe("Kharkiv");
    expect(endState.cardsWeather?.length).toBe(1);
    expect(endState.cardsWeather?.length && endState.cardsWeather[0].name).toBe("Kharkiv");
})

test("Update Current Weather Card", () => {
    initialState.cardsWeather = [
        {
            weather: [{id: 800, main: "Clear", description: "чисте небо", icon: "01d"}],
            clouds: {
                all: 0
            },
            cod: 200,
            main: {
                feels_like: 300.8,
                grnd_level: 983,
                humidity: 42,
                pressure: 1016,
                sea_level: 1016,
                temp: 300.98,
                temp_max: 300.98,
                temp_min: 300.98
            },
            coord: {
                lat: 50,
                lon: 36.25
            },
            name: "Kharkiv",
            dt: 1655641696,
            id: 706483,
            wind: {
                deg: 305,
                gust: 3.13,
                speed: 3.92,
            },
            timezone: 10800,
            visibility: 10000,
            base: "stations",
            sys: {
                country: "UA",
                sunrise: 1655601920,
                sunset: 1655660835,
                message: 3,
                id: 3,
                type: 23
            },
            objID: "1EED"
        }, {
            weather: [{id: 800, main: "Clear", description: "чисте небо", icon: "01d"}],
            clouds: {
                all: 0
            },
            cod: 200,
            main: {
                feels_like: 300.8,
                grnd_level: 983,
                humidity: 42,
                pressure: 1016,
                sea_level: 1016,
                temp: 300.98,
                temp_max: 300.98,
                temp_min: 300.98
            },
            coord: {
                lat: 50,
                lon: 36.25
            },
            name: "Lviv",
            dt: 1655641696,
            id: 706483,
            wind: {
                deg: 305,
                gust: 3.13,
                speed: 3.92,
            },
            timezone: 10800,
            visibility: 10000,
            base: "stations",
            sys: {
                country: "UA",
                sunrise: 1655601920,
                sunset: 1655660835,
                message: 3,
                id: 3,
                type: 23
            },
            objID: "1EEDWE"
        }
    ];

    const endState = weatherReducer(initialState, updateCardAC(706483, {
        weather: [{id: 800, main: "Clear", description: "чисте небо", icon: "01d"}],
        clouds: {
            all: 0
        },
        cod: 200,
        main: {
            feels_like: 300.8,
            grnd_level: 983,
            humidity: 42,
            pressure: 1016,
            sea_level: 1016,
            temp: 300.98,
            temp_max: 300.98,
            temp_min: 300.98
        },
        coord: {
            lat: 50,
            lon: 36.25
        },
        name: "Lviv",
        dt: 1655641696,
        id: 706483,
        wind: {
            deg: 305,
            gust: 3.13,
            speed: 3.92,
        },
        timezone: 10800,
        visibility: 10000,
        base: "stations",
        sys: {
            country: "UA",
            sunrise: 1655601920,
            sunset: 1655660835,
            message: 3,
            id: 3,
            type: 23
        },
        objID: "1EED"
    }));

    expect(initialState.cardsWeather.length).toBe(2);
    expect(initialState.cardsWeather[0].name).toBe("Kharkiv");
    expect(endState.cardsWeather?.length).toBe(2);
    expect(endState.cardsWeather?.length && endState.cardsWeather[1].name).toBe("Lviv");
})

test("Status changes", () => {
    const endState = weatherReducer(initialState, setStatusAC("succeeded"));

    expect(initialState.initialStatus).toBe("loading")
    expect(endState.initialStatus).toBe("succeeded")
})

test("Open Current Card", () => {
    initialState.cardsWeather = [
        {
            weather: [{id: 800, main: "Clear", description: "чисте небо", icon: "01d"}],
            clouds: {
                all: 0
            },
            cod: 200,
            main: {
                feels_like: 300.8,
                grnd_level: 983,
                humidity: 42,
                pressure: 1016,
                sea_level: 1016,
                temp: 300.98,
                temp_max: 300.98,
                temp_min: 300.98
            },
            coord: {
                lat: 50,
                lon: 36.25
            },
            name: "Kharkiv",
            dt: 1655641696,
            id: 706483,
            wind: {
                deg: 305,
                gust: 3.13,
                speed: 3.92,
            },
            timezone: 10800,
            visibility: 10000,
            base: "stations",
            sys: {
                country: "UA",
                sunrise: 1655601920,
                sunset: 1655660835,
                message: 3,
                id: 3,
                type: 23
            },
            objID: "1EED"
        }, {
            weather: [{id: 800, main: "Clear", description: "чисте небо", icon: "01d"}],
            clouds: {
                all: 0
            },
            cod: 200,
            main: {
                feels_like: 300.8,
                grnd_level: 983,
                humidity: 42,
                pressure: 1016,
                sea_level: 1016,
                temp: 300.98,
                temp_max: 300.98,
                temp_min: 300.98
            },
            coord: {
                lat: 50,
                lon: 36.25
            },
            name: "Lviv",
            dt: 1655641696,
            id: 7064555,
            wind: {
                deg: 305,
                gust: 3.13,
                speed: 3.92,
            },
            timezone: 10800,
            visibility: 10000,
            base: "stations",
            sys: {
                country: "UA",
                sunrise: 1655601920,
                sunset: 1655660835,
                message: 3,
                id: 3,
                type: 23
            },
            objID: "1EEDWE"
        }
    ];

    const endState = weatherReducer(initialState, openCurrentCardAC(706483))

    expect(initialState.modalData.name).toBe("")
    expect(endState.modalData.name).toBe("Kharkiv")
    expect(endState.modalData.coord).toBeTruthy()
})

test("Set Error Status", () => {
    initialState.cardsWeather = [
        {
            weather: [{id: 800, main: "Clear", description: "чисте небо", icon: "01d"}],
            clouds: {
                all: 0
            },
            cod: 200,
            main: {
                feels_like: 300.8,
                grnd_level: 983,
                humidity: 42,
                pressure: 1016,
                sea_level: 1016,
                temp: 300.98,
                temp_max: 300.98,
                temp_min: 300.98
            },
            coord: {
                lat: 50,
                lon: 36.25
            },
            name: "Kharkiv",
            dt: 1655641696,
            id: 706483,
            wind: {
                deg: 305,
                gust: 3.13,
                speed: 3.92,
            },
            timezone: 10800,
            visibility: 10000,
            base: "stations",
            sys: {
                country: "UA",
                sunrise: 1655601920,
                sunset: 1655660835,
                message: 3,
                id: 3,
                type: 23
            },
            objID: "1EED"
        }, {
            weather: [{id: 800, main: "Clear", description: "чисте небо", icon: "01d"}],
            clouds: {
                all: 0
            },
            cod: 200,
            main: {
                feels_like: 300.8,
                grnd_level: 983,
                humidity: 42,
                pressure: 1016,
                sea_level: 1016,
                temp: 300.98,
                temp_max: 300.98,
                temp_min: 300.98
            },
            coord: {
                lat: 50,
                lon: 36.25
            },
            name: "Lviv",
            dt: 1655641696,
            id: 7064555,
            wind: {
                deg: 305,
                gust: 3.13,
                speed: 3.92,
            },
            timezone: 10800,
            visibility: 10000,
            base: "stations",
            sys: {
                country: "UA",
                sunrise: 1655601920,
                sunset: 1655660835,
                message: 3,
                id: 3,
                type: 23
            },
            objID: "1EEDWE"
        }
    ];

    const endState = weatherReducer(initialState, setErrorStatusAC("Error"))

    expect(initialState.error).toBe(null)
    expect(endState.error).toBe("Error")
})

test("Got the weather hourly", () => {
    initialState.cardsWeather = [
        {
            weather: [{id: 800, main: "Clear", description: "чисте небо", icon: "01d"}],
            clouds: {
                all: 0
            },
            cod: 200,
            main: {
                feels_like: 300.8,
                grnd_level: 983,
                humidity: 42,
                pressure: 1016,
                sea_level: 1016,
                temp: 300.98,
                temp_max: 300.98,
                temp_min: 300.98
            },
            coord: {
                lat: 50,
                lon: 36.25
            },
            name: "Kharkiv",
            dt: 1655641696,
            id: 706483,
            wind: {
                deg: 305,
                gust: 3.13,
                speed: 3.92,
            },
            timezone: 10800,
            visibility: 10000,
            base: "stations",
            sys: {
                country: "UA",
                sunrise: 1655601920,
                sunset: 1655660835,
                message: 3,
                id: 3,
                type: 23
            },
            objID: "1EED"
        }, {
            weather: [{id: 800, main: "Clear", description: "чисте небо", icon: "01d"}],
            clouds: {
                all: 0
            },
            cod: 200,
            main: {
                feels_like: 300.8,
                grnd_level: 983,
                humidity: 42,
                pressure: 1016,
                sea_level: 1016,
                temp: 300.98,
                temp_max: 300.98,
                temp_min: 300.98
            },
            coord: {
                lat: 50,
                lon: 36.25
            },
            name: "Lviv",
            dt: 1655641696,
            id: 7064555,
            wind: {
                deg: 305,
                gust: 3.13,
                speed: 3.92,
            },
            timezone: 10800,
            visibility: 10000,
            base: "stations",
            sys: {
                country: "UA",
                sunrise: 1655601920,
                sunset: 1655660835,
                message: 3,
                id: 3,
                type: 23
            },
            objID: "1EEDWE"
        }
    ];

    const hourlyWeatherObj: HourlyWeatherType = {
    city: {
        id: 706483,
            name: "Харьков",
        coord: {
            lat: 50,
                lon: 36.25},
        country: "UA",
        population: 1430885,
        sunrise: 23,
        sunset: 55,
        timezone: 3243434,
    },
    cnt: 40,
    cod: "200",
    message: 0,
    list: [{
        clouds: {
            all: 100
        },
        dt: 1656244800,
        dt_txt: "2022-06-26 12:00:00",
        main: {
            feels_like: 25.06,
            grnd_level: 999,
            humidity: 56,
            pressure: 1017,
            sea_level: 1017,
            temp: 25.04,
            temp_kf: -1.3,
            temp_max: 26.34,
            temp_min: 25.04,
        },
        pop: 0.48,
    rain: {"3h": 0.19},
    sys: {pod: "d"},
    visibility: 10000,
    weather: [{id: 500, main: "Rain", description: "небольшой дождь", icon: "10d"}],
    wind: {speed: 6.27, deg: 68, gust: 8.43},
    }]
    }

    const endState = weatherReducer(initialState, setHourlyWeatherAC(hourlyWeatherObj))

    expect(initialState.hourlyWeather).toBeFalsy()
    expect(initialState.hourlyWeather).toBe(null)
    expect(endState.hourlyWeather).toBeTruthy()
    expect(endState.hourlyWeather?.cod).toBe("200")
    expect(endState.hourlyWeather?.city.name).toBe("Харьков")
})

