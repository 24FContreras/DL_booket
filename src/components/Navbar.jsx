import { NavLink } from "react-router-dom";
import { useSessionContext } from "../context/sessionContext";

function Navbar() {
  const { session, setSession } = useSessionContext();

  const token = localStorage.getItem("token");

  const setActiveClass = ({ isActive }) =>
    isActive ? "nav-link active" : "nav-link";

  const handleLogout = () => {
    setSession({ user: false, userName: "", email: "" });
  };

  return (
    <nav
      className="navbar navbar-expand-lg shadow-sm bg-black"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse " id="navbarTogglerDemo01">
          <NavLink className="navbar-brand" to="/">
            <i className="fa-solid fa-book"></i> <b> booket</b>
            <span className="gold">.</span>market
          </NavLink>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className={setActiveClass} to="/products">
                Tienda
              </NavLink>
            </li>
            {!token && (
              <>
                <li className="nav-item">
                  <NavLink className={setActiveClass} to="/register">
                    Regístrate
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={setActiveClass} to="/login">
                    Iniciar Sesión
                  </NavLink>
                </li>
              </>
            )}

            {token && (
              <>
                <li className="nav-item">
                  <NavLink className={setActiveClass} to="/profile">
                    Mi perfil
                  </NavLink>
                </li>
                <li className="nav-item profile-icon">
                  <NavLink to="/profile">
                    <i className="fa-solid fa-circle-user"></i>
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
