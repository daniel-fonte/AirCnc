import React, { useState, useEffect } from "react";

import api from "../../../services/api";

export default function UpdateSpot({ history }) {
  const [price, setPrice] = useState("");
  const [company, setCompany] = useState("");
  const [techs, setTechs] = useState("");

  useEffect(() => {
    async function loadSpot() {
      const response = await api.get(`/Spot/Dashboard/${localStorage.getItem("spot")}`, {
        headers: {
          Authorization: localStorage.getItem("Authorization"),
        },
      });


      setPrice(response.data.Spot.price);
      setCompany(response.data.Spot.company);
      setTechs(response.data.Spot.techs.toString());
    }
    loadSpot();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    api.put(`/Spot/Dashboard/${localStorage.getItem("spot")}`, {
      company,
      price,
      techs,
    }, {
      headers: {
        Authorization: localStorage.getItem("Authorization"),
      },
    });

    history.push("/Dashboard");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="company">Empresa</label>
      <input
        id="company"
        type="text"
        onChange={(event) => setCompany(event.target.value)}
        value={company}
        placeholder="Sua empresa"
      />
      <label htmlFor="price">Preço</label>
      <input
        id="price"
        type="text"
        onChange={(event) => setPrice(event.target.value)}
        value={price}
        placeholder="Preço do aluguel"
      />
      <label htmlFor="techs">Tecnologias</label>
      <input
        id="techs"
        type="text"
        onChange={(event) => setTechs(event.target.value)}
        value={techs}
        placeholder="Tecnologias que sua empresa usa"
      />
      <button type="submit" className="btn">Salvar alterações</button>
    </form>
  );
}
