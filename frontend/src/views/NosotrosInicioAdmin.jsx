import { PhotoIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";

export default function NosotrosInicioAdmin() {
    const { nosotrosInicio, fetchNosotrosInicio } = useStateContext();

    const [title, setTitle] = useState();
    const [text, setText] = useState();
    const [image, setImage] = useState();
    console.log(image);

    useEffect(() => {
        setTitle(nosotrosInicio.title);
        setText(nosotrosInicio.text);
    }, [nosotrosInicio]);

    const [error, setError] = useState(false);
    const [succ, setSucc] = useState(false);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const update = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("text", text);
        if (image !== undefined) {
            formData.append("image", image);
        }

        try {
            await axiosClient.post(`/nosotrosinicio/1?_method=PUT`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            fetchNosotrosInicio();
            setSucc(true);
        } catch (err) {
            if (err && err.response) {
                const errorMessages = err.response.data.errors;
                const messagesArray = [];

                Object.values(errorMessages).forEach((messagesArrayField) => {
                    messagesArrayField.forEach((message) => {
                        let translatedMessage = message;
                        if (message === "The title field is required.") {
                            translatedMessage =
                                "El campo título no puede estar vacío.";
                        } else if (message === "The text field is required.") {
                            translatedMessage =
                                "El campo texto no puede estar vacío.";
                        } else if (message === "The image field is required.") {
                            translatedMessage =
                                "El campo imagen no puede estar vacío.";
                        }
                        messagesArray.push(translatedMessage);
                    });
                });
                setSucc(false);
                setError(messagesArray);
            }
        }
    };

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError(null);
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    useEffect(() => {
        if (succ) {
            const timer = setTimeout(() => {
                setSucc(null);
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [succ]);

    return (
        <div className="">
            {error && (
                <div className="fixed top-10 left-[55%] bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    {error.map((errMsg, index) => (
                        <p key={index}>{errMsg}</p>
                    ))}
                </div>
            )}
            {succ && (
                <div className="fixed top-10 left-[55%] bg-green-100 border-l-4 border-green-500 text-green-700 p-4">
                    <p className="font-bold">Guardado correctamente</p>
                </div>
            )}
            <form
                onSubmit={update}
                className="p-5 flex flex-col justify-between h-screen"
            >
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label
                                    htmlFor="username"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    Título
                                </label>
                                <div className="mt-2">
                                    <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                        <div className="shrink-0 select-none text-base text-gray-500 sm:text-sm/6"></div>
                                        <input
                                            value={title}
                                            onChange={(e) =>
                                                setTitle(e.target.value)
                                            }
                                            id="username"
                                            name="username"
                                            type="text"
                                            className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label
                                    htmlFor="about"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    Texto
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        value={text}
                                        onChange={(e) =>
                                            setText(e.target.value)
                                        }
                                        id="about"
                                        name="about"
                                        rows={10}
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label
                                    htmlFor="cover-photo"
                                    className="block font-medium text-gray-900 text-xl"
                                >
                                    Imagen
                                </label>
                                <div className="mt-2 flex justify-between rounded-lg border border-dashed border-gray-900/25 ">
                                    <div className=" w-1/2">
                                        <img
                                            className="w-full h-full object-contain"
                                            src={nosotrosInicio?.image_url}
                                            alt=""
                                        />
                                    </div>
                                    <div className="flex items-center justify-center w-1/2">
                                        <div className="text-center items-center h-fit self-center">
                                            <PhotoIcon
                                                aria-hidden="true"
                                                className="mx-auto size-12 text-gray-300"
                                            />
                                            <div className="mt-4 flex text-sm/6 text-gray-600">
                                                <label
                                                    htmlFor="file-upload"
                                                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                                >
                                                    <span>Cambiar Imagen</span>
                                                    <input
                                                        id="file-upload"
                                                        name="file-upload"
                                                        onChange={
                                                            handleImageChange
                                                        }
                                                        type="file"
                                                        className="sr-only"
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6 pb-10">
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Actualizar
                    </button>
                </div>
            </form>
        </div>
    );
}
