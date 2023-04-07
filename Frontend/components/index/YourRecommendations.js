import ProductGrid from "@/components/common/ProductGrid";
import { useState, useEffect } from "react";
import axios from "@/utils/axios";
import { useSession } from "next-auth/react";

export default function YourRecommendations() {
  const [recommendations, setRecommendations] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const { data } = useSession();

  const recommendationOptions = {
    usePurchaseHistory: false,
    gender: ["Men", "Women", "Unisex", "Boys", "Girls"],
    masterCategory: [
      "Apparel",
      "Footwear",
      "Accessories",
      "Personal Care",
      "Free Items",
    ],
    season: ["Summer", "Winter", "Spring", "Fall"],
  };
  const [options, setOptions] = useState({
    usePurchaseHistory: false,
    gender: ["Men", "Women", "Unisex", "Boys", "Girls"],
    masterCategory: [
      "Apparel",
      "Footwear",
      "Accessories",
      "Personal Care",
      "Free Items",
    ],
    season: ["Summer", "Winter", "Spring", "Fall"],
  });

  // This function handles changes to checkboxes
  function handleCheckboxChange(event) {
    const { name, value } = event.target;
    if (options[name].includes(value)) {
      setOptions({
        ...options,
        [name]: options[name].filter((item) => item !== value),
      });
    } else {
      setOptions({
        ...options,
        [name]: [...options[name], value],
      });
    }
  }
// This function retrieves product recommendations by sending a POST request to the server
  function getRecommendations() {
    setLoading(true);
    const headers = axios.defaults.headers;
    if (data && data.accessToken) {
      headers["Authorization"] = `Bearer ${data.accessToken}`;
    }
    axios
      .post(`/product/recommendations`, options, headers)
      .then((res) => res.data)
      .then((data) => {
        if (data) {
          setRecommendations(data);
        } else {
          setRecommendations(null);
        }
        setLoading(false);
      });
  }

  useEffect(() => {
    getRecommendations();
  }, [data]);

  return (
    <>
      <section>
        <div className="max-w-screen-xl mx-auto px-4 py-12 gap-12 text-gray-600 md:px-8">
          <div className="space-y-5 max-w-4xl mx-auto text-center">
            <h2 className="text-4xl text-gray-800 font-extrabold mx-auto md:text-5xl">
              Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#E114E5]">
                Recommendations
              </span>
            </h2>
          </div>
        </div>
      </section>
      <div className="max-w-screen-xl mx-auto px-4 gap-12 text-gray-600 md:px-8">
        <div>{recommendations && <ProductGrid products={recommendations} />}</div>
        <div className="flex justify-end space-x-2">
        {data && data.user && (
            <div className="flex items-center pl-3">
              <input
                id={`checkbox-list-purchase-history`}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                type="checkbox"
                name="purchaseHistory"
                value={options.usePurchaseHistory}
                checked={options.usePurchaseHistory}
                onChange={() => { setOptions({ ...options, usePurchaseHistory: !options.usePurchaseHistory }) }}
              />
              <label
                className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                htmlFor={`checkbox-list-purchase-history}`}
              >
                Use Purchase History
              </label>
            </div>
          )}
          <button
            type="button"
            className="inline-block rounded-full border-2 border-neutral-800 px-6 pt-2 pb-[6px] text-xs font-medium uppercase leading-normal text-neutral-800 transition duration-150 ease-in-out hover:border-neutral-800 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-neutral-800 focus:border-neutral-800 focus:text-neutral-800 focus:outline-none focus:ring-0 active:border-neutral-900 active:text-neutral-900 dark:border-neutral-900 dark:text-neutral-900 dark:hover:border-neutral-900 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10 dark:hover:text-neutral-900 dark:focus:border-neutral-900 dark:focus:text-neutral-900 dark:active:border-neutral-900 dark:active:text-neutral-900"
            data-te-ripple-init
            onClick={() => setShowOptions(!showOptions)}
          >
            Options
          </button>
          <button
            type="button"
            onClick={() => getRecommendations()}
            className="inline-block rounded-full uppercase bg-neutral-800 px-6 pt-2.5 pb-2 text-xs font-medium leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_#332d2d] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.3),0_4px_18px_0_rgba(51,45,45,0.2)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.3),0_4px_18px_0_rgba(51,45,45,0.2)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.3),0_4px_18px_0_rgba(51,45,45,0.2)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#171717] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(27,27,27,0.3),0_4px_18px_0_rgba(27,27,27,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(27,27,27,0.3),0_4px_18px_0_rgba(27,27,27,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(27,27,27,0.3),0_4px_18px_0_rgba(27,27,27,0.2)]"
          >
            More Recommendations
          </button>
        </div>
        {showOptions && (!data || !options['usePurchaseHistory']) && (
          <div>
            <div>
              <div className="mt-2 mb-4">
                <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
                  Gender
                </h3>
                <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  {recommendationOptions.gender.map((gender) => (
                    <li
                      className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600"
                      key={gender}
                    >
                      <div className="flex items-center pl-3">
                        <input
                          id={`checkbox-list-${gender}`}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                          type="checkbox"
                          name="gender"
                          value={gender}
                          checked={options.gender.includes(gender)}
                          onChange={handleCheckboxChange}
                        />
                        <label
                          className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          htmlFor={`checkbox-list-${gender}`}
                        >
                          {gender}
                        </label>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="my-4">
                <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
                  Category
                </h3>
                <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  {recommendationOptions.masterCategory.map((category) => (
                    <li
                      className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600"
                      key={category}
                    >
                      <div className="flex items-center pl-3">
                        <input
                          id={`checkbox-list-${category}`}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                          type="checkbox"
                          name="masterCategory"
                          value={category}
                          checked={options.masterCategory.includes(category)}
                          onChange={handleCheckboxChange}
                        />
                        <label
                          htmlFor={`checkbox-list-${category}`}
                          className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          {category}
                        </label>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="my-4">
                <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
                  Season
                </h3>
                <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  {recommendationOptions.season.map((season) => (
                    <li
                      className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600"
                      key={season}
                    >
                      <div className="flex items-center pl-3">
                        <input
                          id={`checkbox-list-${season}`}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                          type="checkbox"
                          name="season"
                          value={season}
                          checked={options.season.includes(season)}
                          onChange={handleCheckboxChange}
                        />
                        <label
                          htmlFor={`checkbox-list-${season}`}
                          className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          {season}
                        </label>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
