import ProductGrid from "@/components/common/ProductGrid";

export default function ProductRecommendations({ products }) {
  return (
    <>
      <section>
        <div className="max-w-screen-xl mx-auto px-4 py-12 gap-12 text-gray-600 md:px-8">
          <div className="space-y-5 max-w-4xl mx-auto text-center">
            <h2 className="text-4xl text-gray-800 font-extrabold mx-auto md:text-5xl">
              Product{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#E114E5]">
                Recommendations
              </span>
            </h2>
          </div>
        </div>
      </section>
      <div className="max-w-screen-xl mx-auto px-4 gap-12 text-gray-600 md:px-8">
        <ProductGrid products={products} />
      </div>
    </>
  );
}
