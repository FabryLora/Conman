import { useEffect, useState } from "react";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";

export default function CalidadInicioAdmin() {
    const { calidadInicio, fetchCalidadInicio } = useStateContext();

    const [error, setError] = useState(false);
    const [succ, setSucc] = useState(false);
    const [text, setText] = useState();

    useEffect(() => {
        setText(calidadInicio.text);
    }, [calidadInicio]);

    const update = async (e) => {
        e.preventDefault();

        try {
            await axiosClient.post(`/calidadinicio/1?_method=PUT`, {
                text: text,
            });

            fetchCalidadInicio();
            setSucc(true);
        } catch (err) {
            if (err && err.response) {
                const errorMessages = err.response.data.errors;
                const messagesArray = [];

                Object.values(errorMessages).forEach((messagesArrayField) => {
                    messagesArrayField.forEach((message) => {
                        let translatedMessage = message;

                        if (message === "The text field is required.") {
                            translatedMessage =
                                "El campo texto no puede estar vacío.";
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
        <div>
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
                className="p-5 flex flex-col justify-between h-screen"
                onSubmit={update}
            >
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
                            onChange={(e) => setText(e.target.value)}
                            id="about"
                            name="about"
                            rows={10}
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6 pb-10">
                        <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Actualizar
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
