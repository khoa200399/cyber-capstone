import { Box, Button } from "@mui/material";
import Loader from "components/Loader";
import { useGetMovieDependTheaterQuery, useGetTheaterListQuery } from "modules/Movie/api";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import s from "./styles.module.scss";

const Theater = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetTheaterListQuery();
  const [theaterSel, setTheaterSel] = useState("BHDStar");
  const [theaterGrpSel, setTheaterGrpSel] = useState("bhd-star-cineplex-pham-hung");
  const { data: theaterGrp, isLoading: isTheaterGrpLoading } =
    useGetMovieDependTheaterQuery(theaterSel);
  const theaterList = data?.content;
  const theaterGrpList = theaterGrp?.content[0].lstCumRap;
  const [movieList, setMovieList] = useState([]);

  const navigateDetail = (id) => {
    navigate(`/homepage/detail/${id}`)
  }

  useEffect(() => {
    let initialMovieList = theaterGrpList?.find(
      (item) => item.maCumRap === theaterGrpSel
    );
    initialMovieList = initialMovieList?.danhSachPhim;
    setMovieList(initialMovieList);
  }, [theaterGrpList, theaterGrpSel]);

  useEffect(() => {
    if (theaterGrpList) {
      setTheaterGrpSel(theaterGrpList[0].maCumRap);
    }
  }, [theaterGrpList, theaterSel]);
  return isLoading ? (
    <Loader />
  ) : (
    <div
      className="flex flex-col justify-center items-center relative w-full mt-20"
      id="theaters"
    >
      <h1 className={s.headerText}>MOVIES SHOWING</h1>
      <Box
        sx={{
          width: "65vw",
          textAlign: "center",
          margin: "20px 0",
        }}
      >
        <div className={`${s.wrapper} flex `}>
          <div className={`${s.col1} flex flex-col items-center`}>
            {theaterList.map((theater) => {
              return (
                <div
                  key={theater.maHeThongRap}
                  className={s.logoWrapper}
                  onClick={() => setTheaterSel(theater.maHeThongRap)}
                >
                  <img
                    className={
                      theaterSel === theater.maHeThongRap
                        ? `${s.logo} ${s.active} dark:!shadow-white`
                        : `${s.logo}`
                    }
                    src={theater.logo}
                    alt={theater.maHeThongRap}
                  />
                </div>
              );
            })}
          </div>
          <div className={`${s.col2}`}>
            {isTheaterGrpLoading ? (
              <Loader />
            ) : (
              theaterGrpList?.map((theaterGrp) => {
                return (
                  <div
                    className={
                      theaterGrpSel === theaterGrp.maCumRap
                        ? `${s.theaterGrp} ${s.theaterGrpActive} dark:border-r-white`
                        : `${s.theaterGrp}`
                    }
                    key={theaterGrp.maCumRap}
                  >
                    <div className={`${s.imageInfo}`}>
                      <img src={theaterGrp.hinhAnh} alt={theaterGrp.maCumRap} />
                    </div>
                    <div className={s.theaterInfo}>
                      <h1 onClick={() => setTheaterGrpSel(theaterGrp.maCumRap)}>
                        {theaterGrp.tenCumRap}
                      </h1>
                      <p>{theaterGrp.diaChi}</p>
                      <a href="#">[Detail]</a>
                    </div>
                  </div>
                );
              })
            )}
          </div>
          <div className={s.col3}>
            {movieList?.map((movie) => {
              return (
                <div key={movie.maPhim} className={s.movieWrapper}>
                  <div className={s.flexWrapper}>
                    <div className={s.movieImg}>
                      <img src={movie.hinhAnh} alt={movie.maPhim} />
                    </div>
                    <div className={s.movieInfo}>
                      <h1 onClick={() => navigateDetail(movie.maPhim)} className="hover:text-[#8bc541] cursor-pointer">
                        {movie.tenPhim}
                      </h1>
                      <p>Duration: 90 mins - CyberSoft - IMDb 7</p>
                      {movie.sapChieu ? (
                        <span className={s.comingStat}>Coming Soon</span>
                      ) : (
                        <span className={s.screeningStat}>Screening</span>
                      )}
                    </div>
                  </div>
                  <div className={`${s.movieSchedule} flex flex-wrap`}>
                    {movie.lstLichChieuTheoPhim.map((schedule) => {
                      return (
                        <div
                          key={schedule.maLichChieu}
                          className={`${s.scheduleItem} w-1/4`}
                        >
                          <Button variant="outlined" color="warning" className={s.item}>
                            <h1>{schedule.ngayChieuGioChieu.split("T")[0]}</h1>
                            <span>{schedule.ngayChieuGioChieu.split("T")[1]}</span>
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Box>
    </div>
  );
};

export default Theater;
