import { useParams,Link } from "react-router-dom";
import { useEffect} from "react";
import { FaSpinner } from "react-icons/fa";
import { RiStarSFill, RiStarSLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../redux/fetchData/fetchSlide";
const ProductByCat = () => {
  const { name } = useParams();
  const data = useSelector((state) => state.fetchData.data);
  const status = useSelector((state) => state.fetchData.status);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData(`https://dummyjson.com/product/category/${name}`));
  }, [dispatch,name]);
   
  console.log(data);

  return (
    <>
      <div className="container mx-auto mt-12">
        <div>
          {status === "loading" ? (
            <div className="my-12">
              <FaSpinner className="animate-spin mx-auto " />
            </div>
          ) : (
            ""
          )}
          {status === "succeeded" ? (
            <div className="card flex flex-wrap   gap-4">
              {data.products.map(({ id, price, thumbnail, title, rating }) => (
                <Link
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
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default ProductByCat;
