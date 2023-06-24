import { useState, useEffect, useMemo } from "react";
import "../assets/css/Products.css";
import { useLoaderData, useNavigate, useSearchParams } from "react-router-dom";
import ReactPaginate from "react-paginate";

import ProductCard from "../components/ProductCard";

const Products = () => {
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
    if (search.trim()) navigate("/search?busqueda=" + search);
  };

  const setPagination = (e) => {
    console.log(e.selected + 1);

    if (e.selected !== 0) {
      navigate("/products?page=" + (Number(e.selected) + 1));
    } else navigate("/products");
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

        <ReactPaginate
          containerClassName={"pagination mt-5"}
          pageClassName={"page-item page-link link-secondary"}
          activeClassName={"active text-black"}
          onPageChange={setPagination}
          pageCount={libros.paginas}
          breakLabel={<a className="page-link link-secondary">...</a>}
          previousLabel={<a className="page-link link-secondary">Anterior</a>}
          nextLabel={<a className="page-link link-secondary">Siguiente</a>}
        />
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
