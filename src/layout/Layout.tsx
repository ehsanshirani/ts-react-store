import { Outlet } from "react-router-dom";

//mui
import { Box } from "@mui/material";

//components
import Footer from "./footer/Footer";
import Main from "./main/Main";
import Nav from "./nav/Nav";

function Layout() {
  return (
    <>
      <Box
        className="layout"
        sx={{
          backgroundColor: (theme) => theme.palette.background.default,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Nav />
        <Main>
          <Outlet />
        </Main>
        <Footer />
      </Box>
    </>
  );
}

export default Layout;
