import React, { useState } from 'react';
import {GoogleLogin} from 'react-google-login';
import { isEmail } from 'validator';
import axios from 'axios';
import { useEffect } from 'react';


const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080', // Replace with your backend URL
});
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Load Google API library
    window.gapi.load('auth2', () => {
      window.gapi.auth2.init({
        client_id:"1072306097003-4ni1r4egjla5p5aaanah2liu1aid31tj.apps.googleusercontent.com"
      });
    });


    setMessage('Login successful!');
    setSuccessful(true);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!username || !password) {
      setMessage('Username and password are required.');
      return;
    }

    try {
      setLoading(true);
      await window.gapi.auth2.getAuthInstance().signIn();
      const response = await axiosInstance.post('/api/login', {
        username,
        password,
      });

      // Handle successful login
      console.log(response.data);
      setMessage('Login successful!');
      setSuccessful(true);
    } catch (error) {
      // Handle specific error cases
      if (error.response.status === 404) {
        setMessage('Username not found.');
      } else if (error.response.status === 400) {
        setMessage('Password does not match.');
      } else {
        setMessage('Login failed. Please check your credentials and try again.');
      }
      console.error(error.response.data);
    } finally {
      setLoading(false);
    }
  };


const colorPalette = {
  primary: '#FFFFFF',   // white
  secondary: '#000000', // black
  tertiary: '#808080',  // gray
  quaternary: '#CCCCCC',// light gray
  quinary: '#666666',   // dark gray
  
};

const required = (value) => {
  if (!value) {
    return (
      <div className="invalid-feedback d-block" style={{ color: '#dc3545' }}>
      
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="invalid-feedback d-block" style={{ color: '#dc3545' }}>
      </div>
    );
  }
};

// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [successful, setSuccessful] = useState(false);
//   const [message, setMessage] = useState('');

  // const handleLogin = (e) => {
  //   e.preventDefault();

  //   setMessage('');
  //   setSuccessful(false);

  //   const isFormValid = validateForm();

  //   if (isFormValid) {
  //     setSuccessful(true);
  //     setMessage('Login successful!');
  //     // Perform any additional actions for successful login here
  //   } else {
  //     setMessage('Some form fields are invalid. Please check and try again.');
  //   }
  // };

  const validateForm = () => {
    return (
      username &&
      password &&
      !required(username) &&
      !vpassword(password)
    );
  };

  return (
    <section className="text-center text-lg-start">
    <style>
      {`
        .cascading-right {
          margin-right: -50px;
        }

        @media (max-width: 991.98px) {
          .cascading-right {
            margin-right: 0;
          }
        }

        .form-outline {
          position: relative;
        }

        .form-outline input {
          padding-top: 30px;
        }

        .form-label {
          position: absolute;
          top: 8px;
          left: 15px;
          color: ${colorPalette.quinary};
        }

        .invalid-feedback {
          color: #dc3545;
        }
      `}
    </style>

      <div className="container py-4">
        <div className="row g-0 align-items-center">
        <div className="col-lg-6 mb-4 mb-lg-0" style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <div className="card cascading-right" style={{
              background: `linear-gradient(to bottom, ${colorPalette.primary}, ${colorPalette.secondary})`,
              color: colorPalette.quinary,
            }}>
              <div className="card-body p-4 shadow-5 text-center">
                <h2 className="fw-bold mb-5">Login</h2>
                <form onSubmit={handleLogin}>
                  <div className="form-outline mb-4 position-relative">
                    <input
                      type="text"
                      id="form3Example5"
                      className="form-control"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <label className="form-label" htmlFor="form3Example5">Username</label>
                    {required(username)}
                  </div>

                  <div className="form-outline mb-4 position-relative">
                    <input
                      type="password"
                      id="form3Example4"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label className="form-label" htmlFor="form3Example4">Password</label>
                    {required(password)}
                    {vpassword(password)}
                  </div>
                  <div className="form-check d-flex justify-content-center mb-4">
                    <input
                      className="form-check-input me-2"
                      type="checkbox"
                      value=""
                      id="form2Example33"
                      checked
                    />
                    <label className="form-check-label" htmlFor="form2Example33">
                      I agree to all the terms and conditions
                    </label>
                  </div>
                  <button type="submit" className="btn btn-primary btn-block mb-4"> 
                    Login
                  </button>

                  <div className="text-center">
                    <p>or login with:</p>
                    <button type="button" className="btn btn-link btn-floating mx-1">
                      <i className="bi bi-facebook"></i>
                    </button>

                    <button
                      type="button"
                      className="btn btn-link btn-floating mx-1"
                      onClick={() => {
                        const auth2 = window.gapi.auth2.getAuthInstance();
                        auth2.signIn().then((googleUser) => {
                          const profile = googleUser.getBasicProfile();
                          console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
                          console.log('Name: ' + profile.getName());
                          console.log('Image URL: ' + profile.getImageUrl());
                          console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
                        });
                      }}
                    >
                      <i className="bi bi-google"></i>
                    </button>

                    <button type="button" className="btn btn-link btn-floating mx-1">
                      <i className="bi bi-twitter"></i>
                    </button>

                    <button type="button" className="btn btn-link btn-floating mx-1">
                      <i className="bi bi-github"></i>
                    </button>
                  </div>
                  {message && (
                    <div className={`mt-3 alert ${successful ? 'alert-success' : 'alert-danger'}`} role="alert">
                      {message}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>

          <div className="col-lg-6 mb-5 mb-lg-0">
  <img
    src="https://i.pinimg.com/564x/9d/d7/9d/9dd79d60722faee9ac777988cb8a7456.jpg "
    className="rounded-4 shadow-8"
    alt=""
    style={{ width: '700px', height: '700px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}} // Adjust the width and height as needed
  />
</div>

        </div>
      </div>
    </section>
  );
};


export default Login;
