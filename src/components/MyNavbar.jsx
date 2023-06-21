import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import { NavLink } from "react-router-dom";
import { useSessionContext } from "../context/sessionContext";

function MyNavbar() {
  const { session, setSession } = useSessionContext();

  const emptySession = {
    active: false,
    username: "",
    email: "",
    avatar: "default_avatar.png",
    cart: { items: [] },
  };

  const token = localStorage.getItem("token");

  const setActiveClass = ({ isActive }) =>
    isActive ? "nav-link active" : "nav-link";

  const handleLogout = () => {
    setSession(emptySession);
  };

  return (
    <Navbar bg="black" expand="lg" data-bs-theme="dark">
      <Container fluid>
        <NavLink className="navbar-brand" to="/">
          <i className="text-primary fa-solid fa-book"></i> <b> booket</b>
          <span className="gold">.</span>market
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavLink className={setActiveClass} to="/products">
              Tienda
            </NavLink>

            {!token && (
              <>
                <NavLink className={setActiveClass} to="/register">
                  Regístrate
                </NavLink>

                <NavLink className={setActiveClass} to="/login">
                  Iniciar Sesión
                </NavLink>
              </>
            )}

            {token && (
              <>
                <NavLink className={setActiveClass} to="/profile">
                  Mi perfil
                </NavLink>
                <NavLink className={setActiveClass} to="/cart">
                  Carrito
                </NavLink>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
