import {Action, applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import thunk, {ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";
import {weatherReducer} from "./reducers/weather-reducer";
import {preloadedState} from "../utils/local-storage";

export const rootReducer = combineReducers({
    weather: weatherReducer
})

// applyMiddleware supercharges createStore with middleware:
export const store = createStore(rootReducer, preloadedState, applyMiddleware(thunk));
export const useAppDispatch = () => useDispatch<AppThunkType>();

//types
export type AppRootType = ReturnType<typeof rootReducer>;
export type AppThunkType = ThunkDispatch<AppRootType, unknown, Action>

// and this is so that you can access the store in the console at any time
// @ts-ignore
window.store = store