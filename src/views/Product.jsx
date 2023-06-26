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

      setSession({ ...session, active: true, ...data[0] });
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
        newCart.push(compra);
        localStorage.setItem("booketCart", JSON.stringify({ items: newCart }));

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
  const agregarFavorito = async () => {
    try {
      await axios({
        url: import.meta.env.VITE_API_URL + "/favorites",
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
        data: datos,
      });

      console.log("Favorito añadido");

      return true;
    } catch (error) {
      console.log(error);
    }
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
        <div className="product-wrapper bg-secondary-subtle py-4">
          <main className="product-main container p-4 shadow bg-white">
            <div className="row g-5">
              <div className="col col-3 rounded">
                <img
                  className="w-100"
                  src={`https://booketapi.onrender.com/images/books/${data.portada}`}
                  alt=""
                />
              </div>
              <div className="col col-6">
                <p className="mb-1">
                  <span className="badge bg-secondary">
                    {data.estado.toUpperCase()}
                  </span>{" "}
                  | Vendido por {data.username}
                </p>
                <h1 className="m-0">{data.titulo}</h1>
                <p className="lead mb-4">{data.autor}</p>
                <p className="product-summary">{data.descripcion}</p>
              </div>
              <div className="col col-3 rounded">
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
                            onClick={agregarFavorito}
                          >
                            Añadir a favoritos
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

            {/*
            <div className="row">
              <h3>Preguntas</h3>
              <form action="">
                <label htmlFor="preguntaVendedor" className="form-label">
                  Pregúntale al vendedor
                </label>
                <textarea
                  className="form-control"
                  id="preguntaVendedor"
                  name="preguntaVendedor"
                  rows="3"
                ></textarea>
                <button className="btn btn-primary" type="submit">
                  Enviar
                </button>
              </form>
            </div>
          */}
          </main>
        </div>
      ) : (
        <p>Este artículo no existe</p>
      )}
    </>
  );
};

export default Product;

//

//LOADER
export const loaderBook = async ({ params }) => {
  try {
    const res = await fetch(
      import.meta.env.VITE_API_URL + "/products/" + params.id
    );
    const data = await res.json();

    document.title = `${data[0].titulo}, ${data[0].autor} - Booket.market`;

    return data[0];
  } catch (error) {
    console.log(error.message);
    return null;
  }
};
