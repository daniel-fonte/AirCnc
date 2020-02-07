import React, { useState } from "react";

import api from "../../services/api";

export default function Register({ history }) {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  async function handleSubmit(event) {
    try {
      event.preventDefault();

      const response = await api.post("/Register", {
        Email,
        Password,
      });

      sessionStorage.setItem("Authorization", response.headers.authorization);
      sessionStorage.setItem("Email", response.data.user.Email);
      sessionStorage.setItem("User", true);

      return history.push("/");
    } catch (error) {
      return error;
    }
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
        <button type="submit" className="btn">Cadastrar</button>
      </form>
    </>
  );
}
