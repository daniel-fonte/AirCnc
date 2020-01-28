import React, { useState } from "react";

import api from "../../services/api";

export default function Register({ history }) {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  async function handleSubmit(event) {
    try {
      event.preventDefault();

      if (Password.trim().length < 6) {
        setPassword("");
        alert("Senha muito curta");
        return false;
      }
      const response = await api.post("/Register", {
        Email,
        Password,
      });

      localStorage.setItem("Authorization", response.headers.authorization);
      localStorage.setItem("Email", response.data.User.Email);

      return history.push("/Dashboard");
    } catch (error) {
      return false;
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
      <form return onSubmit={handleSubmit}>
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
