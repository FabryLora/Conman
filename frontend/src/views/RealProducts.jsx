import { PhotoIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import axiosClient from "../axios";
import RealProductRowAdmin from "../components/RealProductRowAdmin";
import { useStateContext } from "../contexts/ContextProvider";

export default function RealProducts() {
    const { productInfo, fetchRealProducts, realProducts } = useStateContext();

    const [submitData, setSubmitData] = useState({
        name: "",
        code: "",
        price: "",
        discount: "",
        image: null,
        image_url: null,
        product_id: "",
    });

    const onImageChange = (ev) => {
        const file = ev.target.files[0];

        const reader = new FileReader();
        reader.onload = () => {
            console.log(reader.result);
            setSubmitData({
                ...submitData,
                image: file,
                image_url: reader.result,
            });
            ev.target.value = "";
        };
        reader.readAsDataURL(file);
    };

    const onSubmit = (ev) => {
        ev.preventDefault();

        const payload = { ...submitData };
        if (payload.image) {
            payload.image = payload.image_url;
        }
        delete payload.image_url;

        axiosClient.post("/realproducts", payload).then(() => {
            fetchRealProducts();
        });
    };

    return (
        <div className="relative overflow-x-auto">
            <form
                onSubmit={onSubmit}
                className="p-5 flex flex-col justify-between h-fit"
            >
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="col-span-full">
                                <label
                                    htmlFor="cover-photo"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    Imagen
                                </label>
                                <div className="mt-2 flex justify-between rounded-lg border border-dashed border-gray-900/25 ">
                                    <div className="flex items-center justify-start p-4 w-1/2">
                                        <div className="text-center items-center h-fit self-center flex flex-row justify-start gap-3">
                                            <PhotoIcon
                                                aria-hidden="true"
                                                className="mx-auto size-12 text-gray-300"
                                            />
                                            <div className=" flex text-sm/6 text-gray-600">
                                                <input
                                                    id="file-upload"
                                                    name="file-upload"
                                                    type="file"
                                                    onChange={onImageChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label
                                    htmlFor="name"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    Nombre
                                </label>
                                <div className="mt-2">
                                    <input
                                        value={submitData.name}
                                        onChange={(ev) => {
                                            setSubmitData({
                                                ...submitData,
                                                name: ev.target.value,
                                            });
                                        }}
                                        id="name"
                                        name="name"
                                        type="text"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label
                                    htmlFor="code"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    Codigo
                                </label>
                                <div className="mt-2">
                                    <input
                                        value={submitData.code}
                                        onChange={(ev) => {
                                            setSubmitData({
                                                ...submitData,
                                                code: ev.target.value,
                                            });
                                        }}
                                        id="code"
                                        name="code"
                                        type="text"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>
                            <div className="col-span-full">
                                <label
                                    htmlFor="price"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    Precio
                                </label>
                                <div className="mt-2">
                                    <input
                                        value={submitData.price}
                                        onChange={(ev) => {
                                            setSubmitData({
                                                ...submitData,
                                                price: ev.target.value,
                                            });
                                        }}
                                        id="price"
                                        name="price"
                                        type="text"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label
                                    htmlFor="discount"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    Descuento
                                </label>
                                <div className="mt-2">
                                    <input
                                        value={submitData.discount}
                                        onChange={(ev) => {
                                            setSubmitData({
                                                ...submitData,
                                                discount: ev.target.value,
                                            });
                                        }}
                                        id="discount"
                                        name="discount"
                                        type="text"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label
                                    htmlFor="categoria"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    Grupo de productos
                                </label>
                                <div className="mt-2">
                                    <select
                                        value={submitData.product_id}
                                        onChange={(ev) => {
                                            setSubmitData({
                                                ...submitData,
                                                product_id: ev.target.value,
                                            });
                                        }}
                                        id="categoria"
                                        name="categoria"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    >
                                        <option value="" disabled>
                                            Seleccione una categoria
                                        </option>
                                        {productInfo.map((prod, index) => (
                                            <option key={index} value={prod.id}>
                                                {prod.name}
                                            </option>
                                        ))}
                                    </select>
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
                </div>
            </form>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Imagen
                        </th>

                        <th scope="col" className="px-6 py-3">
                            Nombre
                        </th>

                        <th scope="col" className="px-6 py-3">
                            Codigo
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Precio
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Descuento
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Grupo de productos
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Editar
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {realProducts.map((info, index) => (
                        <RealProductRowAdmin key={index} productObject={info} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
