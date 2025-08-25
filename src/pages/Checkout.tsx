import { Link } from "react-router-dom";

//redux
import { useSelector, useDispatch } from "react-redux";
import {
  addItemToCart,
  removeItemFromCart,
  deleteFromCart,
  type CartItem,
} from "../store/cartSlice";
import type { RootState, AppDispatch } from "../store/store";

//types
import { type FC } from "react";

//mui
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";

//animations
import { motion } from "framer-motion";

// قدم ۱: ایمپورت کردن تایپ‌ها و اکشن‌های لازم

//hepler
import { shortenTiTle } from "../helper/shortenText";
import { toPersianNumber } from "../helper/toPersianNumber";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

interface CheckoutItemProps {
  product: CartItem;
}

const CheckoutItem: FC<CheckoutItemProps> = ({ product }) => {
  const dispatch: AppDispatch = useDispatch();

  const handleAddToCart = () => dispatch(addItemToCart(product));
  const handleRemoveItem = () =>
    dispatch(removeItemFromCart({ id: product.id }));
  const handleDeleteItem = () => dispatch(deleteFromCart({ id: product.id }));

  return (
    <motion.div variants={itemVariants}>
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        sx={{ py: 2, borderBottom: "1px solid", borderColor: "divider" }}
      >
        <Box
          component="img"
          src={product.image}
          alt={product.name}
          sx={{
            width: 100,
            height: 100,
            borderRadius: 2,
            objectFit: "contain",
          }}
        />
        <Stack spacing={0.5} sx={{ flexGrow: 1 }}>
          <Typography variant="h6" fontWeight={600} color="text.primary">
            {shortenTiTle(product.name)} 
          </Typography>
          <Typography variant="body1" color="text.secondary">
            ${toPersianNumber(product.price)}
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1}>
          <IconButton size="small" color="primary" onClick={handleAddToCart}>
            <Add />
          </IconButton>
          <Typography variant="body1" color="primary" fontWeight={600}>
            {toPersianNumber(product.quantity)}
          </Typography>
          <IconButton
            size="small"
            color={product.quantity === 1 ? "error" : "primary"}
            onClick={
              product.quantity === 1 ? handleDeleteItem : handleRemoveItem
            }
          >
            {product.quantity === 1 ? <Delete /> : <Remove />}
          </IconButton>
        </Stack>
      </Stack>
    </motion.div>
  );
};

const Checkout: FC = () => {
  const { cartItems, totalPrice, counter } = useSelector(
    (store: RootState) => store.cartItems
  );
  const isEmpty = !cartItems || cartItems.length === 0;

  if (isEmpty) {
    return (
      <Container sx={{ py: 5, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          سبد خرید شما خالی است
        </Typography>
        <Button component={Link} to="/products" variant="contained">
          بازگشت به فروشگاه
        </Button>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        py: { mobile: 3, tablet: 5 },
        px: { mobile: 2, tablet: 4, laptop: 6 },
      }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Grid container spacing={{ mobile: 4, desktop: 6 }}>
          <Grid
            sx={{
              gridColumn: {
                mobile: "span 12",
                desktop: "span 7",
              },
            }}
          >
            <motion.div variants={itemVariants}>
              <Typography variant="h4" component="h1" gutterBottom>
                سبد خرید
              </Typography>
              <Divider />
              {cartItems.map((item) => (
                <CheckoutItem key={item.id} product={item} />
              ))}
            </motion.div>
            <motion.div variants={itemVariants}>
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                  یادداشت سفارش (اختیاری)
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  placeholder="اگر نکته‌ای در مورد سفارش خود دارید، اینجا بنویسید..."
                />
              </Box>
            </motion.div>
          </Grid>

          <Grid
            sx={{
              gridColumn: {
                mobile: "span 12",
                desktop: "span 7",
              },
            }}
          >
            <motion.div variants={itemVariants}>
              <Paper
                sx={{ p: 3, borderRadius: 2, position: "sticky", top: 80 }}
              >
                <Stack spacing={2}>
                  <Typography variant="h5" component="h2" gutterBottom>
                    خلاصه سفارش
                  </Typography>
                  <Divider />
                  <Stack direction="row" justifyContent="space-between">
                    <Typography color="text.secondary">
                      تعداد محصولات ({toPersianNumber(counter)} عدد)
                    </Typography>
                    <Typography fontWeight={600}>
                      ${toPersianNumber(totalPrice, 2)}
                    </Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography color="text.secondary">هزینه ارسال</Typography>
                    <Typography fontWeight={600}>رایگان</Typography>
                  </Stack>
                  <Divider />
                  <Stack direction="row" spacing={1.5}>
                    <TextField size="small" placeholder="کد تخفیف" fullWidth />
                    <Button variant="outlined">اعمال</Button>
                  </Stack>
                  <Divider />
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="h6">مبلغ قابل پرداخت:</Typography>
                    <Typography
                      variant="h6"
                      color="primary.main"
                      fontWeight={700}
                    >
                      ${toPersianNumber(totalPrice, 2)}
                    </Typography>
                  </Stack>
                  <Button variant="contained" size="large" fullWidth>
                    ادامه فرآیند پرداخت
                  </Button>
                </Stack>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </motion.div>
    </Box>
  );
};

export default Checkout;
