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
        url: import.meta.env.VITE_API_URL + "/profile",
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
        data: formData,
      });

      const newURL = URL.createObjectURL(avatar);
      setSession({ ...session, avatar: newURL });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    document.title = "Mi perfil - Booket.market";
  }, []);

  return (
    <>
      <div className="d-flex align-items-center gap-2">
        <img src={session.avatar} className="profile-avatar" alt="avatar" />
        <div>
          <h1 className="m-0">Bienvenido {session.username}</h1>
        </div>
      </div>

      <form method="POST" encType="multipart/form-data" onSubmit={handleSubmit}>
        <div className="my-3">
          <input
            className="form-control form-control-sm"
            id="formFileSm"
            type="file"
            onChange={handleUpload}
          />
          <button type="submit" className="btn btn-primary mt-3">
            Cambiar foto
          </button>
        </div>
      </form>

      <h2>Stats</h2>
      <p className="m-0">Publicaciones actuales: {session.publicaciones}</p>
      <p className="m-0">Favoritos listados: {session.favorites.length}</p>
    </>
  );
};

export default Profile;
