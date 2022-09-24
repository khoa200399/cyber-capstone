import React from "react";
import BannerSlider from "./containers/Banner";
import FilmShowing from "./containers/FilmShowing";
import Theater from "./containers/Theater";

const MoviePage = () => {
  return (
    <div>
      <BannerSlider />
      <FilmShowing />
      <Theater />
    </div>
  );
};

export default MoviePage;
