import { useState, useEffect, useMemo } from "react";
import "../assets/css/Products.css";
import { useLoaderData, useNavigate, useSearchParams } from "react-router-dom";

import ProductCard from "../components/ProductCard";

const ProductSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  let { data } = useLoaderData();
  const [libros, setLibros] = useState(data);

  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate("/search?busqueda=" + search);
    } else navigate("/products");
  };

  const goBackward = () => {
    const currentPage = searchParams.get("page");
    const busqueda = searchParams.get("busqueda");

    if (currentPage > 2) {
      navigate(
        "/search?busqueda=" + busqueda + "&page=" + (Number(currentPage) - 1)
      );
    } else navigate("/search?busqueda=" + busqueda);
  };

  const goForward = () => {
    const currentPage = searchParams.get("page");
    const busqueda = searchParams.get("busqueda");

    if (currentPage) {
      navigate(
        "/search?busqueda=" + busqueda + "&page=" + (Number(currentPage) + 1)
      );
    } else navigate("/search?busqueda=" + busqueda + "&page=2");
  };

  useMemo(() => {
    setLibros(data);
  }, [searchParams.get("page"), searchParams.get("busqueda")]);

  useEffect(() => {
    document.title = `Tienda - Booket.market`;
  }, []);

  return (
    <div className="products-search-wrapper bg-secondary-subtle">
      <section className="container-fluid products-bar bg-primary d-flex align-items-center">
        <form
          className="ms-auto d-flex justify-content-center w-75"
          role="search"
          onSubmit={handleSubmit}
        >
          <input
            className="form-control me-2 rounded-pill"
            type="search"
            placeholder="Busqueda por título"
            aria-label="Search"
            value={search}
            onChange={handleSearchChange}
          />
          <button className="btn btn-dark" type="submit">
            Buscar
          </button>
        </form>
      </section>

      <aside className="products-filters p-3">
        <div className="bg-white rounded p-3 mb-4">
          <h1 className="fs-4">Buscando: "{searchParams.get("busqueda")}"</h1>
          <p className="m-0">
            {libros.total} {libros.total === 1 ? "resultado" : "resultados"}
          </p>
        </div>
      </aside>

      <main className="products-main">
        <section className="products-grid">
          {libros ? (
            libros.productos.map((item) => {
              return <ProductCard key={item.id} book={item} />;
            })
          ) : (
            <p>Loading</p>
          )}
        </section>

        <nav aria-label="Navegación">
          <ul class="pagination mt-3">
            <li class="page-item">
              <button className="page-link link-secondary" onClick={goBackward}>
                Anterior
              </button>
            </li>
            <li class="page-item">
              <button className="page-link link-secondary" onClick={goForward}>
                Siguiente
              </button>
            </li>
          </ul>
        </nav>
      </main>
    </div>
  );
};

export default ProductSearch;

//LOADER
export const loaderBookSearch = async ({ request }) => {
  let busqueda = new URL(request.url).searchParams.get("busqueda");
  let page = new URL(request.url).searchParams.get("page");

  if (!page) {
    page = 1;
  }

  try {
    const res = await fetch(
      import.meta.env.VITE_API_URL +
        "/products/search?search=titulo_" +
        busqueda +
        "&limits=12&page=" +
        page
    );
    const data = await res.json();
    return { data };
  } catch (error) {
    console.log(error);
  }
};
