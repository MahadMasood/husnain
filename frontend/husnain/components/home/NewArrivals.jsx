"use client";
import { useState, useEffect } from "react";
import Carousel from "../ui/Carousel";
import ProductCard from "../products/ProductCard";
import { fetchProducts } from "@/lib/api";

const NewArrivals = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data.filter(p => p.new));
      } catch (error) {
        console.error("Failed to load new arrivals", error);
      }
    };
    loadProducts();
  }, []);

  return (
    <section className="bg-white py-4">
      <Carousel title="New Arrivals">
        {products.map((product) => (
          <div key={product._id || product.id} className="snap-center shrink-0 w-[280px] md:w-[320px]">
            <ProductCard product={product} />
          </div>
        ))}
      </Carousel>
    </section>
  );
};
export default NewArrivals;
