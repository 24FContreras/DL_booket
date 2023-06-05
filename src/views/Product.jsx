import { useLoaderData, Link } from "react-router-dom";
import "../assets/css/Product.css";
import { useSessionContext } from "../context/sessionContext";
import { utils } from "../utils";

const Product = () => {
  const { buscado } = useLoaderData();

  const token = localStorage.getItem("token");

  return (
    <div className="product-wrapper bg-secondary-subtle py-4">
      <main className="product-main container p-4 shadow bg-white">
        <div className="row g-5">
          <div className="col col-3 rounded">
            <img className="w-100" src={buscado.cover} alt="" />
          </div>
          <div className="col col-6">
            <p className="mb-1">
              <span className="badge bg-secondary">
                {buscado.estado.toUpperCase()}
              </span>{" "}
              | Vendido por <a href="#">{buscado.usuario}</a>
            </p>
            <h1 className="m-0">{buscado.libro}</h1>
            <p className="lead mb-4">{buscado.autor}</p>
            <p className="product-summary">{buscado.descripcion}</p>
          </div>
          <div className="col col-3 rounded">
            <ul className="list-group list-group-flush product-details p-3">
              <li className="list-group-item bg-transparent fs-5 fw-semibold">
                Precio: {utils.formatearDivisa(buscado.precio)}
              </li>
              <li className="list-group-item bg-transparent">
                Editorial: {buscado.editorial}
              </li>
              <li className="list-group-item bg-transparent">
                Páginas: {buscado.paginas}
              </li>
              <li className="list-group-item bg-transparent">
                Idioma: {buscado.idioma}
              </li>
              <li className="list-group-item bg-transparent">
                <form>
                  <div className="mb-3">
                    <label htmlFor="basic-url" className="form-label">
                      Quedan {buscado.stock} unidad/es
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
                    <button className="btn btn-primary w-100">
                      Añadir al carrito
                    </button>
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
  );
};

export default Product;

//

//LOADER
export const loaderBook = async ({ params }) => {
  const res = await fetch("http://localhost:5173/src/data/libros.json");
  const data = await res.json();

  const buscado = data[params.id - 1];
  return { buscado };
};
