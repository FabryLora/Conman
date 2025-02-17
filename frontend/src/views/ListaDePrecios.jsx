import { useEffect } from "react";
import ListadeproductosPrivadoRow from "../components/ListadeproductosPrivadoRow";
import { useStateContext } from "../contexts/ContextProvider";

export default function ListaDePrecios() {
    const { listadeprecios } = useStateContext();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="w-full px-20 py-20 min-h-[500px]">
            <table className=" border font-roboto-condensed w-full">
                <thead>
                    <tr className="bg-gray-300 font-bold">
                        <td className="h-[50px]"></td>
                        <td>Nombre</td>
                        <td>Formato</td>
                        <td>Peso</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {listadeprecios?.map((listadeprecio, index) => (
                        <ListadeproductosPrivadoRow
                            key={index}
                            archivoObject={listadeprecio}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
