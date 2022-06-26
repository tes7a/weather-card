import React from "react";
import {Card, Grid, IconButton} from "@mui/material";
import s from "./WeatherCard.module.scss";
import {Link, useLocation} from "react-router-dom";
import {GetWeatherType} from "../../api/api-weather";
import {Delete} from "@mui/icons-material";
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import SyncAltIcon from '@mui/icons-material/SyncAlt';

export const WeatherCard: React.FC<WeatherCardType> = ({cardsWeather, deleteClick, updateCLick}) => {
    let location = useLocation();

    return (
        <>
            {cardsWeather?.map(w =>
                <Grid sm={4} md={4} item key={w.objID}>
                    <Card style={{backgroundColor: "#ecece7"}} className={s.card} variant="outlined">
                        <h2 className={s.card__title}>{w.name}</h2>
                        <span className={s.card__temp}>Температура: +{Math.ceil(w.main.temp)} ℃</span>
                        {w.weather.map(w =>
                            <div className={s.card__description_block} key={w.id}>
                                <span className={s.card__description}>{w.description}</span>
                                <img className={s.card__img} src={`http://openweathermap.org/img/wn/${w.icon}@2x.png`}
                                     alt="img"/>
                            </div>
                        )}
                        <div className={s.card__btn_group}>
                            <IconButton type={"button"} size={'large'} style={{margin: "5px 5px"}} className={s.card__btn}
                                        onClick={e => updateCLick(w.name, w.id)}>
                                <SyncAltIcon fontSize={'inherit'}/>
                            </IconButton>
                            <Link
                                to={`/card/${w.id}`}
                                state={{backgroundLocation: location}}>
                                <IconButton type={"button"} size={'large'} style={{margin: "5px 5px"}} className={s.card__btn}>
                                    <FullscreenIcon fontSize={'inherit'}/>
                                </IconButton>
                            </Link>
                            <IconButton type={"button"} size={'large'} style={{margin: "5px 5px"}} className={s.card__btn}
                                        onClick={e => deleteClick(w.objID)}>
                                <Delete fontSize={'inherit'}/>
                            </IconButton>
                        </div>
                    </Card>
                </Grid>
            )
            }
        </>
    )
}

type WeatherCardType = {
    cardsWeather: GetWeatherType[] | null,
    updateCLick: (name: string, id: number) => void,
    deleteClick: (id: string) => void,
}