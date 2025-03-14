import { useState } from "react";
import axiosClient from "../axios";

export default function PedidosRowAdmin({ pedidoObject }) {
    const [isOpen, setIsOpen] = useState(false);

    const downloadPDF = async () => {
        try {
            const filename = pedidoObject?.archivo_url.split("/").pop(); // Extraer solo el nombre del archivo

            const response = await axiosClient.get(
                `/downloadpedido/${filename}`,
                {
                    responseType: "blob",
                }
            );

            const blob = new Blob([response.data], { type: "application/pdf" });
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = pedidoObject?.userPedido?.nombre;
            document.body.appendChild(a);
            a.click();

            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error al descargar el PDF:", error);
        }
    };

    return (
        <div className="grid grid-cols-3 items-center justify-items-center py-2 border-b text-[#515A53]">
            <p>{pedidoObject?.id}</p>
            <p>{pedidoObject?.userPedido?.nombre}</p>
            <button
                onClick={() => setIsOpen(true)}
                className="text-center w-[100px] bg-blue-500 text-white rounded-md"
            >
                Ver
            </button>
            {isOpen && (
                <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="relative max-w-3xl mx-auto p-5 border border-gray-300 rounded-lg bg-gray-100 max-h-[90vh] overflow-y-auto scrollbar-hide">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-0 right-0 p-2 text-xl text-gray-500"
                        >
                            {" "}
                            X{" "}
                        </button>
                        <div className="mb-5">
                            <h1 className="border-b-2 border-gray-800 pb-1">
                                Información del Cliente:
                            </h1>
                            <p>
                                <strong>Nombre:</strong>{" "}
                                {pedidoObject?.userPedido?.nombre}
                            </p>
                            <p>
                                <strong>Correo:</strong>{" "}
                                {pedidoObject?.userPedido?.email}
                            </p>
                            <p>
                                <strong>Teléfono:</strong>{" "}
                                {pedidoObject?.userPedido?.telefono}
                            </p>
                            <p>
                                <strong>CUIL / DNI:</strong>{" "}
                                {pedidoObject?.userPedido?.dni}
                            </p>
                            <p>
                                <strong>Razón Social:</strong>{" "}
                                {pedidoObject?.userPedido?.razon_social}
                            </p>
                            <p>
                                <strong>Dirección:</strong>{" "}
                                {pedidoObject?.userPedido?.direccion}
                            </p>
                            <p>
                                <strong>Provincia:</strong>{" "}
                                {pedidoObject?.userPedido?.provincia}
                            </p>
                            <p>
                                <strong>Localidad:</strong>{" "}
                                {pedidoObject?.userPedido?.localidad}
                            </p>
                            <p>
                                <strong>Código Postal:</strong>{" "}
                                {pedidoObject?.userPedido?.codigo_postal}
                            </p>
                        </div>

                        <div className="mb-5">
                            <h1 className="border-b-2 border-gray-800 pb-1">
                                Información del Pedido:
                            </h1>
                            <table className="w-full border-collapse mb-5">
                                <thead>
                                    <tr className="bg-gray-800 text-white">
                                        <th className="p-2 border border-gray-300">
                                            Código
                                        </th>
                                        <th className="p-2 border border-gray-300">
                                            Nombre
                                        </th>
                                        <th className="p-2 border border-gray-300">
                                            Precio x unidad
                                        </th>

                                        <th className="p-2 border border-gray-300">
                                            Cantidad
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pedidoObject?.prodPedidos?.map(
                                        (item, index) => (
                                            <tr
                                                key={index}
                                                className={
                                                    index % 2 === 0
                                                        ? "bg-white"
                                                        : "bg-gray-200"
                                                }
                                            >
                                                <td className="p-2 border border-gray-300">
                                                    {item?.code}
                                                </td>
                                                <td className="p-2 border border-gray-300">
                                                    {item?.name}
                                                </td>
                                                <td className="p-2 border border-gray-300">
                                                    $
                                                    {item?.price?.toLocaleString(
                                                        "es-AR",
                                                        {
                                                            minimumFractionDigits: 2,
                                                            maximumFractionDigits: 2,
                                                        }
                                                    )}
                                                </td>

                                                <td className="p-2 border border-gray-300">
                                                    {item?.cantidad}
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                            {pedidoObject?.archivo_url && (
                                <p>
                                    <strong>Archivo:</strong>{" "}
                                    <button
                                        onClick={downloadPDF}
                                        className="text-blue-500"
                                    >
                                        Descargar
                                    </button>
                                </p>
                            )}

                            <p>
                                <strong>Mensaje:</strong>{" "}
                                {pedidoObject?.mensaje}
                            </p>
                            <p>
                                <strong>Tipo de entrega:</strong>{" "}
                                {pedidoObject?.tipo_entrega}
                            </p>
                            <div className="bg-gray-200 p-3 rounded-md mt-3">
                                <p>
                                    <strong>Subtotal:</strong> $
                                    {pedidoObject?.subtotal}
                                </p>
                                <p>
                                    <strong>Descuento aplicado:</strong> $
                                    {pedidoObject?.descuento}
                                </p>
                                <p>
                                    <strong>Subtotal con descuento:</strong> $
                                    {pedidoObject?.subtotaldescuento}
                                </p>
                                <p>
                                    <strong>Porcentaje de IVA:</strong> $
                                    {pedidoObject?.iva}
                                </p>
                                <p className="text-lg font-bold">
                                    <strong>Total del pedido:</strong> $
                                    {pedidoObject?.total}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
