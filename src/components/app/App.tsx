import React from 'react';
import './App.scss';
import {Navigate, Route, Routes, useLocation} from "react-router-dom";
import {WeatherList} from "../weather-list/WeatherList";
import {Page404} from "../404/404";
import {Modal} from "../modal/Modal";

function App() {
    let location = useLocation();
    let state = location.state as { backgroundLocation?: Location };

    return(
        <div>
            <Routes location={state?.backgroundLocation || location}>
                <Route path={'/weather'} element={<WeatherList/>}/>
                <Route path="/*" element={<Page404/>} />

                <Route path='/' element={<Navigate to='/weather'/>}/>
                <Route path='*' element={<Navigate to='/404'/>}/>
            </Routes >
            {state?.backgroundLocation && (
                <Routes>
                    <Route path="/card/:id" element={<Modal/>} />
                </Routes>
            )}
        </div>
    )
}

export default App;
