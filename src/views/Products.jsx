import { useState } from "react";
import "../assets/css/Products.css";
import { useLoaderData, Link, useSearchParams } from "react-router-dom";

import ProductCard from "../components/ProductCard";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();

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

  const handleCheckbox = (e) => {
    if (e.target.checked) {
      setFilters([...filters, e.target.value]);
    }

    if (!e.target.checked) {
      setFilters(filters.filter((item) => item !== e.target.value));
    }
  };

  return (
    <div className="products-wrapper bg-secondary-subtle">
      <section className="container-fluid products-bar bg-primary d-flex align-items-center">
        <form className="d-flex justify-content-center" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-outline-success" type="submit">
            Search
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
  const res = await fetch("http://localhost:5173/src/data/libros.json");
  const data = await res.json();
  return { data };
};
