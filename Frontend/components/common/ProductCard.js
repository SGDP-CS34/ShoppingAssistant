import { useRouter } from "next/navigation";

export default function ProductCard({ product }) {
  const { push } = useRouter();

  return (
    <>
      <div className="card flex flex-col justify-center bg-white rounded-lg shadow-lg">
        <div className="mt-10 mx-10">
          <p className="text-xl uppercase text-gray-900 font-bold truncate">
            {product.name}
          </p>
          <p className="uppercase text-sm text-gray-400">
            {product.masterCategory} / {product.subCategory}
          </p>
        </div>
        <img
          src={product.productImageURL}
          className="w-full h-64 object-cover my-4"
        />
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-900 mx-10 mb-4">
          <p className="font-bold text-xl text-center">Rs {product.price}</p>
          <button
            onClick={() => push(`/products/${product.id}`, { shallow: false })}
            className="px-6 py-2 transition ease-in duration-200 uppercase rounded-md hover:bg-gray-800 hover:text-white border-2 border-gray-900 focus:outline-none"
          >
            View
          </button>
        </div>
      </div>
    </>
  );
}
