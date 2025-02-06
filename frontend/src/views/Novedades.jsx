import NovedadesCard from "../components/NovedadesCard";
import { useStateContext } from "../contexts/ContextProvider";
export default function Novedades() {
    const { novedades } = useStateContext();

    return (
        <div className="py-20 bg-special-white">
            <div className="flex relative flex-wrap flex-row justify-evenly gap-5">
                {novedades.map((novedad, index) => (
                    <NovedadesCard key={index} newsObject={novedad} />
                ))}
            </div>
        </div>
    );
}
