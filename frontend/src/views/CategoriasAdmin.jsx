import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axiosClient from "../axios";
import CategoryAdminCard from "../components/CategoryAdminCard";
import SubCategoryAdminCard from "../components/SubCategoryAdminCard";
import { useStateContext } from "../contexts/ContextProvider";

export default function CategoriasAdmin() {
    const {
        categoryInfo,
        fetchCategoryInfo,
        subCategoryInfo,
        fetchSubCategoryInfo,
    } = useStateContext();

    const [searchTerm, setSearchTerm] = useState("");
    const [searchSubTerm, setSearchSubTerm] = useState("");

    const filteredCategories = categoryInfo.filter((category) =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredSubCategories = subCategoryInfo.filter((subCategory) =>
        subCategory.name.toLowerCase().includes(searchSubTerm.toLowerCase())
    );

    return (
        <div className="flex flex-col w-full">
            <ToastContainer />

            <div className="flex flex-col w-[90%] mx-auto py-10 gap-3">
                <h1 className="text-2xl">Categorias</h1>
                <input
                    type="text"
                    placeholder="Buscar categoria..."
                    className="border p-2 mb-3"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="flex justify-center w-full">
                    <table className="w-full shadow-md">
                        <thead className="bg-gray-400">
                            <tr className="text-center">
                                <td className="min-w-[200px] py-2">Imagen</td>
                                <td>Nombre</td>
                                <td>Destacado</td>
                                <td>Orden</td>
                                <td>Editar</td>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {filteredCategories.map((category) => (
                                <CategoryAdminCard
                                    key={category.id}
                                    category={category}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="flex flex-col w-[90%] mx-auto py-10 gap-3">
                <h1 className="text-2xl">Sub Categorias</h1>
                <input
                    type="text"
                    placeholder="Buscar subcategoria..."
                    className="border p-2 mb-3"
                    value={searchSubTerm}
                    onChange={(e) => setSearchSubTerm(e.target.value)}
                />
                <div className="flex justify-center w-full">
                    <table className="w-full shadow-md border">
                        <thead className="bg-gray-400">
                            <tr className="text-center">
                                <td className="py-2">Nombre</td>
                                <td>Categoria</td>
                                <td>Orden</td>
                                <td>Editar</td>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {filteredSubCategories.map((subCategory) => (
                                <SubCategoryAdminCard
                                    key={subCategory.id}
                                    subCategory={subCategory}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
