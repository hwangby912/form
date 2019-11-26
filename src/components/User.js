import React, { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import authAxios from "../common/authAxios";

import { baseURL } from "../common/config";
import "../css/User.css";

export default function User({
  id,
  passwordSame,
  setPasswordSame,
  company_name,
  setCompany_name,
  company_location,
  setCompany_location,
  phonenumber,
  setPhonenumber,
  myStorage
}) {
  const [newPassword, setNewPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [modified, setModified] = useState(false);

  const handleSubmit = async e => {
    const { data } = await authAxios().post(`${baseURL}/stamp/user`, {
      password: newPassword,
      company_name,
      company_location,
      phonenumber
    });
    if (!data.result) {
      console.log(data);
      alert("modify fail");
    } else {
      console.log(data);
      setModified(true);
      alert("modify success");
    }
  };

  const handleSubmitOnlyPassword = async e => {
    e.preventDefault();

    const { data } = await axios.post(`${baseURL}/stamp/login`, {
      id: myStorage.getItem("id"),
      password: password2
    });
    if (!data.result) {
      console.log(data);
      alert("please check password");
    } else {
      console.log(data);
      setPasswordSame(true);
      alert("success");
    }
  };
  return (
    <>
      {modified && <Redirect to="/home" />}
      {passwordSame ? (
        <div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter New Password"
              id="newPassword"
              // pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$"
              value={newPassword}
              onChange={e => {
                setNewPassword(e.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label>company_name</label>
            <input
              type="text"
              className="form-control"
              placeholder="회사명"
              id="company_name"
              value={company_name}
              onChange={e => {
                setCompany_name(e.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label>company_location</label>
            <input
              type="text"
              className="form-control"
              placeholder="회사위치"
              id="company_location"
              value={company_location}
              onChange={e => {
                setCompany_location(e.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label>phonenumber</label>
            <input
              type="text"
              className="form-control"
              placeholder="연락처"
              id="phonenumber"
              value={phonenumber}
              onChange={e => {
                setPhonenumber(e.target.value);
              }}
            />
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className="btn btn-primary"
          >
            Submit
          </button>
        </div>
      ) : (
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            id="password2"
            value={password2}
            name="password2"
            placeholder="Enter Your Password"
            onChange={e => {
              setPassword2(e.target.value);
            }}
          />
          <button
            type="submit"
            onClick={handleSubmitOnlyPassword}
            className="btn btn-primary"
          >
            Submit
          </button>
        </div>
      )}
    </>
  );
}
