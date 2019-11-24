import React from "react";
import Tickets from "../css/img/Tickets.png";
import Tickets1 from "../css/img/Tickets1.png";
import "../css/Ticket.css";

export default function Ticket(props) {
  const id = props.id;
  const ticket = props.ticket;
  return (
    <div>
      <h1>Ticket Page</h1>
      <h3>{id}님 환영합니다. </h3>
      <h3>보유 Ticket은 {ticket}개 입니다. </h3>
      <main className="grid">
        <article>
          <img src={Tickets} />
          <div className="text">
            <h2>Ticket * 1</h2>
          </div>
          <button className="ticket-btn"> (1,000원)구 매 </button>
        </article>
        <article>
          <img src={Tickets1} />
          <div className="text">
            <h2>Ticket * 10</h2>
          </div>
          <button className="ticket-btn"> (9,000원)구 매 </button>
        </article>
        <article>
          <img src={Tickets1} />
          <div className="text">
            <h2>Ticket * 50</h2>
          </div>
          <button className="ticket-btn"> (39,900원)구 매 </button>
        </article>
      </main>
    </div>
  );
}
