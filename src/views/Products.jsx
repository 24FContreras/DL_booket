import { useState } from "react";
import "../assets/css/Products.css";
import { useLoaderData, useNavigate } from "react-router-dom";

import ProductCard from "../components/ProductCard";

const Products = () => {
  const [search, setSearch] = useState("");
  const { data } = useLoaderData();
  const [libros, setLibros] = useState(data);

  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) navigate("/search?busqueda=" + search);
  };

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
            libros.map((item) => {
              return <ProductCard key={item.id} book={item} />;
            })
          ) : (
            <p>Loading</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default Products;

//LOADER
export const loaderBooks = async () => {
  try {
    const res = await fetch("https://booketapi.onrender.com/api/products");
    const data = await res.json();
    return { data };
  } catch (error) {
    console.log(error);
  }
};
