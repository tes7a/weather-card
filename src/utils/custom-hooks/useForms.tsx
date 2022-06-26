import React, {ChangeEvent, FocusEvent, KeyboardEvent, useState} from "react";
import {getWeatherTC, setErrorStatusAC} from "../../bll/reducers/weather-reducer";
import {useAppDispatch} from "../../bll/store";

export const useForms = (validate: (field: string, value: string) => string) => {
    //hook for onChange
    const dispatch = useAppDispatch();
    const [values, setValues] = useState({
        city: '',
    });
    //hooks for errors
    const [cityErr, setCityErr] = useState("");
    //hooks for backLights
    const [blurCityErr, setBlurCityErr] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.currentTarget;
        if (blurCityErr) {
            setBlurCityErr(false);
            setCityErr("");
        }
        setValues({
            ...values,
            [name]: value
        });
    }

    const handleBlur = (e: FocusEvent<HTMLInputElement, Element>) => {
        switch (e.currentTarget.name) {
            case "city":
                setBlurCityErr(true);
                setCityErr(validate("city", e.currentTarget.value));
                break;
        }
    }

    const handleSubmit = (e: React.MouseEvent<HTMLElement>) => {
        setCityErr(validate("city", values.city));
        if(!cityErr){
            if(!validate("city", values.city)) {
                    dispatch(getWeatherTC(values.city));
                    dispatch(setErrorStatusAC(''));
                    setValues({city: ""})
            }
        }
    }

    const handleKeySubmit = (e: KeyboardEvent<HTMLInputElement>) => {
        setCityErr(validate("city", values.city));
        if(!cityErr) {
            if(!validate("city", values.city)) {
                if (e.key === "Enter") {
                    dispatch(getWeatherTC(values.city));
                    dispatch(setErrorStatusAC(''))
                    setValues({city: ""})
                }
            }
        }
    }

    const handleClear = (e: React.MouseEvent<HTMLElement>) => {
        const {id} = e.currentTarget;
        setValues({
            ...values,
            [id]: "",
        });
    }

    return {
        handleChange,
        handleBlur,
        handleSubmit,
        handleClear,
        foundCityHandler: handleKeySubmit,
        values,
        cityErr,
        blurCityErr,
    }
}
