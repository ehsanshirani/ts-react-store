//component
import { Button } from "@mui/material";

//types
import type { ReactNode } from "react";
import { type ButtonProps, type Theme } from "@mui/material";

interface ButtonCustomProps {
  children: ReactNode;
  icon?: boolean;
  sx?: ButtonProps["sx"];
}

const defaultSx = {
  m: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: (theme: Theme) => theme.palette.primary.light,
  color: (theme: Theme) => theme.palette.text.primary,
  "&:hover": {
    backgroundColor: (theme: Theme) => theme.palette.primary.main,
  },
  minWidth: ["30px", "30px", "35px", "40px"],
  p: [0.5, 0.75, 1, 1.25],
  fontSize: ["16px", "18px", "20px", "22px"],
};

function ButtonCustom({
  children,
  icon,
  sx,
  ...props
}: ButtonCustomProps & ButtonProps) {
  const combinedSx = {
    ...defaultSx,
    ...(icon ? defaultSx : {}),
    ...sx,
  };

  return (
    <Button {...props} sx={combinedSx}>
      {children}
    </Button>
  );
}

export default ButtonCustom;
