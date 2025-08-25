import { Link } from "react-router-dom";

//redux
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, type CartItem } from "../../store/cartSlice";

//types
import type { ProductType } from "../../store/productsSlice";
import type { RootState, AppDispatch } from "../../store/store";
import { type FC } from "react";

//helper
import { shortenTiTle } from "../../helper/shortenText";
import { toPersianNumber } from "../../helper/toPersianNumber";

//mui
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  Typography,
  Box,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

//components

import QuantityButton from "../QuantityButton";

interface ProductProps {
  product: ProductType;
}

const Product: FC<ProductProps> = ({ product }) => {
  const theme = useTheme();
  const dispatch: AppDispatch = useDispatch();
  const quantity =
    useSelector((state: RootState) =>
      state.cartItems.cartItems.find((item) => item.id === product?.id)
    )?.quantity || 0;

  if (!product) {
    return null;
  }

  const { id, title, price, images } = product;

  const imageUrl =
    Array.isArray(images) && images.length > 0
      ? images[0]
      : "https://placehold.co/600x400?text=No+Image";

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

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.paper",
        borderRadius: 2,
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        boxShadow: theme.shadows[1],
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: theme.shadows[4],
        },
      }}
    >
      <CardMedia
        component="img"
        image={imageUrl}
        alt={title}
        sx={{
          aspectRatio: "5 /3",
          objectFit: "contain",
          pb: 2,
        }}
      />
      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          p: 2,
          pt: 0,
        }}
      >
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{
            color: "text.primary",
            fontWeight: 600,
            minHeight: "64px",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            overflow: "hidden",
          }}
        >
          {shortenTiTle(title)}
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            variant="h4"
            color="primary.main"
            fontWeight={700}
            sx={{
              color: "primary.main",
              fontWeight: "bold",
              fontSize: ["15px", "18px", "20px", "25px"],
            }}
          >
            ${toPersianNumber(price)}
          </Typography>
          <Button component={Link} to={`/products/${id}`} size="small">
            جزئیات
          </Button>
        </Stack>
      </CardContent>

      <CardActions sx={{ justifyContent: "center", p: 2, pt: 0 }}>
        {quantity === 0 ? (
          <Button
            variant="contained"
            fullWidth
            onClick={handleAddToCart}
            sx={{ height: "40px" }}
          >
            افزودن به سبد خرید
          </Button>
        ) : (
          <QuantityButton
            width={"100%"}
            product={product}
            quantity={quantity}
          />
        )}
      </CardActions>
    </Card>
  );
};

export default Product;
