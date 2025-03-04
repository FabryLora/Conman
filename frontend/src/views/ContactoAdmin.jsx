import { use, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";

export default function ContactoAdmin() {
    const { contactInfo, fetchContactInfo } = useStateContext();

    useEffect(() => {
        fetchContactInfo();
    }, []);

    const [contact, setContacto] = useState({
        mail: contactInfo?.mail,
        phone: contactInfo?.phone,
        wp: contactInfo?.wp,
        location: contactInfo?.location,
        ig: contactInfo?.ig,
        fb: contactInfo?.fb,
    });

    useState(() => {
        setContacto({
            mail: contactInfo?.mail,
            phone: contactInfo?.phone,
            wp: contactInfo?.wp,
            location: contactInfo?.location,
            ig: contactInfo?.ig,
            fb: contactInfo?.fb,
        });
    }, [contactInfo]);

    const submit = (ev) => {
        ev.preventDefault();

        const payload = { ...contact };

        axiosClient
            .put("/contact-info/1", payload)
            .then(() => {
                fetchContactInfo();
                toast.success("Guardado correctamente");
            })
            .catch((err) => {
                toast.error("Error al guardar");
            });
    };

    return (
        <>
            <ToastContainer />
            <form
                onSubmit={submit}
                className="p-5 flex flex-col justify-between h-screen"
            >
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <div className="mt-10 grid grid-cols-2 grid-rows-3 gap-x-6 gap-y-8 max-sm:grid-cols-1 ">
                            <div className="">
                                <label
                                    htmlFor="username"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    Mail
                                </label>
                                <div className="mt-2">
                                    <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                        <div className="shrink-0 select-none text-base text-gray-500 sm:text-sm/6"></div>
                                        <input
                                            value={contact?.mail}
                                            onChange={(ev) => {
                                                setContacto({
                                                    ...contact,
                                                    mail: ev.target.value,
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

                            <div className="">
                                <label
                                    htmlFor="username"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    Telefono
                                </label>
                                <div className="mt-2">
                                    <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                        <div className="shrink-0 select-none text-base text-gray-500 sm:text-sm/6"></div>
                                        <input
                                            value={contact?.phone}
                                            onChange={(ev) => {
                                                setContacto({
                                                    ...contact,
                                                    phone: ev.target.value,
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
                            <div className="">
                                <label
                                    htmlFor="username"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    WhatsApp
                                </label>
                                <div className="mt-2">
                                    <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                        <div className="shrink-0 select-none text-base text-gray-500 sm:text-sm/6"></div>
                                        <input
                                            value={contact?.wp}
                                            onChange={(ev) => {
                                                setContacto({
                                                    ...contact,
                                                    wp: ev.target.value,
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
                            <div className="">
                                <label
                                    htmlFor="username"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    Ubicacion
                                </label>
                                <div className="mt-2">
                                    <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                        <div className="shrink-0 select-none text-base text-gray-500 sm:text-sm/6"></div>
                                        <input
                                            value={contact?.location}
                                            onChange={(ev) => {
                                                setContacto({
                                                    ...contact,
                                                    location: ev.target.value,
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

                            <div className="">
                                <label
                                    htmlFor="username"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    Instagram
                                </label>
                                <div className="mt-2">
                                    <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                        <div className="shrink-0 select-none text-base text-gray-500 sm:text-sm/6"></div>
                                        <input
                                            value={contact?.ig}
                                            onChange={(ev) => {
                                                setContacto({
                                                    ...contact,
                                                    ig: ev.target.value,
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

                            <div className="">
                                <label className="block text-sm/6 font-medium text-gray-900">
                                    Facebook
                                </label>
                                <div className="mt-2">
                                    <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                        <div className="shrink-0 select-none text-base text-gray-500 sm:text-sm/6"></div>
                                        <input
                                            value={contact?.fb}
                                            onChange={(ev) => {
                                                setContacto({
                                                    ...contact,
                                                    fb: ev.target.value,
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
        </>
    );
}
