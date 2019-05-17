const functions = require('firebase-functions')
const express = require('express')
const {Nuxt} = require('nuxt')


const app = express()

const config = {
  dev: false,
  buildDir: 'nuxt',
  build: {
    publicPath: '/'
  }
}
const nuxt = new Nuxt(config)

function handleRequest(req, res) {
  res.set('Cache-Control', 'public, max-age=600, s-maxage=1200')

  nuxt.renderRoute(req.url, {req, res}).then(result => {
    res.send(result.html)
  }).catch(e => {
    console.log(e);
    res.send(e)
  })
}

app.get('*', handleRequest)
exports.nuxtApp = functions.https.onRequest(app)


exports.sendMail = functions.https.onRequest((request, response) => {
  const cors = require('cors')({origin: true});
  const nodemailer = require('nodemailer');
  const mandrillTransport = require('nodemailer-mandrill-transport');
  const admin = require('firebase-admin')

  if (!admin.apps.length) {
    admin.initializeApp();
  }

  admin.database().ref('flamelink/environments/production/content/settings/en-US').once('value')
    .then(data => {
      let settings = data.val();

      cors(request, response, () => { });
      let messageData = {};
      try {
        messageData = request.body || {};
      } catch (e) {
        console.log('strange request.body', request.body, e);
      }

      if(!messageData.email || !messageData.message){
        return response.send('not valid');
      }

      const message = {
        from: `From Name <info@example.com>`,
        to: settings['contactUsEmail'],
        subject: `Contact us`,
        text: `
    Email: ${messageData.email};
    Message: ${messageData.message}`
      };
      let res = {};
      res.status = 'error';

      let mailTransport = nodemailer.createTransport(
        mandrillTransport({
          auth: {
            apiKey: settings['madrillApiKey']
          }
        })
      );

      try {
        return mailTransport
          .sendMail(message)
          .then(() => {
            res.status = 'ok';
            response.send(JSON.stringify(res));
            return console.log('Email was sent via Mandrill');
          })
          .catch(error => {
            throw new Error('Mandrill send error');
          });
      } catch (e) {
        res.error = e;
        response.send(JSON.stringify(res));
        throw new Error(e);
      }
    })


});
