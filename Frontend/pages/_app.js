import DefaultLayout from "@/layouts/DefaultLayout";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";

// Defining the App component with Component and pageProps as parameters
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
    </SessionProvider>
  );
}
