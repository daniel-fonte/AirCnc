import React from "react";
import { Link } from "react-router-dom";

export default function UserOptions(props) {
  function handleLogout() {
    props.setStatus("false");
    sessionStorage.setItem("User", false);
    sessionStorage.removeItem("Authorization");
    sessionStorage.removeItem("Email");
  }

  if (props.statusUser === "true") {
    return (
      <>
        <Link to="/Dashboard">
          <button type="button">Dashboard</button>
        </Link>
        <button type="button" onClick={handleLogout}>Sair</button>
      </>
    );
  }
  if (props.statusUser === "false" || props.statusUser === null) {
    return (
      <>
        <Link to="/Register">
          <button type="button">Criar Conta</button>
        </Link>
        <Link to="/Login">
          <button type="button">Login</button>
        </Link>
      </>
    );
  }
}
