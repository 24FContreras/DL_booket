import "../assets/css/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSessionContext } from "../context/sessionContext";
import axios from "axios";

const Login = () => {
  const { session, setSession } = useSessionContext();
  const navigate = useNavigate();

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!login.email.trim() || !login.password.trim()) {
        alert("Debe rellenar todos los campos");
        return;
      }

      const { data: token } = await axios.post(
        "https://booketapi.onrender.com/api/login",
        login
      );

      localStorage.setItem("token", token);
      setSession(true);
      navigate("/profile");
    } catch ({ response: { data: error } }) {
      alert(error.message);
    }
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
              name="email"
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
              name="password"
              placeholder="**********"
              value={login.loginPassword}
              onChange={handleChange}
            />
          </div>

          <button className="btn btn-primary rounded-0" type="submit">
            Ingresar
          </button>
        </form>

        <Link
          className="d-block text-center link-secondary link-underline link-underline-opacity-0"
          to="/register"
        >
          ¿No tienes una cuenta? Regístrate aquí
        </Link>
      </main>
    </div>
  );
};

export default Login;
