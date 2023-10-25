import { useSelector, useDispatch } from "react-redux";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import { increment, decrement } from "../redux/slider/sliderSlice";
import { useEffect } from "react";

const Slider = () => {
  const value = useSelector((state) => state.slider.value);
  const slider = useSelector((state) => state.slider.img[value]);
  const dispatch = useDispatch();

    useEffect(() => {
      let timer = setInterval(() => {
        dispatch(increment());
      }, 3000);

      return () => clearTimeout(timer);
    }, [dispatch]);

  return (
    <div className="slider_control relative h-full">
      <button
        onClick={() => dispatch(decrement())}
        className="absolute left-0 hover:border-4 hover:border-white bg-purple-300 text-gray-700 opacity-70 h-full w-[25px] flex items-center justify-center text-2xl"
      >
        <AiOutlineLeft />
      </button>
      <img
        src={slider}
        className="h-full"
        alt="slider"
      />
      <button
        onClick={() => dispatch(increment())}
        className="absolute right-0 hover:border-4 hover:border-white top-0 bg-purple-300 text-gray-700 opacity-70 h-full w-[25px] flex items-center justify-center text-2xl"
      >
        <AiOutlineRight />
      </button>
    </div>
  );
};

export default Slider;
