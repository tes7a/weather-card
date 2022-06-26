import {weatherAPI} from "../api/api-weather";

test('the data is peanut butter', () => {
    return weatherAPI.getWeather("Kharkiv")
        .then(res => {
        expect(res.data.name).toBe('Харьков');
        expect(res.data.coord.lon).toBe(36.25);
        expect(res.data.coord.lat).toBe(50);
        expect(res.data.id).toBe(706483);
    });
});

test("weather by the hours", () => {
    return weatherAPI.getWeatherByTheHour("Kharkiv")
        .then(res => {
            expect(res.data.city.name).toBe("Харьков")
            expect(res.data.city.coord.lon).toBe(36.25)
            expect(res.data.city.coord.lat).toBe(50);
            expect(res.data.city.id).toBe(706483);
        })
})