import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";
import { useEffect, useState } from "react";
// import second from "../assets/second.jpg";
import { RiStarSFill, RiStarSLine, RiShoppingCart2Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/Cart/cartSlice";
import { Toaster } from "sonner"; // Import the named exports

const ProductsById = () => {
  const [data, setData] = useState(null);
  const [similar, setSimilar] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://dummyjson.com/products/${id}`
        );
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product data:", error);
        setLoading(false);
      }
    };

    fetchData(); // Fetch the initial product data
  }, [id]);

  useEffect(() => {
    if (data && data.category) {
      const fetchSimilarProduct = async () => {
        try {
          const response = await axios.get(
            `https://dummyjson.com/products/category/${data.category}?limit=5`
          );
          setSimilar(response.data.products);
        } catch (error) {
          console.error("Error fetching similar products:", error);
        }
      };
      fetchSimilarProduct(); // Fetch similar products when data is available
    }
  }, [data, id]);

  return (
    <section className="pro_id container mx-auto p-3 my-12">
      <Toaster position="top-center" richColors duration={2000} />
      <div className="pro_container">
        {loading ? (
          <div>
            <FaSpinner className="animate-spin text-xl mx-auto" />
          </div>
        ) : (
          <div className="flex space-x-7  items-center">
            <div className="img_pro flex flex-col space-y-3">
              <img
                src={data.thumbnail}
                alt="thumbnail"
                className="h-64 w-full"
              />
              <div className="flex  gap-2">
                {data.images.map((img, index) => (
                  <img
                    src={img}
                    className="w-20 border-2"
                    alt={`img-${index}`}
                    key={index}
                  />
                ))}
              </div>
            </div>
            <div className="pro_info w-1/2 flex flex-col justify-between space-y-3">
              <h2 className="text-2xl">{data.title}</h2>
              <p className="text-xl text-gray-500 font-semibold">
                {data.description}
              </p>
              <p className="italic text-xl font-bold ">{data.price}$</p>
              <div className="flex items-center">
                <div className="stars flex">
                  <RiStarSFill />
                  <RiStarSFill />
                  <RiStarSFill />
                  <RiStarSFill />
                  <RiStarSLine />
                </div>
                <p className="text-sm text-gray-500 font-semibold">
                  ({data.rating})
                </p>
              </div>
              <Link
                className="bg-gray-600 text-sm hover:bg-gray-500 text-gray-100 w-24 rounded-md p-2 text-center"
                to={`/product/category/${data.category}`}
              >
                {data.category}
              </Link>
              <button
                onClick={() => {
                  dispatch(
                    addToCart({
                      id: data.id,
                      title: data.title,
                      img: data.thumbnail,
                      price: data.price,
                      description: data.description,
                      quantite: 1,
                    })
                  );
                }}
                className="bg-yellow-400 h-full text-xl w-1/2 hover:bg-yellow-500 text-bold p-2 flex items-center  justify-center"
              >
                Add To Cart
                <RiShoppingCart2Line className="text-xl ms-2" />
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="similar_products my-12">
        <h1 className="text-3xl font-bold">Similar Products</h1>
        {similar ? (
          <div className="card  flex flex-wrap gap-4 my-10">
            {similar.map(({ id, price, thumbnail, title, rating }) => (
              <Link
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                key={id}
                to={`/product/${id}`}
                className="w-[350px] border-2 p-2"
              >
                <div className="top-card">
                  <img
                    src={thumbnail}
                    alt="thumbnail"
                    className="w-full h-44"
                  />
                </div>
                <div className="card-body">
                  <h1 className="text-xl font-semibold">{title}</h1>
                  <p className="text-md text-gray-500">{price}$</p>
                </div>
                <div className="bottom-card">
                  <div className="flex items-center">
                    <div className="stars flex">
                      <RiStarSFill />
                      <RiStarSFill />
                      <RiStarSFill />
                      <RiStarSFill />
                      <RiStarSLine />
                    </div>
                    <p className="text-sm text-gray-500 font-semibold">
                      ({rating})
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div>
            <FaSpinner className="animate-spin text-xl mx-auto" />
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsById;
