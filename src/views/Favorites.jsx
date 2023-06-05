import { useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import ProductListing from "../components/ProductListing";
import { useSessionContext } from "../context/sessionContext";

const Favorites = () => {
  const { session } = useSessionContext();
  const { data } = useLoaderData();

  const [favorites, setFavorites] = useState(
    data.filter((item) => session.favorites.includes(item.id))
  );

  return (
    <>
      <h1 className="fs-3">Mis favoritos</h1>

      <section className="favorites-list">
        <ul className="list-group list-group-flush">
          {favorites.length ? (
            favorites.map((item) => (
              <ProductListing item={item} key={item.id} type="favorite">
                <Link className="btn btn-primary" to={`/products/${item.id}`}>
                  Ver en tienda
                </Link>
              </ProductListing>
            ))
          ) : (
            <p>No tienes publicaciones activas</p>
          )}
        </ul>
      </section>
    </>
  );
};

export default Favorites;

//LOADER
export const loaderProds = async () => {
  const res = await fetch("http://localhost:5173/src/data/libros.json");
  const data = await res.json();
  return { data };
};
