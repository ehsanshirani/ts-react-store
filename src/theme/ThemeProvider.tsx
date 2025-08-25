import { useMemo } from "react";
import { useSelector } from "react-redux";

//types
import { type FC, type ReactNode } from "react";
import type { RootState } from "../store/store";

//mui
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
  type PaletteOptions,
} from "@mui/material/styles";

//provider
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

//rtl
import rtlPlugin from "@mui/stylis-plugin-rtl";


//palette
import { darkPalette, lightPalette } from "./palette";

interface ThemeProviderProps {
  children: ReactNode;
}

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    mobile: true;
    tablet: true;
    laptop: true;
    desktop: true;
    xs: false;
    sm: false;
    md: false;
    lg: false;
    xl: false;
  }
}

const rtlCache = createCache({
  key: "muirtl",
  stylisPlugins: [rtlPlugin],
});

const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const { theme } = useSelector((store: RootState) => store.theme);

  const themeMui = useMemo(() => {
    const palette: PaletteOptions =
      theme === "light" ? lightPalette : darkPalette;
    const baseTheme = createTheme({
      palette: palette,
      breakpoints: {
        //custom value of breakpoints
        values: {
          mobile: 320,
          tablet: 640,
          laptop: 1024,
          desktop: 1280,
        },
      },
    });

    return baseTheme;
  }, [theme]);

  return (
    <MuiThemeProvider theme={themeMui}>
      <CacheProvider value={rtlCache}>{children}</CacheProvider>
    </MuiThemeProvider>
  );
};

export default ThemeProvider;
