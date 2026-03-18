import Carousel from "../ui/Carousel";
import ProductCard from "../products/ProductCard";
import { PRODUCTS } from "../products/productsData";

const NewArrivals = () => {
  const products = PRODUCTS.filter(p => p.new);

  return (
    <section className="bg-white py-4">
      <Carousel title="New Arrivals">
        {products.map((product) => (
          <div key={product.id} className="snap-center shrink-0 w-[280px] md:w-[320px]">
            <ProductCard product={product} />
          </div>
        ))}
      </Carousel>
    </section>
  );
};
export default NewArrivals;
