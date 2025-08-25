import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

// reduc config
import { Provider } from "react-redux";
import store from "./store/store";

//theme and layout
import Layout from "./layout/Layout";
import ThemeProvider from "./theme/ThemeProvider";

import ScrollToTop from "./components/ScrollToTop";

//loading gif
import { CircularProgress } from "@mui/material";

//pages of lazy for permormance
const Home = lazy(() => import("./pages/Home"));
const Products = lazy(() => import("./pages/Products"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const Checkout = lazy(() => import("./pages/Checkout"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Faq = lazy(() => import("./pages/Faq"));

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <ScrollToTop />
        <Suspense fallback={<CircularProgress />}>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/faq" element={<Faq />} />
            </Route>
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
