import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

import "./createUser.css"
import { useNavigate } from "react-router";

const EditUser = () => {

    const [formValues, setFormValues] =useState({
        firstName:'',
        lastName:"",
        email:"",
        dob:"",
        gender:""
    })
    const [errorMessage, setErrorMessage]= useState(false)



    const {id}= useParams()
    const history= useNavigate()

    useEffect(()=>{
        getUserDetails()
    },[])

    const getUserDetails= async()=>{
        let res= await axios.get(`${process.env.REACT_APP_BASE_URL}/${id}`)
        setFormValues(res.data)
        console.log(res.data)
    }

    

    const handleChange= (e)=>{
        setFormValues({...formValues, [e.target.name]:e.target.value})
    }

    const handleSubmit=async(e)=>{
        e.preventDefault()
        console.log(formValues)
        if(formValues.firstName ==="" || formValues.lastName==="" || formValues.email==="" || formValues.dob===""){
          setErrorMessage(true)  
          return false
        }
        let res= await axios.put(`${process.env.REACT_APP_BASE_URL}/${formValues.id}`,{...formValues})
        history("/")
    }


  return (
    <div className="createUser-container">
      <div className="createUser-wrapper">
      <h2 className="createUser-title">Edit User</h2>
      <div className="form-container">
      
      <div className="form-wrapper">
      <div className="goback">
      <Link className="goback-btn" to={"/"}>Go Back</Link>
      </div>
      {errorMessage && <p className="error-message">Please Provide All Details</p>}
      <form onSubmit={handleSubmit} className="createUser-form">
        <div className="form-group">
          <label className="form-label">First Name:</label>
          <input type="text" name="firstName" className="form-control" value={formValues.firstName} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label className="form-label">Last Name:</label>
          <input type="text" name="lastName" className="form-control" value={formValues.lastName} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label className="form-label">Email:</label>
          <input type="email" name="email" className="form-control" value={formValues.email} onChange={handleChange} disabled/>
        </div>

        <div className="form-group">
          <label className="form-label">Date of Birth:</label>
          <input type="date" name="dob" className="form-control" value={formValues.dob} onChange={handleChange} disabled/>
        </div>

        <div className="form-group d-flex mt-2">
            <label className="form-label">Gender: </label>
            <div className="form-check">
          <input
            className="form-check-input mx-1"
            type="radio"
            name="gender"
            id="male"
            value="Male" onChange={handleChange}
            checked={formValues.gender==="Male"}
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
            value="Female" onChange={handleChange}
            checked={formValues.gender==="Female"}
          />
          <label className="form-check-label" htmlFor="female">
            Female
          </label>
        </div>
        </div>
        <div className="create-cancel-btn">
            <button type="submit" className="create-user-btn">Edit</button>
            <Link to={"/"} className="cancel-btn">Cancel</Link>    
        </div>
      </form>
      </div>
      </div>
    </div>
    </div>
  );
};

export default EditUser;
