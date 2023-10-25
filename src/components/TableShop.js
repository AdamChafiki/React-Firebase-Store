import { useDispatch } from "react-redux";
import { addQuantite, removeFromCart , decrementQuantite} from "../redux/Cart/cartSlice";
import { Toaster } from "sonner";

const TableShop = ({ items }) => {
  const dispatch = useDispatch();

const incrementQuantite = (quantite, id) => {
  dispatch(addQuantite({ id, currentQ: quantite }));
};

const de = (quantite, id) => {
    dispatch(decrementQuantite({ id, currentQ: quantite}));
};

const handleDelete = (id) => {
  dispatch(removeFromCart(id));
};

  return (
    <>
      <Toaster richColors position="top-center" duration={2000} />
      {items.map(({ id, title, img, price, description, quantite }, index) => (
        <tr key={index} className="bg-white border-b ">
          <td className="px-6 py-4 ">
            <img src={img} alt="img" className="w-12" />
          </td>
          <td className="px-6 py-4">{title}</td>
          <td className="px-6 py-4">{description}</td>
          <td className="px-6 py-4 flex justify-center space-x-5">
            <button
              onClick={() => de(quantite, id)}
              className="bg-yellow-500 text-yellow-100 px-3"
            >
              -
            </button>
            <span>{quantite}</span>
            <button
              onClick={() => incrementQuantite(quantite, id)}
              className="bg-yellow-500 text-yellow-100 px-3"
            >
              +
            </button>
          </td>
          <td className="px-6 py-4">
            {price.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </td>
          <td className="px-6 py-4">
            <button
              onClick={() => handleDelete(id)}
              className="bg-red-500 hover:bg-red-400 p-2 text-red-50 rounded-md"
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </>
  );
};

export default TableShop;
