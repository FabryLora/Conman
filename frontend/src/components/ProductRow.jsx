import carritoRed from "../assets/icons/carrito-icon.svg";
import { useStateContext } from "../contexts/ContextProvider";

export default function ProductRow({ product }) {
    const { addToCart, removeFromCart } = useStateContext();

    return (
        <div className="grid grid-cols-8 items-center justify-center py-2 border-y">
            <div className="flex justify-center">
                <img
                    src={product?.images[0].image_url}
                    alt={product?.name}
                    className="object-contain h-[85px] w-fit"
                />
            </div>
            <p className="text-center">{product?.code}</p>
            <p className="text-center">{product?.name}</p>
            <p className="text-center">{product?.price}</p>
            <p className="text-center">2</p>
            <p className="text-center">2</p>
            <div className="flex justify-center">
                <input
                    className="h-[41px] w-[80px] border-[3px] pl-2"
                    type="number"
                    name=""
                    id=""
                />
            </div>
            <div className="flex justify-center">
                <button onClick={() => addToCart(product)}>
                    <img src={carritoRed} alt="" />
                </button>
            </div>
        </div>
    );
}
