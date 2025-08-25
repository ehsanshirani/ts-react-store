import { type FC } from "react";
import {
  Box,
  Container,
  Divider,
  Stack,
  Typography,
  Link as MuiLink,
  IconButton,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { GitHub, LinkedIn } from "@mui/icons-material";

const socialLinks = [
  { icon: <GitHub />, url: "https://github.com/ehsanshirani" },
  { icon: <LinkedIn />, url: "https://linkedin.com/in/ehsanshirani" },
];

const Footer: FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "background.paper",
        color: "text.secondary",
        mt: "auto",
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Container sx={{ py: { mobile: 4, tablet: 6 } }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { mobile: "column", laptop: "row" },
            gap: { mobile: 4, laptop: 2 },
            justifyContent: "space-between",
            alignItems: { mobile: "center", laptop: "flex-start" },
            textAlign: { mobile: "center", laptop: "left" },
          }}
        >
          <Stack
            spacing={1}
            sx={{ flex: { laptop: 2 }, maxWidth: { laptop: 400 } }}
          >
            <Typography variant="h6" color="text.primary" gutterBottom>
              فروشگاه ما
            </Typography>
            <Typography variant="body2">
              ما باور داریم که خرید آنلاین باید ساده، لذت‌بخش و قابل اعتماد
              باشد. فروشگاه ما با هدف ارائه بالاترین کیفیت تاسیس شده است.
            </Typography>
          </Stack>

          <Stack spacing={1} sx={{ flex: 1 }}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              لینک‌ها
            </Typography>
            <MuiLink
              component={RouterLink}
              to="/about-us"
              color="inherit"
              underline="hover"
            >
              درباره ما
            </MuiLink>
            <MuiLink
              component={RouterLink}
              to="/products"
              color="inherit"
              underline="hover"
            >
              محصولات
            </MuiLink>
            <MuiLink
              component={RouterLink}
              to="/faq"
              color="inherit"
              underline="hover"
            >
              سوالات متداول
            </MuiLink>
          </Stack>

          <Stack spacing={1} sx={{ flex: 1 }}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              تماس با ما
            </Typography>
            <Typography variant="body2">
              ایمیل: tir.webdeveloper@gmail.com
            </Typography>
            <Typography variant="body2">تلفن: 09926440634</Typography>
          </Stack>

          <Stack spacing={1} sx={{ flex: 1 }}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              شبکه های اجتماعی
            </Typography>
            <Stack
              direction="row"
              spacing={1}
              justifyContent={{ mobile: "center", laptop: "flex-start" }}
            >
              {socialLinks.map((link, index) => (
                <IconButton
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  color="inherit"
                  aria-label={`social media ${index}`}
                >
                  {link.icon}
                </IconButton>
              ))}
            </Stack>
          </Stack>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Typography variant="body2" align="center">
          made with ❤️️ by ehsan shirani
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
