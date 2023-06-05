import "../assets/css/Register.css";
import { useState } from "react";

const Register = () => {
  const [register, setRegister] = useState({
    registerEmail: "",
    registerUsername: "",
    registerPass: "",
    registerRepass: "",
  });

  const handleChange = (e) => {
    setRegister({ ...register, [e.target.name]: e.target.value });
  };

  return (
    <main className="register-main container-fluid register-main">
      <div className="row">
        <section className="register-image col "></section>
        <section className="col p-4">
          <h1 className="mb-4">Regístrate</h1>
          <form className="row row-cols-2 g-4">
            <div className="col">
              <label htmlFor="registerEmail" className="form-label">
                Correo electrónico
              </label>
              <input
                type="email"
                className="form-control"
                id="registerEmail"
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
                type="email"
                className="form-control"
                id="registerUsername"
                name="registerUsername"
                placeholder="usuario12"
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
                id="registerPass"
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
                id="registerRepass"
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
