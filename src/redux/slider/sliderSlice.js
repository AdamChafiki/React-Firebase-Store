import { createSlice } from "@reduxjs/toolkit";

export const sliderSlice = createSlice({
  name: "slider",
  initialState: {
    img: [
      "https://m.media-amazon.com/images/G/32/br-events/2023/Consumer_Week/Associates/0288_CW23_associates_cross_2148X588.jpg",
      "https://m.media-amazon.com/images/G/32/em/pd22/Onsite/associates/0073_PD22_LU_Associates_01_2148x588.jpg",
    ],
    value: 0,
  },
  reducers: {
    increment: (state) => {
      if (state.value === 1) {
        state.value = 0;
      } else {
        state.value += 1;
      }
    },
    decrement: (state) => {
      if (state.value === 0) {
        state.value = 1;
      } else {
        state.value -= 1;
      }
    },
  },
});

export const { increment, decrement } = sliderSlice.actions;

export default sliderSlice.reducer;
