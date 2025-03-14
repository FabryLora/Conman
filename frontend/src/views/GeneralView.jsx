import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DefaultCard from "../components/DefaultCard";
import WhatsappComponent from "../components/WhatsappComponent.jsx";
import { useStateContext } from "../contexts/ContextProvider.jsx";

export default function GeneralView() {
    const { categoryInfo, productInfo, linkInfo } = useStateContext();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const location = useLocation();

    const [categoryName, setCategoryName] = useState();

    const [cleanPathname, setCleanPathname] = useState(
        location.pathname.replace(/^\/+/, "").replace(/-/g, " ").split("/")
    );

    function removeAccents(str) {
        return str?.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    useEffect(() => {
        const newPath = location.pathname
            .replace(/^\/+/, "")
            .replace(/-/g, " ")
            .split("/");
        setCleanPathname(newPath);
        setCategoryName(newPath[1]?.split("-").join(" "));
    }, [location]);

    const filteredCategory = categoryInfo.find(
        (category) =>
            removeAccents(category?.name?.toUpperCase()) ===
            categoryName?.toUpperCase()
    );

    useEffect(() => {
        setSelectedSubcategory(linkInfo);
    }, [linkInfo]);
    const [selectedSubcategory, setSelectedSubcategory] = useState(
        linkInfo || ""
    );

    const filteredProducts = selectedSubcategory
        ? productInfo.filter(
              (info) =>
                  info?.subCategory?.name === selectedSubcategory &&
                  removeAccents(info?.category.name?.toUpperCase()) ===
                      categoryName?.toUpperCase()
          )
        : productInfo.filter(
              (info) =>
                  removeAccents(info.category?.name.toUpperCase()) ===
                  categoryName?.toUpperCase()
          );

    return (
        <div className="flex flex-row w-[1240px] mx-auto max-sm:w-full py-20 gap-10 justify-between font-roboto-condensed min-h-[526px] max-sm:flex-col max-sm:px-6 max-sm:items-center">
            {/* Lista de subcategorías */}
            <div className="w-[20%] max-sm:w-full">
                <button
                    onClick={() => setSelectedSubcategory("")}
                    className={` text-[16px] border-y border-[#EAEAEA] py-2 w-full text-left ${
                        !selectedSubcategory ? "font-bold" : ""
                    }`}
                >
                    Todos los productos
                </button>
                {filteredCategory?.subcategories.map((subcategory, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedSubcategory(subcategory.name)}
                        className={`text-[16px] border-y border-[#EAEAEA] py-2 w-full text-left ${
                            subcategory.name === selectedSubcategory
                                ? "font-bold"
                                : ""
                        }`}
                    >
                        {subcategory.name.toUpperCase()}
                    </button>
                ))}
            </div>

            {/* Lista de productos */}
            <div className="grid grid-cols-3 w-[75%] gap-y-10">
                {filteredProducts.map((product, index) => (
                    <DefaultCard
                        key={index}
                        cardObject={product}
                        images={product?.images ? product.images : null}
                    />
                ))}
            </div>
            <WhatsappComponent />
        </div>
    );
}
