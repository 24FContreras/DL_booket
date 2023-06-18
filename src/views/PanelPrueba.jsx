import { useState } from "react";
import axios from "axios";

const PanelPrueba = () => {
  const [image, setImage] = useState({});
  const token = localStorage.getItem("token");

  const handleUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("email", "correo1@gmail.com");
      formData.append("image", image);

      axios({
        url: "https://booketapi.onrender.com/api/test",
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
        data: formData,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form method="POST" encType="multipart/form-data" onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            className="form-control form-control-sm"
            id="formFileSm"
            type="file"
            onChange={handleUpload}
          />
          <button type="submit" className="btn btn-primary">
            Cambiar foto
          </button>
        </div>
      </form>
    </>
  );
};

export default PanelPrueba;
