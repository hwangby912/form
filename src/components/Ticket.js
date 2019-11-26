import React from "react";
import Tickets from "../css/img/Tickets.png";
import Tickets1 from "../css/img/Tickets1.png";
import "../css/Ticket.css";

export default function Ticket(props) {
  const id = props.myStorage.getItem("id");
  const ticket = props.ticket;

  // ticket state 추가하기
  const ticketAdd1 = () => {
    props.setTicket(ticket + 1);
    alert("1,000원이 결제 되었습니다. ");
  };
  const ticketAdd2 = () => {
    props.setTicket(ticket + 10);
    alert("9,000원이 결제 되었습니다. ");
  };
  const ticketAdd3 = () => {
    props.setTicket(ticket + 50);
    alert("39,900원이 결제 되었습니다. ");
  };
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
          <button className="ticket-btn" onClick={ticketAdd1}>
            {" "}
            (1,000원)구 매{" "}
          </button>
        </article>
        <article>
          <img src={Tickets1} />
          <div className="text">
            <h2>Ticket * 10</h2>
          </div>
          <button className="ticket-btn" onClick={ticketAdd2}>
            {" "}
            (9,000원)구 매{" "}
          </button>
        </article>
        <article>
          <img src={Tickets1} />
          <div className="text">
            <h2>Ticket * 50</h2>
          </div>
          <button className="ticket-btn" onClick={ticketAdd3}>
            {" "}
            (39,900원)구 매{" "}
          </button>
        </article>
      </main>
    </div>
  );
}
