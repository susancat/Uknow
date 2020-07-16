const passport = require('passport');
const { model } = require('mongoose');

module.exports = app => {
    app.get(
        '/auth/google', 
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );

    app.get('/auth/google/callback', passport.authenticate('google'));

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.send(req.user);//will be no content
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
}
