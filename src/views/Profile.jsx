import "../assets/css/Profile.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSessionContext } from "../context/sessionContext";

const Profile = () => {
  const { session, setSession } = useSessionContext();
  const [avatar, setAvatar] = useState({});
  const token = localStorage.getItem("token");

  const handleUpload = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("email", session.email);
      formData.append("image", avatar);

      axios({
        url: "https://booketapi.onrender.com/api/profile",
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

  useEffect(() => {
    document.title = "Mi perfil - Booket.market";
  }, []);

  return (
    <>
      <div className="d-flex align-items-end gap-2">
        <img
          src={`https://booketapi.onrender.com/images/avatars/${session.avatar}`}
          className="profile-avatar"
          alt="avatar"
        />
        <div>
          <h1 className="m-0">Bienvenido {session.username}</h1>
        </div>
      </div>

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

export default Profile;
