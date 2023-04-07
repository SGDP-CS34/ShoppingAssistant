import ProductGrid from "@/components/common/ProductGrid";
import axios from "@/utils/axios";
import { useState, useEffect } from "react";

export default function Products() {
  // Fetch product data when component mounts
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  // Fetch product data when component mounts
  useEffect(() => {
    setLoading(true);
    axios
      .get("/product?limit=500")
      .then((res) => res.data)
      .then((data) => {
        if (data && data.length > 0) {
          setData(data);
        } else {
          setData(null);
        }
        setLoading(false);
      });
  }, []); // Only run once, when component mounts

  return (
    <>
      <div className="max-w-screen-xl mx-auto px-4 py-10 gap-12 text-gray-600 overflow-hidden md:px-8 md:flex">
        <h1 className="text-4xl text-gray-800 font-extrabold sm:text-5xl">
          Products
        </h1>
      </div>
      <div className="max-w-screen-xl mx-auto px-4 gap-12 text-gray-600 md:px-8">
        {data && <ProductGrid products={data} />}
      </div>
    </>
  );
}
