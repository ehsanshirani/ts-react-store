import { forwardRef, useState, type ReactElement, type Ref } from "react";
import { NavLink } from "react-router-dom";

//redux
import { useDispatch, useSelector } from "react-redux";
import { changeTheme } from "../../store/themeSlice";

//types
import type { RootState, AppDispatch } from "../../store/store";
import type { TransitionProps } from "@mui/material/transitions";

//mui
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Badge,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  Stack,
  Dialog,
  Slide,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  DarkMode,
  LightMode,
  ShoppingCart,
  Menu as MenuIcon,
  Home,
  Storefront,
  Receipt,
  Close as CloseIcon,
  Info,
} from "@mui/icons-material";

//components
import CartModal from "../../shared/Modal/cartModal/CartModal";
import NavLinkCustom from "../../components/NavLinkCustom";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<unknown>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="left" ref={ref} {...props} />;
});

function Header() {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("tablet"));

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: theme.palette.background.paper,
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      }}
    >
      <Toolbar
        sx={{
          px: !isTablet ? 3 : 1,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {isTablet ? <MobileNav /> : <DesktopNav />}
      </Toolbar>
    </AppBar>
  );
}

const DesktopNav = () => {
  const { counter } = useSelector((store: RootState) => store.cartItems);
  const { theme } = useSelector((store: RootState) => store.theme);
  const dispatch: AppDispatch = useDispatch();
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", height: "64px" }}>
        <NavLinkCustom to={"/"}>خانه</NavLinkCustom>
        <NavLinkCustom to={"/products"}>محصولات</NavLinkCustom>
        <NavLinkCustom to={"/checkout"}>پرداخت</NavLinkCustom>
        <NavLinkCustom to={"/about-us"}>درباره ما</NavLinkCustom>
      </Box>

      <Stack
        direction="row"
        spacing={1}
        sx={{ justifyContent: "flex-end", alignItems: "center" }}
      >
        <IconButton
          sx={{ color: "text.primary" }}
          onClick={() => setCartOpen(true)}
        >
          <Badge badgeContent={counter} color="primary">
            <ShoppingCart />
          </Badge>
        </IconButton>

        <IconButton
          sx={{ color: "text.primary" }}
          onClick={() => dispatch(changeTheme())}
        >
          {theme === "light" ? <DarkMode /> : <LightMode />}
        </IconButton>
      </Stack>

      <CartModal open={cartOpen} handleClose={() => setCartOpen(false)} />
    </>
  );
};

const MobileNav = () => {
  const { counter } = useSelector((store: RootState) => store.cartItems);
  const { theme } = useSelector((store: RootState) => store.theme);
  const dispatch: AppDispatch = useDispatch();
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { text: "خانه", to: "/", icon: <Home /> },
    { text: "محصولات", to: "/products", icon: <Storefront /> },
    { text: "پرداخت", to: "/checkout", icon: <Receipt /> },
    { text: "درباره ما", to: "/about-us", icon: <Info /> },
  ];
  const handleMenuClose = () => setMenuOpen(false);

  return (
    <>
      <IconButton
        onClick={() => setMenuOpen(true)}
        sx={{ color: "text.primary" }}
      >
        <MenuIcon />
      </IconButton>

      <Stack direction="row" alignItems={"center"}>
        <IconButton
          sx={{ color: "text.primary" }}
          onClick={() => setCartOpen(true)}
        >
          <Badge badgeContent={counter} color="primary">
            <ShoppingCart />
          </Badge>
        </IconButton>
        <IconButton
          sx={{ color: "text.primary" }}
          onClick={() => dispatch(changeTheme())}
        >
          {theme === "light" ? <DarkMode /> : <LightMode />}
        </IconButton>
      </Stack>

      <Dialog
        fullScreen
        open={menuOpen}
        onClose={handleMenuClose}
        TransitionComponent={Transition}
      >
        <AppBar
          sx={{
            position: "relative",
            bgcolor: "background.paper",
            boxShadow: "none",
          }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              sx={{ color: "text.primary" }}
              onClick={handleMenuClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <List>
          {navLinks.map((link) => (
            <ListItem key={link.text} disablePadding>
              <ListItemButton
                component={NavLink}
                to={link.to}
                onClick={handleMenuClose}
                sx={{
                  "&.active": {
                    backgroundColor: "action.selected",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "text.primary" }}>
                  {link.icon}
                </ListItemIcon>
                <ListItemText
                  primary={link.text}
                  sx={{ color: "text.primary" }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Dialog>
      <CartModal open={cartOpen} handleClose={() => setCartOpen(false)} />
    </>
  );
};

export default Header;
