import { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

const EditProduct = () => {
  const templateProducto = {
    titulo: "",
    autor: "",
    estado: "",
    editorial: "",
    encuadernacion: "",
    paginas: "",
    idioma: "",
    stock: "",
    precio: "",
    descripcion: "",
  };

  const { data } = useLoaderData();
  const [nuevoLibro, setNuevoLibro] = useState(templateProducto);
  const token = localStorage.getItem("token");
  const { id } = useParams();

  useEffect(() => {
    setNuevoLibro(data[0]);
    document.title = `Editor de publicaciones - Booket.market`;
  }, []);

  const handleChange = (e) => {
    setNuevoLibro({ ...nuevoLibro, [e.target.name]: e.target.value });
  };

  const handleCover = (e) => {
    setNuevoLibro({
      ...nuevoLibro,
      cover: e.target.files[0],
    });
  };

  const handleSubmitData = async (e) => {
    try {
      e.preventDefault();
      const bookData = new FormData(); //URLSearchParams();

      if (
        Object.values(nuevoLibro).some((item) => item.toString().trim() === "")
      ) {
        alert("Debes rellenar todos los campos");
        return;
      }

      for (const key in nuevoLibro) {
        bookData.append(key, nuevoLibro[key]);
      }

      const endpoint = import.meta.env.VITE_API_URL + "/products/edit/" + id;

      const res = await axios({
        url: endpoint,
        method: "PUT",
        headers: {
          Authorization: "Bearer " + token,
        },
        data: bookData,
      });

      console.log(bookData);

      toast.success(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: true,
        autoClose: 1000,
      });
    } catch (error) {
      toast.error(error.message, { hideProgressBar: true });
    }
  };

  return (
    <>
      <h1 className="fs-3">Editando "{nuevoLibro.titulo}"</h1>

      <form
        className="d-flex flex-column mb-4"
        onSubmit={handleSubmitData}
        method="POST"
      >
        <div className="row row-cols-1 row-cols-md-2 g-3">
          <div className="col">
            <label className="w-100">
              Título
              <input
                type="text"
                className="form-control"
                name="titulo"
                placeholder="Título del libro"
                value={nuevoLibro.titulo}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="col">
            <label className="w-100">
              Autor
              <input
                type="text"
                className="form-control"
                name="autor"
                placeholder="Autor del libro"
                value={nuevoLibro.autor}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="col">
            <label className="w-100">
              N° de páginas
              <input
                type="number"
                className="form-control"
                name="paginas"
                placeholder="ex: 280"
                value={nuevoLibro.paginas}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="col">
            <label className="w-100">
              Editorial
              <input
                type="text"
                className="form-control"
                name="editorial"
                placeholder="Nombre de la editorial"
                value={nuevoLibro.editorial}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="col">
            <label className="w-100">
              Estado
              <select
                className="form-select"
                aria-label="Default select example"
                name="estado"
                value={nuevoLibro.estado}
                onChange={handleChange}
              >
                <option value="nuevo">nuevo</option>
                <option value="usado">usado</option>
              </select>
            </label>
          </div>
          <div className="col">
            <label className="w-100">
              Encuadernación
              <select
                className="form-select"
                aria-label="Default select example"
                name="encuadernacion"
                value={nuevoLibro.encuadernacion}
                onChange={handleChange}
              >
                <option value="tapa dura">tapa dura</option>
                <option value="tapa blanda">tapa blanda</option>
                <option value="libro de bolsillo">libro de bolsillo</option>
                <option value="espiral">espiral</option>
                <option value="otro">otro</option>
              </select>
            </label>
          </div>

          <div className="col">
            <label className="w-100">
              Idioma
              <input
                type="text"
                className="form-control"
                name="idioma"
                placeholder="Idioma del libro"
                value={nuevoLibro.idioma}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="col">
            <label className="w-100">
              Stock
              <input
                type="number"
                className="form-control"
                name="stock"
                placeholder="stock"
                value={nuevoLibro.stock}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="col">
            <label className="w-100">
              Precio
              <input
                type="number"
                className="form-control"
                name="precio"
                placeholder="Precio"
                value={nuevoLibro.precio}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="col">
            <label className="w-100">
              Estado
              <select
                className="form-select"
                aria-label="Default select example"
                name="activo"
                value={nuevoLibro.activo}
                onChange={handleChange}
              >
                <option value="true">Activado</option>
                <option value="false">Desactivado</option>
              </select>
            </label>
          </div>
        </div>

        <div className="row">
          <label className="w-100">
            Descripción
            <textarea
              className="form-control"
              rows="3"
              name="descripcion"
              placeholder="descripcion"
              value={nuevoLibro.descripcion}
              onChange={handleChange}
            ></textarea>
          </label>
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Guardar cambios
        </button>
      </form>
      <ToastContainer />
    </>
  );
};

export default EditProduct;

//LOADER
export const loaderUserProd = async ({ params }) => {
  const token = localStorage.getItem("token");

  try {
    const { data } = await axios.get(
      import.meta.env.VITE_API_URL + "/products/edit/" + params.id,
      {
        headers: { Authorization: "Bearer " + token },
      }
    );
    return { data };
  } catch (error) {
    console.log(error.response.data);
    return null;
  }
};
