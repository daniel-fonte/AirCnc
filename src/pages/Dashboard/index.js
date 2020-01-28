import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../../services/api";

import "./styles.css";

export default function Dashboard() {
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    async function loadSpots() {
      const response = await api.get("/Spot/Dashboard", {
        headers: {
          Authorization: localStorage.getItem("Authorization"),
        },
      });
      setSpots(response.data.Spots);
    }
    loadSpots();
  }, []);

  function setIdSpot(id) {
    localStorage.setItem("spot", id);
  }

  async function deleteSpot(id) {
    setSpots(spots.filter((spot) => spot._id !== id));
    await api.delete(`/Spot/Dashboard/${id}`, {
      headers: { Authorization: localStorage.getItem("Authorization") },
    });
  }
  return (
    <>
      <header>
        <h1>{localStorage.getItem("Email")}</h1>
        <Link to="/Dashboard/Settings">
          <button type="button" className="btn">Editar</button>
        </Link>
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
