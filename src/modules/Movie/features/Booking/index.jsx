import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import Loader from "components/Loader";
import useLocalStorage from "hooks/useLocalStorage";
import { setNeedAuth } from "modules/Authentication/slice";
import { useBookingSeatMutation, useGetSeatListQuery } from "modules/Movie/api";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import s from "./styles.module.scss";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedSeat, setSelectedSeat] = useState([]);
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const { data, isLoading } = useGetSeatListQuery(id);
  const [
    booking,
    { isLoading: isBookingLoading, isSuccess: isBookingSuccess, isError: isBookingError },
  ] = useBookingSeatMutation();
  const seatList = data?.content.danhSachGhe;
  const movieInfo = data?.content.thongTinPhim;
  const [accessToken, setAccessToken] = useLocalStorage("access_token");

  const calcSeat = (arr) => {
    let total = 0;
    arr.forEach((item) => {
      total += item.giaVe;
    });
    var formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "VND",
    });

    return formatter.format(total);
  };

  const handleChange = (checked, seatInfo) => {
    if (checked) {
      setSelectedSeat((prev) => [...prev, seatInfo]);
    } else {
      const foundSeat = selectedSeat?.findIndex((item) => item.maGhe === seatInfo.maGhe);
      const newSelSeat = [...selectedSeat];
      if (foundSeat !== -1) {
        newSelSeat.splice(foundSeat, 1);
        setSelectedSeat(newSelSeat);
      }
    }
  };

  const handleConfirm = () => {
    const newSelectedSeat = [];
    selectedSeat.forEach((item) => {
      newSelectedSeat.push({ maGhe: item.maGhe, giaVe: item.giaVe });
    });
    booking({ maLichChieu: id, danhSachVe: newSelectedSeat });
    setOpen(false);
  };
  useEffect(() => {
    dispatch(setNeedAuth(true));
    if (accessToken) return;
    navigate("/auth");
  }, []);
  useEffect(() => {
    if (isBookingSuccess || isBookingError) {
      setOpenDialog(true);
    }
  }, [isBookingSuccess, isBookingError]);

  return isLoading || isBookingLoading ? (
    <Loader />
  ) : (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-[80%] text-center">
        <div className="flex">
          <div
            className="w-[70%] bg-white flex flex-col justify-center items-center"
            style={{
              borderRight: "1px solid #d0d0d0",
              borderRadius: "8px 0 0 8px",
            }}
          >
            <h1 className="font-bold text-[30px] text-[#ff7735]">SEAT LIST</h1>
            <i className="text-[#b2b2b2]">Let choose your seats!</i>
            <div
              className="trapezoid"
              style={{
                width: "85%",
                height: "10%",
                background: "rgba(255,119,53,0.75)",
                transform: " perspective(10px) rotateX(1deg)",
                margin: "8px",
                color: "white",
                fontWeight: "600",
                fontSize: "20px",
                boxShadow: " 0px 20px 65px 1px rgba(255,119,53,0.75)",
              }}
            >
              SCREEN
            </div>
            <div className="flex flex-wrap p-5 pb-9">
              {seatList.map((seat) => {
                return (
                  <div
                    key={seat.stt}
                    className={`w-[5%] mx-[5px] my-[12px] ${s.checkboxWrapper}`}
                  >
                    <input
                      id={seat.stt}
                      disabled={seat.daDat}
                      type="checkbox"
                      style={{
                        "&::before": {
                          border: seat.loaiGhe === "Vip" ? "2px solid #ff9800" : "none",
                        },
                      }}
                      onChange={(e) => handleChange(e.target.checked, seat)}
                    />
                    <label
                      htmlFor={seat.stt}
                      style={{
                        color: seat.loaiGhe === "Vip" ? "#ff9800" : "black",
                      }}
                    >
                      {seat.tenGhe}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Movie info */}
          <div
            className="w-[30%] bg-white"
            style={{
              borderRadius: "0 8px 8px 0",
            }}
          >
            <h1
              className="text-[30px] font-bold"
              style={{
                borderBottom: "1px solid #d0d0d0",
                margin: "8px 10px",
                background:
                  "-webkit-linear-gradient(0deg, #40e0d0 0%, #ff8c00 50%, #ff0080 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              CYBERFILM
            </h1>
            <h1 className="text-[20px] font-bold text-[#ff7735] uppercase p-2">
              {movieInfo.tenPhim}
            </h1>
            <div
              className="text-left"
              style={{
                borderBottom: "1px solid #d0d0d0",
                margin: "0 10px ",
                color: "#e56b2f",
              }}
            >
              <p className="my-2">
                <b>
                  {movieInfo.tenCumRap} - {movieInfo.tenRap}
                </b>
              </p>
              <p className="my-2">
                <b className="mr-1.5">Time:</b>
                <i>
                  {movieInfo.ngayChieu} - {movieInfo.gioChieu}
                </i>
              </p>
              <p className="my-2">
                <b className="mr-1.5">Address:</b>
                <i>{movieInfo.diaChi}</i>
              </p>
            </div>
            <div>
              <h1 className="text-[20px] font-bold text-[#ff7735] uppercase p-2">
                Selected seats
              </h1>
              <div
                className="flex flex-wrap m-1 ml-3"
                style={{
                  maxWidth: "100%",
                  maxHeight: "200px",
                  overflow: "auto",
                }}
              >
                {selectedSeat.map((seat) => {
                  return (
                    <div
                      key={seat.stt}
                      className="bg-[#ff7735] m-1 py-1 px-1 w-[22%] rounded-[5px]"
                    >
                      <h1 className="text-white">{seat.stt}</h1>
                    </div>
                  );
                })}
              </div>
              <div
                style={{
                  borderTop: "1px solid #d0d0d0",
                  margin: "10px 10px",
                }}
              >
                <div className="flex justify-between items-center px-2 pt-2">
                  <h1 className="font-bold text-[#ff7735] uppercase">Quanity:</h1>
                  <h1 className="font-bold text-[#ff7735] uppercase">
                    {selectedSeat.length} tickets
                  </h1>
                </div>
                <div className="flex justify-between items-center px-2">
                  <h1 className="font-bold text-[#ff7735] uppercase">Total:</h1>
                  <h1 className="font-bold text-[#ff7735] uppercase">
                    {calcSeat(selectedSeat)}
                  </h1>
                </div>
              </div>
              <div className="py-6">
                <Button
                  variant="contained"
                  className="!bg-[#ff7735]"
                  onClick={() => setOpen(true)}
                >
                  BOOK NOW!!!
                </Button>
                <Button
                  variant="contained"
                  className="!bg-[red] !ml-2"
                  onClick={() => navigate(-1)}
                >
                  CANCEL BOOKING
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dialog */}
      <div>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogContent
            sx={{
              borderBottom: "1px solid #b2b2b2",
              height: "130px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              fontSize: "16px",
              fontWeight: "600",
            }}
          >
            {selectedSeat.length === 0 ? (
              <ErrorOutlineIcon
                sx={{
                  fontSize: "50px",
                  color: "#ff9562",
                }}
              />
            ) : (
              <HelpOutlineIcon
                sx={{
                  fontSize: "50px",
                  color: "#0096FF",
                }}
              />
            )}

            {selectedSeat.length === 0 ? (
              <h1 className="p-1 h-1/2 text-[#ff9562]">
                Please choose your seats before booking!
              </h1>
            ) : (
              <h1 className="p-1 h-1/ text-[#0096FF]">
                ARE YOU SURE TO BOOKING THESE SEATS?
              </h1>
            )}
          </DialogContent>
          <DialogActions
            sx={{
              justifyContent: "center",
            }}
          >
            {selectedSeat.length === 0 ? null : (
              <Button color="primary" variant="outlined" onClick={handleConfirm}>
                Confirm
              </Button>
            )}
            <Button color="error" variant="outlined" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div>
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogContent
            sx={{
              borderBottom: "1px solid #b2b2b2",
              height: "130px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              fontSize: "16px",
              fontWeight: "600",
            }}
          >
            {isBookingSuccess ? (
              <CheckCircleOutlineIcon
                sx={{
                  fontSize: "50px",
                  color: "#33ff33",
                }}
              />
            ) : (
              <WarningAmberIcon
                sx={{
                  fontSize: "50px",
                  color: "#ff681f",
                }}
              />
            )}

            {isBookingSuccess ? (
              <h1 className="p-1 h-1/2 text-[#33ff33]">BOOKING SUCCESSFULLY!</h1>
            ) : (
              <h1 className="p-1 h-1/ text-[#ff681f]">BOOKING ERROR!</h1>
            )}
          </DialogContent>
          <DialogActions
            sx={{
              justifyContent: "center",
            }}
          >
            {isBookingSuccess ? (
              <Button
                color="error"
                variant="outlined"
                onClick={() => {
                  setOpenDialog(false);
                  navigate("/homepage");
                }}
              >
                OK
              </Button>
            ) : (
              <Button
                color="error"
                variant="outlined"
                onClick={() => {
                  setOpenDialog(false);
                }}
              >
                OK
              </Button>
            )}
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default Booking;
