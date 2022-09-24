import React from "react";
import Slider from "react-slick";
import PropTypes from "prop-types";
import s from "./styles.module.scss";

const Carousel = (props) => {
  const {
    data,
    dots = true,
    infinite = true,
    speed = 500,
    rows = 1,
    autoplay = false,
    autoplaySpeed = 3000,
  } = props;
  console.log(data);
  
  var settings = {
    dots: dots,
    infinite: infinite,
    speed: speed,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipe: true,
    rows: rows,
    autoplay: autoplay,
    autoplaySpeed: autoplaySpeed,
  };
  return (
    <Slider {...settings} style={{ marginTop: "72px" }}>
      {data?.map((item) => {
        return (
          <div key={item.key}>
            <img className={s.image} src={item.url} alt={item.alt} />
          </div>
        );
      })}
    </Slider>
  );
};

export default Carousel;
