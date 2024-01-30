import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  data: [],
};
const favoriteListSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    getFavoriteList: (state, action) => {
      var fav = action.payload.filter((e) => e.is_favorite);

      return { ...state, data: fav };
    },
    addFavoriteList: (state, action) => {
      state.data.map((e) => {
        if (action.payload.id === e.id) {
          e.is_favorite = true;
          return;
        }
      });
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    },
    removeFavoriteList: (state, action) => {
      var fav = state.data.filter((e) => e.id !== action.payload.id);
      return { ...state, data: fav };
    },
  },
});
export const { getFavoriteList, addFavoriteList, removeFavoriteList } =
  favoriteListSlice.actions;
export default favoriteListSlice.reducer;
