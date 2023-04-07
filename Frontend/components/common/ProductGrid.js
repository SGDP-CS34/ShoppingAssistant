import ProductCard from "@/components/common/ProductCard";

export default function ProductGrid({ products }) {
  return (
    <>
      <section className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-y-20 gap-x-14 mb-5">
        {products.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </section>
    </>
  );
}
