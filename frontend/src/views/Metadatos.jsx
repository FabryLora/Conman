import { ToastContainer } from "react-toastify";
import MetadatosRow from "../components/MetadatosRow";
import { useStateContext } from "../contexts/ContextProvider";

export default function Metadatos() {
    const { metadatos } = useStateContext();

    return (
        <div className="table  w-[90%] mx-auto my-20">
            <ToastContainer />
            <div className="table-header-group ...">
                <div className="table-row bg-gray-300">
                    <div className="table-cell text-left ...">Seccion</div>
                    <div className="table-cell text-left ...">Keyword</div>
                    <div className="table-cell text-left ...">Descripcion</div>
                    <div className="table-cell text-center ...">
                        Operaciones
                    </div>
                </div>
            </div>
            <div className="table-row-group">
                {metadatos.map((metadato, index) => (
                    <MetadatosRow key={index} metadatosObject={metadato} />
                ))}
            </div>
        </div>
    );
}
