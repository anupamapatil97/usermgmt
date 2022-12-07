import React, { useEffect, useState } from "react";
import CreateUser from "./createUser";
import axios from "axios";
import { Link } from "react-router-dom";
import "./userList.css";

const UserList = () => {
  const [userList, setUserList] = useState([]);
  const [searchKey, setSearchKey] = useState("");

  const getUserList = async () => {
    const res = await axios.get(process.env.REACT_APP_BASE_URL);
    console.log("res", res);
    setUserList(res.data);
  };

  useEffect(() => {
    getUserList();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(userList);
    console.log(searchKey);

    let updatedList = userList.filter(
      (e) =>
        e.firstName.includes(searchKey) ||
        e.lastName.includes(searchKey) ||
        e.email.includes(searchKey) ||
        e.gender.includes(searchKey)
    );
    setUserList(updatedList);
  };

  const handleDeleteUser=async(user)=>{
      console.log(user.id)
      const res=await axios.delete(`${process.env.REACT_APP_BASE_URL}/${user.id}`, user)
      console.log(res)
      getUserList()
  }

  return (
    <div className="userList-container">
      <div className="userList-wrapper">
        <div className="search-form-container">
          <form className="search-form" onSubmit={handleSearch}>
            <input
              type="text"
              name="searchKey"
              placeholder="Search Here"
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
            />
            <button className="search-btn" type="submit">Search</button>
            <button
            className="clear-search-btn"
              type="button"
              onClick={() => {
                getUserList();
                setSearchKey("");
              }}
            >
              Clear
            </button>
          </form>
        </div>
        <h3 className="userList-title">User Details</h3>
        <div className="userList">
          <div className="btn-container">
            <Link to={"/createUser"} className="create-btn">
              Create
            </Link>
          </div>
          <div className="userDetails-container">
            {userList.length > 0 ? (
              <>
                {userList.map((e, i) => {
                  return (
                    <div className="user-card" key={i}>
                      <div className="img-section">
                        <div className="img-wrapper"></div>
                      </div>
                      <div className="detail-section">
                        <h3>
                          {e.firstName} {e.lastName}
                        </h3>
                        <p>{e.email}</p>
                        <div className="card-btn">
                        <button className="delete-btn" onClick={()=>handleDeleteUser(e)}>Delete</button>
                        <Link to={`editUser/${e.id}`} className="edit-btn">Edit</Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
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
