import CategoryInicioCard from "../components/CategoryInicioCard";
import { useStateContext } from "../contexts/ContextProvider";

export default function CategoriasInicioAdmin() {
    const { categoryInicio } = useStateContext();

    return (
        <div className=" overflow-x-auto">
            <div className="flex flex-col items-center">
                {categoryInicio.map((category, index) => (
                    <CategoryInicioCard key={index} categoryObject={category} />
                ))}
            </div>
        </div>
    );
}
