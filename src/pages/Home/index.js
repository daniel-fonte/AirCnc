import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import api from "../../services/api";
import "./styles.css";


export default function Home() {
  const [spots, setSpots] = useState([]);
  const [techsSearch, setTechsSearch] = useState("");

  useEffect(() => {
    async function loadSpots() {
      const response = await api.get("/Spots");

      setSpots(response.data.Spots);
    }

    loadSpots();
  }, []);


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

  return (
    <>
      <header className="nav-basic">
        <h1>Spots que usam</h1>
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
          <Link to="/Register">
            <button type="button">Criar Conta</button>
          </Link>
          <Link to="/Login">
            <button type="button">Login</button>
          </Link>
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
                      </li>
                    ))
                }
      </ul>

    </>
  );
}
