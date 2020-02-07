import React, { useState, useMemo } from "react";

import camera from "../../../assets/camera.svg";
import api from "../../../services/api";

import "./styles.css";

export default function NewSpot({ history }) {
  const [company, setCompany] = useState("");
  const [price, setPrice] = useState("");
  const [techs, setTechs] = useState("");
  const [thumbnail, setThumbnail] = useState(null);

  const preview = useMemo(() => (thumbnail ? URL.createObjectURL(thumbnail) : null), [thumbnail]);

  async function handleSubmit(event) {
    event.preventDefault();

    const data = new FormData();

    data.append("thumbnail", thumbnail);
    data.append("company", company);
    data.append("price", price);
    data.append("techs", techs);

    await api.post("/Spot/Dashboard", data, {
      headers: {
        Authorization: sessionStorage.getItem("Authorization"),
      },
    });

    history.push("/Dashboard");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label
        id="thumbnail"
        style={{ backgroundImage: `url(${preview})` }}
        className={thumbnail ? "has-thumbnail" : ""}
      >
        <input type="file" onChange={(event) => setThumbnail(event.target.files[0])} />
        <img src={camera} alt="Select img" />
      </label>
      <label htmlFor="company">Empresa</label>
      <input
        type="text"
        id="company"
        onChange={(event) => setCompany(event.target.value)}
        value={company}
        placeholder="Sua empresa"
      />
      <label htmlFor="techs">Tecnologias</label>
      <input
        type="text"
        id="techs"
        onChange={(event) => setTechs(event.target.value.toUpperCase())}
        value={techs}
        placeholder="Tecnologias que sua empresa usa"
      />
      <label htmlFor="price">Preço</label>
      <input
        type="text"
        id="price"
        onChange={(event) => setPrice(event.target.value)}
        value={price}
        placeholder="Deixe vazio para ser GRATUITO"
      />
      <button type="submit" className="btn">Cadastrar</button>
    </form>
  );
}
