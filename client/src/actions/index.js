import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');
    //contain a payload of user model
    dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = (token) => async dispatch => {
    const res = await axios.post('/api/stripe', token);
    //we want to post token no. to backend
    dispatch({ type: FETCH_USER, payload: res.data });
    //we want to update the user model, so just use the same action
}