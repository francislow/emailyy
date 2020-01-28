const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const mongoose = require('mongoose');
const Survey = mongoose.model('surveys');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const { URL } = require('url');
const Path = require('path-parser');
const _ = require('lodash');

module.exports = app => {
  app.get('/api/surveys', requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id })
      .select({ recipients: false });
    res.send(surveys);
  });

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body; // recipients is a string that has all emails separated by commas

    // Construct new survey
    const newSurvey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    });

    // Sent email to all recipients
    const mailer = new Mailer(newSurvey, surveyTemplate(newSurvey));
    try {
      // 1) Send mail
      await mailer.send();
      // 2) Save survey to database
      await newSurvey.save();
      // 3) Deduct credits
      req.user.credits -= 1;
      const user = await req.user.save();

      // Send back user to be saved in client state
      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('Thank you for your response!');
  });

  app.post('/api/surveys/webhooks', (req, res) => {
    const pathTemplate = new Path('/api/surveys/:surveyId/:choice');
    const events = req.body.map(({ url, email }) => {
      if (url) {
        ///api/surveys/5e2e4f2227044be2a16fc48b/yes
        const pathName = new URL(url).pathname;
        const match = pathTemplate.test(pathName);
        if (match) {
          return { ...match, email };
        }
      }
    });

    const compactedEvents = _.compact(events);
    const uniqueEvents = _.uniqBy(compactedEvents, 'email', 'surveyId');
    // Update records in mongo
    uniqueEvents.map(({ surveyId, email, choice }) => {
      Survey.updateOne(
        {
          _id: surveyId,
          recipients: {
            $elemMatch: { email: email, responded: false }
          }
        },
        {
          $inc: { [choice]: 1 },
          $set: { 'recipients.$.responded': true },
          lastResponded: new Date()
        }
      ).exec();
    });

    console.log(uniqueEvents);
    console.log('test mode');
    res.send({});
  });
};
