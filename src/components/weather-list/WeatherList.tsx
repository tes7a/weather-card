import React, {useEffect} from "react";
import {AppRootType, useAppDispatch} from "../../bll/store";
import {useSelector} from "react-redux";
import {
    removeCardTC, RequestStatusType, setStatusAC,
    updateCardTC
} from "../../bll/reducers/weather-reducer";
import {Outlet} from "react-router-dom";
import {GetWeatherType} from "../../api/api-weather";
import { CircularProgress, Container, Grid, IconButton, TextField} from "@mui/material";
import {useForms} from "../../utils/custom-hooks/useForms";
import {validateInfo} from "../../utils/validateInfo";
import s from "./WeatherList.module.scss";
import {WeatherCard} from "../weather-card/WeatherCard";
import AddIcon from '@mui/icons-material/Add';

export const WeatherList = () => {
    //hooks
    const dispatch = useAppDispatch();
    const cardsWeather = useSelector<AppRootType, GetWeatherType[] | null>(state => state.weather.cardsWeather);
    const status = useSelector<AppRootType, RequestStatusType>(state => state.weather.initialStatus);
    const error = useSelector<AppRootType, string | null>(state => state.weather.error)

    const {
        handleChange,
        handleBlur,
        handleSubmit,
        cityErr,
        values,
        foundCityHandler
    } = useForms(validateInfo)

    useEffect(() => {
        if (cardsWeather !== null) {
            dispatch(setStatusAC("succeeded"))
        }
    }, [cardsWeather]);

    //handlers
    const updateCLick = (city: string, id: number) => {
        dispatch(updateCardTC(city, id));
    }

    const deleteClick = (id: string) => {
        dispatch(removeCardTC(id)).finally();
    }

    return (
        <>
            {(status === "loading") && <CircularProgress size={100} className={s.loader}/>}
            {status === "succeeded" && <Container>
                <div className={s.input_container}>
                    <TextField
                        variant="standard"
                        type="text"
                        error={!!error || !!cityErr}
                        helperText={cityErr || error}
                        value={values.city}
                        name={"city"}
                        placeholder={"City"}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        onKeyPress={foundCityHandler}
                        margin="dense"
                        className={s.input}
                        style={{margin: "5px 0 10px 0"}}
                    />
                    <IconButton size={'large'} style={{marginLeft: "15px"}} className={s.btn}
                                onClick={handleSubmit}>
                        <AddIcon fontSize={'inherit'}/>
                    </IconButton>
                </div>
                <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
                    <WeatherCard
                        cardsWeather={cardsWeather}
                        deleteClick={deleteClick}
                        updateCLick={updateCLick}
                    />
                </Grid>
                <Outlet/>
            </Container>}
        </>
    );
}