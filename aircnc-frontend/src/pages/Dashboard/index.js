import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import socketio from "socket.io-client";

import api from "../../services/api";

import "./styles.css";

export default function Dashboard() {
  const [spots, setSpots] = useState([]);
  const [booking, setBooking] = useState([]);

  useEffect(() => {
    const tokenJwt = sessionStorage.getItem("Authorization").split(" ");

    const socket = socketio.connect("http://localhost:3333", {
      query: `token=${tokenJwt[1]}`,
    });

    socket.on("booking_request", (data) => {
      setBooking([data]);
    });
  }, [booking]);

  useEffect(() => {
    async function loadSpots() {
      const response = await api.get("/Spot/Dashboard", {
        headers: {
          Authorization: sessionStorage.getItem("Authorization"),
        },
      });

      setSpots(response.data.Spots);
    }
    loadSpots();
  }, []);

  function setIdSpot(id) {
    sessionStorage.setItem("spot", id);
  }

  async function deleteSpot(id) {
    setSpots(spots.filter((spot) => spot._id !== id));
    await api.delete(`/Spot/Dashboard/${id}`, {
      headers: { Authorization: sessionStorage.getItem("Authorization") },
    });
  }

  async function handleAccept(id) {
    const response = await api.post(`/Booking/${id}/approval`, {}, {
      headers: {
        Authorization: sessionStorage.getItem("Authorization"),
      },
    });

    setBooking(booking.filter((request) => request._id !== response.data.BookingResponse._id));
  }

  async function handleReject(id) {
    const response = await api.post(`/Booking/${id}/rejection`, {}, {
      headers: {
        Authorization: sessionStorage.getItem("Authorization"),
      },
    });

    setBooking(booking.filter((request) => request._id !== response.data.BookingResponse._id));
  }

  return (
    <>
      <div className="request-booking">
        <ul className="notifications">
          {
            booking.length === 0 ? "" : booking.map((request) => (
              <li key={request._id}>
                <p>
                  <strong>{request.user.Email}</strong>
                  {" "}
está solicitando uma reserva em
                  <strong>{request.spot.company}</strong>
                </p>
                <button type="button" onClick={() => handleAccept(request._id)} className="accept">ACEITAR</button>
                <button type="button" onClick={() => handleReject(request._id)} className="reject">REJEITAR</button>
              </li>
            ))
          }
        </ul>
      </div>
      <header>
        <Link to="/">
          <img src="https://img.icons8.com/flat_round/64/000000/home--v1.png" alt="Home Page" />
        </Link>
        <div>
          <h1>{sessionStorage.getItem("Email")}</h1>
          <Link to="/Dashboard/Settings">
            <button type="button">Editar</button>
          </Link>
        </div>
      </header>
      <ul className="spot-list">
        {
                   spots.map((spot) => (
                     <li key={spot._id}>
                       <header style={{ backgroundImage: `url(${spot.url})` }} />
                       <strong>{spot.company}</strong>
                       <span>{spot.price ? `R$${spot.price}/dia` : "GRATUITO"}</span>
                       <button
                         type="button"
                         onClick={() => deleteSpot(spot._id)}
                         className="btn"
                       >
                          Excluir
                       </button>
                       <Link to="Dashboard/Update">
                         <button type="button" className="btn" onClick={() => setIdSpot(spot._id)}>Editar</button>
                       </Link>
                     </li>
                   ))
               }
      </ul>
      <Link to="/Dashboard/New">
        <button type="button" className="btn"> Criar Spot</button>
      </Link>
    </>
  );
}
