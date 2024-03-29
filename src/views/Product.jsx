import { useEffect, useState } from "react";
import { useLoaderData, Link, useParams } from "react-router-dom";
import axios from "axios";
import "../assets/css/Product.css";
import { useSessionContext } from "../context/sessionContext";
import { utils } from "../utils";
import { toast, ToastContainer } from "react-toastify";

const Product = () => {
  const data = useLoaderData();
  const { id } = useParams();

  const { session, setSession } = useSessionContext();
  const [compra, setCompra] = useState({ ...data, cantidadCompra: 1, id: id });

  const token = localStorage.getItem("token");

  const getSession = async () => {
    try {
      const { data } = await axios.get(import.meta.env.VITE_API_URL + "/user", {
        headers: { Authorization: "Bearer " + token },
      });

      setSession({ ...session, active: true, ...data });
      return { data };
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  useEffect(() => {
    if (token) {
      getSession();
    }
  }, []);

  const agregarAlCarrito = () => {
    const currentCartItem = session.cart.items.find(
      (item) => item.id === compra.id
    );

    if (currentCartItem) {
      if (
        data.stock >=
        currentCartItem.cantidadCompra + compra.cantidadCompra
      ) {
        currentCartItem.cantidadCompra += compra.cantidadCompra;

        const newCart = session.cart.items.filter((item) => item.id !== id);
        newCart.push(currentCartItem);
        localStorage.setItem("booketCart", JSON.stringify({ items: newCart }));
        setSession({ ...session, cart: { items: newCart } });

        toast.success(
          `Se ha agregado ${compra.cantidadCompra} unidad/es al carrito`,
          {
            position: toast.POSITION.TOP_RIGHT,
            hideProgressBar: true,
            autoClose: 1000,
          }
        );
      } else {
        toast.error("No existe stock disponible para realizar esta acción", {
          hideProgressBar: true,
        });
      }
    } else {
      session.cart.items.push(compra);
      localStorage.setItem(
        "booketCart",
        JSON.stringify({ items: session.cart.items })
      );

      toast.success(
        `Se ha agregado ${compra.cantidadCompra} unidad/es al carrito`,
        {
          position: toast.POSITION.TOP_RIGHT,
          hideProgressBar: true,
          autoClose: 1000,
        }
      );
    }
  };

  const datos = { productID: id };

  const handleFavorites = async () => {
    const currentFavs = session.favorites;

    try {
      if (currentFavs.find((item) => item.id_producto === id)) {
        console.log("Favorito removido");

        const nuevosFavs = currentFavs.filter(
          (item) => item.id_producto !== id
        );

        const res = await axios({
          url: import.meta.env.VITE_API_URL + "/favorites",
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + token,
          },
          data: { productID: id },
        });

        setSession({
          ...session,
          favorites: nuevosFavs,
        });
      } else {
        console.log("Favorito añadido");

        const res = await axios({
          url: import.meta.env.VITE_API_URL + "/favorites",
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
          },
          data: { productID: id },
        });

        currentFavs.push({ id_producto: id });

        setSession({ ...session, favorites: currentFavs });
      }
    } catch (error) {}
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleQty = (e) => {
    setCompra({ ...compra, cantidadCompra: Number(e.target.value) });
  };

  const getCurrentCart = () => {
    const book = session.cart.items.find((item) => item.id === id);

    if (book)
      return (
        <p className="m-0">
          Tienes {book.cantidadCompra} unidad/es en tu carrito
        </p>
      );
  };

  return (
    <>
      {data ? (
        <div className="product-wrapper bg-secondary-subtle py-4 px-3 px-md-0">
          <main className="product-main container p-4 shadow bg-white overflow-hidden">
            <div className="row g-3 g-md-5">
              <div className="col col-12 col-md-3 rounded d-flex justify-content-center align-items-start">
                <img
                  className="px-4 mx-5 mx-md-0 px-md-0 w-100"
                  src={data.imageUrl}
                  alt=""
                />
              </div>
              <div className="col col-12 col-md-6 order-3 order-md-2">
                <div className="book-details d-none d-md-block">
                  <p className="mb-1">
                    <span className="badge bg-secondary">
                      {data.estado.toUpperCase()}
                    </span>{" "}
                    | Vendido por {data.username}
                  </p>
                  <h1 className="m-0">{data.titulo}</h1>
                  <p className="lead mb-4">{data.autor}</p>
                </div>
                <p className="product-summary">{data.descripcion}</p>
              </div>
              <div className="col col-12 col-md-3 rounded order-2 order-md-3 text-center">
                <div className="mobile-details d-block d-md-none">
                  <p className="mb-1">
                    <span className="badge bg-secondary">
                      {data.estado.toUpperCase()}
                    </span>{" "}
                    | Vendido por {data.username}
                  </p>
                  <h1 className="m-0">{data.titulo}</h1>
                  <p className="lead mb-4">{data.autor}</p>
                </div>
                <ul className="list-group list-group-flush product-details p-3">
                  <li className="list-group-item bg-transparent fs-5 fw-semibold">
                    Precio: {utils.formatearDivisa(data.precio)}
                  </li>
                  <li className="list-group-item bg-transparent">
                    Editorial: {data.editorial}
                  </li>
                  <li className="list-group-item bg-transparent">
                    Páginas: {data.paginas}
                  </li>
                  <li className="list-group-item bg-transparent">
                    Idioma: {data.idioma}
                  </li>
                  <li className="list-group-item bg-transparent">
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label htmlFor="basic-url" className="form-label">
                          Quedan {data.stock} unidad/es
                        </label>
                        <div className="input-group">
                          <span className="input-group-text" id="basic-addon3">
                            Cantidad:
                          </span>

                          <select
                            className="form-select"
                            aria-label="Default select example"
                            onChange={handleQty}
                          >
                            <option value="1">1 unidad</option>
                            {data.stock >= 2 && (
                              <option value="2">2 Unidades</option>
                            )}
                            {data.stock >= 3 && (
                              <option value="3">3 Unidades</option>
                            )}
                          </select>

                          {getCurrentCart()}
                        </div>
                      </div>
                      {token ? (
                        <>
                          <button
                            className="btn btn-primary w-100"
                            onClick={agregarAlCarrito}
                          >
                            Añadir al carrito
                          </button>
                          <button
                            className="btn btn-primary w-100 mt-2"
                            onClick={handleFavorites}
                          >
                            {session.favorites.find(
                              (item) => item.id_producto === id
                            )
                              ? "Eliminar de favoritos"
                              : " Añadir a favoritos"}
                          </button>
                        </>
                      ) : (
                        <Link className="btn btn-primary w-100" to="/register">
                          Regístrate
                        </Link>
                      )}
                    </form>
                  </li>
                </ul>
              </div>
            </div>

            <ToastContainer />
          </main>
        </div>
      ) : (
        <div className="product-wrapper bg-secondary-subtle py-4">
          <main className="product-main container p-4 shadow bg-white">
            <p>Este artículo no existe</p>
          </main>
        </div>
      )}
    </>
  );
};

export default Product;

//

//LOADER
export const loaderBook = async ({ params }) => {
  try {
    const { data } = await axios.get(
      import.meta.env.VITE_API_URL + "/products/" + params.id
    );

    document.title = `${data[0].titulo}, ${data[0].autor} - Booket.market`;
    return data[0];
  } catch (error) {
    console.log(error.message);
    return null;
  }
};
