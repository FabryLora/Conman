import { PhotoIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";

export default function NosotrosAdmin() {
    const { nosotrosFirstInfo, fetchNosotrosFirstInfo } = useStateContext();

    useEffect(() => {
        fetchNosotrosFirstInfo();
    }, []);

    const [nosotrosFirst, setNosotrosFirst] = useState({
        title: nosotrosFirstInfo?.title,
        text: nosotrosFirstInfo?.text,
        image: nosotrosFirstInfo?.image,
        image_url: nosotrosFirstInfo?.image_url,
    });

    const onImageChange = (ev) => {
        const file = ev.target.files[0];

        const reader = new FileReader();
        reader.onload = () => {
            console.log(reader.result);
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
        if (payload.image) {
            payload.image = payload.image_url;
        }
        delete payload.image_url;
        axiosClient.put(`/nosotros-first/1`, payload).then(() => {
            fetchNosotrosFirstInfo();
        });
        /*
            .catch((err) => {
                if (err && err.response) {
                    const errorMessages = err.response.data.errors;
                    const messagesArray = [];

                    Object.values(errorMessages).forEach(
                        (messagesArrayField) => {
                            messagesArrayField.forEach((message) => {
                                messagesArray.push(message);
                            });
                        }
                    );
                    setSucc(false);
                    setError(translateErrorMessages(messagesArray));
                }
            }); */
    };

    return (
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
                                Titulo
                            </label>
                            <div className="mt-2">
                                <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                    <div className="shrink-0 select-none text-base text-gray-500 sm:text-sm/6"></div>
                                    <input
                                        value={nosotrosFirst?.title}
                                        onChange={(ev) => {
                                            setNosotrosFirst({
                                                ...nosotrosFirst,
                                                title: ev.target.value,
                                            });
                                        }}
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
                                    value={nosotrosFirst?.text}
                                    onChange={(ev) => {
                                        setNosotrosFirst({
                                            ...nosotrosFirst,
                                            text: ev.target.value,
                                        });
                                        console.log(nosotrosFirst.text);
                                    }}
                                    id="about"
                                    name="about"
                                    rows={3}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label
                                htmlFor="cover-photo"
                                className="block text-sm/6 font-medium text-gray-900"
                            >
                                Imagen
                            </label>
                            <div className="mt-2 flex justify-between rounded-lg border border-dashed border-gray-900/25 ">
                                <div className="h-fit">
                                    <img
                                        className=""
                                        src={nosotrosFirstInfo?.image_url}
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
                                                    onChange={onImageChange}
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

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Guardar
                </button>
            </div>
        </form>
    );
}
