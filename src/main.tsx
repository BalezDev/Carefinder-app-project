import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import App from "./App";
import store from "./store/store";
import "./index.css";
import "remixicon/fonts/remixicon.css";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ToastContainer
          theme="dark"
          position="top-right"
          autoClose={5000}
          closeOnClick
          pauseOnHover={true}
        />
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
