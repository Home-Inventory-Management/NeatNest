import React from "react";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer"
import "./styles/globals.css";

function App({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default App;
