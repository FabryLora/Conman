import { useState } from "react";
import PedidosRowAdmin from "../components/PedidosRowAdmin";
import { useStateContext } from "../contexts/ContextProvider";

export default function PedidosAdmin() {
    const { pedidos } = useStateContext();
    const [searchNumero, setSearchNumero] = useState("");
    const [searchCliente, setSearchCliente] = useState("");

    const filteredPedidos = pedidos.filter((pedido) => {
        return (
            (searchNumero === "" ||
                pedido?.id?.toString()?.includes(searchNumero)) &&
            (searchCliente === "" ||
                pedido?.userPedido?.nombre
                    .toLowerCase()
                    .includes(searchCliente.toLowerCase()))
        );
    });

    return (
        <div>
            <div className="w-full px-20 py-10 flex gap-4">
                <input
                    type="text"
                    placeholder="Buscar por Número de Pedido"
                    value={searchNumero}
                    onChange={(e) => setSearchNumero(e.target.value)}
                    className="border p-2 rounded w-1/2"
                />
                <input
                    type="text"
                    placeholder="Buscar por Cliente"
                    value={searchCliente}
                    onChange={(e) => setSearchCliente(e.target.value)}
                    className="border p-2 rounded w-1/2"
                />
            </div>

            <div className="grid w-full px-20 py-10">
                <div className="grid grid-cols-3 items-center justify-items-center bg-[#F5F5F5] h-[52px] font-semibold">
                    <p>Numero de Pedido</p>
                    <p>Cliente</p>
                    <p>Ver Pedido</p>
                </div>

                <div className="max-h-[90vh] overflow-y-auto">
                    {filteredPedidos.map((pedido, index) => (
                        <PedidosRowAdmin key={index} pedidoObject={pedido} />
                    ))}
                </div>
            </div>
        </div>
    );
}
