import { useSelector } from "react-redux";
import TableShop from "../components/TableShop";

const Cart = () => {
  const state = useSelector((state) => state.cart.items);

const getTotal = () => {
  let totalPrice = 0;

  if (state.length !== 0) {
    for (let i = 0; i < state.length; i++) {
      // Calculate the price for each item by multiplying price by quantity
      const itemPrice = state[i].price * state[i].quantite;
      totalPrice += itemPrice;
    }

    return totalPrice.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  } else {
    return "$0.00";
  }
};


  const getNumItems = () => {
    return state ? state.length : 0;
  };

  return (
    <section className="cartShop container mx-auto ">
      <div className="top_cartShop border-b-2 border-gray-950 py-10 flex justify-between items-center">
        <h1 className="text-xl font-bold">Shopping Cart</h1>
        <p className="text-md font-semibold text-gray-500">
          <span>{getNumItems()} </span> items
        </p>
      </div>
      <div className="body_cartShop my-12">
        {getNumItems() === 0 ? ( // Check if there are no items
          <p className="text-sm text-gray-500">No items in the cart.</p>
        ) : (
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark">
              <tr>
                <th scope="col" className="px-6 py-3">
                  img
                </th>
                <th scope="col" className="px-6 py-3">
                  title
                </th>
                <th scope="col" className="px-6 py-3">
                  description
                </th>
                <th scope="col" className="px-6 py-3">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3">
                  price
                </th>
                <th scope="col" className="px-6 py-3">
                  Delete Item
                </th>
              </tr>
            </thead>
            <tbody>
              <TableShop items={state} />
            </tbody>
          </table>
        )}
      </div>
      {getNumItems() === 0 ? (
        ''
      ) : (
        <div className="footer_shopCart border-2 p-3  rounded-md border-black my-12 flex flex-col space-y-6 w-1/3">
          <h1 className="border-b-2 border-gray-500 text-xl text-gray-500 font-semibold">
            Summary
          </h1>
          <div className="cartShop_All border-b-2 border-gray-500">
            <p className="py-3">Products : {getTotal()}</p>
            <p className="py-3">
              Shipping : <span>Free</span>
            </p>
          </div>
          <div className=" flex justify-between bg-gradient-to-r from-yellow-500 to-yellow-500  p-3 items-center">
            <h1 className="text-gray-900 text-xl">Total : </h1>
            <p className=" text-white">{getTotal()}</p>
          </div>
          <button className="p-2 bg-yellow-400 text-gray-950 rounded-md">
            Pass To Check Out
          </button>
        </div>
      )}
    </section>
  );
};

export default Cart;
