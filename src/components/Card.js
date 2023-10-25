import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchData } from "../redux/fetchData/fetchSlide";
// import second from "../assets/second.jpg";
import { RiStarSFill, RiStarSLine } from "react-icons/ri";

const Card = () => {
  const data = useSelector((state) => state.fetchData.data);
  const status = useSelector((state) => state.fetchData.status);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData(`https://dummyjson.com/products?limit=9&skip=20`));
  }, [dispatch]);

  return (
    <div>
      {status === "loading" ? <div>Loading...</div> : ""}
      {status === "succeeded" ? (
        <div className="card flex flex-wrap justify-center  gap-4">
          {data.products.map(({ id, price, thumbnail, title, rating }) => (
            <Link
              key={id}
              to={`/product/${id}`}
              className="w-[350px] border-2 p-2"
            >
              <div className="top-card">
                <img src={thumbnail} alt="thumbnail" className="w-full h-44" />
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
        ""
      )}
    </div>
  );
};

export default Card;
