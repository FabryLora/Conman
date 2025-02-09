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
            <div className="flex flex-col lg:flex-row items-center my-20 font-roboto-condensed justify-center w-full h-full">
                {/* Imagen - 50% */}
                <div className="w-full lg:w-1/2 flex justify-center items-center mb-6 lg:mb-0">
                    <img
                        className="w-full h-auto sm:h-[300px] md:h-[450px] lg:h-[678px] object-cover"
                        src={nosotrosFirstInfo?.image_url}
                        alt="¿Quiénes somos?"
                    />
                </div>
                {/* Texto - dinámico */}

                <style>
                    {`
                            .custom-content div > span {
    font-size: 16px !important; /* Cambia 1.25rem a 1rem */
}
    .custom-content {
                        
    }
                            `}
                </style>

                <div className="flex flex-col h-full w-full lg:w-1/2 md:max-w-full lg:max-w-none items-center">
                    <div className="flex flex-col gap-6 items-start overflow-y-auto max-h-[678px] w-full">
                        <div
                            dangerouslySetInnerHTML={{
                                __html: nosotrosFirstInfo?.text || "",
                            }}
                            className="custom-content font-roboto-condensed px-12 prose prose-sm sm:prose lg:prose-lg xl:prose-xl w-full min-w-full max-w-full"
                        ></div>
                    </div>
                </div>
            </div>

            <div className="h-fit w-full bg-special-white flex justify-center pb-20">
                <div className="w-[90%]">
                    <h2 className="font-bold text-[40px] py-20">
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
