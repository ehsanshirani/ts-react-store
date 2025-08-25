import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
 

export interface ReviewType {
  reviewerName: string;
  reviewerEmail: string;
  rating: number;
  comment: string;
  date: string;
}

export interface ProductType {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: {
    id: number;
    name: string;
    image: string;
  };
  rating: number;
  reviews?: ReviewType[];
}

interface ProductsState {
  products: ProductType[];
  isLoading: boolean;
  error: string | null;
  searchTerm: string; // <<-- قدم ۱: اضافه کردن state برای عبارت جستجو
}

const initialState: ProductsState = {
  products: [],
  isLoading: false,
  error: null,
  searchTerm: "", // <<-- مقدار اولیه برای عبارت جستجو
};

export const fetchProducts = createAsyncThunk<
  ProductType[],
  void,
  { rejectValue: string }
>("products/fetchProducts", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch("https://dummyjson.com/products");
    console.log(response);

    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }

    const res = await response.json();
    console.log(res);
    const products = res.products;
    console.log(products);
    if (!Array.isArray(products)) {
      throw new Error("API did not return an array as expected.");
    }

    return products as ProductType[];
  } catch (error: unknown) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("An unknown error occurred while fetching products");
  }
});

const productsSlice = createSlice({
  name: "products",
  initialState,
  // قدم ۲: اضافه کردن reducer برای به‌روزرسانی عبارت جستجو
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<ProductType[]>) => {
          state.isLoading = false;
          state.products = action.payload;
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "An unknown error occurred";
      });
  },
});

// قدم ۳: اکسپورت کردن اکشن جدید
export const { setSearchTerm } = productsSlice.actions;
export default productsSlice.reducer;
