import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
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

    const [image, setImage] = useState();
    const [file, setFile] = useState();
    const [description, setDescription] = useState();
    const [name, setName] = useState();
    const [sub_category_id, setSub_category_id] = useState();
    const [category_id, setCategory_id] = useState();

    useEffect(() => {
        setDescription(productObject?.description);
        setName(productObject?.name);
        setSub_category_id(
            productObject?.subCategory?.id
                ? productObject?.subCategory?.id
                : null
        );
        setCategory_id(productObject?.category.id);
    }, [productObject]);

    const handleFileChange = (e) => {
        setImages(e.target.files); // Almacena los archivos seleccionados
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const prodForm = new FormData();
        prodForm.append("name", name);
        prodForm.append("description", description);
        if (sub_category_id) {
            prodForm.append("sub_category_id", sub_category_id);
        }

        prodForm.append("category_id", category_id);
        if (image) {
            prodForm.append("image", image ? image : null);
        }
        if (file) {
            prodForm.append("file", file ? file : null);
        }

        try {
            // 1. Crear el producto
            const productResponse = await axiosClient.post(
                `/product/${productObject.id}?_method=PUT`,
                prodForm,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
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

            toast.success("Guardado correctamente");
            setEditable(false);
        } catch (error) {
            toast.error("Error al guardar");
        }
    };

    const downloadPDF = async () => {
        try {
            const filename = productObject?.file_url.split("/").pop(); // Extraer solo el nombre del archivo

            const response = await axiosClient.get(
                `/downloadfile/${filename}`,
                {
                    responseType: "blob",
                }
            );

            const blob = new Blob([response.data], { type: "application/pdf" });
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = productObject?.name;
            document.body.appendChild(a);
            a.click();

            window.URL.revokeObjectURL(url);
        } catch (error) {
            toast.error("Error al descargar el archivo");
        }
    };

    const deleteImage = async (imageId) => {
        try {
            const response = await axiosClient.delete(`/image/${imageId}`);
            fetchProductInfo();
            console.log("Imagen eliminada:", response);
            toast.success("Imagen eliminada correctamente");
        } catch (error) {
            toast.error("Error al eliminar la imagen");
            console.error("Error al eliminar la imagen:", error);
        }
    };

    const deleteGroup = async () => {
        try {
            await axiosClient.delete(`/product/${productObject?.id}`);
            fetchProductInfo();
            toast.success("Producto eliminado correctamente");
        } catch (error) {
            toast.error("Error al eliminar el producto");
            console.error("Error al eliminar la imagen:", error);
        }
    };

    const imageToNull = async () => {
        try {
            await axiosClient.put(`/product/${productObject?.id}?_method=PUT`, {
                image: null,
            });
            fetchProductInfo();
            toast.success("Imagen eliminada correctamente");
        } catch (error) {
            toast.error("Error al eliminar la imagen");
            console.error("Error al eliminar la imagen:", error);
        }
    };

    const fileToNull = async () => {
        try {
            await axiosClient.put(`/product/${productObject?.id}?_method=PUT`, {
                file: null,
            });
            fetchProductInfo();
            toast.success("Archivo eliminado correctamente");
        } catch (error) {
            toast.error("Error al eliminar el archivo");
            console.error("Error al eliminar el archivo:", error);
        }
    };

    return (
        <>
            <AnimatePresence>
                {editable && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed flex justify-center items-center w-screen h-screen bg-black bg-opacity-50 top-0 left-0 z-50"
                    >
                        <div
                            className="flex flex-col bg-white p-10 gap-5 w-[700px] max-h-[95vh] h-fit overflow-y-auto scrollbar-hide text-black"
                            action=""
                        >
                            <div className="flex flex-col gap-2">
                                <label className="font-bold" htmlFor="name">
                                    Nombre
                                </label>
                                <input
                                    value={name}
                                    onChange={(ev) => setName(ev.target.value)}
                                    className="w-full h-[45px] border pl-2"
                                    type="text"
                                    name="name"
                                    id="name"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label
                                    className="font-bold"
                                    htmlFor="description"
                                >
                                    Descripción
                                </label>
                                <textarea
                                    value={description}
                                    onChange={(ev) =>
                                        setDescription(ev.target.value)
                                    }
                                    className="w-full h-[45px] border pl-2"
                                    type="text"
                                    name="description"
                                    id="description"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="font-bold" htmlFor="category">
                                    Categoria
                                </label>
                                <select
                                    value={category_id}
                                    onChange={(ev) => {
                                        setCategory_id(ev.target.value);
                                    }}
                                    id="category"
                                    name="category"
                                    className="w-full h-[45px] border pl-2"
                                >
                                    <option value="">
                                        Seleccione una categoria
                                    </option>
                                    {categoryInfo.map((category, index) => (
                                        <option key={index} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label
                                    className="font-bold"
                                    htmlFor="sub_category"
                                >
                                    Subcategoria
                                </label>
                                <select
                                    value={sub_category_id}
                                    onChange={(ev) => {
                                        setSub_category_id(ev.target.value);
                                    }}
                                    id="sub_category"
                                    name="sub_category"
                                    className="w-full h-[45px] border pl-2"
                                >
                                    <option value="">
                                        Seleccione una subcategoria
                                    </option>
                                    {subCategoryInfo
                                        .filter(
                                            (subcategory) =>
                                                subcategory.category_id ===
                                                Number(category_id)
                                        )
                                        .map((subcategory, index) => (
                                            <option
                                                key={index}
                                                value={subcategory.id}
                                            >
                                                {subcategory.name}
                                            </option>
                                        ))}
                                </select>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="font-bold" htmlFor="file">
                                    Archivo
                                </label>
                                <input
                                    type="file"
                                    name="file"
                                    id="file"
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="font-bold" htmlFor="image">
                                    Imagen Tecnica
                                </label>
                                <input
                                    type="file"
                                    name="image"
                                    id="image"
                                    onChange={(e) =>
                                        setImage(e.target.files[0])
                                    }
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="font-bold" htmlFor="images">
                                    Imágenes de grupo
                                </label>
                                <input
                                    type="file"
                                    name="images"
                                    id="images"
                                    multiple
                                    onChange={handleFileChange}
                                />
                            </div>
                            <button
                                className="bg-blue-500 text-white py-2"
                                onClick={handleSubmit}
                            >
                                Guardar
                            </button>
                            <button
                                className="bg-red-500 text-white py-2"
                                onClick={() => setEditable(false)}
                            >
                                Cancelar
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 h-[134px]">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white max-w-[340px] overflow-x-auto ">
                    <div className="flex flex-row gap-2 max-w-[340px]">
                        {productObject?.images.map((image, index) => (
                            <div
                                className="relative flex justify-between items-center min-w-[70px] h-[100px]"
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
                                    src={image?.image_url}
                                    alt=""
                                />
                            </div>
                        ))}
                    </div>
                </td>

                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white max-w-[340px] overflow-x-auto scrollbar-hide">
                    <div className="relative flex flex-row gap-2 max-w-[340px] h-[100px]">
                        {productObject?.image_url && (
                            <>
                                <button
                                    onClick={imageToNull}
                                    className="w-full h-full bg-black bg-opacity-50 absolute"
                                >
                                    <FontAwesomeIcon
                                        icon={faTrash}
                                        size="xl"
                                        color="#ef4444"
                                    />
                                </button>
                                <img
                                    className="w-full h-full object-contain "
                                    src={productObject?.image_url}
                                    alt=""
                                />
                            </>
                        )}
                    </div>
                </td>

                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white max-w-[340px] overflow-x-auto scrollbar-hide">
                    {productObject?.file_url ? (
                        <div className="flex flex-row gap-2">
                            <button
                                className="text-blue-500"
                                onClick={downloadPDF}
                            >
                                Archivo
                            </button>
                            <button onClick={fileToNull}>
                                <FontAwesomeIcon
                                    icon={faTrash}
                                    size="base"
                                    color="#ef4444"
                                />
                            </button>
                        </div>
                    ) : (
                        <p className="text-gray-300">No hay archivo</p>
                    )}
                </td>

                <td className="px-6 py-4">
                    <p>{name}</p>
                </td>

                <td className="px-6 py-4">
                    <p>{description}</p>
                </td>

                <td className="px-6 py-4">
                    <p>{categoryName}</p>
                </td>
                <td className="px-6 py-4">
                    <p>{subCategory}</p>
                </td>
                <td className="pr-4">
                    <div className="flex flex-col gap-2">
                        <button
                            className="bg-blue-500 rounded-md text-white py-2 px-6"
                            onClick={() => setEditable(true)}
                        >
                            Editar
                        </button>
                        <button
                            onClick={deleteGroup}
                            className="bg-red-500 rounded-md text-white py-2 px-6"
                        >
                            Eliminar
                        </button>
                    </div>
                </td>
            </tr>
        </>
    );
}
