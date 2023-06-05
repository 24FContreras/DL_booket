import { useState } from "react";

//LOS ANDES ҉ 137

const CreateProduct = () => {
  const templateProducto = {
    id: "",
    usuario: "",
    libro: "",
    autor: "",
    cover: "",
    estado: "",
    editorial: "",
    encuadernacion: "",
    paginas: "",
    idioma: "",
    stock: "",
    precio: "",
    descripcion: "",
  };

  const [nuevoLibro, setNuevoLibro] = useState(templateProducto);

  const handleChange = (e) => {
    setNuevoLibro({ ...nuevoLibro, [e.target.name]: e.target.value });
  };

  const handleCover = (e) => {
    console.log(e.target.files[0]);
    setNuevoLibro({ ...nuevoLibro, cover: e.target.files[0] });
  };

  const añadirLibro = async () => {
    try {
      await fetch("http://localhost:3000/productos", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...nuevoLibro, token: "placeholder token" }),
      });

      alert("Publicación creada exitosamente!");
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    añadirLibro();
  };

  return (
    <>
      <h1 className="fs-3">Crear publicación</h1>

      <form
        action=""
        className="d-flex flex-column mb-4"
        onSubmit={handleSubmit}
      >
        <div className="row row-cols-1 row-cols-md-2 g-3">
          <div className="col">
            <label className="w-100">
              Título
              <input
                type="text"
                className="form-control"
                name="libro"
                placeholder="Título del libro"
                value={nuevoLibro.libro}
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
            Precio
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

        <button type="submit">Crear publicación</button>
      </form>
    </>
  );
};

export default CreateProduct;
