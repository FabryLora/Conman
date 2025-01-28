import ProductRow from "../components/ProductRow";
import { useStateContext } from "../contexts/ContextProvider";

export default function PrivateProducts() {
    const { productInfo } = useStateContext();

    return (
        <div className="w-[80%] mx-auto py-10 flex flex-col gap-20">
            <div className="h-[134px] w-full bg-primary-blue text-white">
                <div className="flex flex-col gap-2 justify-center h-full p-10">
                    <h2>Buscar por:</h2>
                    <div className="flex flex-row justify-evenly w-full gap-5">
                        <select
                            className="h-[41px] bg-transparent border w-full px-3"
                            name=""
                            id=""
                        >
                            <option disabled value="">
                                cositas
                            </option>
                        </select>
                        <input
                            className="h-[41px] bg-transparent border w-full pl-3"
                            type="text"
                            placeholder="Nombre"
                        />
                        <input
                            className="h-[41px] bg-transparent border w-full pl-3"
                            type="text"
                            placeholder="Codigo"
                        />
                        <input
                            className="h-[41px] bg-white font-bold text-primary-blue border w-fit px-12"
                            type="submit"
                            value={"BUSCAR"}
                        />
                    </div>
                </div>
            </div>
            <div className="grid w-full">
                <div className="grid grid-cols-8 items-center justify-center bg-[#F5F5F5] h-[52px] text-center font-semibold">
                    <p></p>
                    <p>Codigo</p>
                    <p>Producto</p>
                    <p>Precio x un.</p>
                    <p>Descuento</p>
                    <p>Precio con %</p>
                    <p>cantidad</p>
                    <p></p>
                </div>

                <div className="">
                    {productInfo.map((prod, index) => (
                        <ProductRow key={index} product={prod} />
                    ))}
                </div>
            </div>
        </div>
    );
}
