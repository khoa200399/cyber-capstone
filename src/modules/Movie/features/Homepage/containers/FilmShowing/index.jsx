import { Button, Rating } from "@mui/material";
import { Box } from "@mui/system";
import Loader from "components/Loader";
import { useGetMovieListQuery } from "modules/Movie/api";
import React from "react";
import Slider from "react-slick";
import s from "./styles.module.scss";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const FilmShowing = () => {
  const sliderRef = useRef();
  const navigate = useNavigate();
  const { data, isLoading } = useGetMovieListQuery();
  var settings = {
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    swipe: true,
    rows: 2,
    accessibility: false,
  };

  const navigateDetail = (movieId) => {
    navigate(`detail/${movieId}`, { state: { id: movieId } });
    console.log(movieId);
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="flex flex-col justify-center items-center relative w-full" id="showtimes">
      <h1 className={s.headerText}>MOVIES SHOWING</h1>
      <Box
        sx={{
          width: "65vw",
          textAlign: "center",
          position: "relative",
          borderRadius: "16px",
          padding: "20px 40px",
          boxShadow: "8px 10px 48px 4px rgba(0,0,0,0.67)",
        }}
      >
        <Slider ref={sliderRef} {...settings}>
          {data?.content.map((movie) => {
            return (
              <div key={movie.maPhim}>
                <div className={s.wrapper}>
                  <div className={s.imgInfo}>
                    <img className={s.image} src={movie.hinhAnh} alt={movie.biDanh} />
                    <div className={s.imgOverlay}>
                      <a href={movie.trailer} target="_blank" rel="noreferrer">
                        <PlayCircleFilledIcon style={{ color: "white", fontSize: "60px" }} />
                      </a>
                    </div>
                    <div className={s.showing}>SHOWING</div>
                  </div>
                  <div className={s.movieInfo}>
                    <div className={s.rateScore}>
                      <Rating name="simple-controlled" value={movie.danhGia / 2} precision={0.5} readOnly />
                    </div>
                    <div className={s.movieName}>
                      <h1 className="uppercase font-bold pb-4">{movie.tenPhim}</h1>
                    </div>
                    <div className={s.btnWrapper}>
                      <Button
                        color="error"
                        variant="contained"
                        className={s.buyBtn}
                        onClick={() => navigateDetail(movie.maPhim)}
                      >
                        GET TICKET!!!
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      </Box>
      <button className="absolute top-1/2 right-36 z-10" onClick={() => sliderRef.current.slickNext()}>
        <ArrowForwardIosIcon
          style={{ color: "black", fontSize: "50px", opacity: "0.6" }}
          className="dark:!text-white"
        />
      </button>
      <button className="absolute top-1/2 left-36 z-10 " onClick={() => sliderRef.current.slickPrev()}>
        <ArrowBackIosIcon style={{ color: "black", fontSize: "50px", opacity: "0.6" }} className="dark:!text-white" />
      </button>
    </div>
  );
};

export default FilmShowing;
