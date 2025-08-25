//types
import type { FC, ReactNode } from "react";
import { type ModalProps } from "@mui/material";

//mui
import { Close } from "@mui/icons-material";
import {
  Modal,
  Box,
  Typography,
  Divider,
  IconButton,
  Stack,
} from "@mui/material";

interface BasicModalProps
  extends Omit<ModalProps, "open" | "onClose" | "children"> {
  open: boolean;
  handleClose: () => void;
  titleModal: string;
  children: ReactNode;
}

const BasicModal: FC<BasicModalProps> = ({
  open,
  handleClose,
  titleModal,
  children,
  ...props
}) => {
  return (
    <Modal
      {...props}
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { mobile: "90%", tablet: "70%", laptop: "50%" },
          maxWidth: "600px",
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          outline: "none",
          p: { mobile: 2, tablet: 3 },
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 2 }}
        >
          <Typography
            variant="h6"
            component="h2"
            id="modal-title"
            color="text.primary"
          >
            {titleModal}
          </Typography>
          <IconButton onClick={handleClose} aria-label="close modal">
            <Close />
          </IconButton>
        </Stack>
        <Divider />
        <Box id="modal-description" sx={{ mt: 2 }}>
          {children}
        </Box>
      </Box>
    </Modal>
  );
};

export default BasicModal;
