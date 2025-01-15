import Header from "@/components/main/Header";
import Nav from "@/components/main/Nav";
import Footer from "@/components/main/Footer";
import { Outlet } from "react-router";

export default function Layout() {
  return (
    <>
      <Header />
      <Nav />
      <Outlet />
      <Footer />
    </>
  );
}
