import { Outlet, useNavigation } from "react-router-dom";
import Footer from "../components/Footer";
import MyNavbar from "../components/MyNavbar";

const RootLayout = () => {
  const navigation = useNavigation();

  return (
    <>
      {navigation.state === "loading" && (
        <div className="loader-fade">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <MyNavbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default RootLayout;
