import { Helmet } from "react-helmet-async";
import NovedadesCard from "../components/NovedadesCard";
import { useStateContext } from "../contexts/ContextProvider";
export default function Novedades() {
    const { novedades, metadatos } = useStateContext();

    return (
        <div className="py-20 bg-special-white">
            <Helmet>
                <meta
                    name="description"
                    content={
                        metadatos?.find(
                            (dato) => dato.seccion.toLowerCase() === "novedades"
                        )?.descripcion
                    }
                />
                <meta
                    name="keywords"
                    content={metadatos
                        ?.find(
                            (dato) => dato.seccion.toLowerCase() === "novedades"
                        )
                        ?.keywords?.split(" ")
                        .join(",")}
                />
            </Helmet>
            <div className="flex relative flex-wrap flex-row justify-start px-20 gap-5">
                {novedades.map((novedad, index) => (
                    <NovedadesCard key={index} newsObject={novedad} />
                ))}
            </div>
        </div>
    );
}
