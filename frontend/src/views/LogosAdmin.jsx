import { PhotoIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";

export default function LogosAdmin() {
    const { logos, fetchLogos } = useStateContext();

    const [principal, setPrincipal] = useState();
    const [secundario, setSecundario] = useState();

    const [error, setError] = useState(false);
    const [succ, setSucc] = useState(false);

    const update = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        if (principal) {
            formData.append("principal", principal);
        }
        if (secundario) {
            formData.append("secundario", secundario);
        }

        try {
            await axiosClient.post(`/logos/1?_method=PUT`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            fetchLogos();
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
                            <div className="col-span-full">
                                <label
                                    htmlFor="logoprincipal"
                                    className="block font-medium text-gray-900 text-xl"
                                >
                                    Logo Principal
                                </label>
                                <div className="mt-2 flex justify-between rounded-lg border border-dashed border-gray-900/25 ">
                                    <div className=" w-1/2">
                                        <img
                                            className="w-full h-full object-contain"
                                            src={logos?.principal_url}
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
                                                    htmlFor="logoprincipal"
                                                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                                >
                                                    <span>Cambiar Imagen</span>
                                                    <input
                                                        id="logoprincipal"
                                                        name="logoprincipal"
                                                        onChange={(e) =>
                                                            setPrincipal(
                                                                e.target
                                                                    .files[0]
                                                            )
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

                            <div className="col-span-full">
                                <label
                                    htmlFor="secundario"
                                    className="block font-medium text-gray-900 text-xl"
                                >
                                    Logo Secundario
                                </label>
                                <div className="mt-2 flex justify-between rounded-lg border border-dashed border-gray-900/25 ">
                                    <div className=" w-1/2">
                                        <img
                                            className="w-full h-full object-contain"
                                            src={logos?.secundario_url}
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
                                                    htmlFor="secundario"
                                                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                                >
                                                    <span>Cambiar Imagen</span>
                                                    <input
                                                        id="secundario"
                                                        name="secundario"
                                                        onChange={(e) =>
                                                            setSecundario(
                                                                e.target
                                                                    .files[0]
                                                            )
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
