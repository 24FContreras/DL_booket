const ProductListing = ({ type, item, children }) => {
  return (
    <li className="list-group-item" key={item.id}>
      <div className="listed-product p-3 d-flex flex-row gap-2">
        <img src={item.cover} alt="" height="120px" />
        <div className="w-100 d-flex flex-row justify-content-between">
          <div>
            <p className="m-0 fw-semibold text-uppercase">{item.libro}</p>
            <p className="m-0">{item.autor}</p>
            <p className="m-0 mb-2">
              {item.estado} - {item.editorial}
            </p>
            {children}
          </div>
          {type === "favorite" ? "heart" : null}
        </div>
      </div>
    </li>
  );
};

export default ProductListing;
