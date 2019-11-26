import React from "react";
import { Link } from "react-router-dom";

import "../css/Home.css";
import userLogo from "../css/img/user-logo.png";
import adLogo from "../css/img/ad-logo.png";
import ticketLogo from "../css/img/Ticket-logo.png";

export default function Home(props) {
  props.setPasswordSame(false);
  const id = props.myStorage.getItem("id");
  const ticket = props.ticket;
  return (
    <div>
      <h1>{id}님 환영합니다. </h1>
      <h2>보유 Ticket은 {ticket}개 입니다. </h2>
      <ul className="home-link-wrapper">
        <li>
          <Link className="home-link" to={"/user"}>
            <img src={userLogo} className="logo-img" />
            <br />
            User Info
          </Link>
          <span>User information Page</span>
        </li>
        <li>
          <Link className="home-link" to={"/board"}>
            <img src={adLogo} className="logo-img" />
            <br />
            Board Register
          </Link>
          <span>Advertisement Registration Page</span>
        </li>
        <li>
          <Link className="home-link" to={"/ticket"}>
            <img src={ticketLogo} className="logo-img" />
            <br />
            Ticket Purchase
          </Link>
          <span>Ticket Purchase Page</span>
        </li>
      </ul>
    </div>
  );
}
