import React from "react";
import Header from "../Header/header";
import Footer from "../Footer/footer";
import Routers from "../../routes/Routers";

const Layout: React.FC = () => {
  return (
    <>
      <Header />
      <div>
        <Routers />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
