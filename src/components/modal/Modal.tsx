import React, {useEffect, useState, useRef} from "react";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {AppRootType, useAppDispatch} from "../../bll/store";
import {
    getHourlyWeatherTC,
    ModalDataType,
    openCurrentCardAC,
} from "../../bll/reducers/weather-reducer";
import {useOnClickOutside} from "../../utils/custom-hooks/useOnClickOutside";
import s from "./Modal.module.scss"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {HourlyWeatherType} from "../../api/api-weather";
import {IconButton} from "@mui/material";

export const Modal = () => {
    const {id} = useParams<"id">();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [show, setShow] = useState(true);
    let ref = useRef<HTMLDivElement | null>(null);

    const modalData = useSelector<AppRootType, ModalDataType>(state => state.weather.modalData);
    const hourlyWeather = useSelector<AppRootType, HourlyWeatherType | null>(state => state.weather.hourlyWeather);
    useOnClickOutside(ref, () => setShow(false));

    useEffect(() => {
        if (id) {
            dispatch(openCurrentCardAC(+id));
            modalData && dispatch(getHourlyWeatherTC(modalData.name));
        }
    }, [modalData.name])

    //handlers
    const onDismiss = () => {
        navigate(-1);
        setShow(false);
    }

    if (!show) return <Navigate to={'/weather'}/>
    if (!modalData) return null;

    return (
        <div className={s.modal}>
            <div className={s.modal__content} ref={ref}>
                <h2 className={s.modal__title}>{modalData.name}</h2>
                <ul className={s.modal__list}>
                    <li>Широта: {modalData.coord.lat}</li>
                    <li>Долгота: {modalData.coord.lon}</li>
                    <li>Температура: +{Math.ceil(modalData.main.temp)} ℃</li>
                    <li>Температура макс: +{Math.ceil(modalData.main.temp_max)} ℃</li>
                    <li>Температура мин: +{Math.ceil(modalData.main.temp_min)} ℃</li>
                    <li>Ощущается: +{Math.ceil(modalData.main.feels_like)} ℃</li>
                    <li>Атмосферное давление: {modalData.main.pressure} hPa</li>
                    <li>Атмосферное давление над землёй: {modalData.main.grnd_level} hPa</li>
                    <li>Атмосферное давление над морем: {modalData.main.sea_level} hPa</li>
                    <li>Влажность: {modalData.main.humidity}%</li>
                    <li>Скорость ветра: {modalData.wind.speed} ㎧</li>
                    <li>Направление ветра: {modalData.wind.deg}°</li>
                    <li>Порыв ветра: {modalData.wind.gust} ㎧</li>
                    <li>Видимость: {modalData.visibility / 1000}km</li>
                    <li>Облачность: {modalData.clouds.all}%</li>
                </ul>
                {modalData.weather!.map((w =>
                        <div className={s.modal__description_block} key={w.id}>
                            <div className={s.modal__description}>{w.description}</div>
                            <img src={`http://openweathermap.org/img/wn/${w.icon}@2x.png`} alt="img"/>
                        </div>
                ))}
                {hourlyWeather && <div className={s.modal__hourly_list}>
                    {hourlyWeather.list.slice(0, 8).map(l =>
                        <div key={l.dt_txt} style={{marginBottom: `${l.main.temp * 3}px`}} className={s.modal__hourly_temp}>
                        +{Math.ceil(l.main.temp)} ℃
                            <div className={s.modal__hourly_time}>{l.dt_txt.slice(10,16)} ⌛</div>
                        </div>)}
                </div>}
                <IconButton type={"button"} size={'large'} style={{margin: "5px 5px"}} className={s.modal__btn}
                            onClick={onDismiss}>
                    <ArrowBackIcon fontSize={'inherit'}/>
                </IconButton>
            </div>
        </div>
    )
}