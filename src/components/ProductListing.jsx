import axios from "axios";
import Likheart from "./Likeheart";
import Swal from "sweetalert2";

const ProductListing = ({ type, item, children, likeManager }) => {
  const token = localStorage.getItem("token");

  const customSwal = Swal.mixin({
    customClass: {
      title: "fs-4 fw-semibold",
      confirmButton: "btn btn-primary",
      cancelButton: "btn btn-secondary ms-2",
    },
    buttonsStyling: false,
    showClass: {
      popup: "",
    },
    hideClass: {
      popup: "",
    },
  });

  const deleteItem = async () => {
    try {
      const endpoint = import.meta.env.VITE_API_URL + "/products/" + item.id;

      console.log(endpoint);

      const res = await axios({
        url: endpoint,
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
        data: { image: item.portada },
      });

      customSwal.fire({
        text: res.data.message,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeletion = () => {
    customSwal
      .fire({
        title: "Advertencia",
        text: "Estás a punto de eliminar esta publicación. Por favor, confirma los cambios",
        confirmButtonText: "Eliminar publicación",
        showCancelButton: true,
        cancelButtonText: "Volver",
      })
      .then((result) => {
        if (result.isConfirmed) {
          deleteItem();
        }
      });
  };

  return (
    <li className="list-group-item" key={item.id}>
      <div className="listed-product p-3 d-flex flex-row gap-2">
        <img
          src={`https://booketapi.onrender.com/images/books/${item.portada}`}
          alt={`${item.titulo}`}
          height="120px"
        />
        <div className="w-100 d-flex flex-row justify-content-between">
          <div>
            <p className="m-0 fw-semibold text-uppercase">{item.titulo}</p>
            <p className="m-0">{item.autor}</p>
            <p className="m-0 mb-2">
              {item.estado} - {item.editorial}
            </p>
            {children}{" "}
            {type === "product" ? (
              <button className="btn btn-primary" onClick={handleDeletion}>
                Eliminar
              </button>
            ) : null}
          </div>
          {item.favorite !== undefined ? (
            <button
              className="btn height-content d-flex align-items-center justify-content-center"
              onClick={likeManager}
            >
              <Likheart filled={type === "favorite" ? true : false} />
            </button>
          ) : null}
        </div>
      </div>
    </li>
  );
};

export default ProductListing;
