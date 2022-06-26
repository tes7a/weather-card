import {fireEvent, render, screen} from "@testing-library/react";
import {WeatherCard} from "../components/weather-card/WeatherCard";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "../bll/store";
import React from "react";
import {WeatherList} from "../components/weather-list/WeatherList";
import App from "../components/app/App";
import {GetWeatherType} from "../api/api-weather";
import {Modal} from "../components/modal/Modal";
import userEvent from "@testing-library/user-event";

describe("WeatherCard", () => {

    const weatherCardsArr: GetWeatherType[] = [{
        base: "stations",
        clouds: {all: 100},
        cod: 200,
        coord: {lon: 36.25, lat: 50},
        dt: 1656246995,
        id: 706483,
        main: {
            feels_like: 25.69,
            grnd_level: 999,
            humidity: 56,
            pressure: 1017,
            sea_level: 1017,
            temp: 25.61,
            temp_max: 25.61,
            temp_min: 25.61,
        },
        name: "Харьков",
        objID: "bb59c60cfad",
        sys: {country: "UA", sunrise: 1656206828, sunset: 1656265697, id: 1232132, type: 1231232, message: 43434},
        timezone: 10800,
        visibility: 10000,
        weather: [{id: 804, main: "Clouds", description: "пасмурно", icon: "04d"}],
        wind: {speed: 5.42, deg: 77, gust: 8.53},
    }]

    it('Render App', () => {
        render(
            <BrowserRouter> <Provider store={store}>
                <App/>
            </Provider>)</BrowserRouter>)

    })
    //tests for WeatherList
    it('Render WeatherList', () => {
        render(
            <BrowserRouter> <Provider store={store}>
                <WeatherList/>
            </Provider>)</BrowserRouter>)

        expect(screen.getByRole("textbox")).toBeInTheDocument()
        expect(screen.getByRole("button")).toBeInTheDocument()
        expect(screen.getByPlaceholderText("City")).toBeInTheDocument()
        expect(screen.getByDisplayValue("")).toBeInTheDocument()
        fireEvent.change(screen.getByRole("textbox"), {
            target: {value: "Харьков"}
        })
        userEvent.type(screen.getByRole("textbox"), "Харьков")
        userEvent.click(screen.getByRole("button"))
        expect(screen.getByDisplayValue("Харьков")).toBeInTheDocument()
    })

    //tests for WeatherCard Component
    it("Render WeatherCard", () => {
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <WeatherCard cardsWeather={weatherCardsArr} updateCLick={() => {
                    }} deleteClick={() => {
                    }}/>
                </Provider>
            </BrowserRouter>)
        expect(screen.getByText(/Температура:/i)).toBeInTheDocument()
        expect(screen.getByAltText(("img"))).toBeInTheDocument()
        expect(screen.getByRole(("link"))).toBeInTheDocument()
    })

    //test for Modal Component
    it("Render Modal", async () => {
        render(
            <BrowserRouter>
                <Provider store={store}>
                   <Modal/>
                </Provider>
            </BrowserRouter>
        )
        expect(screen.getByText(/Температура:/i)).toBeInTheDocument()
        expect(screen.getByText(/Температура макс:/i)).toBeInTheDocument()
    })
})