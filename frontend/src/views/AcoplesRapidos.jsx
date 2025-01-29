import { useState } from "react";
import DefaultCard from "../components/DefaultCard";
import { useStateContext } from "../contexts/ContextProvider.jsx";

export default function AcoplesRapidos() {
    const { categoryInfo, productInfo } = useStateContext();

    // Obtener la categoría principal "TERMINALES Y ACCESORIOS"
    const acoplesCategory = categoryInfo.find(
        (category) =>
            category.name.toUpperCase() === "ACOPLES RAPIDOS HIDRAULICOS"
    );

    const [selectedSubcategory, setSelectedSubcategory] = useState("");

    // Obtener los productos de la subcategoría seleccionada

    const filteredProducts = selectedSubcategory
        ? productInfo.filter(
              (info) => info.subCategory.name === selectedSubcategory
          )
        : productInfo.filter(
              (info) => info.category.name === "acoples rapidos hidraulicos"
          );

    return (
        <div className="flex flex-row w-full py-20 px-5 gap-10 font-roboto-condensed min-h-[526px]">
            {/* Lista de subcategorías */}
            <div className="w-[20%]">
                <button
                    onClick={() => setSelectedSubcategory("")}
                    className="font-bold text-[16px] border-y border-[#EAEAEA] py-2 w-full text-left"
                >
                    Todos los productos
                </button>
                {acoplesCategory?.subcategories.map((subcategory, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedSubcategory(subcategory.name)}
                        className="font-bold text-[16px] border-y border-[#EAEAEA] py-2 w-full text-left"
                    >
                        {subcategory.name}
                    </button>
                ))}
            </div>

            {/* Lista de productos */}
            <div className="flex flex-row justify-start w-[80%]">
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
