import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "@/utils/axios";
import ProductCard from "@/components/products/ProductCard";
import ProductRecommendations from "@/components/products/ProductRecommendations";

export default function Product() {
  const router = useRouter();

  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState(null);

  useEffect(() => {
    setLoading(true);
    const { id } = router.query;
    if (router.isReady) {
      // Fetch product data from server
      axios
        .get(`/product/${id}`)
        .then((res) => res.data)
        .then((data) => {
          if (data) {
            setData(data);
          } else {
            setData(null);
          }
          setLoading(false);
        });
      // Fetch product recommendations from server
      axios
        .get(`/product/${id}/recommendations`)
        .then((res) => res.data)
        .then((data) => {
          if (data) {
            setRecommendations(data);
          } else {
            setRecommendations(null);
          }
        });
    }
  }, [router.isReady, router.query]);

  return (
    <>
      <div className="max-w-screen-xl mx-auto px-4 py-10 gap-12 text-gray-600 overflow-hidden md:px-8 md:flex">
        <h1 className="text-4xl text-gray-800 font-extrabold sm:text-5xl">
          Products
        </h1>
      </div>
      <div className="max-w-screen-xl mx-auto px-4 gap-12 text-gray-600 md:px-8">
        {data && <ProductCard product={data} />}
      </div>
      {recommendations && <ProductRecommendations products={recommendations} />}
    </>
  );
}
