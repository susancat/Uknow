const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url');//default in node
const mongoose = require('mongoose');
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplate/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
    app.get('/api/surveys', requireLogin, async (req, res) => {
      const surveys = await Survey.find({ _user: req.user.id }) //when load recipients(sub-doc), it's a heavy load
        .select({ recipients: false }); //find all the survey under current user except recipient by select
     
      res.send(surveys);
    });
  
    app.get('/api/surveys/:surveyId/:choice', (req,res) => {
      res.send('Thanks for voting!');
    });

//use map to extract the path from URL, extract the survey ID and the 'choice
//return survey ID,email,and choice, delete the duplicated records
    app.post('/api/surveys/webhooks', (req,res) => {
      const p = new Path('/api/surveys/:surveyId/:choice');//id,choices variables will be extracted
    
    //the following methods are lodash, refactored by _.chain
    _.chain(req.body)
      .map(({ email, url}) => {        
        const match = p.test(new URL(url).pathname);//extract path from URL
        if (match) {
          return { email: email, surveyId: match.surveyId, choice: match.choice };
        }
      })
      
      .compact()//remove undefine and only return events
      .uniqBy('email', 'surveyId')
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne({
          _id: surveyId,
          recipients: {
            $elemMatch: { email: email, responded: false }
          }
        },{
          $inc: { [choice]: 1 },
          $set: { 'recipients.$.responded': true },
          lastResponded: new Date()
        }).exec(); //send to DB by exec()
      })
      .value();//iterate req.body, map it, compact it, delete duplication and return the value
      
      res.send({});
    })

    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        const { title, subject, body, recipients } = req.body;
    
        const survey = new Survey({
          title,
          subject,
          body,
          recipients: recipients.split(',').map(email => ({ email: email.trim() })),
          _user: req.user.id,
          dateSent: Date.now()
        });

        //send email, save in mongoose, update the credits and user in db and send user out
        const mailer = new Mailer(survey, surveyTemplate(survey));
        
        try {
          await mailer.send();
          await survey.save();
          req.user.credits -= 1;
          const user = await req.user.save();

          res.send(user);
        } catch (err) {
          res.status(422).send(err);
        }       
    });
};