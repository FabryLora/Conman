import { useState } from "react";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";

export default function CategoryInicioCard({ categoryObject }) {
    const [name, setName] = useState(categoryObject.name); // Nombre del producto

    // Precio
    const [image, setImage] = useState(); // Lista de archivos seleccionados
    const [link, setLink] = useState(categoryObject.link);

    const { fetchCategoriasInicio } = useStateContext();

    const handleFileChange = (e) => {
        setImage(e.target.files[0]); // Almacena los archivos seleccionados
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // 2. Subir imágenes
            const formData = new FormData();

            formData.append("name", name);
            formData.append("link", link);
            formData.append("image", image);

            const imageResponse = await axiosClient.post(
                `/categoriasinicio/${categoryObject.id}?_method=PUT`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log(imageResponse);
            alert("Producto creado con éxito.");
            fetchCategoriasInicio();
        } catch (error) {
            console.error("Error al crear el producto:", error);
            alert("Hubo un error al crear el producto.");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="p-5 flex flex-col justify-between h-fit w-1/2 border my-10"
        >
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="col-span-full">
                            <label
                                htmlFor="cover-photo"
                                className="block text-sm/6 font-medium text-gray-900"
                            >
                                Imagen
                            </label>
                            <div className="mt-2 flex justify-between rounded-lg border border-dashed border-gray-900/25 ">
                                <div className="flex items-center justify-start p-4 w-1/2">
                                    <div className="text-center items-center h-fit self-center flex flex-row justify-start gap-3">
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
                                </div>
                                <div className="w-[100px] h-[100px]">
                                    <img
                                        className="w-full h-full object-cover"
                                        src={categoryObject?.image_url}
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label
                                htmlFor="name"
                                className="block text-sm/6 font-medium text-gray-900"
                            >
                                Nombre
                            </label>
                            <div className="mt-2">
                                <input
                                    value={name}
                                    onChange={(ev) => setName(ev.target.value)}
                                    id="name"
                                    name="name"
                                    type="text"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label
                                htmlFor="link"
                                className="block text-sm/6 font-medium text-gray-900"
                            >
                                Link
                            </label>
                            <div className="mt-2">
                                <input
                                    value={link}
                                    onChange={(ev) => setLink(ev.target.value)}
                                    id="link"
                                    name="link"
                                    type="text"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
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
    );
}
