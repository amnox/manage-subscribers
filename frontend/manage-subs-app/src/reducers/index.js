import { combineReducers } from 'redux';
import subscribers from './subscribers'
import {loadingBarReducer} from 'react-redux-loading'; 

export default combineReducers({
    subscribers,
    loadingBar : loadingBarReducer,
})