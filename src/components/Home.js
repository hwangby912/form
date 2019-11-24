import React from "react";
import { Link } from "react-router-dom";

import "../css/Home.css";

export default function Home(props) {
  props.setPasswordSame(false);
  const id = props.id;
  const ticket = props.ticket;
  return (
    <div>
      <h1>{id}님 환영합니다. </h1>
      <h2>보유 Ticket은 {ticket}개 입니다. </h2>
      <ul className="home-link-wrapper">
        <li>
          <Link className="home-link" to={"/user"}>
            User Info
          </Link>
          <span>User information Page</span>
        </li>
        <li>
          <Link className="home-link" to={"/board"}>
            Board Register
          </Link>
          <span>Advertisement Registration Page</span>
        </li>
        <li>
          <Link className="home-link" to={"/ticket"}>
            Ticket Purchase
          </Link>
          <span>Ticket Purchase Page</span>
        </li>
      </ul>
    </div>
  );
}
