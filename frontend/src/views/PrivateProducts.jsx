import { useState } from "react";
import ProductRow from "../components/ProductRow";
import { useStateContext } from "../contexts/ContextProvider";

export default function PrivateProducts() {
    const { realProducts, categoryInfo, productInfo } = useStateContext();
    const [categoria, setCategoria] = useState("");
    const [nombre, setNombre] = useState("");
    const [codigo, setCodigo] = useState("");

    const filteredProducts = realProducts.filter((product) => {
        return (
            (nombre
                ? product.name.toLowerCase().includes(nombre.toLowerCase())
                : true) &&
            (codigo
                ? product.code.toLowerCase().includes(codigo.toLowerCase())
                : true) &&
            (categoria
                ? product.product.name
                      .toLowerCase()
                      .includes(categoria.toLowerCase())
                : true)
        );
    });

    return (
        <div className="w-[80%] mx-auto py-10 flex flex-col gap-20">
            <div className="h-[134px] w-full bg-primary-blue text-white">
                <div className="flex flex-col gap-2 justify-center h-full p-10">
                    <h2>Buscar por:</h2>
                    <div className="flex flex-row justify-evenly w-full gap-5">
                        <select
                            className="h-[41px] bg-transparent border w-full px-3"
                            value={categoria}
                            onChange={(e) => setCategoria(e.target.value)}
                        >
                            <option disabled value="">
                                Seleccionar categoría
                            </option>
                            <option className="text-black" value="">
                                Todas las categorias
                            </option>
                            {productInfo.map((subCategory, index) => (
                                <option
                                    key={index}
                                    className="text-black"
                                    value={subCategory.name}
                                >
                                    {subCategory.name}
                                </option>
                            ))}
                        </select>
                        <input
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            className="h-[41px] bg-transparent border w-full pl-3"
                            type="text"
                            placeholder="Nombre"
                        />
                        <input
                            value={codigo}
                            onChange={(e) => setCodigo(e.target.value)}
                            className="h-[41px] bg-transparent border w-full pl-3"
                            type="text"
                            placeholder="Código"
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
                <div className="grid grid-cols-8 items-center justify-center bg-[#F5F5F5] h-[52px] font-semibold">
                    <p></p>
                    <p>Código</p>
                    <p>Producto</p>
                    <p className="text-center">Precio x un.</p>
                    <p className="text-center">Descuento</p>
                    <p className="text-center">Precio con %</p>
                    <p className="text-center">Cantidad</p>
                    <p className="text-center"></p>
                </div>

                <div className="max-h-[800px] overflow-y-auto">
                    {filteredProducts.map((prod, index) => (
                        <ProductRow key={index} product={prod} />
                    ))}
                </div>
            </div>
        </div>
    );
}
