module.exports = (req, res, next) => { //like done, next means next middleware
    if (!req.user) {
        return res.status(401).send({ error: 'You must log in!'});
    }

    next(); //if user exist/logged in, next
};