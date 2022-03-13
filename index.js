const express = require('express')
var nodemailer = require('nodemailer');

const app = express()
const PORT = process.env.PORT || 5000;

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'website.jvishnuca@gmail.com',
    pass: 'Website_1997'
  }
});

app.get('/send', async(req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  res.sendStatus(await sendMail(req.query.name, req.query.email, req.query.message))
});

sendMail = async (name, mail, message) => {
  return new Promise(function(resolve, reject) {
    var mailOptions = {
      from: 'website.jvishnuca@gmail.com',
      to: 'audit@jvishnuca.in',
      subject: 'Email from jvishnuca.in',
      html: `<html>
              <head>
              <style>
              table {
                font-family: arial, sans-serif;
                border-collapse: collapse;
                width: 100%;
              }
              
              td, th {
                border: 1px solid #dddddd;
                text-align: left;
                padding: 8px;
              }
              </style>
              </head>
              <body>
              
              <table>
                <tr>
                  <th>Name</th>
                  <td>${name}</td>
                </tr>
                <tr>
                  <th>Email ID</th>
                  <td>${mail}</td>
                </tr>
                <tr>
                  <th>Message</th>
                  <td>${message}</td>
                </tr>
              </table>
              
              </body>
              </html>
            `
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) resolve('500');
      resolve('200');
    });
  });
}

app.listen(PORT, () => {
  console.log(`Example app listening on PORT ${PORT}`)
})