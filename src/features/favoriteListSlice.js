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
      fav = fav.filter(
        (item) =>
          !state.data.some((existingItem) => existingItem.id === item.id)
      );

      console.log(state.data, fav);
      return { ...state, data: [...state.data, ...fav] };
    },
  },
});
export const { getFavoriteList } = favoriteListSlice.actions;
export default favoriteListSlice.reducer;
