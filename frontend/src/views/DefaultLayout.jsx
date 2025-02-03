import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import bannerImage from "../assets/nosotros/nosotros-banner.png";
import DefaultBanner from "../components/DefaultBanner";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useStateContext } from "../contexts/ContextProvider";
export default function DefaultLayout() {
    const { categoryInfo, fetchCategoryInfo } = useStateContext();

    const location = useLocation();

    // Eliminar las barras iniciales y dividir la ruta en palabras
    const cleanPathname = location.pathname
        .replace(/^\/+/, "")
        .replace(/-/g, " ")
        .split("/");

    // Eliminar la primera palabra
    const finalPath =
        cleanPathname.length > 2
            ? categoryInfo
                  .find((category) => category.name === cleanPathname[1])
                  .products.find(
                      (product) => product.id === Number(cleanPathname[2])
                  ).name
            : cleanPathname[1];

    // Elimina la primera palabra (índice 0)

    // Volver a unir las palabras restantes con '/'

    return (
        <div className="overflow-hidden">
            <Navbar />
            <DefaultBanner
                title={finalPath}
                href={""}
                bannerImage={bannerImage}
            />
            <Outlet />
            <Footer />
        </div>
    );
}
