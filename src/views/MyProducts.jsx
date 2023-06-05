import { useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import ProductListing from "../components/ProductListing";

const MyProducts = () => {
  const { data } = useLoaderData();
  const [myproducts, setMyProducts] = useState(
    data.filter((item) => item.usuario === "readingSP")
  );

  return (
    <>
      <h1 className="fs-3">Mis publicaciones</h1>

      <section className="myproducts-list">
        <ul className="list-group list-group-flush">
          {myproducts.length ? (
            myproducts.map((item) => (
              <ProductListing item={item} key={item.id} type="product">
                <button className="btn btn-primary">Editar</button>{" "}
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
  const res = await fetch("http://localhost:5173/src/data/libros.json");
  const data = await res.json();
  return { data };
};
