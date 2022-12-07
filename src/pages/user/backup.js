import React, { useEffect, useState } from "react";
import CreateUser from "./createUser";
import axios from "axios";
import { Link } from "react-router-dom";
import "./userList.css"

const UserList = () => {
  const [userList, setUserList] = useState([]);
  const [searchKey, setSearchKey]= useState("")

  const getUserList = async () => {
    const res = await axios.get(process.env.REACT_APP_BASE_URL);
    console.log("res", res);
    setUserList(res.data);
  };

  useEffect(() => {
    getUserList();
  }, []);

const handleSearch=(e)=>{
    e.preventDefault()
    console.log(userList)
    console.log(searchKey)

    let updatedList=userList.filter((e)=>(e.firstName.includes(searchKey) || e.lastName.includes(searchKey) || e.email.includes(searchKey) || e.gender.includes(searchKey)))
    setUserList(updatedList)
}

  return (
    <div className="userList-container">
    <div className="userList-wrapper">
        <div>
            <form onSubmit={handleSearch}>
                <input type="text" name="searchKey" value={searchKey} onChange={(e)=>setSearchKey(e.target.value)}/>
                <button type="submit">Search</button>
                <button type="button" onClick={()=> {getUserList(); setSearchKey("")}}>Clear</button>


            </form>
        </div>
      <h3 className="userList-title">User Details</h3>
      <div className="userList">
        <div className="btn-container">
          <Link to={"/createUser"} className="create-btn">
            Create
          </Link>
        </div>
        <div className="table-container">
        {userList.length > 0 ? (
          <>
            <table className="table-wrapper">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>DOB</th>
                  <th>Gender</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>

              {userList.map((e, i) => {
                return (
                    <tr key={i}>
                      <td>{e.id}</td>
                      <td>{e.firstName}</td>
                      <td>{e.lastName}</td>
                      <td>{e.email}</td>
                      <td>{e.dob}</td>
                      <td>{e.gender}</td>
                      <td>
                        <button className="delete-btn">Delete</button>
                        <button className="edit-btn">Edit</button>
                      </td>
                    </tr>
                );
              })}
                  </tbody>

            </table>
          </>
        ) : (
          <p>No Users Found</p>
        )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default UserList;
