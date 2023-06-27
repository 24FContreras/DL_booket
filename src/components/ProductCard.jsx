import "../assets/css/ProductCard.css";
import { Link } from "react-router-dom";
import { utils } from "../utils";

const ProductCard = ({ book }) => {
  const { titulo, autor, precio, editorial, estado, portada, id, imageUrl } =
    book;

  return (
    <div className="product-card">
      <div className="product-card-header">
        <img src={imageUrl} alt={titulo} className="shadow-sm" />
        <div className="product-deco"></div>
      </div>

      <div className="product-card-body shadow-sm bg-white p-4">
        <div className="d-flex flex-row justify-content-between gap-3">
          <div>
            <p className="fw-semibold m-0 text-uppercase fs-5">{titulo}</p>
            <p className="fw-light m-0">{autor}</p>
            <p className="fw-light my-1 text-details">
              Editorial {editorial} - {estado}
            </p>
          </div>
          <p className="fs-4 fw-semibold m-0">
            {utils.formatearDivisa(precio)}
          </p>
        </div>

        <Link className="btn btn-primary mb-1 w-100" to={`/products/${id}`}>
          Ver detalles
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
