import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

//redux
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/productsSlice";
import { addItemToCart } from "../store/cartSlice";

//types
import { type FC } from "react";
import { type CartItem } from "../store/cartSlice";
import type { RootState, AppDispatch } from "../store/store";

//mui
import {
  Box,
  Rating,
  Stack,
  Typography,
  CircularProgress,
  Divider,
  Button,
} from "@mui/material";

//animations
import { motion } from "framer-motion";

//id
import { v4 as uuidv4 } from "uuid";

//components
import QuantityButton from "../components/QuantityButton";
import Comment from "../components/Comment";

import { toPersianNumber } from "../helper/toPersianNumber";
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const ProductDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);

  const dispatch: AppDispatch = useDispatch();

  const isLoading = useSelector((state: RootState) => state.products.isLoading);
  const error = useSelector((state: RootState) => state.products.error);

  const product = useSelector((state: RootState) =>
    state.products.products.find((item) => item.id === productId)
  );

  const cartItem = useSelector((state: RootState) =>
    state.cartItems.cartItems.find((item) => item.id === productId)
  );

  const productsExist = useSelector(
    (state: RootState) => state.products.products.length > 0
  );

  const quantity = cartItem?.quantity || 0;

  useEffect(() => {
    if (!productsExist && !isLoading) {
      dispatch(fetchProducts());
    }
  }, [dispatch, productsExist, isLoading]);

  const handleAddToCart = () => {
    if (!product) return;
    const itemToAdd: CartItem = {
      id: product.id,
      name: product.title,
      price: product.price,
      image: product.images[0],
      quantity: 1,
    };
    dispatch(addItemToCart(itemToAdd));
  };

  if (isLoading && !productsExist) {
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
      <Typography color="error" textAlign="center" sx={{ mt: 5 }}>
        خطا در دریافت اطلاعات محصول.
      </Typography>
    );
  }

  if (!product) {
    return (
      <Typography textAlign="center" sx={{ mt: 5 }}>
        محصولی با این شناسه یافت نشد.
      </Typography>
    );
  }

  return (
    <Box sx={{ p: { mobile: 4, tablet: 0 } }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { mobile: "column-reverse", tablet: "row" },
            alignItems: "start",
            justifyContent: "center",
          }}
        >
          <Box>
            <Stack
              spacing={{ mobile: 1, tablet: 1, laptop: 3 }}
              p={{ mobile: 1, tablet: 2, laptop: 4, desktop: 6 }}
              sx={{ color: (theme) => theme.palette.secondary.main }}
            >
              <motion.div variants={itemVariants}>
                <Typography
                  variant="h4"
                  component="h1"
                  fontWeight={700}
                  color="text.primary"
                >
                  {product.title}
                </Typography>
              </motion.div>
              <motion.div
                variants={itemVariants}
                style={{ display: "flex", alignItems: "center", gap: 10 }}
              >
                <p>دسته بندی:</p>
                <Link
                  to="/products"
                  style={{
                    textDecoration: "none",
                    width: "fit-content",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    color: "inherit",
                    border: "solid 1px silver",
                    borderRadius: "16px",
                    padding: "3px 6px",
                  }}
                >
                  {product.category}
                </Link>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Rating
                    name="read-only"
                    value={product.rating}
                    readOnly
                    precision={0.1}
                  />
                  <Typography variant="body2" color="text.secondary">
                    ({product.rating})
                  </Typography>
                </Stack>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ lineHeight: 1.8 }}
                >
                  {product.description}
                </Typography>
              </motion.div>
              <Divider />
              <motion.div variants={itemVariants}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography
                    variant="h4"
                    color="primary.main"
                    fontWeight={700}
                    sx={{ fontSize: ["15px", "20px", "25px", "30px"] }}
                  >
                    ${toPersianNumber(product.price)}
                  </Typography>
                  {quantity === 0 ? (
                    <Button onClick={handleAddToCart}>
                      افزودن به سبد خرید
                    </Button>
                  ) : (
                    <QuantityButton product={product} quantity={quantity} />
                  )}
                </Stack>
              </motion.div>
            </Stack>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <motion.div variants={itemVariants}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  component="img"
                  src={product.images[0]}
                  alt="Product"
                  sx={{
                    width: ["70%", "90%", "90%", "70%"],
                    aspectRatio: "1 / 1",
                    objectFit: "contain",
                    borderRadius: 2,
                  }}
                />
              </Box>
            </motion.div>
          </Box>
        </Box>

        <Box sx={{ my: { mobile: 3, tablet: 4, laptop: 1 } }}>
          <Typography
            variant="h5"
            fontWeight={600}
            color="text.primary"
            gutterBottom
          >
            نظرات کاربران
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Box sx={{ display: "flex", gap: 2, overflowX: "auto", pb: 2 }}>
            {product.reviews && product.reviews.length > 0 ? (
              product.reviews.map((comment) => (
                <Comment key={uuidv4()} {...comment} />
              ))
            ) : (
              <Typography color="text.secondary">
                هنوز نظری برای این محصول ثبت نشده است.
              </Typography>
            )}
          </Box>
        </Box>
      </motion.div>
    </Box>
  );
};

export default ProductDetails;
