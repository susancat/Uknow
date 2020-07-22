//SurveyNew shows SurveyFrom and SurveyFormReview
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {
    state = { showReview: false };

    renderContent() {
        if (this.state.showReview) {
            return <SurveyFormReview onCancel={() => this.setState({ showReview: false })} />;
        }
        //pass a callback function to two component to toggle the value of showReview
        return (
            <SurveyForm 
                onSurveySubmit={() => this.setState({showReview: true})} 
            />
        );
    }

    render() {
        return(
            <div>
                { this.renderContent() }
            </div>
        );
    }
}

export default reduxForm({
    form: 'surveyForm'
    //when navigate from surveyNew, defaultly clear the data
})(SurveyNew);