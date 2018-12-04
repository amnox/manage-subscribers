import { RECEIVE_SUBSCRIBERS, CREATE_SUBSCRIBER, UPDATE_SUBSCRIBER, DELETE_SUBSCRIBER } from '../actions/subscribers'

export default function subscribers (state = {}, action) {
    switch(action.type) {
        case RECEIVE_SUBSCRIBERS:
            return {
                ...state,
                ...action.subscribers
            }
        case CREATE_SUBSCRIBER:
            return {
                ...state,
                [action.subscriber.id]: action.subscriber
            }
        case UPDATE_SUBSCRIBER:
            return {
                ...state,
                [action.subscriber.id]: action.subscriber
            }
        case DELETE_SUBSCRIBER:
            delete state[action.id]
            return state
        default :
            return state
    }
}