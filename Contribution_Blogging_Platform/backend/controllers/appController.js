const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/User.model.js');
const UserRegisterModel = require('../models/UserRegister.model.js');
const ENV = require('../config.js');


// const login = async (req, res, { user, password }) => {
//   try {
//     bcrypt.compare(password, user.password).then((passwordCheck) => {
//       console.log(passwordCheck);
//       if (!passwordCheck) {
//         return res.status(400).send({ error: 'Password does not match' });
//       }

//       const token = jwt.sign(
//         {
//           userId: user._id,
//           username: user.username,
//         },
//         ENV.JWT_SECRET,
//         { expiresIn: '24h' }
//       );

//       return res.status(200).send({
//         msg: 'Login successful',
//         username: user.username,
//         token,
//       });
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).send({ error: 'Internal server error' });
//   }
// };


// const verifyUser = async (req, res, next) =>{
//   try {
//     const { username } = req.method === 'GET' ? req.query : req.body;
//     const exist = await UserModel.findOne({ username });
//     if (!exist) {
//       return res.status(404).send({ error: "Can't find user!" });
//     }
//     req.user = exist;
//     next();
//   } catch (error) {
//     return res.status(500).send({ error: 'Authentication Error' });
//   }
// };

// const getUser = async (req, res) => {
//   try {
//     const { username } = req.params;
//     if (!username) {
//       return res.status(400).send({ error: 'Invalid username' });
//     }
//     UserModel.findOne({ username }, function (err, user) {
//       if (err) {
//         return res.status(500).send({ error: err.message });
//       }
//       if (!user) {
//         return res.status(404).send({ error: "Couldn't find the user" });
//       }
//       const { password, ...rest } = user.toObject();
//       return res.status(200).send(rest);
//     });
//   } catch (error) {
//     return res.status(500).send({ error: 'Internal server error' });
//   }
// };

// /** GET: http://localhost:8080/api/generateOTP */
// export async function generateOTP(req,res){
//   req.app.locals.OTP = await otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false})
//   res.status(201).send({ code: req.app.locals.OTP })
// };


// /** GET: http://localhost:8080/api/verifyOTP */
// export async function verifyOTP(req,res){
//   const { code } = req.query;
//   if(parseInt(req.app.locals.OTP) === parseInt(code)){
//       req.app.locals.OTP = null; // reset the OTP value
//       req.app.locals.resetSession = true; // start session for reset password
//       return res.status(201).send({ msg: 'Verify Successsfully!'})
//   }
//   return res.status(400).send({ error: "Invalid OTP"});
// };



// const updateUser = async (req, res) => {
//   try {
//     const { username } = req.user;
//     if (username) {
//       const body = req.body;
//       UserModel.updateOne({ username }, body, function (err, data) {
//         if (err) {
//           return res.status(500).send({ error: err.message });
//         }
//         if (data.nModified === 0) {
//           return res.status(404).send({ error: 'User not found or no changes were made' });
//         }
//         return res.status(200).send({ msg: 'Record updated successfully' });
//       });
//     } else {
//       return res.status(404).send({ error: 'User not found' });
//     }
//   } catch (error) {
//     return res.status(500).send({ error: 'Internal server error' });
//   }
// };


// const resetPassword = async (req, res) => {
//   try {
//     if (!req.app.locals.resetSession) {
//       return res.status(440).send({ error: 'Session expired!' });
//     }
//     const { username, password } = req.body;
//     try {
//       UserModel.findOne({ username })
//         .then((user) => {
//           if (!user) {
//             return res.status(404).send({ error: 'Username not found' });
//           }
//           bcrypt.hash(password, 10)
//             .then((hashedPassword) => {
//               UserModel.updateOne(
//                 { username: user.username },
//                 { password: hashedPassword },
//                 function (err, data) {
//                   if (err) {
//                     throw err;
//                   }
//                   req.app.locals.resetSession = false; // reset session
//                   return res.status(200).send({ msg: 'Password reset successful' });
//                 }
//               );
//             })
//             .catch((e) => {
//               return res.status(500).send({
//                 error: 'Unable to hash password',
//               });
//             });
//         })
//         .catch((error) => {
//           return res.status(404).send({ error: 'Username not found' });
//         });
//     } catch (error) {
//       return res.status(500).send({ error });
//     }
//   } catch (error) {
//     return res.status(401).send({ error });
//   }
// };

// const register = async (req, res) => {
//   try {
//     const { firstName, lastName, email, password, username } = req.body;

//     // Check for existing username
//     const existUsername = await UserRegisterModel.findOne({ username });
//     if (existUsername) {
//       return res.status(400).json({ error: 'Username already exists. Please choose a unique username.' });
//     }

//     // Check for existing email
//     const existEmail = await UserRegisterModel.findOne({ email });
//     if (existEmail) {
//       return res.status(400).json({ error: 'Email address already registered. Please use a unique email.' });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create a new user
//     const newUser = new UserRegisterModel({
//       username,
//       password: hashedPassword,
//       firstName,
//       lastName,
//       email,
//     });

//     // Save the user to the database
//     await newUser.save();

//     // Send a success response
//     res.status(201).json({ msg: 'User registered successfully' });
//   } catch (error) {
//     console.error('Error during registration:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };


const fetchUserData = async (req, res) => {
  const { username } = req.query;

  try {
    // Fetch user data based on the provided username
    const userData = await UserRegisterModel.findOne({ username });

    if (!userData) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send the user data as a response
    res.status(200).json(userData);
  } catch (error) {
    console.error('Error fetching User Data:', error.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  fetchUserData
  // login,
  // verifyUser,
  // getUser,
  // updateUser,
  // resetPassword,
  // register,
  
};