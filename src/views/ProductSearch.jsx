import { useState } from "react";
import "../assets/css/Products.css";
import { useLoaderData, Link, useSearchParams } from "react-router-dom";

import ProductCard from "../components/ProductCard";

const ProductSearch = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");

  const { data } = useLoaderData();
  const [libros, setLibros] = useState(data);
  const [filters, setFilters] = useState([]);

  const autoresSet = new Set(libros.map((item) => item.autor));
  const editorialesSet = new Set(libros.map((item) => item.editorial));

  const countByParameter = (param, clase) => {
    let counter = 0;

    libros.map((item) => {
      if (item[clase] === param) {
        counter++;
      }
    });
    return counter;
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleCheckbox = (e) => {
    if (e.target.checked) {
      setFilters([...filters, e.target.value]);
    }

    if (!e.target.checked) {
      setFilters(filters.filter((item) => item !== e.target.value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (search) {
        setSearchParams({ busqueda: search });

        const res = await fetch(
          "https://booketapi.onrender.com/api/products/search?search=titulo_" +
            search
        );
        const data = await res.json();

        setLibros(data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="products-wrapper bg-secondary-subtle">
      <section className="container-fluid products-bar bg-primary d-flex align-items-center">
        <form
          className="d-flex justify-content-center"
          role="search"
          onSubmit={handleSubmit}
        >
          <input
            className="form-control me-2 rounded-pill"
            type="search"
            placeholder="Busqueda por título"
            aria-label="Search"
            onChange={handleSearchChange}
            value={search}
          />
          <button className="btn btn-dark" type="submit">
            Buscar
          </button>
        </form>
      </section>
      <aside className="products-filters p-3">
        <div className="bg-white rounded p-3 mb-4">
          <h1 className="fs-4">"La Tregua"</h1>
          <p className="m-0">{data.length} resultados</p>
        </div>

        <div className="bg-white rounded p-3">
          <p className="fw-semibold">Filtros</p>
          <p>Por autor:</p>
          <section>
            {Array.from(autoresSet).map((item, index) => (
              <div className="form-check" key={index}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  name={`${item.replace(" ", "")}Checkbox`}
                  id={`${item.replace(" ", "")}Checkbox`}
                  value={item}
                  onChange={handleCheckbox}
                />
                <label className="form-check-label" htmlFor={item}>
                  {item} ({countByParameter(item, "autor")})
                </label>
              </div>
            ))}
          </section>
          <section>
            <p>Por editorial:</p>
            {Array.from(editorialesSet).map((item, index) => (
              <div className="form-check" key={index}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  name={`${item.replace(" ", "")}Checkbox`}
                  id={`${item.replace(" ", "")}Checkbox`}
                  value={item}
                  onChange={handleCheckbox}
                />
                <label className="form-check-label" htmlFor={item}>
                  {item} ({countByParameter(item, "editorial")})
                </label>
              </div>
            ))}
          </section>
        </div>
      </aside>
      <main className="products-main">
        <section className="products-grid">
          {libros ? (
            libros
              .filter((libro) => {
                if (!filters.length) return true;

                return filters.some((filter) =>
                  Object.values(libro).includes(filter)
                );
              })
              .map((item) => {
                return <ProductCard key={item.id} book={item} />;
              })
          ) : (
            <p>No existen libros disponibles</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default ProductSearch;
