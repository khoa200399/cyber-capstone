import { Avatar, Button, Card } from "@mui/material";
import useLocalStorage from "hooks/useLocalStorage";
import { logout, setNeedAuth } from "modules/Authentication/slice";
import { useGetUserInfoQuery } from "modules/Movie/api";
import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import RestoreIcon from "@mui/icons-material/Restore";
import moment from "moment";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useLocalStorage("user_info");
  const [accessToken, setAccessToken] = useLocalStorage("access_token");
  const userName = userInfo?.taiKhoan;
  useEffect(() => {
    dispatch(setNeedAuth(true));
    if (!accessToken || !userInfo) {
      navigate("/homepage");
      dispatch(logout());
    }
  }, []);

  const { data, isLoading } = useGetUserInfoQuery(userName);
  const user = data?.content;
  console.log(user);

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="w-[60%] bg-[#093145] flex h-[500px] rounded-lg p-2">
        <div
          className="w-[30%]"
          style={{
            borderRight: "1px solid #b2b2b2",
            color:"#FFCB42"
          }}
        >
          <Avatar
            variant="square"
            sx={{
              width: "90px",
              height: "90px",
              margin: "10px 10px",
              background:"#FFCB42"
            }}
          />
          <div
            className="mx-[10px] pt-2"
            style={{
              borderTop: "1px solid #b2b2b2",
            }}
          >
            <h1 className="pt-2">
              <b>Fullname:</b>
              <i className="pl-1">{user?.hoTen}</i>
            </h1>
            <h1 className="pt-2">
              <b>Email:</b>
              <i className="pl-1">{user?.email}</i>
            </h1>
            <h1 className="pt-2">
              <b>Phone number:</b>
              <i className="pl-1">{user?.soDT}</i>
            </h1>
            <h1 className="pt-2">
              <b>Type:</b>
              <i className="pl-1">{user?.loaiNguoiDung.tenLoai}</i>
            </h1>
          </div>
          <div className="flex justify-center items-center mt-[60%]">
            <Button variant="contained" className="!bg-[#ff681f]">
              <Link to="/homepage">BACK TO HOME</Link>
            </Button>
          </div>
        </div>
        <div className="w-[70%] m-[10px]">
          <div className="flex justify-center items-center">
            <RestoreIcon
              sx={{
                color: "#ff681f",
                fontSize: "40px",
              }}
            />
            <h1 className="pl-2 text-[25px] font-bold text-[#ff681f]">
              HISTORY BOOKING SEATS
            </h1>
          </div>
          <div
            style={{
              height: "420px",
              overflow: "auto",
              color:"#FFCB42"
            }}
          >
            {user?.thongTinDatVe.map((dateBooked) => {
              return (
                <div
                  key={dateBooked.maVe}
                  style={{
                    borderBottom: "1px solid #b2b2b2",
                    padding: "10px 0px",
                    color: "",
                  }}
                >
                  <h1 className="font-bold text-[24px]">{dateBooked.tenPhim}</h1>
                  <div>
                    <b>Booking Date: </b>
                    <span>{moment(dateBooked.ngayDat).format("DD-MM-YYYY HH:mm")}</span>
                  </div>
                  <div>
                    <b>Price: </b>
                    <span>{dateBooked.giaVe} VND</span>
                  </div>
                  <div>
                    <b>Theater: </b>
                    <span>
                      {dateBooked.danhSachGhe[0].tenHeThongRap} -{" "}
                      {dateBooked.danhSachGhe[0].tenCumRap}{" "}
                    </span>
                  </div>
                  <div className="flex flex-wrap py-2 items-center">
                    <b className="pr-1">Seat list: </b>
                    {dateBooked.danhSachGhe.map((seat) => {
                      return (
                        <div className="bg-[#ff681f] mr-2 px-2 py-1 rounded-sm text-white">
                          {seat.tenGhe}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
