import { PhotoIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";

export default function ValoresAdmin() {
    const { nosotrosSecond, fetchNosotrosSecond } = useStateContext();

    const [mision, setMision] = useState();
    const [vision, setVision] = useState();
    const [sustentabilidad, setSustentabilidad] = useState();

    useEffect(() => {
        setMision(nosotrosSecond?.mision);
        setVision(nosotrosSecond?.vision);
        setSustentabilidad(nosotrosSecond?.sustentabilidad);
    }, [nosotrosSecond]);

    const [error, setError] = useState(false);
    const [succ, setSucc] = useState(false);

    const update = async (e) => {
        e.preventDefault();

        try {
            await axiosClient.post(`/nosotrossecond/1?_method=PUT`, {
                mision,
                vision,
                sustentabilidad,
            });

            fetchNosotrosSecond();
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
                                    htmlFor="mision"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    Mision
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        value={mision}
                                        onChange={(e) =>
                                            setMision(e.target.value)
                                        }
                                        id="mision"
                                        name="mision"
                                        rows={4}
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label
                                    htmlFor="vision"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    Vision
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        value={vision}
                                        onChange={(e) =>
                                            setVision(e.target.value)
                                        }
                                        id="vision"
                                        name="vision"
                                        rows={4}
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label
                                    htmlFor="sustentabilidad"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    Sustentabilidad
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        value={sustentabilidad}
                                        onChange={(e) =>
                                            setSustentabilidad(e.target.value)
                                        }
                                        id="sustentabilidad"
                                        name="sustentabilidad"
                                        rows={4}
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
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
