import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./createUser.css";
import { useNavigate } from "react-router";


const CreateUser = () => {
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    gender: "",
  });

  const [fieldError, setFieldError] = useState({
    firstName: {
      message: "",
      validate: false,
    },
    lastName: {
      message: "",
      validate: false,
    },
    email: {
      message: "",
      validate: false,
    },
    dob: {
      message: "",
      validate: false,
    },
    gender: {
      message: "",
      validate: false,
    },
  });

  const history= useNavigate()


  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formValues);
    let res = await axios.post(process.env.REACT_APP_BASE_URL, {
      ...formValues,
    });
    history("/")    
  };

  const handleBlur = (e) => {
    if (e.target.value.trim() === "") {
      setFieldError({
        ...fieldError,
        [e.target.name]: {
          message: `${e.target.placeholder} is required`,
          validate: true,
        },
      });
      return;
    }
  };

  const emailValidation = (e) => {
    let regexp = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (! regexp.test(e.target.value)) {
      setFieldError({
        ...fieldError,
        [e.target.name]: {
          message: `Please enter valid ${e.target.name}`,
          validate: true,
        },
      });
      return
    }
  };

  const handleFocus = (e) => {
    setFieldError({
      ...fieldError,
      [e.target.name]: { message: "", validate: false },
    });
  };

  return (
    <div className="createUser-container">
      <div className="createUser-wrapper">
        <h2 className="createUser-title">Create User</h2>
        <div className="form-container">
          <div className="form-wrapper">
            <div className="goback">
              <Link className="goback-btn" to={"/"}>
                Go Back
              </Link>
            </div>
            <form onSubmit={handleSubmit} className="createUser-form">
              <div className="form-group">
                <label className="form-label">First Name:</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className="form-control"
                  value={formValues.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onFocus={handleFocus}
                />
                <span className="error-message">
                  {fieldError.firstName.validate &&
                    fieldError.firstName.message}
                </span>
              </div>
              <div className="form-group">
                <label className="form-label">Last Name:</label>
                <input
                  type="text"
                  name="lastName"
                  className="form-control"
                  placeholder="Last Name"
                  value={formValues.lastName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  onFocus={handleFocus}
                />
                <span className="error-message">
                  {fieldError.lastName.validate && fieldError.lastName.message}
                </span>
              </div>

              <div className="form-group">
                <label className="form-label">Email:</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formValues.email}
                  placeholder="Email"
                  onBlur={(e) => {
                    handleBlur(e);
                    emailValidation(e);
                  }}
                  onChange={handleChange}
                  onFocus={handleFocus}
                />
                <span className="error-message">
                  {fieldError.email.validate && fieldError.email.message}
                </span>
              </div>

              <div className="form-group">
                <label className="form-label">Date of Birth:</label>
                <input
                  type="date"
                  name="dob"
                  className="form-control"
                  placeholder="Date of Birth"
                  value={formValues.dob}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  onFocus={handleFocus}
                />
                <span className="error-message">
                  {fieldError.dob.validate && fieldError.dob.message}
                </span>
              </div>

              <div className="form-group d-flex mt-2">
                <label className="form-label">Gender: </label>
                <div className="form-check">
                  <input
                    className="form-check-input mx-1"
                    type="radio"
                    name="gender"
                    id="male"
                    value="Male"
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="male">
                    Male
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input mx-1"
                    type="radio"
                    name="gender"
                    id="female"
                    value="Female"
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="female">
                    Female
                  </label>
                </div>
              </div>
              <div className="create-cancel-btn">
                <button type="submit" className="create-user-btn">
                  Create
                </button>
                <Link to={"/"} className="cancel-btn">
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
