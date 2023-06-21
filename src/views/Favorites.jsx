import { useEffect, useState } from "react";
import axios from "axios";
import { useLoaderData, Link } from "react-router-dom";
import ProductListing from "../components/ProductListing";

const Favorites = () => {
  const { data } = useLoaderData();
  const token = localStorage.getItem("token");

  const [favorites, setFavorites] = useState(
    data.map((item) => ({ ...item, favorite: true }))
  );

  const handleFavs = async (id) => {
    const itemIndex = favorites.findIndex((item) => item.id === id);
    favorites[itemIndex].favorite = !favorites[itemIndex].favorite;
    setFavorites([...favorites]);

    if (favorites[itemIndex].favorite) {
      const res = await axios({
        url: "https://booketapi.onrender.com/api/favorites",
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
        data: { productID: id },
      });
    }

    if (!favorites[itemIndex].favorite) {
      const res = await axios({
        url: "https://booketapi.onrender.com/api/favorites",
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
        data: { productID: id },
      });
    }
  };

  useEffect(() => {
    document.title = `Mis favoritos - Booket.market`;
  }, []);

  return (
    <>
      <h1 className="fs-3">Mis favoritos</h1>

      <section className="favorites-list">
        <ul className="list-group list-group-flush">
          {favorites.length ? (
            favorites.map((item) => (
              <ProductListing
                state={favorites}
                item={item}
                key={item.id}
                type={item.favorite ? "favorite" : "no-favorite"}
                likeManager={() => {
                  handleFavs(item.id);
                }}
              >
                <Link className="btn btn-primary" to={`/products/${item.id}`}>
                  Ver en tienda
                </Link>
              </ProductListing>
            ))
          ) : (
            <p>No tienes favoritos listados</p>
          )}
        </ul>
      </section>
    </>
  );
};

export default Favorites;

//LOADER
export const loaderFavoritos = async () => {
  const token = localStorage.getItem("token");

  const { data } = await axios.get(
    "https://booketapi.onrender.com/api/favorites",
    {
      headers: { Authorization: "Bearer " + token },
    }
  );

  return { data };
};
