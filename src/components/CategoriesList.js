import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCategories } from "../redux/categories/categoriesSlide";
import { Link } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";


const Categories = () => {
  const categories = useSelector((state) => state.categories.data);
  const status = useSelector((state) => state.categories.status);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);


  return (
    <>
      {status === "loading" ? (
        <div>
          <FaSpinner className="animate-spin text-xl mx-auto "  />
        </div>
      ) : (
        ""
      )}
      <ul>
        {status === "succeeded" ? (
          <div className="grid grid-cols-2  text-center">
            {categories.map((cat, index) => (
              <Link
                key={index}
                className="my-2 hover:underline hover:text-gray-500"
              >
                {cat}
              </Link>
            ))}
          </div>
        ) : (
          ""
        )}
      </ul>
      {status === "failed" ? "try again !" : ""}
    </>
  );
};

export default Categories;
