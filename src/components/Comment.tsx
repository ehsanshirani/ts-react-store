//types
import type { ReviewType } from "../store/productsSlice";
import { type FC } from "react";

//mui
import { Box, Typography, Rating, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

const CommentWrapper = styled(Paper)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  backgroundColor: theme.palette.background.paper,
  margin: theme.spacing(1),
  flex: "1 1 300px",
  minWidth: "300px",
}));

const CommentHeader = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 12,
});

const CommentText = styled(Typography)({
  lineHeight: 1.6,
});

const ProductComment: FC<ReviewType> = ({
  comment,
  date,
  rating,
  reviewerName,
}) => {
  return (
    <CommentWrapper>
      <CommentHeader>
        <Box>
          <Typography fontWeight={600}>نام کاربر: {reviewerName}</Typography>
          <Typography fontSize={12} color="text.secondary">
            تاریخ: {date}
          </Typography>
        </Box>
      </CommentHeader>
      <CommentText variant="body2">{comment}</CommentText>
      <Rating name="read-only" value={rating} readOnly precision={0.5} />
    </CommentWrapper>
  );
};

export default ProductComment;
