import { type PaletteOptions } from "@mui/material/styles";
export const lightPalette: PaletteOptions = {
  mode: "light",
  primary: {
    main: "#007AFF",
    light: "#66B2FF",
    dark: "#0059B2",
    contrastText: "#FFFFFF",
  },
  secondary: {
    main: "#8E8E93",
    light: "#C7C7CC",
    dark: "#636366",
    contrastText: "#FFFFFF",
  },
  text: {
    primary: "#1C1C1E",
    secondary: "#636366",
    disabled: "#AEAEB2",
  },
  info: {
    main: "#007AFF",
  },
  success: {
    main: "#34C759",
  },
  error: {
    main: "#FF3B30",
  },
  background: {
    default: "#F2F2F7",
    paper: "#FFFFFF",
  },
};

export const darkPalette: PaletteOptions = {
  mode: "dark",
  primary: {
    main: "#0A84FF",
    light: "#66B2FF",
    dark: "#0059B2",
    contrastText: "#FFFFFF",
  },
  secondary: {
    main: "#8E8E93",
    light: "#C7C7CC",
    dark: "#636366",
    contrastText: "#FFFFFF",
  },
  text: {
    primary: "#F2F2F7",
    secondary: "#8E8E93",
    disabled: "#48484A",
  },
  info: {
    main: "#0A84FF",
  },
  success: {
    main: "#30D158",
  },
  error: {
    main: "#FF453A",
  },
  background: {
    default: "#000000",
    paper: "#373737",
  },
};
