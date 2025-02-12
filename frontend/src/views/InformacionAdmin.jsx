import { useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";

export default function InformacionAdmin() {
    const { pedidosInfo } = useStateContext();

    const [text, setText] = useState();
    const [descuento, setDescuento] = useState();

    useEffect(() => {
        setText(pedidosInfo?.informacion);
        setDescuento(pedidosInfo?.descuento);
    }, [pedidosInfo]);

    const update = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("informacion", text);
        formData.append("descuento", descuento);

        try {
            const response = await axiosClient.post(
                "/pedidosinformacion/1?_method=PUT",
                formData
            );
            console.log(response);
            toast.success("Informacion actualizada correctamente");
        } catch (error) {
            console.error(error);
            toast.error("Error al actualizar la informacion");
        }
    };

    return (
        <>
            <ToastContainer />
            <form
                onSubmit={update}
                className="p-5 flex flex-col justify-between h-screen"
            >
                <div className="col-span-full">
                    <label
                        htmlFor="about"
                        className="block text-sm/6 font-medium text-gray-900"
                    >
                        Informacion Importante
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
                    <label
                        htmlFor="descuento"
                        className="block text-sm/6 font-medium text-gray-900 pt-2"
                    >
                        Descuento
                    </label>
                    <div className="mt-2">
                        <input
                            value={descuento}
                            onChange={(e) => setDescuento(e.target.value)}
                            id="descuento"
                            name="descuento"
                            type="text"
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
        </>
    );
}
