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
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setRegister({ ...register, [e.target.name]: e.target.value });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();

    const {
      registerEmail: email,
      registerUsername: username,
      registerPass: password,
    } = register;

    const nuevoUsuario = { email, username, password };

    console.log(nuevoUsuario);

    try {
      if (register.registerPass !== register.registerRepass) {
        console.log("Hay errores");

        setErrors([
          {
            path: "repass",
            msg: "Las contraseñas no coinciden",
          },
        ]);
        console.log(errors);
        return;
      }

      const { data } = await axios.post(
        import.meta.env.VITE_API_URL + "/register",
        nuevoUsuario
      );

      if (data.errors) {
        console.log("Hay errores");

        setErrors([...data.errors]);
        console.log(errors);
        return;
      }

      alert("Usuario registrado con éxito");
      navigate("/login");
    } catch (error) {
      alert(error.response.data);
    }
  };

  useEffect(() => {
    document.title = "Regístrate - Booket.market";
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
    <main className="register-main container-fluid register-main">
      <div className="row">
        <section className="register-image col "></section>
        <section className="col p-4">
          <h1 className="mb-4">Regístrate</h1>
          <form className="row row-cols-2 g-4" onSubmit={handlesubmit}>
            <div className="col">
              <label htmlFor="registerEmail" className="form-label">
                Correo electrónico
                <input
                  type="email"
                  className={
                    setError("email")
                      ? " form-control is-invalid"
                      : "form-control"
                  }
                  name="registerEmail"
                  placeholder="tucorreo@mail.com"
                  value={register.registerEmail}
                  onChange={handleChange}
                />
                <p className="text-danger mb-2">{setError("email")}</p>
              </label>
            </div>

            <div className="col">
              <label htmlFor="registerUsername" className="form-label">
                Username
                <input
                  type="text"
                  className={
                    setError("username")
                      ? " form-control is-invalid"
                      : "form-control"
                  }
                  name="registerUsername"
                  placeholder="nombre de usuario"
                  value={register.registerUsername}
                  onChange={handleChange}
                />
                <p className="text-danger mb-2">{setError("username")}</p>
              </label>
            </div>

            <div className="col">
              <label htmlFor="registerPass" className="form-label">
                Contraseña
                <input
                  type="password"
                  className={
                    setError("password")
                      ? " form-control is-invalid"
                      : "form-control"
                  }
                  name="registerPass"
                  placeholder="********"
                  value={register.registerPass}
                  onChange={handleChange}
                />
                <p className="text-danger mb-2">{setError("password")}</p>
              </label>
            </div>

            <div className="col">
              <label htmlFor="registerRepass" className="form-label">
                Ingresa nuevamente tu contraseña
                <input
                  type="password"
                  className={
                    setError("repass")
                      ? " form-control is-invalid"
                      : "form-control"
                  }
                  name="registerRepass"
                  placeholder="********"
                  value={register.registerRepass}
                  onChange={handleChange}
                />
                <p className="text-danger mb-2">{setError("repass")}</p>
              </label>
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
