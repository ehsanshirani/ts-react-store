//redux
import { useDispatch } from "react-redux";
import {
  addItemToCart,
  removeItemFromCart,
  deleteFromCart,
  type CartItem,
} from "../store/cartSlice";
//types
import { type FC } from "react";
import { type StackProps } from "@mui/material";
import type { ProductType } from "../store/productsSlice";
import type { AppDispatch } from "../store/store";

//mui
import { Stack, IconButton, Typography } from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";

//animations
import { motion } from "framer-motion";

//helper
import { toPersianNumber } from "../helper/toPersianNumber";

interface QuantityButtonProps extends StackProps {
  product: ProductType;
  quantity: number;
}
const QuantityButton: FC<QuantityButtonProps> = ({
  product,
  quantity,
  ...props
}) => {
  const dispatch: AppDispatch = useDispatch();

  const handleAddToCart = () => {
    const itemToAdd: CartItem = {
      id: product.id,
      name: product.title,
      price: product.price,
      image: product.images[0],
      quantity: 1,
    };
    dispatch(addItemToCart(itemToAdd));
  };

  const handleRemoveItem = () => {
    dispatch(removeItemFromCart({ id: product.id }));
  };

  const handleDeleteItem = () => {
    dispatch(deleteFromCart({ id: product.id }));
  };

  return (
    <Stack
      className="stack ...props"
      {...props}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      // width="100%"
      sx={{
        bgcolor: "action.selected",
        borderRadius: 1,
        p: 0.5,
      }}
    >
      <IconButton color="primary" onClick={handleAddToCart}>
        <Add />
      </IconButton>

      <motion.div
        key={quantity}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <Typography
          variant="h6"
          sx={{ color: "text.primary", minWidth: "20px", textAlign: "center" }}
        >
          {toPersianNumber(quantity)}
        </Typography>
      </motion.div>

      <IconButton
        color={quantity === 1 ? "error" : "primary"}
        onClick={quantity === 1 ? handleDeleteItem : handleRemoveItem}
      >
        {quantity === 1 ? <Delete /> : <Remove />}
      </IconButton>
    </Stack>
  );
};

export default QuantityButton;
