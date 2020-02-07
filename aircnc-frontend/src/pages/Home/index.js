import React, { useState, useEffect } from "react";

import socketio from "socket.io-client";

import api from "../../services/api";

import UserOptions from "./UserOptions";

import "./styles.css";


export default function Home({ history }) {
  const [spots, setSpots] = useState([]);
  const [techsSearch, setTechsSearch] = useState("");
  const [statusUser, setStatusUser] = useState(null);
  const [bookingResponse, setBookingResponse] = useState([]);

  useEffect(() => {
    async function loadSpots() {
      const response = await api.get("/Spots");

      setSpots(response.data.Spots);
    }
    setStatusUser(sessionStorage.getItem("User"));
    loadSpots();
  }, [techsSearch, statusUser]);

  useEffect(() => {
    if (sessionStorage.User === "true") {
      const socket = socketio.connect("http://localhost:3333", {
        query: `token=${sessionStorage.getItem("Authorization").split(" ")[1]}`,
      });

      socket.on("bookingResponse", (data) => {
        setBookingResponse([...bookingResponse, data]);
      });
    }
  }, [bookingResponse]);

  async function findTechs() {
    try {
      const response = await api.get("/Spots/Search", {
        params: {
          techs: techsSearch,
        },
      });

      setSpots(response.data.Spots);
    } catch (error) {
      setTechsSearch("");
      alert("Não há Spots que usam essas tecnologias");
    }
  }

  async function handleBooking(idSpot) {
    if (statusUser === "true") {
      const data = Date.now().toString();
      const booking = await api.post(`/Booking/${idSpot}`, {
        Date: data,
      }, {
        headers: {
          Authorization: sessionStorage.getItem("Authorization"),
        },
      });
      alert(`Sua solicitação de reserva foi encaminhada para ${booking.data.booking.spot.company}. Aguarde a resposta do Spot`);
    } else {
      history.push("/Login");
    }
  }

  function deleteNotification(id) {
    setBookingResponse(bookingResponse.filter((notification) => notification.booking._id !== id));
  }

  return (
    <>
      <div>
        <ul className="notifications-response">
          {
            bookingResponse.length === 0 ? "" : bookingResponse.map((request) => (
              <li
                key={request.booking._id}
                className={request.response === true ? "approval" : "reject"}
              >
                <button type="button" onClick={() => deleteNotification(request.booking._id)}>X</button>
                <p>
                  Sua solicitação de reserva para
                  {" "}
                  {request.booking.spot.company}
                  {" "}
foi
                  {" "}
                  <strong>{request.response === true ? "ACEITA" : "RECUSADA"}</strong>
.
                </p>
              </li>
            ))
          }
        </ul>
      </div>
      <header className="nav-basic">
        <h1>Tecnologias que Spots usam</h1>
        <div className="search-box">
          <input
            type="text"
            placeholder="Tecnologias que você procura"
            value={techsSearch}
            onChange={(event) => setTechsSearch(event.target.value)}
          />
          <button type="button" onClick={findTechs}>Procurar</button>
        </div>
        <div className="SessionUser">
          <UserOptions statusUser={statusUser} setStatus={(stauts) => setStatusUser(stauts)} />
        </div>
      </header>

      <h1 className="ul-title">SPOTS</h1>
      <ul className="spot-list">
        {
          spots.map((spot) => (
            <li key={spot._id}>
              <header style={{ backgroundImage: `url(${spot.url})` }} />
              <strong>{spot.company}</strong>
              <span>{spot.price ? `R$${spot.price}/dia` : "GRATUITO"}</span>
              <span className="emai-user">{spot.user.Email}</span>
              <button type="button" className="booking" onClick={() => handleBooking(spot._id)}>Solicitar Reserva</button>
            </li>
          ))
        }
      </ul>
    </>
  );
}
