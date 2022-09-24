import { Button, Card, CardMedia, Rating } from "@mui/material";
import { Box } from "@mui/system";
import CirclePercentage from "components/CirclePercentage";
import React from "react";
import s from "./styles.module.scss";

const MovieDetail = (props) => {
  const {
    biDanh,
    dangChieu,
    tenPhim,
    hinhAnh,
    hot,
    trailer,
    moTa,
    danhGia,
    ngayKhoiChieu,
  } = props.data;
  return (
    <div className="flex w-full justify-center items-center mt-[6%]">
      <Box
        sx={{
          width: "60vw",
        }}
      >
        <div className="flex justify-center items-center">
          <div className={`${s.imgInfo} md:w-[25%]`}>
            <Card>
              <CardMedia component="img" image={hinhAnh} alt={biDanh} />
            </Card>
          </div>
          <div className={`${s.detailInfo} md:w-[50%] px-5 pt-0`}>
            <div className="p-4 pt-2 h-full">
              <h1 className="font-bold text-[30px] text-[white] dark:text-white">
                {tenPhim}
              </h1>
              {dangChieu ? (
                <span className={s.comingStat}>Coming Soon</span>
              ) : (
                <span className={s.screeningStat}>Screening</span>
              )}
              {hot ? <span>HOT</span> : null}
              <p className="py-3 text-[12px] text-bold">100 mins - 7 IMDb - 2D/Digital</p>
              <i className="text-white block">
                <b className="text-white">Description:</b> {moTa}
              </i>
              <a href="#movieTheater">
                <Button className="!my-5" color="warning" variant="contained">
                  Buy Ticket
                </Button>
              </a>
            </div>
          </div>
          <div className="md:w-[25%] flex flex-col justify-center items-center">
            <CirclePercentage valview={`${danhGia}/10`} value={danhGia * 10} />
            <div className="py-6">
              <Rating
                name="read-only"
                value={danhGia / 2}
                readOnly
                size="large"
                precision={0.5}
              />
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default MovieDetail;
