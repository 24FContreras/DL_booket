import "../assets/css/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSessionContext } from "../context/sessionContext";
import axios from "axios";

const Login = () => {
  const { session, setSession } = useSessionContext();
  const navigate = useNavigate();

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
    setErrors([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        import.meta.env.VITE_API_URL + "/login",
        login
      );

      if (data.errors) {
        setErrors([...data.errors]);
      } else {
        localStorage.setItem("token", data);
        localStorage.setItem("booketCart", JSON.stringify({ items: [] }));
        setSession({ ...session, active: true });
        navigate("/profile");
      }
    } catch ({ response: { data: err } }) {
      alert(err.message);
    }
  };

  useEffect(() => {
    document.title = "Inicia sesión - Booket.market";
  }, []);

  const setError = (field) => {
    if (!errors.length) {
      return "";
    } else {
      const error = errors.find((item) => item.path === field);

      if (error) {
        return error.msg;
      } else return "";
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
              className={
                setError("email") ? " form-control is-invalid" : "form-control"
              }
              name="email"
              placeholder="tucorreo@mail.com"
              value={login.loginEmail}
              onChange={handleChange}
            />
            <p className="text-danger mb-2">{setError("email")}</p>
          </div>

          <div className="mb-3">
            <label htmlFor="loginPassword" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              className={
                setError("password")
                  ? " form-control is-invalid"
                  : "form-control"
              }
              name="password"
              placeholder="**********"
              value={login.loginPassword}
              onChange={handleChange}
            />
            <p className="text-danger mb-2">{setError("password")}</p>
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
