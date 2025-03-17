import { AnimatePresence, motion } from "motion/react";
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
        formData.append("price", price ? price : 0);
        formData.append("dolar_price", dolarPrice ? dolarPrice : 0);
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
            setEditable(false);
            toast.success("Producto eliminado correctamente");
        } catch (error) {
            toast.error("Error al eliminar el producto");
            console.error("Error al eliminar el producto:", error);
        }
    };

    return (
        <>
            <AnimatePresence>
                {editable && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-50 flex justify-center items-center text-black"
                    >
                        <form action="">
                            <div className="bg-white p-8 rounded-md">
                                <div className="flex flex-col gap-4">
                                    <label className="font-bold" htmlFor="6">
                                        Imagen
                                    </label>
                                    <input
                                        type="file"
                                        id="6"
                                        onChange={handleFileChange}
                                        className="border py-2 pl-2"
                                    />
                                    <label className="font-bold" htmlFor="1">
                                        Nombre
                                    </label>
                                    <input
                                        type="text"
                                        id="1"
                                        value={name}
                                        onChange={(ev) =>
                                            setName(ev.target.value)
                                        }
                                        className="border py-2 pl-2"
                                    />
                                    <label className="font-bold" htmlFor="2">
                                        Código
                                    </label>
                                    <input
                                        type="text"
                                        id="2"
                                        value={code}
                                        onChange={(ev) =>
                                            setCode(ev.target.value)
                                        }
                                        className="border py-2 pl-2"
                                    />
                                    <label className="font-bold" htmlFor="3">
                                        Precio
                                    </label>
                                    <input
                                        type="number"
                                        id="3"
                                        value={price}
                                        onChange={(ev) =>
                                            setPrice(ev.target.value)
                                        }
                                        className="border py-2 pl-2"
                                    />
                                    <label className="font-bold" htmlFor="4">
                                        Precio en dólares
                                    </label>
                                    <input
                                        type="number"
                                        id="4"
                                        value={dolarPrice}
                                        onChange={(ev) =>
                                            setDolarPrice(ev.target.value)
                                        }
                                        className="border py-2 pl-2"
                                    />
                                    <label className="font-bold" htmlFor="5">
                                        Grupo de productos
                                    </label>
                                    <select
                                        value={productid}
                                        onChange={(ev) =>
                                            setProductId(ev.target.value)
                                        }
                                        id="5"
                                        name="productid"
                                        className="border py-2 pl-2"
                                    >
                                        <option value="" disabled>
                                            Seleccione una categoría
                                        </option>
                                        {productInfo.map((prod, index) => (
                                            <option key={index} value={prod.id}>
                                                {prod?.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex flex-col w-full gap-4 text-white pt-4">
                                    <button
                                        type="button"
                                        className="bg-red-500 rounded-md py-2 order-2"
                                        onClick={() => setEditable(false)}
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        className="bg-green-500 rounded-md py-2 order-1"
                                        type="submit"
                                        onClick={update}
                                    >
                                        Actualizar
                                    </button>
                                </div>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="table-row bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 h-[134px]">
                <div className="table-cell px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white align-middle">
                    <div className="flex flex-row overflow-x-auto scrollbar-hide gap-2">
                        <div>
                            <img
                                className="w-20"
                                src={productObject?.image_url}
                                alt=""
                            />
                        </div>
                    </div>
                </div>

                <div className="table-cell px-6 py-4 align-middle">
                    <p>{name}</p>
                </div>

                <div className="table-cell px-6 py-4 align-middle">
                    <p>{code}</p>
                </div>

                <div className="table-cell px-6 py-4 align-middle">
                    <p>${price}</p>
                </div>

                <div className="table-cell px-6 py-4 align-middle">
                    <p>${dolarPrice}</p>
                </div>

                <div className="table-cell px-6 py-4 align-middle">
                    <p>{productObject?.product?.name}</p>
                </div>

                <div className="table-cell align-middle text-white w-[150px] pr-4">
                    <div className="flex flex-col gap-3">
                        <button
                            type="button"
                            onClick={() => setEditable(true)}
                            className="bg-blue-500 rounded-md px-4 py-2"
                        >
                            Editar
                        </button>
                        <button
                            onClick={deleteProduct}
                            type="button"
                            className="bg-red-500 rounded-md px-4 py-2"
                        >
                            Eliminar
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
