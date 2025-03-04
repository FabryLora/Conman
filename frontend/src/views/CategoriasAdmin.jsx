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

    const [image, setImage] = useState();
    const [name, setName] = useState();
    const [destacado, setDestacado] = useState();
    const [order, setOrder] = useState();
    const [link, setLink] = useState("");

    //subcategory

    const [nameSub, setNameSub] = useState();
    const [orderSub, setOrderSub] = useState();
    const [linkSub, setLinkSub] = useState("");
    const [categoryId, setCategoryId] = useState();

    const hanldeFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const submit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        if (image) {
            formData.append("image", image);
        }

        formData.append("name", name);
        formData.append("destacado", destacado ? 1 : 0);
        formData.append("order_value", order);
        formData.append("link", "a");

        try {
            const response = await axiosClient.post("/category", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log(response);
            fetchCategoryInfo();
            toast.success("Guardado correctamente");
        } catch (error) {
            toast.error("Error al guardar");
        }
    };

    const submitSub = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", nameSub);
        formData.append("order_value", orderSub);
        formData.append("link", "a");
        formData.append("category_id", categoryId);

        try {
            const response = await axiosClient.post("/subcategory", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log(response);
            fetchSubCategoryInfo();
            toast.success("Guardado correctamente");
        } catch (error) {
            toast.error("Error al guardar");
        }
    };

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
                            <tr className="h-[80px]">
                                <td>
                                    <label
                                        htmlFor="imagen"
                                        className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Seleccionar Imagen
                                    </label>
                                    <input
                                        id="imagen"
                                        onChange={hanldeFileChange}
                                        className="hidden"
                                        type="file"
                                    />
                                </td>
                                <td className="table-cell">
                                    <input
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        type="text"
                                        placeholder="Nombre de la categoria"
                                    />
                                </td>

                                <td className="table-cell">
                                    <input
                                        checked={destacado}
                                        onChange={(e) =>
                                            setDestacado(e.target.checked)
                                        }
                                        type="checkbox"
                                        placeholder="Destacado"
                                    />
                                </td>
                                <td className="table-cell">
                                    <input
                                        value={order}
                                        onChange={(e) =>
                                            setOrder(e.target.value)
                                        }
                                        type="text"
                                        placeholder="Orden"
                                    />
                                </td>
                                <td className="table-cell">
                                    <button
                                        onClick={submit}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Crear categoria
                                    </button>
                                </td>
                            </tr>
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
                            <tr className="h-[80px]" action="">
                                <td>
                                    <input
                                        value={nameSub}
                                        onChange={(e) =>
                                            setNameSub(e.target.value)
                                        }
                                        type="text"
                                        placeholder="Nombre de la categoria"
                                    />
                                </td>

                                <td>
                                    <select
                                        onChange={(e) => {
                                            setCategoryId(e.target.value);
                                            console.log(categoryId);
                                        }}
                                        name=""
                                        id=""
                                    >
                                        <option value="">
                                            Seleccionar categoria
                                        </option>
                                        {categoryInfo.map((category) => (
                                            <option
                                                key={category.id}
                                                value={category.id}
                                            >
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </td>

                                <td>
                                    <input
                                        value={orderSub}
                                        onChange={(e) =>
                                            setOrderSub(e.target.value)
                                        }
                                        type="text"
                                        placeholder="Orden"
                                    />
                                </td>
                                <td>
                                    <button
                                        onClick={submitSub}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Crear Sub-categoria
                                    </button>
                                </td>
                            </tr>
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
