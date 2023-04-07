import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "@/utils/axios";

export default function ProductCard({ product }) {
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const { data } = useSession();
  
  function buyProduct(productID) {
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!data || !data.accessToken) {
      setErrorMessage("Please login to buy this product");
      return;
    }
    const headers = axios.defaults.headers;
    if (data && data.accessToken) {
      headers["Authorization"] = `Bearer ${data.accessToken}`;
    }
    const body = {
      buyer: data.userId,
      product: productID,
    };

    axios
      .post(`/purchasehistory`, body, headers)
      .catch((err) => setErrorMessage("Could not buy product. Please try again."))
      .then((res) => res.data)
      .then((data) => {
        setSuccessMessage("Product bought successfully");
      });
  }

  return (
    <>
      <div className="w-full rounded-lg bg-white shadow-xl mx-auto text-gray-800 relative md:text-left">
        <div className="md:flex items-center -mx-10 p-4">
          <div className="w-full md:w-1/2 px-10 mb-10 md:mb-0">
            <div className="relative">
              <img
                src={product.productImageURL}
                className="w-full relative z-1"
              />
              <div className="border-4 border-yellow-200 absolute top-10 bottom-10 left-10 right-10 z-0"></div>
            </div>
          </div>
          <div className="w-full md:w-1/2 px-10">
            <div className="mb-10">
              <h1 className="font-bold uppercase text-2xl mb-2">
                {product.name}
              </h1>
              <p className="uppercase text-sm text-gray-400 mb-4">
                {product.masterCategory} / {product.subCategory}
              </p>
              <p className="text-sm">
                Lorem ipsum dolor sit, amet consectetur adipisicing, elit. Eos,
                voluptatum dolorum! Laborum blanditiis consequatur, voluptates,
                sint enim fugiat saepe, dolor fugit, magnam explicabo eaque quas
                id quo porro dolorum facilis...{" "}
                <a
                  href="#"
                  className="opacity-50 text-gray-900 hover:opacity-100 inline-block text-xs leading-none border-b border-gray-900"
                >
                  MORE <i className="mdi mdi-arrow-right"></i>
                </a>
              </p>
            </div>
            <div>
              <div className="inline-block align-bottom mr-5">
                <span className="text-2xl leading-none align-baseline">Rs</span>
                <span className="font-bold text-5xl leading-none align-baseline">
                  {product.price}
                </span>
              </div>
              <div className="inline-block align-bottom">
                <button onClick={() => buyProduct(product.id) } className="bg-yellow-300 opacity-75 hover:opacity-100 text-yellow-900 hover:text-gray-900 rounded-full px-10 py-2 font-semibold">
                  <i className="mdi mdi-cart -ml-2 mr-2"></i> BUY NOW
                </button>
              </div>
              {errorMessage && (
                <div
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4"
                  role="alert"
                >
                  <strong className="font-bold">Error!</strong>
                  <span className="block sm:inline">{errorMessage}</span>
                  <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                    <svg
                      className="fill-current h-6 w-6 text-red-500"
                      role="button"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      onClick={() => setErrorMessage(null)}
                    >
                      <title>Close</title>
                      <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                    </svg>
                  </span>
                </div>
              )}
              {successMessage && (
                <div
                  className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4"
                  role="alert"
                >
                  <strong className="font-bold">Success!</strong>
                  <span className="block sm:inline">{successMessage}</span>
                  <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                    <svg
                      className="fill-current h-6 w-6 text-green-500"
                      role="button"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      onClick={() => setSuccessMessage(null)}
                    >
                      <title>Close</title>
                      <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                    </svg>
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
