import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import ReactDOMServer from "react-dom/server";

import { Link, useLocation } from "react-router-dom";
import axiosClient from "../axios";
import PedidoTemplate from "../components/PedidoTemplate";
import ProductRow from "../components/ProductRow";
import { useStateContext } from "../contexts/ContextProvider";

export default function Pedidos() {
    const { cart, clearCart, userInfo } = useStateContext();

    const [selected, setSelected] = useState("retiro");
    const [fileName, setFileName] = useState("Seleccionar archivo");
    const [subtotal, setSubtotal] = useState();
    const [subtotalDescuento, setSubtotalDescuento] = useState();
    const [descuento, setDescuento] = useState();
    const [iva, setIva] = useState();
    const [totalFinal, setTotalFinal] = useState();
    const [mensaje, setMensaje] = useState("");
    const [archivo, setArchivo] = useState(null);
    const [tipo_entrega, setTipo_entrega] = useState("retiro cliente");

    const loacation = useLocation();

    console.log(location);

    useEffect(() => {
        const total = cart.reduce((acc, prod) => {
            return acc + prod.price * prod.additionalInfo.cantidad;
        }, 0);
        setSubtotal(total.toFixed(2));

        const condescuento = total * 0.97;
        setSubtotalDescuento(condescuento.toFixed(2));
        const iva = condescuento * 0.21;
        setIva(iva.toFixed(2));
        const descuento = total * 0.03;
        setDescuento(descuento.toFixed(2));
        const totalFinal = condescuento + iva;
        setTotalFinal(totalFinal.toFixed(2));
    }, [cart]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
            setArchivo(file);
            console.log(file);
        } else {
            setFileName("Seleccionar archivo");
        }
    };

    const sendEmail = async (e) => {
        e.preventDefault();

        const payload = { ...formData };

        const htmlContent = ReactDOMServer.renderToString(
            <PedidoTemplate info={payload} />
        );

        try {
            const response = await axiosClient.post("/sendpedido", {
                html: htmlContent,
            });
            console.log("Correo enviado:", response.data);
        } catch (error) {
            console.error("Error al enviar el correo:", error);
        }
    };

    useEffect(() => {
        setArchivo(archivo);
        setMensaje(mensaje);
        setTipo_entrega(tipo_entrega);
    }, [archivo, mensaje, tipo_entrega]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("mensaje", mensaje);
        if (archivo !== null) {
            formData.append("archivo", archivo);
        }

        formData.append("tipo_entrega", tipo_entrega);
        formData.append("subtotal", subtotal);
        formData.append("descuento", descuento);
        formData.append("subtotaldescuento", subtotalDescuento);
        formData.append("iva", iva);
        formData.append("total", totalFinal);

        try {
            const response = await axiosClient.post("/pedidos", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            const pedidoId = response.data.data.id;

            cart.forEach((prod) => {
                const formProds = new FormData();
                formProds.append(
                    "image",
                    prod.image_url.split("http://localhost:8000/storage/")[1]
                );
                // Para producción
                /* formProds.append(
                    "image",
                    prod.image_url.split(`${location.origin}/storage/`)[1]
                ); */
                formProds.append("name", prod.name);
                formProds.append("price", prod.price);
                formProds.append("cantidad", prod.additionalInfo.cantidad);
                formProds.append("code", prod.code);
                formProds.append("discount", prod.discount);
                formProds.append(
                    "price_discount",
                    prod.additionalInfo.descuento
                );
                formProds.append("pedido_id", pedidoId);

                axiosClient.post(`/prodpedidos`, formProds, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
            });

            const htmlContent = ReactDOMServer.renderToString(
                <PedidoTemplate
                    cart={cart}
                    extraInfo={{
                        mensaje: mensaje,
                        tipo_entrega: tipo_entrega,
                        subtotal: subtotal,
                        descuento: descuento,
                        subtotalDescuento: subtotalDescuento,
                        iva: iva,
                        total: totalFinal,
                    }}
                    user={userInfo}
                />
            );

            const responseMail = await axiosClient.post("/sendpedido", {
                html: htmlContent,
            });
            console.log(responseMail);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="w-[80%] mx-auto py-20 grid grid-cols-2 gap-10">
            <div className="grid  w-full  items-start col-span-2">
                <div className="grid grid-cols-8 items-center justify-center bg-[#F5F5F5] h-[52px] text-center font-semibold">
                    <p></p>
                    <p className="text-left">Codigo</p>
                    <p className="text-left">Producto</p>
                    <p>Precio x un.</p>
                    <p>Descuento</p>
                    <p>Precio con %</p>
                    <p>cantidad</p>
                    <p></p>
                </div>

                <div className="h-[300px] overflow-y-auto">
                    <AnimatePresence>
                        {cart.map((prod, index) => (
                            <motion.div
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                key={index}
                            >
                                <ProductRow product={prod} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
            <div className="col-span-2">
                <div className="">
                    <Link
                        to={"/privado/productos"}
                        className="h-[47px] border border-primary-red text-primary-red font-semibold py-2 px-5"
                    >
                        SEGUIR COMPRANDO
                    </Link>
                </div>
            </div>

            <div className="h-[206px] border">
                <div className="bg-[#EAEAEA]">
                    <h2 className="p-3 text-xl font-bold">
                        Informacion importante
                    </h2>
                </div>
                <p className="p-5">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Sint dolores dignissimos itaque libero non eum possimus
                    alias quibusdam, a, reiciendis vel unde dicta sunt
                    voluptatum impedit asperiores cumque qui! Quos!
                </p>
            </div>
            <div className="w-full border bg-gray-50">
                <div className="bg-[#EAEAEA] p-3">
                    <h2 className="text-lg font-semibold">Entrega</h2>
                </div>

                <div className="space-y-3 p-4">
                    {/* Opción: Retiro Cliente */}
                    <div
                        className={`flex items-center justify-between p-3 rounded-lg  cursor-pointer`}
                        onClick={() => {
                            setSelected("retiro");
                            setTipo_entrega("retiro cliente");
                        }}
                    >
                        <div className="flex items-center gap-3">
                            <div
                                className={`w-5 h-5 rounded-full border-2 ${
                                    selected === "retiro"
                                        ? "border-red-500 flex items-center justify-center"
                                        : "border-gray-400"
                                }`}
                            >
                                {selected === "retiro" && (
                                    <div className="w-[10px] h-[10px] bg-red-500 rounded-full"></div>
                                )}
                            </div>
                            <label className="cursor-pointer">
                                Retiro cliente
                            </label>
                        </div>
                        <span className="text-green-600 font-medium">
                            3% descuento
                        </span>
                    </div>

                    {/* Opción: Reparto Conman */}
                    <div
                        className={`flex items-center p-3 rounded-lg  cursor-pointer`}
                        onClick={() => {
                            setSelected("reparto");
                            setTipo_entrega("Reparto Conman");
                        }}
                    >
                        <div className="flex items-center gap-3">
                            <div
                                className={`w-5 h-5 rounded-full border-2 ${
                                    selected === "reparto"
                                        ? "border-red-500 flex items-center justify-center"
                                        : "border-gray-400"
                                }`}
                            >
                                {selected === "reparto" && (
                                    <div className="w-[10px] h-[10px] bg-red-500 rounded-full"></div>
                                )}
                            </div>
                            <label className="cursor-pointer">
                                Reparto Conman
                            </label>
                        </div>
                    </div>

                    {/* Opción: A convenir */}
                    <div
                        className={`flex items-center p-3 rounded-lg  cursor-pointer`}
                        onClick={() => {
                            setSelected("acon");
                            setTipo_entrega("A Convenir");
                        }}
                    >
                        <div className="flex items-center gap-3">
                            <div
                                className={`w-5 h-5 rounded-full border-2 ${
                                    selected === "acon"
                                        ? "border-red-500 flex items-center justify-center"
                                        : "border-gray-400"
                                }`}
                            >
                                {selected === "acon" && (
                                    <div className="w-[10px] h-[10px] bg-red-500 rounded-full"></div>
                                )}
                            </div>
                            <label className="cursor-pointer">A Convenir</label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-[206px] flex flex-col gap-3">
                <div className="">
                    <h2 className=" text-xl font-bold">
                        Escribinos un mensaje
                    </h2>
                </div>
                <textarea
                    value={mensaje}
                    onChange={(e) => {
                        setMensaje(e.target.value);
                        console.log(mensaje);
                    }}
                    className="border h-[222px] w-full p-3"
                    name=""
                    id=""
                ></textarea>
            </div>
            <div className="h-fit border">
                <div className="bg-[#EAEAEA]">
                    <h2 className="p-3 text-xl font-bold">Pedido</h2>
                </div>

                <div className="flex flex-col justify-between px-4 text-xl gap-2 border-b py-2">
                    <div className="flex flex-row justify-between w-full">
                        <p>Subtotal {"(sin descuento)"}</p>
                        <p>${subtotal}</p>
                    </div>
                    <div className="flex flex-row justify-between w-full">
                        <p>Descuento {"(3%)"}</p>
                        <p className="text-green-600">-${descuento}</p>
                    </div>
                    <div className="flex flex-row justify-between w-full">
                        <p>Subtotal</p>
                        <p>${subtotalDescuento}</p>
                    </div>
                    <div className="flex flex-row justify-between w-full">
                        <p>IVA 21%</p>
                        <p>${iva}</p>
                    </div>
                </div>
                <div className="flex flex-row justify-between p-3">
                    <p className="font-medium text-2xl">
                        Total{" "}
                        <span className="text-base">{"(IVA incluido)"}</span>
                    </p>
                    <p className="text-2xl">${totalFinal}</p>
                </div>
            </div>
            <div className="flex flex-col gap-3">
                <h2 className="font-bold text-2xl">Adjuntar un archivo</h2>
                <div className="w-full border flex items-center justify-between">
                    <span className="text-gray-600 pl-4">{fileName}</span>
                    <label
                        htmlFor="fileInput"
                        className="text-red-500 font-semibold h-full cursor-pointer p-4 bg-gray-100 hover:bg-gray-200"
                    >
                        ADJUNTAR
                    </label>
                    <input
                        type="file"
                        id="fileInput"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                </div>
            </div>
            <div className="flex flex-row gap-3 w-full">
                <button
                    onClick={clearCart}
                    className="h-[47px] w-full border border-primary-red text-primary-red"
                >
                    CANCELAR PEDIDO
                </button>
                <button
                    onClick={handleSubmit}
                    className="h-[47px] w-full bg-primary-red  text-white"
                >
                    REALIZAR PEDIDO
                </button>
            </div>
        </div>
    );
}
