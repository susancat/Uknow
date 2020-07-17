import { FETCH_USER } from '../actions/types';

export default function(state = null, action) {
    switch(action.type) {
        case FETCH_USER:
            return action.payload || false;
            //then it can return null, true with data and false
        default:
            return state;
    }
}