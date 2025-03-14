import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import ProductCard from "../components/ProductCard";
import ProductRow from "../components/ProductRow";
import { useStateContext } from "../contexts/ContextProvider";

export default function PrivateProducts() {
    const { realProducts, productInfo } = useStateContext();
    const [categoria, setCategoria] = useState("");
    const [nombre, setNombre] = useState("");
    const [codigo, setCodigo] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    const filteredProducts = realProducts.filter((product) => {
        return (
            (nombre
                ? product?.name.toLowerCase()?.includes(nombre?.toLowerCase())
                : true) &&
            (codigo
                ? product?.code.toLowerCase()?.includes(codigo?.toLowerCase())
                : true) &&
            (categoria
                ? product?.product?.name
                      ?.toLowerCase()
                      ?.includes(categoria?.toLowerCase())
                : true)
        );
    });

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = filteredProducts.slice(
        indexOfFirstItem,
        indexOfLastItem
    );

    return (
        <div className="w-full pb-20 flex flex-col gap-20 max-sm:px-0">
            <ToastContainer />
            <div className="h-[134px] w-full bg-primary-blue text-white max-sm:h-fit">
                <div className="flex flex-col gap-2 justify-center h-full p-10 max-sm:px-6 max-sm:w-full">
                    <h2>Buscar por:</h2>
                    <div className="flex flex-row justify-evenly w-full gap-5 max-sm:flex-col">
                        <select
                            className="h-[41px] bg-transparent border w-full px-3"
                            value={categoria}
                            onChange={(e) => {
                                setCategoria(e.target.value);
                                setCurrentPage(1);
                            }}
                        >
                            <option disabled value="">
                                Seleccionar categoría
                            </option>
                            <option className="text-black" value="">
                                Todas las categorías
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
                            onChange={(e) => {
                                setNombre(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="h-[41px] bg-transparent border w-full pl-3"
                            type="text"
                            placeholder="Nombre"
                        />
                        <input
                            value={codigo}
                            onChange={(e) => {
                                setCodigo(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="h-[41px] bg-transparent border w-full pl-3"
                            type="text"
                            placeholder="Código"
                        />
                    </div>
                </div>
            </div>
            {filteredProducts.length > itemsPerPage && (
                <div className="w-full flex justify-center items-center gap-4 mt-6">
                    <button
                        onClick={handlePrevious}
                        disabled={currentPage === 1}
                        className="px-4 py-2 border rounded disabled:opacity-50"
                    >
                        Anterior
                    </button>
                    <span>
                        Página {currentPage} de {totalPages}
                    </span>
                    <button
                        onClick={handleNext}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 border rounded disabled:opacity-50"
                    >
                        Siguiente
                    </button>
                </div>
            )}
            <div className="grid w-full max-sm:hidden">
                <div className="grid grid-cols-7 items-center justify-center bg-[#F5F5F5] h-[52px] font-semibold">
                    <p></p>
                    <p>Código</p>
                    <p>Producto</p>
                    <p className="text-center">Precio x unidad</p>

                    <p className="text-center">Descuento de Cliente</p>
                    <p className="text-center">Cantidad</p>
                    <p className="text-center"></p>
                </div>
                <div className="h-fit">
                    {currentProducts?.map((prod, index) => (
                        <ProductRow key={index} product={prod} />
                    ))}
                </div>
            </div>
            <div className="flex flex-col gap-3 sm:hidden px-5">
                {currentProducts.map((prod, index) => (
                    <ProductCard key={index} product={prod} />
                ))}
            </div>
            {/* Paginación */}
            {filteredProducts.length > itemsPerPage && (
                <div className="w-full flex justify-center items-center gap-4 mt-6">
                    <button
                        onClick={handlePrevious}
                        disabled={currentPage === 1}
                        className="px-4 py-2 border rounded disabled:opacity-50"
                    >
                        Anterior
                    </button>
                    <span>
                        Página {currentPage} de {totalPages}
                    </span>
                    <button
                        onClick={handleNext}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 border rounded disabled:opacity-50"
                    >
                        Siguiente
                    </button>
                </div>
            )}
        </div>
    );
}
