import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "../redux/fetchData/fetchSlide";
import { useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
import { Link } from "react-router-dom";
import { RiStarSFill, RiStarSLine } from "react-icons/ri";
import { PiSmileySadLight } from "react-icons/pi";

const ProductSearch = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q");

  const data = useSelector((state) => state.fetchData.data);
  const status = useSelector((state) => state.fetchData.status);


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData(`https://dummyjson.com/products/search?q=${query}`));
  }, [dispatch, query]);

  return (
    <>
      {status === "loading" ? (
        <div>
          <FaSpinner className="animate-spin text-xl mx-auto " />
        </div>
      ) : (
        ""
      )}
      {status === "succeeded" && data.products.length !== 0 ? (
        <section className="product container mx-auto my-12 ">
          <div className="flex flex-wrap  gap-4">
            {data.products &&
              data.products.map(({ id, price, thumbnail, title, rating }) => (
                <Link
                  key={id}
                  to={`/product/${id}`}
                  className="w-[350px] border-2 p-2 rounded-md shadow-lg"
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
        </section>
      ) : (
        <section className="container mx-auto">
          {" "}
          <h1 className=" flex items-center mx-auto my-12 text-xl">
            Not Found
            <PiSmileySadLight className="animate-spin" />
          </h1>
        </section>
      )}
    </>
  );
};

export default ProductSearch;
