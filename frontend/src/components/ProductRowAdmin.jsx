import { PhotoIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";

export default function ProductRowAdmin({
    productObject,
    subCategory,
    categoryName,
}) {
    const [editable, setEditable] = useState(false);

    // Precio
    const [images, setImages] = useState([]); // Lista de archivos seleccionados
    const [principal, setPrincipal] = useState("0");
    const [submitData, setSubmitData] = useState({
        name: productObject?.name,
        code: productObject?.code,
        price: productObject?.price,
        sub_category_id: productObject?.sub_category_id,
        category_id: productObject?.category_id,
    });

    const { subCategoryInfo, fetchProductInfo, categoryInfo } =
        useStateContext();

    const handleFileChange = (e) => {
        setImages(e.target.files); // Almacena los archivos seleccionados
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = { ...submitData };

        try {
            // 1. Crear el producto
            const productResponse = await axiosClient.put(
                `/product/${productObject.id}`,
                payload
            );

            // ID del producto recién creado

            // 2. Subir imágenes
            if (images.length > 0) {
                // Si hay imágenes seleccionadas
                // Crear un FormData
                const formData = new FormData();
                formData.append("principal", principal);
                Array.from(images).forEach((file, index) => {
                    formData.append(`image`, file);
                });

                formData.append("product_id", productObject.id);

                const imageResponse = await axiosClient.post(
                    "/image",
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );

                console.log(
                    "Producto e imágenes creadas:",
                    productResponse,
                    imageResponse
                );
            }

            fetchProductInfo();

            alert("Producto creado con éxito.");
            setEditable(false);
        } catch (error) {
            console.error("Error al crear el producto:", error);
            alert("Hubo un error al crear el producto.");
        }
    };

    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 h-[134px]">
            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {editable ? (
                    <div className="text-center items-center h-fit self-center flex flex-row justify-start gap-3">
                        <PhotoIcon
                            aria-hidden="true"
                            className="mx-auto size-12 text-gray-300"
                        />
                        <div className=" flex text-sm/6 text-gray-600">
                            <input
                                accept="image/*"
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                onChange={handleFileChange}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-row overflow-x-auto scrollbar-hide gap-2">
                        {productObject?.images.map((image, index) => (
                            <div key={index}>
                                <img
                                    className="w-20"
                                    src={image.image_url}
                                    alt=""
                                />
                            </div>
                        ))}
                    </div>
                )}
            </td>
            <td className="px-6 py-4">
                {editable ? (
                    <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        value={submitData?.code}
                        onChange={(ev) =>
                            setSubmitData({
                                ...submitData,
                                code: ev.target.value,
                            })
                        }
                    />
                ) : (
                    productObject?.code
                )}
            </td>
            <td className="px-6 py-4">
                {editable ? (
                    <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        value={submitData?.name}
                        onChange={(ev) =>
                            setSubmitData({
                                ...submitData,
                                name: ev.target.value,
                            })
                        }
                    />
                ) : (
                    productObject?.name
                )}
            </td>
            <td className="px-6 py-4">
                {editable ? (
                    <input
                        type="number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        value={submitData?.price}
                        onChange={(ev) =>
                            setSubmitData({
                                ...submitData,
                                price: ev.target.value,
                            })
                        }
                    />
                ) : (
                    productObject?.price
                )}
            </td>
            <td className="px-6 py-4">
                {editable ? (
                    <div className="mt-2">
                        <select
                            value={submitData?.category_id}
                            onChange={(ev) => {
                                const newCategoryId = ev.target.value;

                                setSubmitData(() => ({
                                    ...submitData,
                                    category_id: newCategoryId,
                                    sub_category_id: "", // Reinicia el sub_category_id
                                }));
                            }}
                            id="categoria"
                            name="categoria"
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        >
                            <option value="" disabled>
                                Seleccione una categoría
                            </option>
                            {categoryInfo.map((category, index) => (
                                <option key={index} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                ) : (
                    categoryName
                )}
            </td>
            <td className="px-6 py-4">
                {editable ? (
                    <div className="mt-2">
                        <select
                            value={submitData?.sub_category_id}
                            onChange={(ev) => {
                                setSubmitData({
                                    ...submitData,
                                    sub_category_id: ev.target.value,
                                });
                                console.log(ev.target.value);
                            }}
                            id="subcategoria"
                            name="subcategoria"
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        >
                            <option value="" disabled>
                                Seleccione una categoria
                            </option>
                            {subCategoryInfo
                                .filter(
                                    (subcategory) =>
                                        subcategory.id ===
                                        Number(submitData?.category_id)
                                )
                                .map((category, index) => (
                                    <option key={index} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                        </select>
                    </div>
                ) : (
                    subCategory
                )}
            </td>
            <td>
                {editable ? (
                    <div className="flex flex-row gap-2">
                        <button onClick={() => setEditable(false)}>
                            Cancelar
                        </button>
                        <button onClick={handleSubmit}>Guardar</button>
                    </div>
                ) : (
                    <button onClick={() => setEditable(true)} className="">
                        Editar
                    </button>
                )}
            </td>
        </tr>
    );
}
