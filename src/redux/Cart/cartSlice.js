import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";

const loadCartFromLocalStorage = () => {
  const cartData = localStorage.getItem("cart");
  return cartData ? JSON.parse(cartData) : [];
};

const loadNumCartFromLocalStorage = () => {
  const numCartData = localStorage.getItem("n_cart");
  return numCartData ? JSON.parse(numCartData) : 0;
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: loadCartFromLocalStorage(),
    numCart: loadNumCartFromLocalStorage(),
  },
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;

      // Check if the item is already in the cart
      const isDuplicate = state.items.some((item) => item.id === newItem.id);

      if (isDuplicate) {
        toast.error("Item is already in the cart");
      } else {
        toast.success("Item added to cart");
        state.items.push(newItem);
        state.numCart = state.numCart + 1;
        localStorage.setItem("cart", JSON.stringify(state.items));
        localStorage.setItem("n_cart", JSON.stringify(state.numCart));
      }
    },
    removeFromCart: (state, action) => {
      toast("Item removed from cart", { type: "success" });
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.numCart = state.numCart - 1;
      localStorage.setItem("cart", JSON.stringify(state.items));
      localStorage.setItem("n_cart", JSON.stringify(state.numCart));
    },
    addQuantite: (state, action) => {
      const itemId = action.payload.id;
      const currentQ = action.payload.currentQ;

      // Find the item to update in the cart
      const itemToUpdate = state.items.find((item) => item.id === itemId);

      if (itemToUpdate) {
        // Increment the quantity
        itemToUpdate.quantite = currentQ + 1;

        // Update local storage with the modified cart items
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },
    decrementQuantite: (state, action) => {
      const itemId = action.payload.id;
      const currentQ = action.payload.currentQ;

      console.log(itemId,currentQ);

      // Find the item to update in the cart
      const itemToUpdate = state.items.find((item) => item.id === itemId);

      if (itemToUpdate) {
        if (currentQ > 1) {
          // Decrement the quantity if it's greater than 1
          itemToUpdate.quantite = currentQ - 1;
        }else{
              toast.error("You Cant hh just deleted hhh");
        }

        // Update local storage with the modified cart items
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },
  },
});

export const { addToCart, removeFromCart, addQuantite, decrementQuantite } = cartSlice.actions;
export default cartSlice.reducer;
