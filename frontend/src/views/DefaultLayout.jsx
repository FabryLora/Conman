import { Outlet, useLocation } from "react-router-dom";
import bannerImage from "../assets/nosotros/nosotros-banner.png";
import DefaultBanner from "../components/DefaultBanner";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
export default function DefaultLayout() {
    const location = useLocation();

    // Eliminar las barras iniciales y dividir la ruta en palabras
    const cleanPathname = location.pathname
        .replace(/^\/+/, "")
        .replace(/-/g, " ")
        .split("/");

    // Eliminar la primera palabra
    cleanPathname.shift(); // Elimina la primera palabra (índice 0)

    // Volver a unir las palabras restantes con '/'
    const finalPath = cleanPathname.join("/");

    return (
        <>
            <Navbar />
            <DefaultBanner
                title={finalPath}
                href={""}
                bannerImage={bannerImage}
            />
            <Outlet />
            <Footer />
        </>
    );
}
