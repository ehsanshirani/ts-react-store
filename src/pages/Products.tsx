import { useEffect, useState, useMemo, type FC, type ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  CircularProgress,
  Pagination,
  Stack,
  Typography,
  Container,
  Button,
  PaginationItem,
  useTheme,
} from "@mui/material";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { type RootState, type AppDispatch } from "../store/store";
import {
  fetchProducts,
  setSearchTerm,
  type ProductType,
} from "../store/productsSlice";
import Product from "../components/Product/Product";
import SearchProducts from "../components/SearchProducts";

const Products: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const theme = useTheme();
  const { isLoading, products, error, searchTerm } = useSelector(
    (store: RootState) => store.products
  );

  useEffect(() => {
    if (products.length === 0 && !isLoading) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length, isLoading]);

  const filteredProducts = useMemo(() => {
    if (!searchTerm) {
      return products;
    }
    return products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  const [page, setPage] = useState<number>(1);
  const itemsPerPage = 12;

  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

  const startIndex = (page - 1) * itemsPerPage;
  const productsToShow = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

  const handleChangePage = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
    console.log(event);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderContent = () => {
    if (isLoading && products.length === 0) {
      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
          }}
        >
          <CircularProgress />
        </Box>
      );
    }

    if (error) {
      return (
        <Typography color="error" textAlign="center" sx={{ mt: 4 }}>
          متاسفانه در دریافت اطلاعات خطایی رخ داده است: {error}
        </Typography>
      );
    }

    if (searchTerm && filteredProducts.length === 0) {
      return (
        <Box
          sx={{
            textAlign: "center",
            mt: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <SearchOffIcon sx={{ fontSize: 64, color: "text.secondary" }} />
          <Typography variant="h6" component="p" color="primary">
            محصولی یافت نشد
          </Typography>
          <Typography color="text.secondary">
            متاسفانه محصولی با عبارت "{searchTerm}" پیدا نکردیم.
          </Typography>
          <Button
            variant="outlined"
            onClick={() => dispatch(setSearchTerm(""))}
            sx={{ mt: 2 }}
          >
            پاک کردن جستجو و نمایش همه محصولات
          </Button>
        </Box>
      );
    }

    return (
      <Box
        sx={{
          p: { mobile: 8, tablet: 0 },
          display: "grid",
          gap: 4,
          gridTemplateColumns: {
            mobile: "repeat(1, 1fr)",
            tablet: "repeat(2, 1fr)",
            laptop: "repeat(3, 1fr)",
            desktop: "repeat(4, 1fr)",
          },
        }}
      >
        {productsToShow.map((product: ProductType) => (
          <Product product={product} key={product.id} />
        ))}
      </Box>
    );
  };

  return (
    <Container sx={{ pb: 4 }}>
      <Stack
        sx={{
          display: "flex",
          justifyContent: "center",
          py: 3,
          alignItems: "center",
        }}
      >
        <SearchProducts />
      </Stack>

      {renderContent()}

      {!isLoading && pageCount > 1 && (
        <Stack
          spacing={2}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 6,
            mb: 4,
          }}
        >
          <Pagination
            count={pageCount}
            page={page}
            onChange={handleChangePage}
            color="primary"
            size="large"
            renderItem={(item) => (
              <PaginationItem
                slots={{
                  previous:
                    theme.direction === "rtl"
                      ? ArrowBackIcon
                      : ArrowForwardIcon,
                  next:
                    theme.direction === "rtl"
                      ? ArrowForwardIcon
                      : ArrowBackIcon,
                }}
                {...item}
              />
            )}
          />
        </Stack>
      )}
    </Container>
  );
};

export default Products;
