import { PhotoIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";

export default function RealProductRowAdmin({ productObject }) {
    const { productInfo, fetchRealProducts } = useStateContext();
    const [editable, setEditable] = useState(false);

    const [updateData, setUpdateData] = useState({
        name: productObject?.name,
        code: productObject?.code,
        price: productObject?.price,
        discount: productObject?.discount,
        image: productObject?.image,
        product_id: productObject?.product.id,
    });

    const onImageChange = (ev) => {
        const file = ev.target.files[0];

        const reader = new FileReader();
        reader.onload = () => {
            console.log(reader.result);
            setUpdateData({
                ...updateData,
                image: file,
                image_url: reader.result,
            });
            ev.target.value = "";
        };
        reader.readAsDataURL(file);
    };

    const update = (e) => {
        e.preventDefault();
        const payload = { ...updateData };
        if (payload.image) {
            payload.image = payload.image_url;
        }
        delete payload.image_url;
        axiosClient
            .put(`/realproducts/${productObject.id}`, payload)
            .then((res) => {
                fetchRealProducts();
            });
    };

    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 h-[134px]">
            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {editable ? (
                    <div className="text-center items-center h-fit self-center flex flex-row justify-start gap-3">
                        <PhotoIcon
                            aria-hidden="true"
                            className="mx-auto size-12 text-gray-300"
                        />
                        <div className=" flex text-sm/6 text-gray-600">
                            <input
                                onChange={onImageChange}
                                id="file-upload"
                                name="file-upload"
                                type="file"
                            />
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-row overflow-x-auto scrollbar-hide gap-2">
                        <div>
                            <img
                                className="w-20"
                                src={productObject?.image_url}
                                alt=""
                            />
                        </div>
                    </div>
                )}
            </td>

            <td className="px-6 py-4">
                {editable ? (
                    <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        value={updateData?.name}
                        onChange={(ev) => {
                            setUpdateData({
                                ...updateData,
                                name: ev.target.value,
                            });
                        }}
                    />
                ) : (
                    productObject?.name
                )}
            </td>

            <td className="px-6 py-4">
                {editable ? (
                    <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        value={updateData?.code}
                        onChange={(ev) =>
                            setUpdateData({
                                ...updateData,
                                code: ev.target.value,
                            })
                        }
                    />
                ) : (
                    productObject?.code
                )}
            </td>

            <td className="px-6 py-4">
                {editable ? (
                    <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        value={updateData?.price}
                        onChange={(ev) =>
                            setUpdateData({
                                ...updateData,
                                price: ev.target.value,
                            })
                        }
                    />
                ) : (
                    productObject?.price
                )}
            </td>

            <td className="px-6 py-4">
                {editable ? (
                    <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        value={updateData?.discount}
                        onChange={(ev) =>
                            setUpdateData({
                                ...updateData,
                                discount: ev.target.value,
                            })
                        }
                    />
                ) : (
                    productObject?.discount
                )}
            </td>

            <td className="px-6 py-4">
                {editable ? (
                    <div className="mt-2">
                        <select
                            value={updateData?.product_id}
                            onChange={(ev) =>
                                setUpdateData({
                                    ...updateData,
                                    product_id: ev.target.value,
                                })
                            }
                            id="categoria"
                            name="categoria"
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        >
                            <option value="" disabled>
                                Seleccione una categoría
                            </option>
                            {productInfo.map((prod, index) => (
                                <option key={index} value={prod.id}>
                                    {prod.name}
                                </option>
                            ))}
                        </select>
                    </div>
                ) : (
                    productObject.product.name
                )}
            </td>

            <td>
                {editable ? (
                    <div className="flex flex-row gap-2">
                        <button onClick={() => setEditable(false)}>
                            Cancelar
                        </button>
                        <button onClick={update}>Guardar</button>
                    </div>
                ) : (
                    <button onClick={() => setEditable(true)} className="">
                        Editar
                    </button>
                )}
            </td>
        </tr>
    );
}
