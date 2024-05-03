const express = require('express');
const router = express.Router();
const controller = require('../controllers/appController.js');
const UserRegisterModel = require('../models/UserRegister.model.js');
const nodemailer = require('nodemailer');
const randomize = require('randomatic');

// GET /data
// router.route('/register').post(controller.register); // register user
// router.route('/login').post(async (req, res) => {
//     const { username, password } = req.body;
  
//     try {
//       const user = await UserRegisterModel.findOne({ username });
//   console.log(username);
//       if (!user) {
//         return res.status(404).send({ error: 'Username not found' });
//       }
//       else{
//         return res.status(200).send({ error: 'Username Matched' });
//       }
//       return controller.login(req, res, { user, password });
//     } catch (error) {
//       console.error(error);
//       return res.status(500).send({ error: 'Internal server error' });
//     }
//   });


//   router.post('/generate', async (req, res) => {
//     const email = req.body.email;
//     const otp = randomize('0', 6);
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: 'headshot6oo9@gmail.com', // Replace with your Gmail email
//         pass: 'mian786786', // Replace with your Gmail password
//       },
//     });
//     const mailOptions = {
//       from: 'ahmadjutt273gmail.com',
//       to: email,
//       subject: 'Your OTP for Login',
//       text: `Your OTP is ${otp}.`,
//     };
  
//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         return res.status(500).json({ message: 'Failed to send OTP.' });
//       }  
//       res.status(200).json({ message: 'OTP sent successfully.' });
//     });
//   });
  
  router.route('/fetchUserData').get(controller.fetchUserData);

module.exports = router;
