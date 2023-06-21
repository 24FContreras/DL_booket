import { useEffect } from "react";
import "../assets/css/Landing.css";
import { Link, useLoaderData } from "react-router-dom";

import ProductCard from "../components/ProductCard";

const Landing = () => {
  const { data } = useLoaderData();

  useEffect(() => {
    document.title = `Bienvenido a Booket.market`;
  }, []);

  return (
    <>
      <header className="container-fluid landing-header bg-black text-white">
        <div className="row">
          <div className="col p-5">
            <h1>
              Tu próxima aventura está <br />{" "}
              <Link to="/products" className="header-link px-4">
                aquí
              </Link>
            </h1>

            <p className="fs-5 mt-5">
              Sumérgete en nuestra amplia biblioteca, <br /> nutrida por nuevos
              ávidos lectores
            </p>
          </div>
          <div className="col header-img"></div>
        </div>
      </header>

      <main className="landing-main container-fluid">
        <div className="row bg-secondary-subtle p-5 text-start">
          <h3 className="mb-3">Últimos publicados</h3>
          <section className="products-grid">
            {data ? (
              data.map((item) => {
                return <ProductCard key={item.id} book={item} />;
              })
            ) : (
              <p>Loading</p>
            )}
          </section>
        </div>
      </main>
    </>
  );
};

export default Landing;

//LOADER
export const loaderLatests = async () => {
  try {
    const res = await fetch(
      "https://booketapi.onrender.com/api/products?limits=8"
    );
    const data = await res.json();
    return { data };
  } catch (error) {
    console.log(error);
  }
};
