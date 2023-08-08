import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet, Navigate, NavLink, useLoaderData } from "react-router-dom";
import { useSessionContext } from "../context/sessionContext";
import "../assets/css/UserLayout.css";
import Offcanvas from "react-bootstrap/Offcanvas";

import {
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiOutlineShop,
  AiOutlineUnorderedList,
  AiOutlineUser,
  AiOutlineMenu,
} from "react-icons/ai";

import { MdOutlineAddBox } from "react-icons/md";

const UserLayout = () => {
  const token = localStorage.getItem("token");

  const [show, setShow] = useState(false);
  const { data: datosUser } = useLoaderData();
  const { session, setSession } = useSessionContext();

  const emptySession = {
    active: false,
    username: "",
    email: "",
    avatar: "default_avatar.png",
    cart: { items: [] },
  };

  useEffect(() => {
    if (datosUser) {
      setSession({ ...session, active: true, ...datosUser });
    }
  }, []);

  const handleLogout = () => {
    setSession(emptySession);

    localStorage.removeItem("token");
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {token ? (
        <>
          <div className="user-layout-wrapper bg-secondary-subtle p-4 p-lg-5 container-fluid">
            <div className="row">
              <div className="col col-12 col-lg-9">
                <main className="bg-white shadow-sm p-3 p-lg-4 main-window">
                  <button
                    className="btn btn-primary d-block d-lg-none menu-button"
                    onClick={handleShow}
                    aria-label="Abrir menú de usuario"
                  >
                    <AiOutlineMenu aria-hidden="true" />
                  </button>
                  <Outlet />
                </main>
              </div>
              <div className="col col-3 d-none d-lg-block">
                <aside>
                  <div className="list-group">
                    <NavLink
                      to="/profile"
                      className="list-group-item list-group-item-action text-black"
                    >
                      <AiOutlineUser /> Mi perfil
                    </NavLink>
                    <NavLink
                      to="/publicaciones/mispublicaciones"
                      className="list-group-item list-group-item-action text-black"
                    >
                      <AiOutlineUnorderedList /> Mis publicaciones
                    </NavLink>
                    <NavLink
                      to="/publicaciones/nuevapublicacion"
                      className="list-group-item list-group-item-action text-black"
                    >
                      <MdOutlineAddBox /> Crear publicación
                    </NavLink>
                    <NavLink
                      to="/publicaciones/favoritos"
                      className="list-group-item list-group-item-action text-black"
                    >
                      <AiOutlineHeart /> Favoritos
                    </NavLink>
                    <NavLink
                      to="/products"
                      className="list-group-item list-group-item-action text-black"
                    >
                      <AiOutlineShop /> Ir a la Tienda
                    </NavLink>
                    <NavLink
                      to="/cart"
                      className="list-group-item list-group-item-action text-black"
                    >
                      <AiOutlineShoppingCart /> Carrito
                    </NavLink>
                    <button
                      type="button"
                      className="list-group-item list-group-item-action text-black"
                      onClick={handleLogout}
                    >
                      Cerrar sesión
                    </button>
                  </div>
                </aside>
              </div>
            </div>
          </div>

          <Offcanvas
            show={show}
            onHide={handleClose}
            responsive="lg"
            className="d-block d-lg-none"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="p-0">
              <div className="list-group list-group-flush w-100">
                <NavLink
                  to="/profile"
                  className="list-group-item list-group-item-action text-black"
                >
                  <AiOutlineUser /> Mi perfil
                </NavLink>
                <NavLink
                  to="/publicaciones/mispublicaciones"
                  className="list-group-item list-group-item-action text-black"
                >
                  <AiOutlineUnorderedList /> Mis publicaciones
                </NavLink>
                <NavLink
                  to="/publicaciones/nuevapublicacion"
                  className="list-group-item list-group-item-action text-black"
                >
                  <MdOutlineAddBox /> Crear publicación
                </NavLink>
                <NavLink
                  to="/publicaciones/favoritos"
                  className="list-group-item list-group-item-action text-black"
                >
                  <AiOutlineHeart /> Favoritos
                </NavLink>
                <NavLink
                  to="/products"
                  className="list-group-item list-group-item-action text-black"
                >
                  <AiOutlineShop /> Ir a la Tienda
                </NavLink>
                <NavLink
                  to="/cart"
                  className="list-group-item list-group-item-action text-black"
                >
                  <AiOutlineShoppingCart /> Carrito
                </NavLink>
                <button
                  type="button"
                  className="list-group-item list-group-item-action text-black"
                  onClick={handleLogout}
                >
                  Cerrar sesión
                </button>
              </div>
            </Offcanvas.Body>
          </Offcanvas>
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default UserLayout;

//
export const loaderUser = async () => {
  const token = localStorage.getItem("token");

  try {
    const { data } = await axios.get(import.meta.env.VITE_API_URL + "/user", {
      headers: { Authorization: "Bearer " + token },
    });

    console.log(data);
    return { data };
  } catch (error) {
    console.log(error);
    return null;
  }
};
