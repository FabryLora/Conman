import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";

export default function ProductRowAdmin({
    productObject,
    subCategory,
    categoryName,
}) {
    const { subCategoryInfo, fetchProductInfo, categoryInfo } =
        useStateContext();
    const [editable, setEditable] = useState(false);

    // Precio
    const [images, setImages] = useState([]); // Lista de archivos seleccionados
    const [principal, setPrincipal] = useState("0");
    const [submitData, setSubmitData] = useState({
        name: productObject?.name,
        sub_category_id: productObject?.subCategory.id,
        category_id: productObject?.category.id,
    });

    const handleFileChange = (e) => {
        setImages(e.target.files); // Almacena los archivos seleccionados
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = { ...submitData };

        console.log("Payload antes de enviar:", payload);

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
                setImages([]);
            }

            fetchProductInfo();

            alert("Producto creado con éxito.");
            setEditable(false);
        } catch (error) {
            console.error("Error al crear el producto:", error);
            alert("Hubo un error al crear el producto.");
        }
    };

    const deleteImage = async (imageId) => {
        try {
            const response = await axiosClient.delete(`/image/${imageId}`);
            fetchProductInfo();
            console.log("Imagen eliminada:", response);
        } catch (error) {
            console.error("Error al eliminar la imagen:", error);
        }
    };

    const deleteGroup = async (groupid) => {
        try {
            await axiosClient.delete(`/product/${groupid}`);
            fetchProductInfo();
        } catch (error) {
            console.error("Error al eliminar la imagen:", error);
        }
    };

    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 h-[134px]">
            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white max-w-[340px] overflow-x-auto">
                {editable ? (
                    <div className="text-center items-center h-fit self-center flex flex-col justify-start gap-3">
                        <PhotoIcon
                            aria-hidden="true"
                            className="mx-auto size-12 text-gray-300"
                        />
                        <div className=" flex text-sm/6 text-gray-600">
                            <label
                                className="text-white cursor-pointer bg-blue-500 py-2 px-4 rounded"
                                htmlFor="fileInput"
                            >
                                Agregar una imagen
                            </label>
                            <input
                                accept="image/*"
                                id="fileInput"
                                name="file-upload"
                                type="file"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-row gap-2 w-[340px]">
                        {productObject?.images.map((image, index) => (
                            <div
                                className="relative flex justify-between items-center h-[100px]"
                                key={index}
                            >
                                <button
                                    onClick={() => deleteImage(image.id)}
                                    className="absolute right-0 top-0 w-full h-full bg-[rgba(0,0,0,0.5)] text-white  flex items-center justify-center"
                                >
                                    <FontAwesomeIcon
                                        icon={faTrash}
                                        size="lg"
                                        color="#ef4444"
                                    />
                                </button>
                                <img
                                    className="w-full h-full object-cover"
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
                    <div className="mt-2">
                        <select
                            value={submitData?.category_id}
                            onChange={(ev) => {
                                setSubmitData(() => ({
                                    ...submitData,
                                    category_id: ev.target.value,
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
                                        subcategory.category_id ===
                                        Number(submitData?.category_id)
                                )
                                .map((subcategory, index) => (
                                    <option key={index} value={subcategory.id}>
                                        {subcategory.name}
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
                    <div className="flex flex-col gap-2">
                        <button
                            className="bg-blue-500 rounded-md text-white py-2"
                            onClick={() => setEditable(false)}
                        >
                            Cancelar
                        </button>
                        <button
                            className="bg-green-500 rounded-md text-white py-2"
                            onClick={handleSubmit}
                        >
                            Guardar
                        </button>
                        <button
                            className="bg-red-500 rounded-md text-white py-2"
                            onClick={() => deleteGroup(productObject.id)}
                        >
                            Eliminar
                        </button>
                    </div>
                ) : (
                    <button
                        className="bg-blue-500 rounded-md text-white py-2 px-6"
                        onClick={() => setEditable(true)}
                    >
                        Editar
                    </button>
                )}
            </td>
        </tr>
    );
}
