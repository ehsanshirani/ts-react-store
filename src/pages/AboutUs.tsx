import { Link } from "react-router-dom";

//types
import { type FC } from "react";

//mui
import {
  Avatar,
  Box,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
  Button,
} from "@mui/material";
import { Storefront, TrackChanges, People } from "@mui/icons-material";

//animations
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

const AboutUs: FC = () => {
  const teamMembers = [
    {
      name: "احسان شیرانی",
      role: "توسعه‌دهنده فرانت‌اند",
      avatar: "https://placehold.co/160x160/7F56D9/FFFFFF?text=ES",
      id: 1,
    },
    {
      name: "عضو تیم",
      role: "طراح UI/UX",
      avatar: "https://placehold.co/160x160/344054/FFFFFF?text=UI",
      id: 2,
    },
    {
      name: "عضو تیم",
      role: "مدیر محصول",
      avatar: "https://placehold.co/160x160/F79009/FFFFFF?text=PM",
      id: 3,
    },
  ];

  return (
    <Box sx={{ bgcolor: "background.default", overflow: "hidden" }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Box
          sx={{
            py: { mobile: 8, tablet: 12 },
            textAlign: "center",
            bgcolor: "primary.main",
            color: "primary.contrastText",
          }}
        >
          <Container>
            <Typography
              variant="h2"
              component="h1"
              fontWeight={700}
              gutterBottom
            >
              داستان ما
            </Typography>
            <Typography
              variant="h6"
              sx={{ maxWidth: "700px", margin: "auto", opacity: 0.9 }}
            >
              ما باور داریم که خرید آنلاین باید ساده، لذت‌بخش و قابل اعتماد
              باشد.
            </Typography>
          </Container>
        </Box>

        <Container sx={{ py: { mobile: 6, tablet: 8 } }}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <Grid container spacing={6} alignItems="center">
              <Grid
                sx={{
                  gridColumn: {
                    mobile: "span 12",
                    desktop: "span 6",
                  },
                }}
              >
                <motion.div variants={itemVariants}>
                  <Stack spacing={2}>
                    <TrackChanges color="primary" sx={{ fontSize: 48 }} />
                    <Typography
                      variant="h4"
                      component="h2"
                      fontWeight={600}
                      color="text.primary"
                    >
                      ماموریت ما
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ lineHeight: 1.8 }}
                    >
                      ماموریت ما ارائه بهترین محصولات با بالاترین کیفیت و
                      پشتیبانی بی‌نظیر به مشتریان است. ما تلاش می‌کنیم تا با
                      استفاده از تکنولوژی، پلی میان شما و جدیدترین‌های دنیای
                      دیجیتال باشیم و تجربه‌ای فراتر از یک خرید ساده را برایتان
                      رقم بزنیم.
                    </Typography>
                  </Stack>
                </motion.div>
              </Grid>

              <Grid
                sx={{
                  gridColumn: {
                    mobile: "span 12",
                    desktop: "span 6",
                  },
                }}
              >
                <motion.div variants={itemVariants}>
                  <Stack spacing={2}>
                    <Storefront color="primary" sx={{ fontSize: 48 }} />
                    <Typography
                      variant="h4"
                      component="h2"
                      fontWeight={600}
                      color="text.primary"
                    >
                      فروشگاه ما
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ lineHeight: 1.8 }}
                    >
                      فروشگاه ما در سال ۱۴۰۳ با هدف ایجاد یک پلتفرم جامع برای
                      دسترسی آسان به محصولات دیجیتال تاسیس شد. از روز اول، تمرکز
                      ما بر سه اصل کلیدی بوده است: کیفیت، اعتماد و نوآوری.
                    </Typography>
                  </Stack>
                </motion.div>
              </Grid>
            </Grid>

            <motion.div variants={itemVariants}>
              <Box sx={{ mt: { mobile: 8, tablet: 10 }, textAlign: "center" }}>
                <People color="primary" sx={{ fontSize: 48, mb: 2 }} />
                <Typography
                  variant="h4"
                  component="h2"
                  fontWeight={600}
                  color="text.primary"
                  gutterBottom
                >
                  آشنایی با تیم ما
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ maxWidth: "600px", margin: "auto", mb: 4 }}
                >
                  موفقیت ما نتیجه تلاش تیمی از افراد متخصص و علاقه‌مند است که هر
                  روز برای بهتر شدن تلاش می‌کنند.
                </Typography>
                <Grid container spacing={4} justifyContent="center">
                  {teamMembers.map((member) => (
                    <Grid
                      key={member.id}
                      sx={{
                        gridColumn: {
                          mobile: "span 12",
                          desktop: "span 6",
                        },
                      }}
                    >
                      <Paper
                        sx={{
                          p: 3,
                          borderRadius: 2,
                          bgcolor: "background.paper",
                        }}
                      >
                        <Avatar
                          src={member.avatar}
                          alt={member.name}
                          sx={{ width: 80, height: 80, margin: "auto", mb: 2 }}
                        />
                        <Typography variant="h6" fontWeight={600}>
                          {member.name}
                        </Typography>
                        <Typography color="primary.main">
                          {member.role}
                        </Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Box sx={{ mt: { mobile: 8, tablet: 10 }, textAlign: "center" }}>
                <Divider sx={{ mb: 4 }} />
                <Typography variant="h5" fontWeight={600} gutterBottom>
                  آماده شروع خرید هستید؟
                </Typography>
                <Button
                  component={Link}
                  to="/products"
                  variant="contained"
                  size="large"
                >
                  مشاهده همه محصولات
                </Button>
              </Box>
            </motion.div>
          </motion.div>
        </Container>
      </motion.div>
    </Box>
  );
};

export default AboutUs;
