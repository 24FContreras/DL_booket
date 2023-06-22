import axios from "axios";
import "../assets/css/UserLayout.css";
import { Outlet, Navigate, NavLink, useLoaderData } from "react-router-dom";
import { useSessionContext } from "../context/sessionContext";
import { useEffect } from "react";

import {
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiOutlineShop,
  AiOutlineUnorderedList,
  AiOutlineUser,
} from "react-icons/ai";

import { MdOutlineAddBox } from "react-icons/md";

const UserLayout = () => {
  const token = localStorage.getItem("token");

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
      setSession({ ...session, ...datosUser[0] });
    }
  }, []);

  const handleLogout = () => {
    setSession(emptySession);

    localStorage.removeItem("token");
  };

  console.log(session);

  return (
    <>
      {token ? (
        <>
          <div className="user-layout-wrapper bg-secondary-subtle p-5 container-fluid">
            <div className="row">
              <div className="col col-9">
                <main className=" bg-white shadow-sm p-4">
                  <Outlet />
                </main>
              </div>
              <div className="col col-3">
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

    return { data };
  } catch (error) {
    console.log(error);
    return null;
  }
};
