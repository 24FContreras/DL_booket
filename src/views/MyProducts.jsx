import { useState, useEffect } from "react";
import axios from "axios";
import { useLoaderData, Link } from "react-router-dom";
import ProductListing from "../components/ProductListing";

const MyProducts = () => {
  const { data } = useLoaderData();
  const [myproducts, setMyProducts] = useState(data);

  useEffect(() => {
    document.title = `Mis publicaciones - Booket.market`;
  }, []);

  return (
    <>
      <h1 className="fs-3">Mis publicaciones</h1>

      <section className="myproducts-list">
        <ul className="list-group list-group-flush">
          {myproducts.length ? (
            myproducts.map((item) => (
              <ProductListing
                item={item}
                key={item.id}
                type="product"
                state={myproducts}
                changeState={setMyProducts}
              >
                <Link
                  className="btn btn-primary"
                  to={`/publicaciones/mispublicaciones/editar/${item.id}`}
                >
                  Editar
                </Link>{" "}
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

export default MyProducts;

//LOADER
export const loaderProds = async () => {
  const token = localStorage.getItem("token");

  const { data } = await axios.get(
    import.meta.env.VITE_API_URL + "/products/user",
    {
      headers: { Authorization: "Bearer " + token },
    }
  );

  return { data };
};
