import "../assets/css/Register.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [register, setRegister] = useState({
    registerEmail: "",
    registerUsername: "",
    registerPass: "",
    registerRepass: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setRegister({ ...register, [e.target.name]: e.target.value });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();

    console.log("submit");

    const {
      registerEmail: email,
      registerUsername: username,
      registerPass: password,
    } = register;

    const nuevoUsuario = { email, username, password };

    console.log(nuevoUsuario);

    try {
      await axios.post(
        "https://booketapi.onrender.com/api/register",
        nuevoUsuario
      );
      alert("Usuario registrado con éxito");
      navigate("/login");
    } catch (error) {
      alert("Algo salió mal ...");
      console.log(error);
    }
  };

  useEffect(() => {
    document.title = "Regístrate - Booket.market";
  }, []);

  return (
    <main className="register-main container-fluid register-main">
      <div className="row">
        <section className="register-image col "></section>
        <section className="col p-4">
          <h1 className="mb-4">Regístrate</h1>
          <form className="row row-cols-2 g-4" onSubmit={handlesubmit}>
            <div className="col">
              <label htmlFor="registerEmail" className="form-label">
                Correo electrónico
              </label>
              <input
                type="email"
                className="form-control"
                name="registerEmail"
                placeholder="tucorreo@mail.com"
                value={register.registerEmail}
                onChange={handleChange}
              />
            </div>

            <div className="col">
              <label htmlFor="registerUsername" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                name="registerUsername"
                placeholder="nombre de usuario"
                value={register.registerUsername}
                onChange={handleChange}
              />
            </div>

            <div className="col">
              <label htmlFor="registerPass" className="form-label">
                Contraseña
              </label>
              <input
                type="password"
                className="form-control"
                name="registerPass"
                placeholder="********"
                value={register.registerPass}
                onChange={handleChange}
              />
            </div>

            <div className="col">
              <label htmlFor="registerRepass" className="form-label">
                Ingresa nuevamente tu contraseña
              </label>
              <input
                type="password"
                className="form-control"
                name="registerRepass"
                placeholder="********"
                value={register.registerRepass}
                onChange={handleChange}
              />
            </div>

            <div className="col">
              <button className="btn btn-primary register-btn" type="submit">
                Registra tu usuario
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
};

export default Register;
