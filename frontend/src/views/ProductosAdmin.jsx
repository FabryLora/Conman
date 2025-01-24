import ProductRowAdmin from "../components/ProductRowAdmin";
import { useStateContext } from "../contexts/ContextProvider";

export default function ProductosAdmin() {
    const { productInfo, categoryInfo, subCategoryInfo } = useStateContext();

    return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Imagenes
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Codigo
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Nombre
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Precio
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Categoria
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Sub Categoria
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {productInfo.map((info, index) => (
                        <>
                            {subCategoryInfo
                                .filter((category) => category.id === info.id)
                                .map((elem, index) => (
                                    <ProductRowAdmin
                                        key={index}
                                        productObject={info}
                                        subCategory={elem.name}
                                    />
                                ))}
                        </>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
