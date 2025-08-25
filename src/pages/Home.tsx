import { useEffect } from "react";
import { Link } from "react-router-dom";

//redux
import { useDispatch, useSelector } from "react-redux";

//types
import { type FC } from "react";
import { type ProductType } from "../store/productsSlice";
import type { AppDispatch, RootState } from "../store/store";

//mui
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  CircularProgress,
} from "@mui/material";
import { LocalShipping, HeadsetMic, VerifiedUser } from "@mui/icons-material";

//animations
import { motion } from "framer-motion";

//components
import Product from "../components/Product/Product";

//api
import { fetchProducts } from "../store/productsSlice";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

const Home: FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const products = useSelector((store: RootState) => store.products.products);
  const isLoading = useSelector((store: RootState) => store.products.isLoading);

  useEffect(() => {
    if (products.length === 0 && !isLoading) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length, isLoading]);

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

  const featuredProducts = products.slice(0, 8);

  return (
    <Box sx={{ overflow: "hidden" }}>
      {/* --- بخش Hero --- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <Box
          sx={{
            bgcolor: "primary.main",
            color: "primary.contrastText",
            py: { mobile: 10, tablet: 15 },
            textAlign: "center",
          }}
        >
          <Container>
            <Typography
              variant="h2"
              component="h1"
              fontWeight={700}
              gutterBottom
            >
              تجربه خریدی متفاوت
            </Typography>
            <Typography
              variant="h6"
              sx={{ maxWidth: "600px", margin: "auto", opacity: 0.9, mb: 3 }}
            >
              جدیدترین محصولات دیجیتال را با بهترین قیمت و کیفیت از ما بخواهید.
            </Typography>
            <Button
              component={Link}
              to="/products"
              variant="contained"
              size="large"
              sx={{
                bgcolor: "white",
                color: "primary.main",
                "&:hover": { bgcolor: "grey.200" },
              }}
            >
              مشاهده محصولات
            </Button>
          </Container>
        </Box>
      </motion.div>
      <Container sx={{ py: { mobile: 6, tablet: 8 } }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <Box
            sx={{
              display: "grid",
              gap: 4,
              gridTemplateColumns: {
                mobile: "repeat(1, 1fr)",
                laptop: "repeat(3, 1fr)",
              },
            }}
          >
            <motion.div variants={itemVariants}>
              <Stack alignItems="center" spacing={2} textAlign="center">
                <LocalShipping color="primary" sx={{ fontSize: 48 }} />
                <Typography variant="h6" fontWeight={600}>
                  ارسال سریع و رایگان
                </Typography>
                <Typography color="text.secondary">
                  سفارشات شما در سریع‌ترین زمان ممکن و به صورت رایگان به دستتان
                  خواهد رسید.
                </Typography>
              </Stack>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Stack alignItems="center" spacing={2} textAlign="center">
                <HeadsetMic color="primary" sx={{ fontSize: 48 }} />
                <Typography variant="h6" fontWeight={600}>
                  پشتیبانی ۲۴/۷
                </Typography>
                <Typography color="text.secondary">
                  تیم پشتیبانی ما در تمام ساعات شبانه‌روز آماده پاسخگویی به
                  شماست.
                </Typography>
              </Stack>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Stack alignItems="center" spacing={2} textAlign="center">
                <VerifiedUser color="primary" sx={{ fontSize: 48 }} />
                <Typography variant="h6" fontWeight={600}>
                  ضمانت اصالت کالا
                </Typography>
                <Typography color="text.secondary">
                  ما اصالت تمام محصولات را تضمین می‌کنیم تا با خیال راحت خرید
                  کنید.
                </Typography>
              </Stack>
            </motion.div>
          </Box>
        </motion.div>
      </Container>

      <Box sx={{ bgcolor: "background.default", py: { mobile: 6, tablet: 8 } }}>
        <Container>
          <Typography
            variant="h4"
            component="h2"
            fontWeight={700}
            textAlign="center"
            gutterBottom
          >
            محصولات ویژه
          </Typography>
          <Box
            sx={{
              mt: 4,
              display: "grid",
              gap: 3,
              gridTemplateColumns: {
                mobile: "repeat(1, 1fr)",
                tablet: "repeat(2, 1fr)",
                laptop: "repeat(4, 1fr)",
              },
            }}
          >
            {featuredProducts.map((product: ProductType) => (
              <Product product={product} key={product.id} />
            ))}
          </Box>
        </Container>
      </Box>

      <Container sx={{ py: { mobile: 6, tablet: 8 }, textAlign: "center" }}>
        <Typography variant="h4" component="h2" fontWeight={700} gutterBottom>
          هنوز محصول مورد نظرتان را پیدا نکرده‌اید؟
        </Typography>
        <Typography
          variant="h6"
          sx={{
            maxWidth: "600px",
            margin: "auto",
            color: "text.secondary",
            mb: 3,
          }}
        >
          مجموعه کامل محصولات ما را مشاهده کنید و بهترین انتخاب را داشته باشید.
        </Typography>
        <Button
          component={Link}
          to="/products"
          variant="contained"
          size="large"
        >
          مشاهده همه محصولات
        </Button>
      </Container>
    </Box>
  );
};

export default Home;
