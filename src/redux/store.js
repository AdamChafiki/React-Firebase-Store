import { configureStore } from "@reduxjs/toolkit";
import sliderSlice from "./slider/sliderSlice";
import fetchSlide from "./fetchData/fetchSlide";
import cartSlice from "./Cart/cartSlice";

export default configureStore({
  reducer: {
    slider: sliderSlice,
    fetchData: fetchSlide,
    cart: cartSlice,
  },
});
