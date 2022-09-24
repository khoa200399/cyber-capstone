import Footer from "components/Footer";
import Header from "components/Header";
import React from "react";

const MovieTemplate = (props) => {
  return (
    <div>
      <Header />
      <div>{props.children}</div>
      <Footer />
    </div>
  );
};

export default MovieTemplate;
