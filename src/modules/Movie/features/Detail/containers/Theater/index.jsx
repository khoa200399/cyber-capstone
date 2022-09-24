import { Box, Button } from "@mui/material";
import Loader from "components/Loader";
import { useGetMovieDependTheaterQuery, useGetTheaterListQuery } from "modules/Movie/api";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import s from "./styles.module.scss";

const Theater = (props) => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetTheaterListQuery();
  const [theaterSel, setTheaterSel] = useState("BHDStar");
  const [theaterGrpSel, setTheaterGrpSel] = useState("bhd-star-cineplex-pham-hung");
  const { data: theaterGrp, isLoading: isTheaterGrpLoading } =
    useGetMovieDependTheaterQuery(theaterSel);
  const theaterList = data?.content;
  const theaterGrpList = theaterGrp?.content[0].lstCumRap;

  let dataFilter = [];
  theaterGrpList?.forEach((theater) => {
    const movie = theater.danhSachPhim.filter(
      (item) => item.maPhim === Number(props.movieid)
    );
    if (movie.length !== 0) {
      const { danhSachPhim, ...theaterInfo } = theater;
      dataFilter.push({ movie, theaterInfo });
    }
  });
  
  const handleBooking = (id) => {
    navigate(`/booking/${id}`, { state: { id: id } });
  };

  useEffect(() => {
    if (theaterGrpList) {
      setTheaterGrpSel(theaterGrpList[0].maCumRap);
    }
  }, [theaterGrpList, theaterSel]);
  return isLoading ? (
    <Loader />
  ) : (
    <div
      className="flex flex-col justify-center items-center relative w-full"
      id="movieTheater"
    >
      <Box
        sx={{
          width: "70vw",
          textAlign: "center",
          margin: "50px 0",
        }}
      >
        <div
          className={`${s.wrapper} flex m-[50px] bg-white dark:bg-[#3f4545] rounded-[8px]`}
        >
          <div className={`${s.col1} flex flex-col items-center pt-5`}>
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
          <div className={`${s.col3} !pt-5 text-left`}>
            {dataFilter?.map((theater) => {
              return (
                <div key={theater.theaterInfo.maCumRap}>
                  <h1 className="text-black dark:text-white font-bold">
                    {theater.theaterInfo.tenCumRap}
                  </h1>
                  <p className="text-[#9a9a9a] dark:text-white text-[12px]">
                    <i>{theater.theaterInfo.diaChi}</i>
                  </p>

                  <div className="flex flex-wrap">
                    {theater.movie[0]?.lstLichChieuTheoPhim?.map((movie) => {
                      return (
                        <div key={movie.maLichChieu} className={`w-1/4 my-2`}>
                          <Button
                            variant="outlined"
                            color="warning"
                            className={s.item}
                            onClick={() => handleBooking(movie.maLichChieu)}
                          >
                            <h1>{movie.ngayChieuGioChieu.split("T")[0]}</h1>
                            <span>{movie.ngayChieuGioChieu.split("T")[1]}</span>
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
