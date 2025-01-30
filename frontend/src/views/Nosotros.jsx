import { Helmet } from "react-helmet-async";
import quienes from "../assets/inicio/quienes.png";
import mision from "../assets/nosotros/mision-icon.svg";
import sustent from "../assets/nosotros/sustent-icon.svg";
import vision from "../assets/nosotros/vision-icon.svg";
import NosotrosCard from "../components/NosotrosCard";
import { useStateContext } from "../contexts/ContextProvider";

export default function Nosotros() {
    const { nosotrosFirstInfo } = useStateContext();

    const nosotrosInfo = [
        {
            icon: mision,
            title: "Misión",
            text: "Nuestra misión es fabricar productos de acero sustentables que agreguen valor en lo que respecta a método de trabajo, patrimonio tecnológico y capacidades de sus recursos humanos.  Estamos comprometidos con la comunidad mediante el desarrollo de nuestros colaboradores. Creemos que construir con materia prima reciclable de forma infinita, es la forma de vivir y construir el futuro.",
        },
        {
            icon: vision,
            title: "Visión",
            text: "Nuestra visión es ser la empresa líder en el desarrollo y FABRICACIÓN DE PERFILES DE ACERO GALVANIZADO de Argentina y que cada empresa, constructor o desarrollador se lleve a su obra un perfil fabricado bajo normas y certificaciones actuales. Queremos que cada producto que se use para la construcción de una vivienda tenga la calidad que uno necesita para su vida diaria.",
        },
        {
            icon: sustent,
            title: "Sustentabilidad",
            text: "Tenemos responsabilidad social y de calidad, por lo que trabajamos para conservar la diversidad y la productividad a lo largo del tiempo, haciendo un uso consciente y responsable de los recursos. Invertimos en gestión ambiental bajo normas ISO 14001: 2015 y en nuevas tecnologías. Producimos con acero sustentable para el crecimiento y la innovación.",
        },
    ];

    return (
        <div>
            <Helmet>
                <title>Conman - Nosotros</title>
            </Helmet>
            <div className="flex flex-col lg:flex-row items-center my-10 font-roboto-condensed justify-center w-full h-full">
                {/* Imagen - 50% */}
                <div className="w-full lg:w-1/2 flex justify-center items-center mb-6 lg:mb-0">
                    <img
                        className="w-full h-auto sm:h-[300px] md:h-[450px] lg:h-[678px] object-cover"
                        src={nosotrosFirstInfo?.image_url}
                        alt="¿Quiénes somos?"
                    />
                </div>
                {/* Texto - dinámico */}
                <div className="flex flex-col gap-6 h-full px-6 w-full lg:w-1/2 max-lg:max-w-full max-w-[90%] sm:max-w-[80%] md:max-w-full lg:max-w-none items-center">
                    <div className="flex flex-col gap-6 text-[14px] max-lg:max-w-full max-w-[90%] text-justify items-start leading-relaxed overflow-y-auto">
                        <h2 className="text-[24px] sm:text-[32px] lg:text-[40px] font-bold text-left max-lg:text-center w-full">
                            {nosotrosFirstInfo?.title}
                        </h2>
                        <p className="whitespace-pre-line break-words w-full text-[16px] sm:text-[18px]">
                            {nosotrosFirstInfo?.text}
                        </p>
                    </div>
                </div>
            </div>

            <div className="h-fit w-full bg-special-white flex justify-center pb-20">
                <div className="w-[90%]">
                    <h2 className="font-bold text-[40px] pb-20 pt-16">
                        ¿Porque elegirnos?
                    </h2>
                    <div className="flex flex-row flex-wrap gap-y-20 justify-between max-lg:justify-center">
                        {nosotrosInfo.map((info, index) => (
                            <NosotrosCard
                                key={index}
                                icon={info.icon}
                                title={info.title}
                                text={info.text}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
