import Card from "../components/Card";
import Slider from "../components/Slider";
const Home = () => {
  return (
    <>
      <section className="cat_slider container mx-auto  my-12 flex  p-3">
        <div className="slider_container">
          <Slider />
        </div>
      </section>
      <section className="products container mx-auto p-3 my-12">
        <h1 className="text-3xl  text-gray-500 font-bold my-5">Products</h1>
        <Card />
      </section>
    </>
  );
};

export default Home;
