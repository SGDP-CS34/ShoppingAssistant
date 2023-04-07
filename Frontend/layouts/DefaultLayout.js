import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";

export default function DefaultLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
