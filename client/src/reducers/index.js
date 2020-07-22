import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import surveysReducer from './surveysReducer';

export default combineReducers({ //key inside very important, carry the value of state
    auth: authReducer,
    form: reduxForm,
    surveys: surveysReducer
});