import { Box, Paper, Typography } from "@mui/material";
import logo from "asset/img/logo.png";

export default function Footer() {
  return (
    <Paper
      sx={{
        width: "100%",
      }}
      component="footer"
      square={true}
      variant="outlined"
      className="!bg-[#222]"
    >
      <Box
        sx={{
          flexGrow: 1,
          justifyContent: "center",
          display: "flex",
          my: 1,
        }}
      >
        <div>
          <img src={logo} width={50} alt="Logo" />
        </div>
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          justifyContent: "center",
          display: "flex",
          mb: 2,
        }}
      >
        <Typography
          variant="caption"
          color="initial"
          className="text-center !text-white"
        >
          Copyright ©2022. CyberSoft Limited
          <h1>
            Empower by <a href="https://cybersoft.edu.vn/">CyberSoft</a>
          </h1>
        </Typography>
      </Box>
    </Paper>
  );
}
