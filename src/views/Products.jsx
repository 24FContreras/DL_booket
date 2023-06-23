import { useState, useEffect, useMemo } from "react";
import "../assets/css/Products.css";
import { useLoaderData, useNavigate, useSearchParams } from "react-router-dom";

import ProductCard from "../components/ProductCard";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  let { data } = useLoaderData();
  const [libros, setLibros] = useState(data);
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) navigate("/search?busqueda=" + search);
  };

  const goBackward = () => {
    const currentPage = searchParams.get("page");
    if (currentPage > 2) {
      navigate("/products?page=" + (Number(currentPage) - 1));
    } else navigate("/products");
  };

  const goForward = () => {
    const currentPage = searchParams.get("page");
    if (currentPage) {
      navigate("/products?page=" + (Number(currentPage) + 1));
    } else navigate("/products?page=2");
  };

  useMemo(() => {
    setLibros(data);
  }, [searchParams.get("page")]);

  useEffect(() => {
    document.title = `Tienda - Booket.market`;
  }, []);

  return (
    <div className="products-wrapper bg-secondary-subtle">
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

export default Products;

//LOADER
export const loaderBooks = async ({ request }) => {
  let page = new URL(request.url).searchParams.get("page");

  if (!page) {
    page = 1;
  }

  console.log(Number(page));

  try {
    const res = await fetch(
      import.meta.env.VITE_API_URL + "/products?limits=12&page=" + page
    );
    const data = await res.json();
    return { data };
  } catch (error) {
    console.log(error);
  }
};
