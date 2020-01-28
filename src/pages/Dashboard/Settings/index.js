import React, { useState } from "react";

import api from "../../../services/api";

export default function Settings({ history }) {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  async function deleteUser() {
    await api.delete("/User/Settings", {
      headers: {
        Authorization: localStorage.getItem("Authorization"),
      },
    });

    history.push("/Register");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const response = await api.put("/User/Settings", {
      Password,
      Email,
      newPassword,
    }, {
      headers: {
        Authorization: localStorage.getItem("Authorization"),
      },
    });

    localStorage.setItem("Email", response.data.UserUpdated.Email);

    history.push("/Dashboard");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="text"
        placeholder="Seu melhor email"
        onChange={(event) => setEmail(event.target.value)}
        value={Email}
      />
      <label htmlFor="password">Senha antiga</label>
      <input
        id="password"
        type="password"
        placeholder="Senha que você usa"
        onChange={(event) => setPassword(event.target.value)}
        value={Password}
      />
      <label htmlFor="newPassword">Senha nova</label>
      <input
        id="newPassword"
        type="password"
        placeholder="Senha que você usa"
        onChange={(event) => setNewPassword(event.target.value)}
        value={newPassword}
      />

      <button type="submit" className="btn" style={{ marginBottom: `${5}px` }}>Salvar Alterações</button>
      <button type="button" className="btn" onClick={deleteUser}>Deletar Conta</button>
    </form>
  );
}
