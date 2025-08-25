import { Link } from "react-router-dom";
//redux
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCart,
  removeItemFromCart,
  clearCart,
  deleteFromCart,
} from "../../../store/cartSlice";

//types
import type { FC } from "react";
import type { RootState } from "../../../store/store";
import { type CartItem } from "../../../store/cartSlice";

//mui
import {
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
  Divider,
} from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";

//components
import BasicModal from "../Modal";

//hepler
import { shortenTiTle } from "../../../helper/shortenText";
import { toPersianNumber } from "../../../helper/toPersianNumber";

interface CartProductItemProps {
  product: CartItem;
}

const CartProductItem: FC<CartProductItemProps> = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => dispatch(addItemToCart(product));
  const handleRemoveItem = () => dispatch(removeItemFromCart(product));
  const handleDeleteItem = () => dispatch(deleteFromCart(product));

  return (
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
        sx={{ width: 80, height: 80, borderRadius: 1, objectFit: "contain" }}
      />
      <Stack spacing={0.5} sx={{ flexGrow: 1 }}>
        <Typography variant="body1" fontWeight={600} color="text.primary">
          {shortenTiTle(product.name)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ${toPersianNumber(product.price)}
        </Typography>
      </Stack>
      <Stack direction="row" alignItems="center" spacing={1}>
        <IconButton size="small" color="primary" onClick={handleAddToCart}>
          <Add />
        </IconButton>
        <Typography variant="body1" color="secondary" fontWeight={600}>
          {toPersianNumber(product.quantity)}
        </Typography>
        <IconButton
          size="small"
          color={product.quantity === 1 ? "error" : "primary"}
          onClick={product.quantity === 1 ? handleDeleteItem : handleRemoveItem}
        >
          {product.quantity === 1 ? <Delete /> : <Remove />}
        </IconButton>
      </Stack>
    </Stack>
  );
};

interface CartModalProps {
  open: boolean;
  handleClose: () => void;
}

const CartModal: FC<CartModalProps> = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const { cartItems, totalPrice } = useSelector(
    (store: RootState) => store.cartItems
  );
  const isEmpty = !cartItems || cartItems.length === 0;

  return (
    <BasicModal open={open} handleClose={handleClose} titleModal="سبد خرید">
      <Box sx={{ maxHeight: "60vh", overflowY: "auto", pr: 1 }}>
        {isEmpty ? (
          <Typography sx={{ textAlign: "center", my: 4 }}>
            سبد خرید شما خالی است.
          </Typography>
        ) : (
          cartItems.map((item) => (
            <CartProductItem key={item.id} product={item} />
          ))
        )}
      </Box>
      {!isEmpty && (
        <Box sx={{ pt: 2 }}>
          <Divider />
          <Stack spacing={2} sx={{ mt: 2 }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                variant="h6"
                color="text.primary"
                sx={{
                  fontSize: ["15px", "20px", "25px", "30px"],
                }}
              >
                مجموع:
              </Typography>
              <Typography
                variant="h4"
                color="primary.main"
                sx={{
                  color: "primary.main",
                  fontWeight: "bold",
                  fontSize: ["15px", "20px", "25px", "30px"],
                }}
                fontWeight={700}
              >
                ${toPersianNumber(totalPrice, 2)}
              </Typography>
            </Stack>
            <Stack direction={{ mobile: "column", tablet: "row" }} spacing={2}>
              <Button
                variant="contained"
                fullWidth
                component={Link}
                to="/checkout"
                onClick={handleClose}
              >
                ادامه و پرداخت
              </Button>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => dispatch(clearCart())}
              >
                پاک کردن سبد
              </Button>
            </Stack>
          </Stack>
        </Box>
      )}
    </BasicModal>
  );
};

export default CartModal;
