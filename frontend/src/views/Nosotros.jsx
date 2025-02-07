import { Helmet } from "react-helmet-async";
import "react-quill/dist/quill.snow.css";
import mision from "../assets/nosotros/mision-icon.svg";
import sustent from "../assets/nosotros/sustent-icon.svg";
import vision from "../assets/nosotros/vision-icon.svg";
import NosotrosCard from "../components/NosotrosCard";
import { useStateContext } from "../contexts/ContextProvider";

export default function Nosotros() {
    const { nosotrosFirstInfo, metadatos, nosotrosSecond } = useStateContext();

    const nosotrosInfo = [
        {
            icon: mision,
            title: "Misión",
            text: nosotrosSecond?.mision,
        },
        {
            icon: vision,
            title: "Visión",
            text: nosotrosSecond?.vision,
        },
        {
            icon: sustent,
            title: "Sustentabilidad",
            text: nosotrosSecond?.sustentabilidad,
        },
    ];

    return (
        <div>
            <Helmet>
                <meta
                    name="description"
                    content={
                        metadatos?.find(
                            (dato) => dato.seccion.toLowerCase() === "nosotros"
                        )?.descripcion
                    }
                />
                <meta
                    name="keywords"
                    content={metadatos
                        ?.find(
                            (dato) => dato.seccion.toLowerCase() === "nosotros"
                        )
                        ?.keywords?.split(" ")
                        .join(",")}
                />
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
                    <div className="flex flex-col gap-6 text-[14px] max-lg:max-w-full max-w-[90%]  items-start leading-relaxed overflow-y-auto">
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
