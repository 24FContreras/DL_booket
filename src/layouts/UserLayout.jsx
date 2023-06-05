import "../assets/css/UserLayout.css";
import { Outlet, Navigate, NavLink, useLoaderData } from "react-router-dom";
import { useSessionContext } from "../context/sessionContext";
import { useEffect } from "react";

const UserLayout = () => {
  const { session, setSession } = useSessionContext();
  const { data: datosUser } = useLoaderData();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) setSession(datosUser);
  }, []);

  const handleLogout = () => {
    setSession({
      userName: "",
      email: "",
      favorites: [],
    });

    localStorage.removeItem("token");
  };

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
                      Mi perfil
                    </NavLink>
                    <NavLink
                      to="/publicaciones/mispublicaciones"
                      className="list-group-item list-group-item-action text-black"
                    >
                      Mis publicaciones
                    </NavLink>
                    <NavLink
                      to="/publicaciones/nuevapublicacion"
                      className="list-group-item list-group-item-action text-black"
                    >
                      Crear publicación
                    </NavLink>
                    <NavLink
                      to="/publicaciones/favoritos"
                      className="list-group-item list-group-item-action text-black"
                    >
                      Favoritos
                    </NavLink>
                    <NavLink
                      to="/products"
                      className="list-group-item list-group-item-action text-black"
                    >
                      Ir a la tienda
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
  const res = await fetch("http://localhost:5173/src/data/user.json");
  const data = await res.json();
  return { data };
};