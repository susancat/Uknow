const keys = require('../config/keys')
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

/*can use callback func to returns a charge if a valid identifier was provided, and throws an error otherwise. Or use promise, async/await*/
module.exports = app => {
    app.post('/api/stripe', requireLogin, async (req,res) => {     

        const charge = await stripe.charges.create({
            amount: 500,
            currency: 'usd',
            source: req.body.id,
            description: '$5 for 5 credits',
        });
        //update the use model
        req.user.credits += 5;
        const user = await req.user.save();
        //without the last step, not sure if user updated
        res.send(user);
    });
}
