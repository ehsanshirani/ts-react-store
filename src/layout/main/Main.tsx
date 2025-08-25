import type { FC, ReactNode } from "react";

//mui
import { Grid } from "@mui/material";

interface MainProps {
  children: ReactNode;
}

const Main: FC<MainProps> = ({ children }) => {
  return (
    <Grid
      container
      justifyContent={"center"}
      mt={10}
      sx={{ flex: 1 }}
      columns={{ tablet: 6, laptop: 8, desktop: 12 }}
    >
      <Grid size={{ tablet: 5, laptop: 6, desktop: 10 }}>{children}</Grid>
    </Grid>
  );
};

export default Main;
