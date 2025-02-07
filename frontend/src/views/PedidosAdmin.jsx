import PedidosRowAdmin from "../components/PedidosRowAdmin";
import { useStateContext } from "../contexts/ContextProvider";

export default function PedidosAdmin() {
    const { pedidos } = useStateContext();

    return (
        <div>
            <div className="grid w-full px-20 py-20">
                <div className="grid grid-cols-3 items-center justify-items-center bg-[#F5F5F5] h-[52px] font-semibold">
                    <p>Numero de Pedido</p>
                    <p>Cliente</p>
                    <p>Ver Pedido</p>
                </div>

                <div className="max-h-[800px] overflow-y-auto">
                    {pedidos.map((pedido, index) => (
                        <PedidosRowAdmin key={index} pedidoObject={pedido} />
                    ))}
                </div>
            </div>
        </div>
    );
}
