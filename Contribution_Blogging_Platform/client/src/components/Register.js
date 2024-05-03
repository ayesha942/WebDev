import React, { useState } from 'react';
import { isEmail } from 'validator';
import axios from 'axios'; // Import axios

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
      <div className="invalid-feedback d-block">
       
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="invalid-feedback d-block">
       
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="invalid-feedback d-block">
       
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="invalid-feedback d-block">
       
      </div>
    );
  }
};

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080', // Replace with your backend URL
});
const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();

    setMessage('');
    setSuccessful(false);

    const isFormValid = validateForm();

    if (isFormValid) {
      try {
        // Make an API call to register user
        const response = await axiosInstance.post('/api/register', {
          firstName,
          lastName,
          email,
          password,
          username,
        });

        // Check if registration was successful
        if (response.data.msg) {
          setSuccessful(true);
          setMessage(response.data.msg);
          // Additional actions for successful registration if needed
        } else {
          setMessage('Registration failed. Please try again.');
        }
      } catch (error) {
        console.error('Error during registration:', error.response || error);
  setMessage('Registration failed. Please try again.');
      }
    } else {
      setMessage('Some form fields are invalid. Please check and try again.');
    }
  };

  const validateForm = () => {
    return (
      firstName &&
      lastName &&
      email &&
      password &&
      username &&
      !vusername(username) &&
      !required(firstName) &&
      !required(lastName) &&
      !required(email) &&
      !validEmail(email) &&
      !required(password) &&
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
          <div className="col-lg-6 mb-5 mb-lg-0">
            <div className="card cascading-right" style={{
              background: `linear-gradient(to bottom, ${colorPalette.primary}, ${colorPalette.secondary})`,
              color: colorPalette.quinary,
            }}>
              <div className="card-body p-5 shadow-5 text-center">
                <h2 className="fw-bold mb-5">Sign up now</h2>
                <form onSubmit={handleSignUp}>
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <input
                          type="text"
                          id="form3Example1"
                          className="form-control"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                        <label className="form-label" htmlFor="form3Example1">First name</label>
                        {required(firstName)}
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <input
                          type="text"
                          id="form3Example2"
                          className="form-control"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                        <label className="form-label" htmlFor="form3Example2">Last name</label>
                        {required(lastName)}
                      </div>
                    </div>
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      id="form3Example3"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label className="form-label" htmlFor="form3Example3">Email address</label>
                    {required(email)}
                    {validEmail(email)}
                  </div>

                  <div className="form-outline mb-4">
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

                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      id="form3Example5"
                      className="form-control"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <label className="form-label" htmlFor="form3Example5">Username</label>
                    {required(username)}
                    {vusername(username)}
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

                  <button type="submit" className="btn btn-primary btn-block mb-4" >
                    Sign up
                  </button>

                  <div className="text-center">
                    <p>or sign up with:</p>
                    <button type="button" className="btn btn-link btn-floating mx-1">
                      <i className="bi bi-facebook"></i>
                    </button>

                    <button type="button" className="btn btn-link btn-floating mx-1">
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
    style={{ width: '700px', height: '830px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}} // Adjust the width and height as needed
  />
</div>
        </div>
      </div>
    </section>
  );
};

export default Register;
