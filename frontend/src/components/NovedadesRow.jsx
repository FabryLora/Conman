import { PhotoIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "react-toastify";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";

export default function NovedadesRow({ novedadesObject }) {
    const { fetchNovedades } = useStateContext();
    const [editable, setEditable] = useState(false);

    // Precio
    const [image, setImage] = useState();
    const [title, setTitle] = useState(novedadesObject.title);
    const [text, setText] = useState(novedadesObject.text);
    const [featured, setFeatured] = useState(novedadesObject.featured ? 1 : 0);

    const handleFileChange = (e) => {
        setImage(e.target.files[0]); // Almacena los archivos seleccionados
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("text", text);
        formData.append("featured", featured ? 1 : 0);
        if (image) {
            formData.append("image", image);
        }

        try {
            // 1. Crear el producto
            const productResponse = await axiosClient.post(
                `/novedades/${novedadesObject.id}?_method=PUT`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            // ID del producto recién creado

            // 2. Subir imágenes

            console.log("Producto e imágenes creadas:", productResponse);

            fetchNovedades();

            toast.success("Guardado correctamente");
            setEditable(false);
        } catch (error) {
            console.error("Error al crear el producto:", error);
            toast.error("Error al guardar");
        }
    };

    const deleteGroup = async () => {
        try {
            await axiosClient.delete(`/novedades/${novedadesObject.id}`);
            fetchNovedades();
            toast.success("Novedad eliminada correctamente");
        } catch (error) {
            toast.error("Error al eliminar la novedad");
            console.error("Error al eliminar la novcedad:", error);
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
                                    Titulo
                                </label>
                                <input
                                    value={title}
                                    onChange={(ev) => setTitle(ev.target.value)}
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
                                    Descripcion
                                </label>
                                <textarea
                                    value={text}
                                    onChange={(ev) => setText(ev.target.value)}
                                    className="w-full border pl-2"
                                    type="text"
                                    name="description"
                                    id="description"
                                    rows={10}
                                />
                            </div>

                            <div className="flex items-start flex-col gap-2">
                                <label className="font-bold" htmlFor="images">
                                    Destacado
                                </label>
                                <div className="flex flex-row gap-2">
                                    <input
                                        id="2"
                                        type="checkbox"
                                        checked={featured}
                                        onChange={(e) =>
                                            setFeatured(e.target.checked)
                                        }
                                    />
                                    <label htmlFor="2">
                                        Marcar esta casilla si quiere que la
                                        novedad se vea en el inicio
                                    </label>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="font-bold" htmlFor="images">
                                    Imágen de portada
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
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white max-w-[340px] overflow-x-auto">
                    <div className="flex flex-row gap-2">
                        <div className="relative flex justify-between items-center h-[100px]">
                            <img
                                className="w-full h-full object-cover"
                                src={novedadesObject.image_url}
                                alt=""
                            />
                        </div>
                    </div>
                </td>

                <td className="px-6 py-4">
                    <p>{novedadesObject?.title}</p>
                </td>

                <td className="px-6 py-4">
                    <p className="overflow-hidden max-w-[200px] max-h-[100px]">
                        {novedadesObject?.text}...
                    </p>
                </td>

                <td className="px-6 py-4 text-center">
                    {novedadesObject.featured ? "Si" : "No"}
                </td>

                <td>
                    <button
                        className="bg-blue-500 rounded-md text-white py-2 px-6"
                        onClick={() => setEditable(true)}
                    >
                        Editar
                    </button>
                </td>
            </tr>
        </>
    );
}
