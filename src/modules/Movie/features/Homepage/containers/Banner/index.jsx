import Loader from "components/Loader";
import { useGetBannerListQuery } from "modules/Movie/api";
import React, { useRef } from "react";
import Slider from "react-slick";
import s from "./styles.module.scss";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import banner1 from "asset/img/bogia.png";
import banner2 from "asset/img/oi-troi-oi-16167488704232.jpg";
import banner3 from "asset/img/spiderman.png";
import banner4 from "asset/img/eternals.jpg";

const Carousel = (props) => {
  const sliderRef = useRef();
  const { data, isLoading } = useGetBannerListQuery();
  //Banners from API are so ugly, so I replace them with my banner
  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipe: true,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  return isLoading ? (
    <Loader />
  ) : (
    <div className="relative" style={{ marginTop: "72px" }}>
      <Slider ref={sliderRef} {...settings} style={{ position: "relative" }}>
        <div>
          <img className={s.image} src={banner1} alt="banner1" />
        </div>
        <div>
          <img className={s.image} src={banner2} alt="banner2" />
        </div>
        <div>
          <img className={s.image} src={banner3} alt="banner3" />
        </div>
        <div>
          <img className={s.image} src={banner4} alt="banner4" />
        </div>
      </Slider>

      <button
        className="absolute top-1/2 right-8 z-10"
        onClick={() => sliderRef.current.slickNext()}
      >
        <ArrowForwardIosIcon
          style={{ color: "white", fontSize: "50px", opacity: "0.6" }}
        />
      </button>
      <button
        className="absolute top-1/2 left-8 z-10"
        onClick={() => sliderRef.current.slickPrev()}
      >
        <ArrowBackIosIcon
          style={{ color: "white", fontSize: "50px", opacity: "0.6" }}
        />
      </button>
    </div>
  );
};

export default Carousel;
