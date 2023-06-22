import { useEffect, useState } from "react";
import { useSessionContext } from "../context/sessionContext";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { utils } from "../utils";

const CreateProduct = () => {
  const templateProducto = {
    titulo: "",
    autor: "",
    cover: "",
    estado: "nuevo",
    editorial: "",
    encuadernacion: "tapa dura",
    paginas: "",
    idioma: "",
    stock: "",
    precio: "",
    descripcion: "El vendedor no ha agregado una descripción",
  };

  const { session, setSession } = useSessionContext();
  const [nuevoLibro, setNuevoLibro] = useState(templateProducto);
  const [errors, setErrors] = useState([]);
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setNuevoLibro({ ...nuevoLibro, [e.target.name]: e.target.value });
    setErrors([]);
  };

  const handleCover = (e) => {
    setNuevoLibro({
      ...nuevoLibro,
      cover: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const bookData = new FormData();

      for (const key in nuevoLibro) {
        if (key !== "cover" && nuevoLibro[key].trim() !== "") {
          bookData.append(key, nuevoLibro[key]);
        }
      }

      if (nuevoLibro.cover) {
        bookData.append("image", nuevoLibro.cover);
      }

      bookData.append("vendedor", session.email);

      const { data } = await axios({
        url: import.meta.env.VITE_API_URL + "/products",
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
        data: bookData,
      });

      if (data.errors) {
        setErrors(data.errors);
        return;
      }

      toast.success(data.message, {
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: true,
        autoClose: 1000,
      });
    } catch (error) {
      toast.error(error.message, { hideProgressBar: true });
    }
  };

  useEffect(() => {
    document.title = `Crear publicación - Booket.market`;
  }, []);

  return (
    <>
      <h1 className="fs-3">Crear publicación</h1>

      <form
        className="d-flex flex-column mb-4"
        onSubmit={handleSubmit}
        method="POST"
      >
        <div className="row row-cols-1 row-cols-md-2 g-3">
          <div className="col">
            <label className="w-100">
              Título
              <input
                type="text"
                className={
                  utils.setError(errors, "titulo")
                    ? " form-control is-invalid"
                    : "form-control"
                }
                name="titulo"
                placeholder="Título del libro"
                value={nuevoLibro.titulo}
                onChange={handleChange}
              />
              <p className="text-danger mb-2">
                {utils.setError(errors, "titulo")}
              </p>
            </label>
          </div>
          <div className="col">
            <label className="w-100">
              Autor
              <input
                type="text"
                className={
                  utils.setError(errors, "autor")
                    ? " form-control is-invalid"
                    : "form-control"
                }
                name="autor"
                placeholder="Autor del libro"
                value={nuevoLibro.autor}
                onChange={handleChange}
              />
              <p className="text-danger mb-2">
                {utils.setError(errors, "autor")}
              </p>
            </label>
          </div>
          <div className="col">
            <label className="w-100">
              N° de páginas
              <input
                type="number"
                className={
                  utils.setError(errors, "paginas")
                    ? " form-control is-invalid"
                    : "form-control"
                }
                name="paginas"
                placeholder="ex: 280"
                value={nuevoLibro.paginas}
                onChange={handleChange}
              />
              <p className="text-danger mb-2">
                {utils.setError(errors, "paginas")}
              </p>
            </label>
          </div>
          <div className="col">
            <label className="w-100">
              Editorial
              <input
                type="text"
                className={
                  utils.setError(errors, "editorial")
                    ? " form-control is-invalid"
                    : "form-control"
                }
                name="editorial"
                placeholder="Nombre de la editorial"
                value={nuevoLibro.editorial}
                onChange={handleChange}
              />
              <p className="text-danger mb-2">
                {utils.setError(errors, "editorial")}
              </p>
            </label>
          </div>
          <div className="col">
            <label className="w-100">
              Estado
              <select
                className={
                  utils.setError(errors, "estado")
                    ? " form-select is-invalid"
                    : "form-select"
                }
                aria-label="Default select example"
                name="estado"
                value={nuevoLibro.estado}
                onChange={handleChange}
              >
                <option value="nuevo">nuevo</option>
                <option value="usado">usado</option>
              </select>
              <p className="text-danger mb-2">
                {utils.setError(errors, "estado")}
              </p>
            </label>
          </div>
          <div className="col">
            <label className="w-100">
              Encuadernación
              <select
                className={
                  utils.setError(errors, "encuadernacion")
                    ? " form-select is-invalid"
                    : "form-select"
                }
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
              <p className="text-danger mb-2">
                {utils.setError(errors, "encuadernacion")}
              </p>
            </label>
          </div>
          <div className="col">
            <label className="w-100">
              Portada
              <input
                className={
                  utils.setError(errors, "cover")
                    ? " form-control is-invalid"
                    : "form-control"
                }
                type="file"
                name="cover"
                onChange={handleCover}
              />
              <p className="text-danger mb-2">
                {utils.setError(errors, "cover")}
              </p>
            </label>
          </div>
          <div className="col">
            <label className="w-100">
              Idioma
              <input
                type="text"
                className={
                  utils.setError(errors, "idioma")
                    ? " form-control is-invalid"
                    : "form-control"
                }
                name="idioma"
                placeholder="Idioma del libro"
                value={nuevoLibro.idioma}
                onChange={handleChange}
              />
              <p className="text-danger mb-2">
                {utils.setError(errors, "idioma")}
              </p>
            </label>
          </div>
          <div className="col">
            <label className="w-100">
              Stock
              <input
                type="number"
                className={
                  utils.setError(errors, "stock")
                    ? " form-control is-invalid"
                    : "form-control"
                }
                name="stock"
                placeholder="stock"
                value={nuevoLibro.stock}
                onChange={handleChange}
              />
              <p className="text-danger mb-2">
                {utils.setError(errors, "stock")}
              </p>
            </label>
          </div>
          <div className="col">
            <label className="w-100">
              Precio
              <input
                type="number"
                className={
                  utils.setError(errors, "precio")
                    ? " form-control is-invalid"
                    : "form-control"
                }
                name="precio"
                placeholder="Precio"
                value={nuevoLibro.precio}
                onChange={handleChange}
              />
              <p className="text-danger mb-2">
                {utils.setError(errors, "precio")}
              </p>
            </label>
          </div>
        </div>

        <div className="row">
          <label className="w-100">
            Descripción
            <textarea
              className={
                utils.setError(errors, "descripcion")
                  ? " form-control is-invalid"
                  : "form-control"
              }
              rows="3"
              name="descripcion"
              placeholder="descripcion"
              value={nuevoLibro.descripcion}
              onChange={handleChange}
            ></textarea>
            <p className="text-danger mb-2">
              {utils.setError(errors, "descripcion")}
            </p>
          </label>
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Crear publicación
        </button>
      </form>
      <ToastContainer />
    </>
  );
};

export default CreateProduct;
