import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type ThemeMode = "light" | "dark";

const getInitialTheme = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    const storedTheme = localStorage.getItem("themeMode");
    if (storedTheme === "light" || storedTheme === "dark") {
      return storedTheme;
    }
  }
  return "light";
};

interface ThemeState {
  theme: ThemeMode;
}

const initialState: ThemeState = {
  theme: getInitialTheme(),
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme: (state, action: PayloadAction<ThemeMode | undefined>) => {
      const newTheme = action.payload
        ? action.payload
        : state.theme === "light"
        ? "dark"
        : "light";

      state.theme = newTheme;
      localStorage.setItem("themeMode", newTheme);
    },
  },
});

export const { changeTheme } = themeSlice.actions;
export default themeSlice.reducer;
