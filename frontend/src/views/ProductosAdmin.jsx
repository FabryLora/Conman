import { PhotoIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axiosClient from "../axios";
import ProductRowAdmin from "../components/ProductRowAdmin";
import { useStateContext } from "../contexts/ContextProvider";

export default function ProductosAdmin() {
    const [name, setName] = useState(""); // Nombre del producto

    // Precio
    const [images, setImages] = useState([]); // Lista de archivos seleccionados
    const [categoryId, setCategoryId] = useState("");
    const [subCategoryId, setSubCategoryId] = useState(""); // ID de la subcategoría
    // ID de la categoría
    const [principal, setPrincipal] = useState("0");
    const [searchTerm, setSearchTerm] = useState("");

    const [image, setImage] = useState();
    const [file, setFile] = useState();
    const [description, setDescription] = useState();

    const { subCategoryInfo, productInfo, categoryInfo, fetchProductInfo } =
        useStateContext();

    const handleFileChange = (e) => {
        setImages(e.target.files[0]); // Almacena los archivos seleccionados
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const prodData = new FormData();

            prodData.append("name", name);
            prodData.append("category_id", categoryId);
            if (subCategoryId) {
                prodData.append("sub_category_id", subCategoryId);
            }

            prodData.append("description", description ? description : "");
            if (image) {
                prodData.append("image", image);
            }
            if (file) {
                prodData.append("file", file);
            }

            // 1. Crear el producto
            const productResponse = await axiosClient.post(
                "/product",
                prodData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            const productId = productResponse.data.data.id; // ID del producto recién creado

            // 2. Subir imágenes
            if (images && images.length > 0) {
                const formData = new FormData();
                formData.append("principal", principal);

                formData.append("image", images); // Agregar cada archivo al FormData

                formData.append("product_id", productId); // Agregar el ID del producto

                const imageResponse = await axiosClient.post(
                    "/image",
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
            }

            console.log("Producto e imágenes creadas:", productResponse);
            toast.success("Guardado correctamente");
            fetchProductInfo();
        } catch (err) {
            toast.error("Error al guardar");
        }
    };

    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 10;
    const [paginatedProducts, setPaginatedProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const filteredProducts = productInfo.filter((product) =>
            product?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase())
        );

        const indexOfLastProduct = currentPage * productsPerPage;
        const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
        setPaginatedProducts(
            filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)
        );

        setTotalPages(Math.ceil(filteredProducts.length / productsPerPage));
    }, [currentPage, searchTerm, productInfo]);

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    return (
        <div className="relative overflow-x-auto">
            <ToastContainer />
            <form
                onSubmit={handleSubmit}
                className="p-5 flex flex-col justify-between h-fit"
            >
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="col-span-full">
                                <label
                                    htmlFor="cover-photo"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    Imagen de Portada
                                </label>
                                <div className="mt-2 flex justify-between rounded-lg border border-dashed border-gray-900/25 ">
                                    <div className="flex items-center justify-start p-4 w-1/2">
                                        <div className="text-center items-center h-fit self-center flex flex-row justify-start gap-3">
                                            <PhotoIcon
                                                aria-hidden="true"
                                                className="mx-auto size-12 text-gray-300"
                                            />
                                            <div className="items-center gap-2 flex text-sm/6 text-gray-600">
                                                <label
                                                    className="bg-indigo-600 text-white py-2 px-3 rounded-md cursor-pointer"
                                                    htmlFor="portada"
                                                >
                                                    Elegir Imagen
                                                </label>
                                                {images?.name}
                                                <input
                                                    className="hidden"
                                                    accept="image/*"
                                                    id="portada"
                                                    name="file-upload"
                                                    type="file"
                                                    onChange={handleFileChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label
                                    htmlFor="image"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    Imagen Tecnica
                                </label>
                                <div className="mt-2 flex justify-between rounded-lg border border-dashed border-gray-900/25 ">
                                    <div className="flex items-center justify-start p-4 w-1/2">
                                        <div className="text-center items-center h-fit self-center flex flex-row justify-start gap-3">
                                            <PhotoIcon
                                                aria-hidden="true"
                                                className="mx-auto size-12 text-gray-300"
                                            />
                                            <div className="items-center gap-2 flex text-sm/6 text-gray-600">
                                                <label
                                                    className="bg-indigo-600 text-white py-2 px-3 rounded-md cursor-pointer"
                                                    htmlFor="tecnica"
                                                >
                                                    Elegir Imagen
                                                </label>
                                                {image?.name}
                                                <input
                                                    className="hidden"
                                                    accept=""
                                                    id="tecnica"
                                                    name="image"
                                                    type="file"
                                                    onChange={(e) =>
                                                        setImage(
                                                            e.target.files[0]
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label
                                    htmlFor="file"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    Ficha Tecnica
                                </label>
                                <div className="mt-2 flex justify-between rounded-lg border border-dashed border-gray-900/25 ">
                                    <div className="flex items-center justify-start p-4 w-1/2">
                                        <div className="text-center items-center h-fit self-center flex flex-row justify-start gap-3">
                                            <PhotoIcon
                                                aria-hidden="true"
                                                className="mx-auto size-12 text-gray-300"
                                            />
                                            <div className="items-center gap-2 flex text-sm/6 text-gray-600">
                                                <label
                                                    className="bg-indigo-600 text-white py-2 px-3 rounded-md cursor-pointer"
                                                    htmlFor="archivo"
                                                >
                                                    Elegir Archivo
                                                </label>
                                                {file?.name}
                                                <input
                                                    className="hidden"
                                                    accept=""
                                                    id="archivo"
                                                    name="file"
                                                    type="file"
                                                    onChange={(e) =>
                                                        setFile(
                                                            e.target.files[0]
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label
                                    htmlFor="name"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    Nombre
                                    <apan className="text-red-500">*</apan>
                                </label>
                                <div className="mt-2">
                                    <input
                                        value={name}
                                        onChange={(ev) =>
                                            setName(ev.target.value)
                                        }
                                        id="name"
                                        name="name"
                                        type="text"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label
                                    htmlFor="description"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    Descripcion
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        value={description}
                                        onChange={(ev) =>
                                            setDescription(ev.target.value)
                                        }
                                        id="description"
                                        name="description"
                                        rows={4}
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label
                                    htmlFor="categoria"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    Categoria
                                    <apan className="text-red-500">*</apan>
                                </label>
                                <div className="mt-2">
                                    <select
                                        value={categoryId}
                                        onChange={(ev) =>
                                            setCategoryId(ev.target.value)
                                        }
                                        id="categoria"
                                        name="categoria"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    >
                                        <option value="" disabled>
                                            Seleccione una categoria
                                        </option>
                                        {categoryInfo.map((category, index) => (
                                            <option
                                                key={index}
                                                value={category?.id}
                                            >
                                                {category?.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label
                                    htmlFor="subcategoria"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    Sub Categoria
                                </label>
                                <div className="mt-2">
                                    <select
                                        value={subCategoryId}
                                        onChange={(ev) =>
                                            setSubCategoryId(ev.target.value)
                                        }
                                        id="subcategoria"
                                        name="subcategoria"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    >
                                        <option value="" disabled>
                                            Seleccione una sub categoria
                                        </option>
                                        {subCategoryInfo
                                            .filter(
                                                (subcategory) =>
                                                    subcategory.category_id ===
                                                    Number(categoryId)
                                            )
                                            .map((subcategory, index) => (
                                                <option
                                                    key={index}
                                                    value={subcategory?.id}
                                                >
                                                    {subcategory?.name}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Guardar
                        </button>
                    </div>
                </div>
            </form>
            <div>
                <h2 className="text-2xl font-bold p-4">Grupos de productos</h2>
                <div className="flex items-center gap-4 p-4">
                    <input
                        type="text"
                        placeholder="Buscar grupo de productos..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
                    />
                </div>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Imagenes de portada
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Imagene tecnica
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Ficha tecnica
                        </th>

                        <th scope="col" className="px-6 py-3">
                            Nombre
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Descripcion
                        </th>

                        <th scope="col" className="px-6 py-3">
                            Categoria
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Sub Categoria
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Editar
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedProducts &&
                        paginatedProducts?.map((info) => (
                            <ProductRowAdmin
                                key={info?.id}
                                productObject={info}
                                subCategory={
                                    subCategoryInfo.find(
                                        (category) =>
                                            category.id ===
                                            Number(info?.subCategory?.id)
                                    )?.name
                                }
                                categoryName={
                                    categoryInfo.find(
                                        (category) =>
                                            category.id ===
                                            Number(info?.category?.id)
                                    )?.name
                                }
                            />
                        ))}
                </tbody>
            </table>
            <div className="flex justify-center gap-4 items-center py-5 bg-gray-800 text-gray-800">
                <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                >
                    Anterior
                </button>
                <span className="text-white">
                    Página {currentPage} de {totalPages}
                </span>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
}
