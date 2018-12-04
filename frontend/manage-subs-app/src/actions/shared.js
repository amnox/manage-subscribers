import { getAllSubscribersAPI } from "../utils/api";
import { showLoading, hideLoading } from 'react-redux-loading';
import { recieveSubscribers } from './subscribers'

export function handleInitialData () {
    return (dispatch) => {
        dispatch(showLoading())
        return getAllSubscribersAPI()
            .then((subscribers) => {
                dispatch(recieveSubscribers(subscribers))
                dispatch(hideLoading())
            })
    }
}