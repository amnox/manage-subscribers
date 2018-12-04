import { createSubscriberAPI, updateSubscriberAPI, deleteSubscriberAPI } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading';


export const UPDATE_SUBSCRIBER = 'UPDATE_SUBSCRIBER'
export const CREATE_SUBSCRIBER = 'CREATE_SUBSCRIBER'
export const DELETE_SUBSCRIBER = 'DELETE_SUBSCRIBER'
export const RECEIVE_SUBSCRIBERS = 'RECEIVE_SUBSCRIBERS'


export function recieveSubscribers(subscribers) {
    return {
        type: RECEIVE_SUBSCRIBERS,
        subscribers
    }
}

export function createSubscriber(subscriber) {
    return {
        type: CREATE_SUBSCRIBER,
        subscriber
    }
}

export function updateSubscriber(subscriber) {
    return {
        type: UPDATE_SUBSCRIBER,
        subscriber
    }
}

export function deleteSubscriber(id) {
    return {
        type: RECEIVE_SUBSCRIBERS,
        id
    }
}

export function handleCreateSubscriber (subscriber) {
    return (dispatch) => {
        return createSubscriberAPI(subscriber)
            .then(() => {
                dispatch(createSubscriber(subscriber))
            })
            .catch((e) => {
                console.warn('error in handling answer', e);
                alert('Error Creating Subscriber')
            })
    }
}

export function handleUpdateSubscriber (subscriber) {
   //updateSubscriberAPI(subscriber)
    return (dispatch) => {
        dispatch(showLoading())
        return updateSubscriberAPI(subscriber)
            .then((resp) => {
                if(resp.error==true){
                    throw resp.type
                }
                dispatch(updateSubscriber(subscriber))
                dispatch(hideLoading())
            })
            .catch((e) => {
                console.warn('error in handling answer', e);
                dispatch(hideLoading())
            })
    }
}

export function handleDeleteSubscriber (id) {
    return (dispatch) => {
        return deleteSubscriberAPI(id)
            .then(() => {
                dispatch(deleteSubscriber(id))
            })
            .catch((e) => {
                console.warn('error in handling answer', e);
                alert('Error Saving Answer')
            })
    }
}