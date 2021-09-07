import React, { Fragment } from "react";
import { ToastContainer } from "react-toastify";

import { Home } from "./app/pages/Home";

import "./App.css";

function App() {
  return (
    <Fragment>
      <Home />
      <ToastContainer
        position="top-center"
        autoClose={8000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </Fragment>
  );
}

export default App;
