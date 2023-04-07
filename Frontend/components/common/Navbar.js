import { useState } from "react";
import { useSession } from "next-auth/react";
import Avatar from "@/components/common/Avatar";
import { signOut } from "next-auth/react";

export default function Navbar() {
  const [state, setState] = useState(false);
  const { data } = useSession();

  const navigation = [
    { title: "Home", path: "/" },
    { title: "Products", path: "/products" },
  ];

  return (
    <header>
      <nav className="items-center pt-5 px-4 mx-auto max-w-screen-xl sm:px-8 md:flex md:space-x-6">
        <div className="flex justify-between">
          <a href="/">
            <img src="/logo.svg" width={150} height={80} alt="Logo" />
          </a>
          <button
            className="text-gray-500 outline-none md:hidden"
            onClick={() => setState(!state)}
          >
            {state ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
        <ul
          className={`flex-1 justify-between mt-12 md:flex md:mt-0 ${
            state ? "" : "hidden"
          }`}
        >
          <li className="order-2 pb-5 md:pb-0">
            {data?.user ? (
              <div className="flex items-center space-x-4">
                <Avatar name={data.user.name} />
                <div className="font-medium dark:text-white">
                  <div>{data.user.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {data.user.email}
                  </div>
                </div>
                <a
                  className="py-3 px-6 rounded-md shadow-md text-white text-center bg-gray-800 focus:shadow-none block md:inline"
                  onClick={() => signOut()}
                >
                  Sign Out
                </a>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <a
                  href="/login"
                  className="py-3 px-6 rounded-md shadow-md text-white text-center bg-gray-800 focus:shadow-none block md:inline"
                >
                  Sign In
                </a>
              </div>
            )}
          </li>
          <div className="order-1 flex-1 items-center space-y-5 md:flex md:space-x-6 md:space-y-0">
            {navigation.map((item, idx) => (
              <li
                className="text-gray-800 hover:text-gray-400 text-lg"
                key={idx}
              >
                <a href={item.path}>{item.title}</a>
              </li>
            ))}
          </div>
        </ul>
      </nav>
    </header>
  );
}
