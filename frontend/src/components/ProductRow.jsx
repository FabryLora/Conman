import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import carritoRed from "../assets/icons/carrito-icon.svg";
import removeFromCartIcon from "../assets/icons/remove-from-cart.svg";
import { useStateContext } from "../contexts/ContextProvider";
import "./numberInputCss.css";

export default function ProductRow({ product, currency }) {
    const [cantidad, setCantidad] = useState(0);
    const [extraInfo, setExtraInfo] = useState({
        cantidad: 0,
        descuento: product.discount
            ? product.price - product.price * (product.discount / 100)
            : product.price,
    });
    const handleChange = (value) => {
        if (value >= 0) setCantidad(value);
    };

    useEffect(() => {
        if (currency === "pesos") {
            setExtraInfo({
                ...extraInfo,
                descuento: product.discount
                    ? product.price - product.price * (product.discount / 100)
                    : product.price,
            });
        } else {
            setExtraInfo({
                ...extraInfo,
                descuento: product.discount
                    ? product.dolar_price -
                      product.dolar_price * (product.discount / 100)
                    : product.dolar_price,
            });
        }
    }, [currency]);

    const location = useLocation();

    const { addToCart, removeFromCart } = useStateContext();

    useEffect(() => {
        setExtraInfo({
            ...extraInfo,
            cantidad,
        });
    }, [cantidad]);

    return (
        <div className="grid grid-cols-7 items-center justify-center py-2 border-b text-[#515A53]">
            <div className="flex justify-center w-[85px] h-[85px] border max-sm:hidden">
                <img
                    src={product?.image_url}
                    alt={product?.name}
                    className="object-cover h-full w-full"
                />
            </div>
            <p className="text-left">{product?.code}</p>
            <p className="text-left">{product?.name}</p>
            <p className="text-center">
                ${product?.price.toLocaleString("es-AR")}
            </p>
            <p className="text-center">${product?.dolar_price}</p>

            <div className="flex justify-center">
                {location.pathname === "/privado/pedido" ? (
                    <p>{product.additionalInfo.cantidad}</p>
                ) : (
                    <div className="relative flex items-center">
                        {/* Contenedor con botones */}
                        <div className="flex flex-row border h-[41px] w-[89px] items-center bg-transparent justify-between px-2 overflow-hidden">
                            <input
                                value={cantidad}
                                onChange={(e) => {
                                    const value = Number(e.target.value);
                                    if (!isNaN(value) && value >= 0) {
                                        setCantidad(value);
                                    }
                                }}
                                type="number"
                                className="text-lg max-w-[50px] outline-none border-none bg-transparent text-left"
                            />
                            <div className="flex flex-col justify-center h-full">
                                <button
                                    className="flex items-center max-h-[12px]"
                                    onClick={() => handleChange(cantidad + 1)}
                                >
                                    <FontAwesomeIcon
                                        icon={faChevronUp}
                                        size="xs"
                                    />
                                </button>
                                <button
                                    className="flex items-center max-h-[12px]"
                                    onClick={() => handleChange(cantidad - 1)}
                                >
                                    <FontAwesomeIcon
                                        icon={faChevronDown}
                                        size="xs"
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="flex justify-center">
                {location.pathname === "/privado/pedido" ? (
                    <button onClick={() => removeFromCart(product.id)}>
                        <img src={removeFromCartIcon} alt="" />
                    </button>
                ) : (
                    <button onClick={() => addToCart(product, extraInfo)}>
                        <img src={carritoRed} alt="" />
                    </button>
                )}
            </div>
        </div>
    );
}
