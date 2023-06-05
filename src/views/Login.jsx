import "../assets/css/Login.css";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSessionContext } from "../context/sessionContext";

const Login = () => {
  const navigate = useNavigate();

  const { session, setSession } = useSessionContext();

  const [login, setLogin] = useState({
    loginEmail: "",
    loginPassword: "",
  });

  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!login.loginEmail.trim() || !login.loginPassword.trim()) {
      alert("Usuario incorrecto");
      return;
    }

    alert("Bienvenido!");

    localStorage.setItem("token", "placeholdertoken");
    navigate("/profile");
  };

  return (
    <div className="login-wrapper bg-secondary-subtle">
      <header className="login-header"></header>

      <main className="login-main shadow bg-white">
        <h1 className="fs-3">¡Bienvenido de vuelta!</h1>

        <form
          action=""
          className="d-flex flex-column mb-4"
          onSubmit={handleSubmit}
        >
          <div className="mb-3">
            <label htmlFor="loginEmail" className="form-label">
              Correo electrónico
            </label>
            <input
              type="email"
              className="form-control"
              id="loginEmail"
              name="loginEmail"
              placeholder="tucorreo@mail.com"
              value={login.loginEmail}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="loginPassword" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              className="form-control"
              id="loginPassword"
              name="loginPassword"
              placeholder="**********"
              value={login.loginPassword}
              onChange={handleChange}
            />
          </div>

          <button className="btn btn-primary rounded-0" type="submit">
            Ingresar
          </button>
        </form>

        <Link className="d-block text-center" to="/register">
          ¿No tienes una cuenta? Regístrate aquí
        </Link>
      </main>
    </div>
  );
};

export default Login;
