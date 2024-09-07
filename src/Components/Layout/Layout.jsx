import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

export default function Layout() {
  return (
    <>
      <Navbar />
      <main className="container px-5 mx-auto min-h-[82vh] flex flex-col justify-center">
        <Outlet />
      </main>
    </>
  );
}
