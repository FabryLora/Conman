import { useEffect, useState } from "react";
import DefaultCard from "../components/DefaultCard";
import { useStateContext } from "../contexts/ContextProvider.jsx";

export default function GeneralView({ categoryName }) {
    const { categoryInfo, productInfo, linkInfo } = useStateContext();

    const filteredCategory = categoryInfo.find(
        (category) => category.name.toUpperCase() === categoryName.toUpperCase()
    );

    useEffect(() => {
        setSelectedSubcategory(linkInfo.toLowerCase());
    }, [linkInfo]);
    const [selectedSubcategory, setSelectedSubcategory] = useState(
        linkInfo.toLowerCase()
    );

    const filteredProducts = selectedSubcategory
        ? productInfo.filter(
              (info) =>
                  info.subCategory.name === selectedSubcategory &&
                  info.category.name.toUpperCase() ===
                      categoryName.toUpperCase()
          )
        : productInfo.filter(
              (info) =>
                  info.category.name.toUpperCase() ===
                  categoryName.toUpperCase()
          );

    return (
        <div className="flex flex-row w-full py-20 px-5 gap-10 font-roboto-condensed min-h-[526px]">
            {/* Lista de subcategorías */}
            <div className="w-[20%]">
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
            <div className="flex flex-row flex-wrap justify-start w-[80%] gap-4">
                {filteredProducts.map((product, index) => (
                    <DefaultCard
                        key={index}
                        cardObject={product}
                        images={product.images}
                    />
                ))}
            </div>
        </div>
    );
}
