import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { baseURL } from "../common/config";

export default function Login({
  setIsLoggedIn,
  setIsAdmin,
  history,
  setId,
  setTicket,
  setName,
  setCompany_no,
  setCompany_name,
  setCompany_location,
  setPhonenumber,
  myStorage
}) {
  const [loginState, setLoginState] = useState("init");
  // const [ticket, setTicket] = useState(0)
  const handleSubmit = async e => {
    e.preventDefault();
    const { data } = await axios.post(`${baseURL}/stamp/login`, {
      id: e.target.id.value,
      password: e.target.password.value
    });
    setId(data.id);
    setName(data.name);
    setCompany_no(data.company_no);
    setCompany_name(data.company_name);
    setCompany_location(data.company_location);
    setPhonenumber(data.phonenumber);
    setTicket(data.ticket);
    console.log(data);
    if (!data.result) {
      setLoginState("failed");
    } else {
      const { exp } = JSON.parse(
        atob(data.token.split(".")[1]) // base64 decoding
      );
      const expires = new Date(exp * 1000).toUTCString();
      document.cookie = `Authorization=JWT ${data.token};expires=${expires}`;
      setIsAdmin(data.admin);
      setIsLoggedIn(true);
      setLoginState("success");
      myStorage.setItem("id", data.id);
      myStorage.setItem("ticket", data.ticket);
    }
  };
  return (
    <>
      {loginState === "success" ? (
        // error code
        <Redirect to={{ pathname: "/home" }} />
      ) : // <Redirect to={{ pathname: "/home", state: { id: data.id } }} />
      // <Redirect to="/home" />
      null}
      <form onSubmit={handleSubmit}>
        <small>
          {loginState === "failed" && "이메일 혹은 비밀번호를 확인하세요"}
        </small>
        <div className="form-group">
          <label htmlFor="id">ID</label>
          <input
            type="id"
            className="form-control"
            id="id"
            name="id"
            // aria-describedby="emailHelp"
            placeholder="Enter ID"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Enter Password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => history.push("/signup")}
        >
          회원가입
        </button>
      </form>
    </>
  );
}
