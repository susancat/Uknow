//surveyField contains logic to render single lable and field
import React from 'react';

//input is from props
export default ({ input, label, meta: { error, touched} }) => {
    return(
        <div>
            <label> {label}  </label>
            <input {...input} style={{marginBottom: '5px'}}/>
            <div className="red-text" style={{marginBottom: '20px'}}>
                { touched && error} 
            </div>
            {/* if user touched the field but not give the input*/}
        </div>
    );
}