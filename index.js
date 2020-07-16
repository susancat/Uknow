const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');

//require model first
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

//tell passport to use cookie for authentication
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

app.listen(process.env.PORT || 5000, () => {
    console.log('uKnow started');
});