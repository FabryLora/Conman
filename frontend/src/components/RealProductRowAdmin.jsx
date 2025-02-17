import { PhotoIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { toast } from "react-toastify";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";

export default function RealProductRowAdmin({ productObject }) {
    const { productInfo, fetchRealProducts } = useStateContext();
    const [editable, setEditable] = useState(false);

    const [name, setName] = useState(productObject?.name);
    const [code, setCode] = useState(productObject?.code);
    const [price, setPrice] = useState(productObject?.price);
    const [dolarPrice, setDolarPrice] = useState(productObject?.dolar_price);
    const [discount, setDiscount] = useState(0);
    const [image, setImage] = useState();
    const [productid, setProductId] = useState(productObject?.product?.id);

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
        console.log(image);
    };

    const update = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("code", code);
        formData.append("price", price);
        formData.append("dolar_price", dolarPrice);
        formData.append("discount", 0);
        if (image) {
            formData.append("image", image);
        }

        formData.append("product_id", productid);

        try {
            await axiosClient.post(
                `/realproducts/${productObject.id}?_method=PUT`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            fetchRealProducts();
            setEditable(false);
            toast.success("Producto actualizado correctamente");
        } catch (error) {
            toast.error("Error al actualizar el producto");
            console.error("Error al actualizar:", error);
        }
    };

    const deleteProduct = async () => {
        try {
            await axiosClient.delete(`/realproducts/${productObject.id}`);
            fetchRealProducts();
            toast.success("Producto eliminado correctamente");
        } catch (error) {
            toast.error("Error al eliminar el producto");
            console.error("Error al eliminar el producto:", error);
        }
    };

    return (
        <form
            method="POST"
            onSubmit={update}
            className="table-row bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 h-[134px]"
        >
            <div className="table-cell px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white align-middle">
                {editable ? (
                    <div className="text-center items-center h-fit self-center flex flex-row justify-start gap-3">
                        <PhotoIcon
                            aria-hidden="true"
                            className="mx-auto size-12 text-gray-300"
                        />
                        <div className=" flex text-sm/6 text-gray-600">
                            <label
                                htmlFor="file-upload"
                                className="cursor-pointer text-white bg-blue-500 p-2 rounded-md"
                            >
                                Seleccionar imagen
                            </label>
                            <input
                                onChange={handleFileChange}
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                className="hidden"
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
            </div>

            <div className="table-cell px-6 py-4 align-middle">
                {editable ? (
                    <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                        value={name}
                        onChange={(ev) => setName(ev.target.value)}
                    />
                ) : (
                    name
                )}
            </div>

            <div className="table-cell px-6 py-4 align-middle">
                {editable ? (
                    <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                        value={code}
                        onChange={(ev) => setCode(ev.target.value)}
                    />
                ) : (
                    code
                )}
            </div>

            <div className="table-cell px-6 py-4 align-middle">
                {editable ? (
                    <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                        value={price}
                        onChange={(ev) => setPrice(ev.target.value)}
                    />
                ) : (
                    price
                )}
            </div>

            <div className="table-cell px-6 py-4 align-middle">
                {editable ? (
                    <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                        value={dolarPrice}
                        onChange={(ev) => setDolarPrice(ev.target.value)}
                    />
                ) : (
                    dolarPrice
                )}
            </div>

            <div className="table-cell px-6 py-4 align-middle">
                {editable ? (
                    <div className="mt-2">
                        <select
                            value={productid}
                            onChange={(ev) => setProductId(ev.target.value)}
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
            </div>

            <div className="table-cell align-middle text-white w-[150px]">
                {editable ? (
                    <div className="flex flex-col gap-2">
                        <button
                            className="bg-blue-500 rounded-md py-2"
                            onClick={() => setEditable(false)}
                        >
                            Cancelar
                        </button>
                        <button
                            className="bg-green-500 rounded-md py-2"
                            type="submit"
                        >
                            Actualizar
                        </button>
                        <div
                            className="bg-red-500 rounded-md py-2 cursor-pointer flex justify-center items-center"
                            onClick={deleteProduct}
                        >
                            Eliminar
                        </div>
                    </div>
                ) : (
                    <button
                        onClick={() => setEditable(true)}
                        className="bg-blue-500 rounded-md px-4 py-2"
                    >
                        Editar
                    </button>
                )}
            </div>
        </form>
    );
}
