import { ReactSummernoteLite } from "@easylogic/react-summernote-lite";
import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ToastContainer, toast } from "react-toastify";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";

export default function ContenidoAdmin() {
    const {
        logos,
        fetchLogos,
        nosotrosInicio,
        fetchNosotrosInicio,
        calidadInicio,
        fetchCalidadInicio,
    } = useStateContext();

    const [principal, setPrincipal] = useState(null);
    const [secundario, setSecundario] = useState(null);
    const [title, setTitle] = useState(nosotrosInicio?.title || "");
    const [textNosotros, setTextNosotros] = useState(
        nosotrosInicio?.text || ""
    );
    const [image, setImage] = useState(null);
    const [textCalidad, setTextCalidad] = useState(calidadInicio?.text || "");
    const [calidadTitle, setCalidadTitle] = useState(
        calidadInicio?.title || ""
    );
    const [imageOne, setImageOne] = useState(null);
    const [imageTwo, setImageTwo] = useState(null);

    useEffect(() => {
        fetchLogos();
        fetchNosotrosInicio();
        fetchCalidadInicio();
    }, []);

    useEffect(() => {
        setTitle(nosotrosInicio?.title || "");
        setTextNosotros(nosotrosInicio?.text || "");
        setTextCalidad(calidadInicio?.text || "");
        setTextNosotros(nosotrosInicio?.text || "");
    }, [nosotrosInicio, calidadInicio]);

    const updateAll = async (e) => {
        e.preventDefault();

        try {
            if (principal || secundario) {
                const formDataLogos = new FormData();
                if (principal) formDataLogos.append("principal", principal);
                if (secundario) formDataLogos.append("secundario", secundario);
                await axiosClient.post(`/logos/1?_method=PUT`, formDataLogos, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                fetchLogos();
            }

            if (
                title !== nosotrosInicio?.title ||
                textNosotros !== nosotrosInicio?.text ||
                image
            ) {
                const formDataNosotros = new FormData();
                formDataNosotros.append("title", title);
                formDataNosotros.append("text", textNosotros);
                if (image) formDataNosotros.append("image", image);
                await axiosClient.post(
                    `/nosotrosinicio/1?_method=PUT`,
                    formDataNosotros,
                    {
                        headers: { "Content-Type": "multipart/form-data" },
                    }
                );
                fetchNosotrosInicio();
            }

            if (
                textCalidad !== calidadInicio?.text ||
                imageOne ||
                imageTwo ||
                calidadTitle !== calidadInicio?.title
            ) {
                const formDataCalidad = new FormData();
                formDataCalidad.append("title", calidadTitle);
                formDataCalidad.append("text", textCalidad);
                if (imageOne) formDataCalidad.append("imageOne", imageOne);
                if (imageTwo) formDataCalidad.append("imageTwo", imageTwo);
                await axiosClient.post(
                    `/calidadinicio/1?_method=PUT`,
                    formDataCalidad,
                    {
                        headers: { "Content-Type": "multipart/form-data" },
                    }
                );
                fetchCalidadInicio();
            }

            toast.success("Guardado correctamente");
        } catch (err) {
            toast.error("Error al guardar");
        }
    };

    return (
        <div className="p-5">
            <ToastContainer />
            <form
                onSubmit={updateAll}
                className="flex flex-col gap-10 space-y-6"
            >
                {/* Sección Logos */}
                <h2 className="text-3xl ">Logos</h2>
                <div className="flex flex-row gap-5 w-full">
                    {/* Logo Principal */}

                    <div className="flex flex-row items-center space-x-4 border p-3 border-dashed w-full shadow-md">
                        <div className="w-full flex justify-center items-center">
                            <img
                                className="w-32 h-32 object-contain"
                                src={logos?.principal_url}
                                alt="Logo Principal"
                            />
                            <input
                                type="file"
                                onChange={(e) =>
                                    setPrincipal(e.target.files[0])
                                }
                                id="principal"
                                className="hidden"
                            />
                        </div>
                        <div className="relative w-full flex justify-center items-center">
                            <label
                                htmlFor="principal"
                                className="bg-primary-blue text-white py-1 px-2 rounded-md cursor-pointer"
                            >
                                Elegir imagen
                            </label>
                            <p className="absolute -bottom-10">
                                {secundario?.name}
                            </p>
                        </div>
                    </div>
                    {/* Logo Secundario */}
                    <div className="flex flex-row items-center  space-x-4 border p-3 border-dashed w-full shadow-md">
                        <div className="w-full flex justify-center items-center">
                            <img
                                className="w-32 h-32 object-contain"
                                src={logos?.secundario_url}
                                alt="Logo Secundario"
                            />
                            <input
                                type="file"
                                onChange={(e) =>
                                    setSecundario(e.target.files[0])
                                }
                                id="secundario"
                                className="hidden"
                            />
                        </div>
                        <div className="relative w-full flex justify-center items-center">
                            <label
                                htmlFor="secundario"
                                className="bg-primary-blue text-white py-1 px-2 rounded-md cursor-pointer"
                            >
                                Elegir imagen
                            </label>
                            <p className="absolute -bottom-10">
                                {secundario?.name}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Sección Nosotros */}
                <div className="flex flex-col gap-10">
                    <h2 className="text-3xl">Nosotros</h2>
                    <ReactQuill
                        value={textNosotros}
                        onChange={setTextNosotros}
                        className="border rounded-lg"
                        theme="snow"
                    />

                    <div className="flex flex-row items-center space-x-4 border p-3 border-dashed w-full shadow-md">
                        <div className="w-full flex justify-center items-center">
                            <img
                                className="w-32 h-32 object-contain"
                                src={nosotrosInicio?.image_url}
                                alt="Logo Principal"
                            />
                            <input
                                type="file"
                                onChange={(e) => setImage(e.target.files[0])}
                                id="nosotros"
                                className="hidden"
                            />
                        </div>
                        <div className="relative w-full flex justify-center items-center">
                            <label
                                htmlFor="nosotros"
                                className="bg-primary-blue text-white py-1 px-2 rounded-md cursor-pointer"
                            >
                                Elegir imagen
                            </label>
                            <p className="absolute -bottom-10">{image?.name}</p>
                        </div>
                    </div>
                </div>

                {/* Sección Calidad */}
                <div className="flex flex-col gap-5 border-b">
                    <h2 className="text-3xl">Calidad</h2>
                    <p className="text-xl">Titulo:</p>
                    <input
                        type="text"
                        value={calidadTitle}
                        onChange={(e) => setCalidadTitle(e.target.value)}
                        className="border py-1 pl-2 shadow-md"
                    />
                    <p className="text-xl">Descripcion:</p>
                    <ReactQuill
                        value={textCalidad}
                        onChange={setTextCalidad}
                        className="border rounded-lg"
                        theme="snow"
                    />
                    <p className="text-xl">Logos:</p>
                    <div className="flex flex-row gap-5 w-full">
                        {/* Logo Principal */}
                        <div className="flex flex-row items-center space-x-4 border p-3 border-dashed w-full shadow-md">
                            <div className="w-full flex justify-center items-center">
                                <img
                                    className="w-32 h-32 object-contain"
                                    src={calidadInicio?.imageOne}
                                    alt="Logo 1"
                                />
                                <input
                                    type="file"
                                    onChange={(e) =>
                                        setImageOne(e.target.files[0])
                                    }
                                    id="imageOne"
                                    className="hidden"
                                />
                            </div>
                            <div className="relative w-full flex justify-center items-center">
                                <label
                                    htmlFor="imageOne"
                                    className="bg-primary-blue text-white py-1 px-2 rounded-md cursor-pointer"
                                >
                                    Elegir imagen
                                </label>
                                <p className="absolute -bottom-10">
                                    {imageOne?.name}
                                </p>
                            </div>
                        </div>
                        {/* Logo Secundario */}
                        <div className="flex flex-row items-center  space-x-4 border p-3 border-dashed w-full shadow-md">
                            <div className="w-full flex justify-center items-center">
                                <img
                                    className="w-32 h-32 object-contain"
                                    src={calidadInicio?.imageTwo}
                                    alt="logo 2"
                                />
                                <input
                                    type="file"
                                    onChange={(e) =>
                                        setImageTwo(e.target.files[0])
                                    }
                                    id="imageTwo"
                                    className="hidden"
                                />
                            </div>
                            <div className="relative w-full flex justify-center items-center">
                                <label
                                    htmlFor="imageTwo"
                                    className="bg-primary-blue text-white py-1 px-2 rounded-md cursor-pointer"
                                >
                                    Elegir imagen
                                </label>
                                <p className="absolute -bottom-10">
                                    {imageTwo?.name}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Botón de Guardado */}
                <button
                    type="submit"
                    className="bg-primary-blue w-fit self-end text-white p-2 rounded-md"
                >
                    Actualizar
                </button>
            </form>
        </div>
    );
}
