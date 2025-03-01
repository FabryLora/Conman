import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

const MotionLink = motion.create(Link);

const Carousel = ({ autoScrollInterval = 5000 }) => {
    const { sliderInfo } = useStateContext();

    const [currentIndex, setCurrentIndex] = useState(0);

    // Cambiar imagen automáticamente después de un intervalo
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, autoScrollInterval);
        return () => clearInterval(interval);
    }, [currentIndex, autoScrollInterval]);

    const nextSlide = () => {
        if (sliderInfo.images) {
            setCurrentIndex(
                (prevIndex) => (prevIndex + 1) % sliderInfo.images.length
            );
        }
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    return (
        <div className="relative w-full h-[750px] overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-30 z-20"></div>
            {/* Contenedor de imágenes con transición */}
            <div className="absolute inset-0">
                {sliderInfo.images &&
                    sliderInfo.images.map((image, index) => (
                        <img
                            key={index}
                            src={image.image_url}
                            className={`absolute inset-0 w-full h-full object-cover object-bottom transition-opacity duration-700 ease-in-out ${
                                index === currentIndex
                                    ? "opacity-100 z-10"
                                    : "opacity-0 z-0"
                            }`}
                        />
                    ))}
            </div>
            <div className="absolute max-w-[1240px] mx-auto inset-0 flex flex-col justify-between h-[400px] my-20 mt-auto gap-16  text-white font-roboto z-30">
                {/* Contenido estático */}
                <div className="  flex flex-col justify-center gap-16  max-sm:pl-6 text-white font-roboto z-30">
                    <div>
                        <div className="relative text-6xl font-bold">
                            <span className="absolute bottom-[2px] text-primary-blue">
                                {sliderInfo.title}
                            </span>
                            <span className="text-gray-700">
                                {sliderInfo.title}
                            </span>
                        </div>
                        <div className="relative text-[25px]">
                            <span className="absolute bottom-[1px] text-primary-blue">
                                {sliderInfo.subtitle}
                            </span>
                            <span className="text-gray-700">
                                {sliderInfo.subtitle}
                            </span>
                        </div>
                    </div>

                    <MotionLink
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 0.95 }}
                        to={sliderInfo.link}
                        className=" flex justify-center items-center bg-primary-red text-white w-[172px] h-[47px] font-roboto-condensed"
                    >
                        MAS INFO
                    </MotionLink>
                </div>

                {/* Indicadores */}
                <div className=" flex space-x-2 z-30 max-sm:pl-6">
                    {sliderInfo.images &&
                        sliderInfo.images.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`w-[37px] h-[8px] bg-white transition-opacity duration-300 ${
                                    index === currentIndex
                                        ? "opacity-100"
                                        : "opacity-50"
                                }`}
                            ></button>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Carousel;
