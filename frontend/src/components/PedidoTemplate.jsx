export default function PedidoTemplate({
    cart,
    extraInfo,
    user,
    descuentoCliente,
}) {
    return (
        <div
            style={{
                fontFamily: "Arial, sans-serif",
                maxWidth: "800px",
                margin: "auto",
                padding: "20px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                backgroundColor: "#f9f9f9",
            }}
        >
            <div style={{ marginBottom: "20px" }}>
                <h1
                    style={{
                        borderBottom: "2px solid #333",
                        paddingBottom: "5px",
                    }}
                >
                    Información del Cliente:
                </h1>
                <p>
                    <strong>Nombre:</strong> {user.name}
                </p>
                <p>
                    <strong>Correo:</strong> {user.email}
                </p>
                <p>
                    <strong>Teléfono:</strong> {user.telefono}
                </p>
                <p>
                    <strong>CUIL / DNI:</strong> {user.dni}
                </p>
                <p>
                    <strong>Razón Social:</strong> {user.razon_social}
                </p>
                <p>
                    <strong>Dirección:</strong> {user.direccion}
                </p>
                <p>
                    <strong>Provincia:</strong> {user.provincia}
                </p>
                <p>
                    <strong>Localidad:</strong> {user.localidad}
                </p>
                <p>
                    <strong>Código Postal:</strong> {user.codigo_postal}
                </p>
            </div>

            <div style={{ marginBottom: "20px" }}>
                <h1
                    style={{
                        borderBottom: "2px solid #333",
                        paddingBottom: "5px",
                    }}
                >
                    Información del Pedido:
                </h1>
                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        marginBottom: "20px",
                    }}
                >
                    <thead>
                        <tr style={{ backgroundColor: "#333", color: "#fff" }}>
                            <th
                                style={{
                                    padding: "10px",
                                    border: "1px solid #ddd",
                                }}
                            >
                                Código
                            </th>
                            <th
                                style={{
                                    padding: "10px",
                                    border: "1px solid #ddd",
                                }}
                            >
                                Nombre
                            </th>
                            <th
                                style={{
                                    padding: "10px",
                                    border: "1px solid #ddd",
                                }}
                            >
                                Precio x unidad {"Pesos"}
                            </th>
                            <th
                                style={{
                                    padding: "10px",
                                    border: "1px solid #ddd",
                                }}
                            >
                                Precio x unidad {"USD"}
                            </th>

                            <th
                                style={{
                                    padding: "10px",
                                    border: "1px solid #ddd",
                                }}
                            >
                                Descuento de cliente
                            </th>
                            <th
                                style={{
                                    padding: "10px",
                                    border: "1px solid #ddd",
                                }}
                            >
                                Cantidad
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((item, index) => (
                            <tr
                                key={index}
                                style={{
                                    backgroundColor:
                                        index % 2 === 0 ? "#fff" : "#f2f2f2",
                                }}
                            >
                                <td
                                    style={{
                                        padding: "10px",
                                        border: "1px solid #ddd",
                                    }}
                                >
                                    {item.code}
                                </td>
                                <td
                                    style={{
                                        padding: "10px",
                                        border: "1px solid #ddd",
                                    }}
                                >
                                    {item.name}
                                </td>
                                <td
                                    style={{
                                        padding: "10px",
                                        border: "1px solid #ddd",
                                    }}
                                >
                                    ${item.price}
                                </td>
                                <td
                                    style={{
                                        padding: "10px",
                                        border: "1px solid #ddd",
                                    }}
                                >
                                    ${item.dolar_price}
                                </td>

                                <td
                                    style={{
                                        padding: "10px",
                                        border: "1px solid #ddd",
                                    }}
                                >
                                    {descuentoCliente}%
                                </td>

                                <td
                                    style={{
                                        padding: "10px",
                                        border: "1px solid #ddd",
                                    }}
                                >
                                    {item.additionalInfo.cantidad}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <p>
                    <strong>Mensaje:</strong> {extraInfo?.mensaje}
                </p>
                <p>
                    <strong>Tipo de entrega:</strong> {extraInfo.tipo_entrega}
                </p>
                <h2>
                    <strong>Pedido Pesos</strong>
                </h2>
                <div
                    style={{
                        backgroundColor: "#f2f2f2",
                        padding: "10px",
                        borderRadius: "5px",
                        marginTop: "10px",
                    }}
                >
                    <p>
                        <strong>Subtotal:</strong> ${extraInfo.subtotal}
                    </p>
                    <p>
                        <strong>Descuento entrega:</strong> $
                        {extraInfo?.descuento}
                    </p>
                    <p>
                        <strong>Descuento cliente:</strong> $
                        {extraInfo?.descuentoCliente}
                    </p>
                    <p>
                        <strong>Subtotal con descuento:</strong> $
                        {extraInfo.subtotalDescuento}
                    </p>

                    <p>
                        <strong>IVA:</strong> ${extraInfo.iva}
                    </p>

                    <p style={{ fontSize: "18px", fontWeight: "bold" }}>
                        <strong>Total del pedido:</strong> ${extraInfo.total}
                    </p>
                </div>
                <h2>
                    <strong>Pedido Dolares</strong>
                </h2>
                <div
                    style={{
                        backgroundColor: "#f2f2f2",
                        padding: "10px",
                        borderRadius: "5px",
                        marginTop: "10px",
                    }}
                >
                    <p>
                        <strong>Subtotal:</strong> ${extraInfo.subtotalUSD}
                    </p>
                    <p>
                        <strong>Descuento aplicado:</strong> $
                        {extraInfo?.descuentoUSD}
                    </p>
                    <p>
                        <strong>Descuento cliente:</strong> $
                        {extraInfo?.descuentoClienteUSD}
                    </p>
                    <p>
                        <strong>Subtotal con descuento:</strong> $
                        {extraInfo.subtotalDescuentoUSD}
                    </p>

                    <p style={{ fontSize: "18px", fontWeight: "bold" }}>
                        <strong>Total del pedido:</strong> ${extraInfo.totalUSD}
                    </p>
                </div>
            </div>
        </div>
    );
}
