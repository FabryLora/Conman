import CategoryAdminCard from "../components/CategoryAdminCard";
import { useStateContext } from "../contexts/ContextProvider";
export default function CategoriasAdmin() {
    const { categoryInfo } = useStateContext();

    return (
        <div className="flex justify-center p-4">
            <div className="table w-[80%] shadow-md">
                <div className="table-header-group bg-gray-400">
                    <div className="table-row text-center">
                        <div className="table-cell">Imagen</div>
                        <div className="table-cell">Nombre</div>
                        <div className="table-cell">Destacado</div>
                        <div className="table-cell">Orden</div>
                        <div className="table-cell">Editar</div>
                    </div>
                </div>
                <div className="table-row-group text-center">
                    {categoryInfo.map((category) => (
                        <CategoryAdminCard
                            key={category.id}
                            category={category}
                        />
                    ))}
                    <div className="table-row" action="">
                        <div className="table-cell">
                            <input type="file" />
                        </div>
                        <div className="table-cell">
                            <input
                                type="text"
                                placeholder="Nombre de la categoria"
                            />
                        </div>

                        <div className="table-cell">
                            <input type="checkbox" placeholder="Destacado" />
                        </div>
                        <div className="table-cell">
                            <input type="text" placeholder="Orden" />
                        </div>
                        <div className="table-cell">
                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                Cancelar
                            </button>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Guardar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
