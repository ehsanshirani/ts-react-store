import { type ChangeEvent, type FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search } from "@mui/icons-material";
import { Box, InputBase } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import type { AppDispatch, RootState } from "../store/store";
import { setSearchTerm } from "../store/productsSlice";

const SearchProducts: FC = () => {
  const theme = useTheme();
  const dispatch: AppDispatch = useDispatch();

  const searchTerm = useSelector(
    (state: RootState) => state.products.searchTerm
  );

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(event.target.value));
  };

  return (
    <Box
      sx={{
        p: 0,
        m: 0,
        gap: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: "12px",
        "&:hover": {
          backgroundColor: theme.palette.action.hover,
        },
        transition: "background-color 0.2s",

        minWidth: {
          mobile: "150px",
          tablet: "200px",
          laptop: "300px",
        },
        minHeight: {
          mobile: "30px",
          tablet: "35px",
          leptop: "40px",
        },
      }}
    >
      <Search sx={{ color: "text.secondary" }} />
      <InputBase
        sx={{
          color: "text.primary",
          fontSize: ["12px", "12px", "14px", "16px"],
          flex: 1,
        }}
        placeholder="جستجو..."
        inputProps={{ "aria-label": "search input" }}
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </Box>
  );
};

export default SearchProducts;
