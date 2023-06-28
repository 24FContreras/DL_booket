import "../assets/css/ProductCard.css";
import { Link } from "react-router-dom";
import { utils } from "../utils";

const ProductCard = ({ book }) => {
  const { titulo, autor, precio, editorial, estado, id, imageUrl } = book;

  return (
    <div className="product-card card h-100 border-0">
      <div className="product-card-header bg-secondary-subtle">
        <img src={imageUrl} alt={titulo} className="shadow-sm" />
        <div className="product-deco"></div>
      </div>

      <div className="product-card-body h-100 shadow-sm bg-white p-4 d-flex flex-column justify-content-between">
        <div>
          <div className="d-flex flex-row justify-content-between gap-4">
            <div>
              <p className="fw-semibold m-0 text-uppercase fs-5">{titulo}</p>
              <p className="fw-light m-0">{autor}</p>
            </div>
            <p className="fs-4 fw-semibold m-0">
              {utils.formatearDivisa(precio)}
            </p>
          </div>
          <p className="fw-light my-1 text-details">
            Editorial {editorial} - {estado}
          </p>
        </div>

        <Link className="btn btn-primary w-100" to={`/products/${id}`}>
          Ver detalles
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
