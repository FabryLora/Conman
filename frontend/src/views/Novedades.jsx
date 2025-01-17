import novedades1 from "../assets/inicio/novedades-1.png";
import novedades2 from "../assets/inicio/novedades-2.png";
import novedades3 from "../assets/inicio/novedades-3.png";

import NovedadesCard from "../components/NovedadesCard";
export default function Novedades() {
    const novedades = [
        {
            image: novedades1,
            title: "Realizamos la entrega de nuestros productos a todo el país",
            description:
                "Nuestra logística eficiente garantiza tiempos de entrega competitivos, con la calidad y soporte que nos caracterizan. Desde grandes centros urbanos...",
            href: "#",
        },
        {
            image: novedades2,
            title: "Accesorios para alta presión",
            description:
                "Fabricados y certificados bajo norma ISO 9001:2015. Tee macho fijo x macho fijo 7/8 UNF asiento tubo x macho fijo 1/2 NPT",
            href: "#",
        },
        {
            image: novedades3,
            title: "FIMAQH",
            description:
                "Conmon exhibió su última generación de sistemas de monitoreo en tiempo real, diseñados para prevenir fallos en equipos y optimizar la eficiencia operativa. Estas herramientas no solo impulsan...",
            href: "#",
        },
    ];

    return (
        <div className="py-20 bg-special-white">
            <div className="flex relative flex-row justify-evenly gap-5">
                {novedades.map((novedad, index) => (
                    <NovedadesCard key={index} newsObject={novedad} />
                ))}
            </div>
        </div>
    );
}
