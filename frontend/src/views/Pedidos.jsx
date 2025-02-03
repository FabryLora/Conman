import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import ProductRow from "../components/ProductRow";
import { useStateContext } from "../contexts/ContextProvider";

export default function Pedidos() {
    const { cart } = useStateContext();

    const [selected, setSelected] = useState("retiro");
    const [fileName, setFileName] = useState("Seleccionar archivo");

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
        } else {
            setFileName("Seleccionar archivo");
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
                        onClick={() => setSelected("retiro")}
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
                        onClick={() => setSelected("reparto")}
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
                        onClick={() => setSelected("acon")}
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
                        <p>$10.020,92</p>
                    </div>
                    <div className="flex flex-row justify-between w-full">
                        <p>Descuento {"(3%)"}</p>
                        <p className="text-green-600">-$10.020,92</p>
                    </div>
                    <div className="flex flex-row justify-between w-full">
                        <p>Subtotal</p>
                        <p>$10.020,92</p>
                    </div>
                    <div className="flex flex-row justify-between w-full">
                        <p>IVA 21%</p>
                        <p>$10.020,92</p>
                    </div>
                </div>
                <div className="flex flex-row justify-between p-3">
                    <p className="font-medium text-2xl">
                        Total{" "}
                        <span className="text-base">{"(IVA incluido)"}</span>
                    </p>
                    <p className="text-2xl">$121312</p>
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
                <button className="h-[47px] w-full border border-primary-red text-primary-red">
                    CANCELAR PEDIDO
                </button>
                <button className="h-[47px] w-full bg-primary-red  text-white">
                    REALIZAR PEDIDO
                </button>
            </div>
        </div>
    );
}
