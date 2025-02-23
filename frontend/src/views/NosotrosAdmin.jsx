import { ReactSummernoteLite } from "@easylogic/react-summernote-lite";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";

export default function NosotrosAdmin() {
    const { nosotrosFirstInfo, fetchNosotrosFirstInfo } = useStateContext();
    const [nosotrosFirst, setNosotrosFirst] = useState({});

    const editorRef = useRef(null); // Referencia al editor

    useEffect(() => {
        fetchNosotrosFirstInfo();
    }, []);

    useEffect(() => {
        setNosotrosFirst({
            title: nosotrosFirstInfo?.title || "",
            text: nosotrosFirstInfo?.text || "",
            image: nosotrosFirstInfo?.image,
            image_url: nosotrosFirstInfo?.image_url,
        });

        // Si el editor está inicializado, actualiza el contenido
        if (editorRef.current && nosotrosFirstInfo?.text) {
            editorRef.current.summernote("code", nosotrosFirstInfo.text);
        }
    }, [nosotrosFirstInfo]);

    const onImageChange = (ev) => {
        const file = ev.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setNosotrosFirst({
                ...nosotrosFirst,
                image: file,
                image_url: reader.result,
            });
            ev.target.value = "";
        };
        reader.readAsDataURL(file);
    };

    const update = (e) => {
        e.preventDefault();
        const payload = { ...nosotrosFirst };

        // Obtiene el contenido del editor antes de enviar
        if (editorRef.current) {
            payload.text = editorRef.current.summernote("code");
        }

        if (payload.image) {
            payload.image = payload.image_url;
        }
        delete payload.image_url;

        axiosClient
            .put(`/nosotros-first/1`, payload)
            .then(() => {
                fetchNosotrosFirstInfo();
                toast.success("Guardado correctamente");
            })
            .catch((err) => {
                toast.error("Error al guardar");
            });
    };

    useEffect(() => {
        document.body.style.overflow = "hidden"; // Desactivar scroll
        return () => {
            document.body.style.overflow = "auto"; // Restaurar scroll al desmontar
        };
    }, []);

    return (
        <div>
            <ToastContainer />
            <form
                onSubmit={update}
                className="p-5 flex flex-col justify-between h-screen"
            >
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="col-span-full">
                                <label className="block text-sm/6 font-medium text-gray-900">
                                    Texto
                                </label>
                                <div className="mt-2 min-w-[900px] prose prose-sm sm:prose lg:prose-lg xl:prose-xl">
                                    <ReactSummernoteLite
                                        className="w-full"
                                        onInit={({ note }) => {
                                            if (!editorRef.current) {
                                                editorRef.current = note; // Guarda la referencia del editor solo una vez

                                                if (nosotrosFirstInfo?.text) {
                                                    note.summernote(
                                                        "code",
                                                        nosotrosFirstInfo.text
                                                    );
                                                }
                                            }
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label className="block font-medium text-gray-900 text-xl">
                                    Imagen
                                </label>
                                <div className="mt-2 flex justify-between rounded-lg border border-dashed border-gray-900/25 h-[300px] w-[900px]">
                                    <div className="w-1/2">
                                        <img
                                            className="w-full h-full object-contain"
                                            src={nosotrosFirst.image_url}
                                            alt=""
                                        />
                                    </div>
                                    <div className="flex items-center justify-center w-1/2">
                                        <div className="text-center items-center h-fit self-center">
                                            <PhotoIcon className="mx-auto size-12 text-gray-300" />
                                            <div className="mt-4 flex text-sm text-gray-600">
                                                <label className="cursor-pointer rounded-md bg-white font-semibold text-indigo-600 hover:text-indigo-500">
                                                    <span>Cambiar Imagen</span>
                                                    <input
                                                        type="file"
                                                        onChange={onImageChange}
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
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                    >
                        Actualizar
                    </button>
                </div>
            </form>
        </div>
    );
}
