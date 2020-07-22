This project was bootstrapped with node.JS and React.JS

## Available Scripts

In terminal, under the project directory, you can run:

## 'npm install' to install all the dependencies
## run 'npm run dev'

it will automatically opened at [http://localhost:3000] in your browser.<br />

## Features
### Authentication:

User signup with their google account


### Authorization:

User cannot create new surveys or view his/her own survey list without being authenticated

User cannot add credits

User cannot send the mail to surveyees


### Functionalities:

Create, review and send surveys to listed surveyees

Overview the survey list they created

Overview the statistical report interpret the feedbacks from surveys

Responsive web design

## Built with
### Front-end
React.JS;  
Redux/Redux-thunk/Redux-form;  
Materialize-css;  

### Back-end
express; 
mongoDB; 
mongoose; 
passport-google-OAuth; 
cookie-session; 

### external APIs
Email provider:sendgrid; 
Payment: Stripe; 

### Deployment
Heroku