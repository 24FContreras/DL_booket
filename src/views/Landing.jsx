import "../assets/css/Landing.css";
import { Link } from "react-router-dom";

const Landing = () => {
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

      <main className="landing-main p-5">
        <h2>¡Libros a tu alcance!</h2>
        <section className="landing-info-grid">
          <p>Revisa ofertas de múltiples fuentes</p>
          <p>¿Necesitas un buen precio? Busca entre títulos nuevos y usados</p>
          <p>Manten un contacto con tus vendedores favoritos</p>
        </section>
        <section className="p-5">
          <h2>Sección en construcción</h2>
        </section>
      </main>
    </>
  );
};

export default Landing;
