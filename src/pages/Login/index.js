import React, { useState } from "react";

import api from "../../services/api";

import "./styles.css";

export default function Login({ history }) {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const response = await api.post("/Login", {
      Password,
      Email,
    });
    localStorage.setItem("Authorization", response.headers.authorization);
    localStorage.setItem("Email", response.data.user.Email);

    history.push("/Dashboard");
  }
  function handleRegister() {
    history.push("/Register");
  }
  return (
    <>
      <p>
                Ofereça
        {" "}
        <strong>spots</strong>
        {" "}
para programadores e encontre
        {" "}
        <strong>talentos</strong>
        {" "}
para sua empresa.
      </p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          onChange={(event) => setEmail(event.target.value)}
          value={Email}
          placeholder="Seu melhor e-mail"
          required
        />
        <label htmlFor="password">Senha</label>
        <input
          type="password"
          id="password"
          onChange={(event) => setPassword(event.target.value)}
          value={Password}
          placeholder="Sua senha"
          required
        />
        <a onClick={handleRegister}>Não possui uma conta!</a>
        <button type="submit" className="btn">Login</button>
      </form>
    </>
  );
}
