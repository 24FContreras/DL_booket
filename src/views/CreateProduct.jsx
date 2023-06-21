import { useEffect, useState } from "react";
import { useSessionContext } from "../context/sessionContext";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

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
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setNuevoLibro({ ...nuevoLibro, [e.target.name]: e.target.value });
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
      const bookData = new FormData(); //URLSearchParams();

      if (Object.values(nuevoLibro).some((item) => item === "")) {
        alert("Debes rellenar todos los campos");
        return;
      }

      for (const key in nuevoLibro) {
        if (key !== "cover" && nuevoLibro[key].trim() !== "") {
          bookData.append(key, nuevoLibro[key]);
        }
      }

      if (nuevoLibro.cover) {
        bookData.append("image", nuevoLibro.cover);
      }

      bookData.append("vendedor", session.email);

      const res = await axios({
        url: "https://booketapi.onrender.com/api/products",
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
        data: bookData,
      });

      toast.success(res.data.message, {
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
              Portada
              <input
                className="form-control"
                type="file"
                name="cover"
                onChange={handleCover}
              />
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
          Crear publicación
        </button>
      </form>
      <ToastContainer />
    </>
  );
};

export default CreateProduct;
