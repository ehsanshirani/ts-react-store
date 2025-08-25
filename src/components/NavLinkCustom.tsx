import { NavLink } from "react-router-dom";

//types
import { type FC, type ReactNode } from "react";
import { type NavLinkProps } from "react-router-dom";

//mui
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";

const StyledLink = styled(NavLink)(({ theme }) => ({
  padding: theme.spacing(1, 2),
  [theme.breakpoints.up("laptop")]: {
    padding: theme.spacing(1, 3),
  },

  height: "100%",
  display: "flex",
  alignItems: "center",
  textDecoration: "none",
  borderRadius: theme.shape.borderRadius,

  color: theme.palette.text.secondary,
  transition: "color 0.2s ease-in-out, background-color 0.2s ease-in-out",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  "&.active": {
    color: theme.palette.primary.main,
    fontWeight: 600,
  },
}));

interface NavLinkCustomProps extends Omit<NavLinkProps, "children"> {
  children: ReactNode;
}

const NavLinkCustom: FC<NavLinkCustomProps> = ({ children, to, ...props }) => {
  return (
    <StyledLink to={to} {...props}>
      <Typography
        component="span"
        sx={{
          fontSize: ["0.7rem", "0.8rem", "1rem", "1.2rem"],
        }}
      >
        {children}
      </Typography>
    </StyledLink>
  );
};

export default NavLinkCustom;
