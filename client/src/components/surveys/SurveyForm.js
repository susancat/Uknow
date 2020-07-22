//show a form for user input
import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component {
    // handleSubmit is the helper from redux-form
    renderFields() {
        return _.map(formFields, field => {
            return <Field key={field.name} component={SurveyField} type="text" label={field.label} name={field.name} />
        });
    }

    render() {
        return(
            <div> 
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                    { this.renderFields() }
                    < Link to="/surveys" className="red btn-flat white-text">
                        Cancel
                    </Link>
                    <button type="submit" className="teal btn-flat right white-text">
                        Next
                        <i className="material-icons right">done</i>
                        </button>
                </form>
               
            </div>
        );
    }
}

function validate(values) {
    const errors = {};//if no error, redux-form think it's ok to submit

    
    errors.recipients = validEmails(values.recipients || ''); 
    //pass all the emails to test,initialized value would be ''

    _.each(formFields, ({name})=> {
        if(!values[name]) {
            errors[name] = 'You must provide a value';
        }
    });

    return errors;
}

export default reduxForm({
    validate: validate,
    form: 'surveyForm', 
    //from state, form.surveyFrom contains values,redux form store them inside
    destroyOnUnmount: false 
    //when it's false, user back to form from review will not delete the previous info filled
})(SurveyForm);