import { useLoaderData, Link, useParams } from "react-router-dom";
import axios from "axios";
import "../assets/css/Product.css";
import { useSessionContext } from "../context/sessionContext";
import { utils } from "../utils";

const Product = () => {
  const data = useLoaderData();
  const token = localStorage.getItem("token");
  const { id } = useParams();

  const datos = { productID: id };

  const agregarFavorito = async () => {
    try {
      await axios({
        url: "http://localhost:3500/api/favorites",
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
                  | Vendido por <a href="#">{data.usuario}</a>
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
                          >
                            <option value="1">1 unidad</option>
                            <option value="2">2 Unidades</option>
                            <option value="3">3 Unidades</option>
                          </select>
                        </div>
                      </div>
                      {token ? (
                        <>
                          <button className="btn btn-primary w-100">
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
      "https://booketapi.onrender.com/api/products/" + params.id
    );
    const data = await res.json();

    console.log(data);
    return data[0];
  } catch (error) {
    console.log(error.message);
    return null;
  }
};
