import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

const Carousel = () => {
    const { sliderInfo } = useStateContext();

    return (
        <div className="relative w-full h-[800px] overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-30 z-20"></div>
            {/* Contenedor de imágenes con transición */}
            <div className="absolute inset-0">
                <video
                    autoPlay
                    loop
                    muted
                    preload="auto"
                    src={sliderInfo?.video}
                    className={` inset-0 w-full h-full object-cover object-bottom transition-opacity duration-700 ease-in-out`}
                />
            </div>
            <div className="absolute max-w-[1240px] mx-auto inset-0 flex flex-col justify-between h-[400px] my-20 mt-auto gap-16  text-white font-roboto z-30">
                {/* Contenido estático */}
                <div className="  flex flex-col justify-center gap-16  max-sm:pl-6 text-white font-roboto z-30">
                    <div>
                        <div className="relative text-6xl font-bold">
                            <span className="absolute bottom-[2px] text-white">
                                {sliderInfo.title}
                            </span>
                            <span className="text-gray-200">
                                {sliderInfo.title}
                            </span>
                        </div>
                        <div className="relative text-[25px]">
                            <span className="absolute bottom-[1px] text-white">
                                {sliderInfo.subtitle}
                            </span>
                            <span className="text-gray-200">
                                {sliderInfo.subtitle}
                            </span>
                        </div>
                    </div>

                    <Link
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 0.95 }}
                        to={sliderInfo.link}
                        className=" flex justify-center items-center bg-primary-red text-white w-[172px] h-[47px] font-roboto-condensed"
                    >
                        MAS INFO
                    </Link>
                </div>

                {/* Indicadores */}
            </div>
        </div>
    );
};

export default Carousel;
