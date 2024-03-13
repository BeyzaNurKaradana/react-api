import Footer from "../components/layout/Footer";
import NavBar from "../components/layout/Navbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
return (
    <>
    <NavBar></NavBar>
    <Outlet/>
    <Footer></Footer>
    </>
)
}
