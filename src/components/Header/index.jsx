import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import DarkModeBtn from "components/ToggleDarkMode";
import s from "./styles.module.scss";
import { Link, useLocation } from "react-router-dom";
import useLocalStorage from "hooks/useLocalStorage";
import { logout } from "modules/Authentication/slice";
import { useDispatch } from "react-redux";

const pages = ["SHOWTIME", "THEATER", "NEWS"];
const newPages = [
  { keyId: "showtimes", name: "SHOWTIME", path: "/homepage#showtimes" },
  { keyId: "theaters", name: "THEATER", path:"/homepage#theaters" },
  { keyId: "news", name: "NEWS",path:"/homepage#news"  },
];
const settings = [];

const Header = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [access_token, setLocal] = useLocalStorage("access_token");
  const [user_info, setUserLocal] = useLocalStorage("user_info");
  const dispatch = useDispatch();

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: name.split[0] ? `${name.split(" ")[0][0]}${name.split(" ")[1][0]}` : "UN",
    };
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="fixed" className="dark:!bg-[#2C3333] !bg-[white]">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <a id={s.logo} href="/" style={{}} className="text-[black] dark:text-[white]">
            CYBERFILM
          </a>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {access_token ? (
                <Typography
                  className="!text-[red] dark:!text-[white] px-3"
                  textAlign="center"
                >
                  {user_info ? user_info.hoTen : "Unknow"}
                </Typography>
              ) : null}
              {!access_token ? (
                <MenuItem onClick={handleCloseNavMenu}>
                  <Link to={"/auth"}>
                    <Typography
                      className="!text-[#d97706] dark:!text-[white] px-3"
                      textAlign="center"
                    >
                      Login
                    </Typography>
                  </Link>
                </MenuItem>
              ) : null}
              {access_token ? (
                <MenuItem onClick={handleCloseNavMenu}>
                  <Link to={"/profile"}>
                    <Typography
                      className="!text-[#d97706] dark:!text-[white] px-3"
                      textAlign="center"
                    >
                      Profile
                    </Typography>
                  </Link>
                </MenuItem>
              ) : null}
              {access_token ? (
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography
                    className="!text-[#d97706] dark:!text-[white] px-3"
                    textAlign="center"
                    onClick={() => dispatch(logout())}
                  >
                    Logout
                  </Typography>
                </MenuItem>
              ) : null}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              textDecoration: "none",
            }}
            className="!text-[#d97706] dark:!text-[white]"
          >
            CYBERFILM
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            {currentPath === "/homepage"
              ? newPages.map((page, i) => {
                  return (
                    <a
                      href={`#${page.keyId}`}
                      key={i}
                      style={{
                        margin: "0 10px",
                        transition: "all 0.5s",
                        fontWeight: "600",
                      }}
                      className="dark:text-white text-black hover:text-red-500 hover:dark:text-red-500"
                    >
                      {page.name}
                    </a>
                  );
                })
              : newPages.map((page, i) => {
                  return (
                    <Link
                      to={page.path}
                      key={i}
                      style={{
                        margin: "0 10px",
                        transition: "all 0.5s",
                        fontWeight: "600",
                      }}
                      className="dark:text-white text-black hover:text-red-500 hover:dark:text-red-500"
                    >
                      {page.name}
                    </Link>
                  );
                })}
          </Box>
          <DarkModeBtn />
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {user_info ? (
                  <Avatar {...stringAvatar(user_info.hoTen)} />
                ) : (
                  <Avatar alt="Unknow" src="/static/images/avatar/1.jpg" />
                )}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {access_token ? (
                <Typography
                  className="!text-[red] dark:!text-[white] px-3"
                  textAlign="center"
                >
                  {user_info ? user_info.hoTen : "Unknow"}
                </Typography>
              ) : null}
              {!access_token ? (
                <MenuItem onClick={handleCloseUserMenu}>
                  <Link to={"/auth"}>
                    <Typography
                      className="!text-[#d97706] dark:!text-[white] px-3"
                      textAlign="center"
                    >
                      Login
                    </Typography>
                  </Link>
                </MenuItem>
              ) : null}
              {access_token ? (
                <MenuItem onClick={handleCloseUserMenu}>
                  <Link to={"/profile"}>
                    <Typography
                      className="!text-[#d97706] dark:!text-[white] px-3"
                      textAlign="center"
                    >
                      Profile
                    </Typography>
                  </Link>
                </MenuItem>
              ) : null}
              {access_token ? (
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography
                    className="!text-[#d97706] dark:!text-[white] px-3"
                    textAlign="center"
                    onClick={() => dispatch(logout())}
                  >
                    Logout
                  </Typography>
                </MenuItem>
              ) : null}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
