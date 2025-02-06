import { motion } from "motion/react";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import shieldIcon from "../assets/icons/shield-icon.svg";
import novedades1 from "../assets/inicio/novedades-1.png";
import novedades2 from "../assets/inicio/novedades-2.png";
import novedades3 from "../assets/inicio/novedades-3.png";
import bannerCalidad from "../assets/inicio/pdc-banner.png";
import quienes from "../assets/inicio/quienes.png";
import iqnetLogo from "../assets/logos/iqnet-logo.png";
import iramLogo from "../assets/logos/iram-logo.png";
import Carousel from "../components/Carousel";
import Footer from "../components/Footer";
import HomeCategory from "../components/HomeCategory";
import Navbar from "../components/Navbar";
import NovedadesCard from "../components/NovedadesCard";
import { useStateContext } from "../contexts/ContextProvider";

export default function Home() {
    const {
        nosotrosInicio,
        fetchNosotrosInicio,
        categoryInicio,
        calidadInicio,
        novedades,
    } = useStateContext();

    useEffect(() => {
        fetchNosotrosInicio();
    }, []);

    return (
        <>
            <Helmet>
                <title>Conman</title>
            </Helmet>
            <Navbar />
            <div>
                <Carousel />

                {/* categorias */}
                <div className="flex flex-col items-center w-[90%] mx-auto my-20 gap-3 overflow-hidden max-lg:w-full">
                    <h2 className="font-bold text-[40px] font-roboto-condensed self-start max-lg:pl-5">
                        Categorias
                    </h2>
                    <motion.div
                        initial={{ oapcity: 0, y: 200 }}
                        whileInView={{ oapcity: 1, y: 0 }}
                        transition={{ duration: 1.5 }}
                        className="grid grid-cols-2 grid-rows-2 h-fit justify-items-center gap-5 w-full max-md:w-screen max-md:flex max-md:flex-row max-md:overflow-x-scroll max-md:scrollbar-hide"
                    >
                        {categoryInicio.map((category, index) => (
                            <HomeCategory
                                key={index}
                                categoryObject={category}
                            />
                        ))}
                    </motion.div>
                </div>

                {/* Quienes somos */}
                <div className="max-xl:relative max-xl:h-[700px] flex flex-row my-10 font-roboto-condensed justify-center w-full h-full max-xl:bg-primary-blue overflow-hidden">
                    {/* Imagen - 50% */}
                    <img
                        className="absolute w-full h-full object-fill opacity-30 xl:hidden"
                        src={quienes}
                        alt="¿Quiénes somos?"
                    />
                    <motion.div
                        initial={{ oapcity: 0, x: -200 }}
                        whileInView={{ oapcity: 1, x: 0 }}
                        transition={{ duration: 1.2 }}
                        className="w-full lg:w-1/2 flex justify-center items-center max-xl:hidden"
                    >
                        <img
                            className="w-full h-auto lg:h-[678px] object-cover"
                            src={nosotrosInicio?.image_url}
                            alt="¿Quiénes somos?"
                        />
                    </motion.div>
                    {/* Texto - 50% */}
                    <motion.div
                        initial={{ oapcity: 0, x: 200 }}
                        whileInView={{ oapcity: 1, x: 0 }}
                        transition={{ duration: 1.2 }}
                        className="max-xl:py-5 max-xl:items-center max-xl:absolute max-xl:z-10 flex flex-col gap-6 lg:gap-10  max-xl:w-full px-6 w-1/2 max-xl:text-white overflow-hidden"
                    >
                        <div className="flex flex-col gap-6 text-[14px] sm:text-[16px] text-justify max-w-[90%] whitespace-pre-line h-fit">
                            <h2 className="text-[24px] sm:text-[32px] lg:text-[40px] font-bold text-center xl:text-left">
                                {nosotrosInicio?.title}
                            </h2>
                            <p className="max-h-[430px] text-base break-words ">
                                {nosotrosInicio?.text}
                            </p>
                        </div>
                        <div className="mt-auto">
                            <Link
                                to={"/inicio/nosotros"}
                                className="bg-primary-red w-[289px] h-[47px] text-white flex justify-center items-center  mt-20 max-xl:mt-0"
                            >
                                MÁS INFO
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Piloticas de calidad */}
                <div className="flex relative h-[460px]  w-full items-center justify-around bg-primary-blue mt-10 font-roboto-condensed text-white max-sm:flex-col max-sm:h-fit max-sm:pb-32 max-sm:py-10">
                    <img
                        className="absolute w-full h-full opacity-50"
                        src={bannerCalidad}
                        alt=""
                    />
                    <div className="flex flex-col items-start justify-center w-[60%] h-full max-sm:w-full max-sm:items-center max-sm:justify-center">
                        <div className="w-[50px] h-[50px]">
                            <img className="" src={shieldIcon} alt="" />
                        </div>
                        <h2 className="font-bold text-[40px]">
                            Politicas de Calidad
                        </h2>
                        <p className="text-[16px] max-sm:px-5 max-sm:text-center">
                            {calidadInicio?.text}
                        </p>
                    </div>

                    <div className="relative flex flex-col gap-14 self-start pt-20 w-[242px] max-sm:self-center">
                        <div className="flex flex-row justify-between">
                            <img src={iramLogo} alt="" />
                            <img src={iqnetLogo} alt="" />
                        </div>
                        <Link
                            to={"/inicio/calidad"}
                            className="absolute w-full h-[47px] -bottom-20 border border-white flex justify-center items-center"
                        >
                            MAS INFO
                        </Link>
                    </div>
                </div>

                {/* Ultimas novedades */}
                <div className="bg-special-white flex flex-col items-center md:pb-10">
                    <div className="flex flex-col w-[90%] gap-3">
                        <div className="flex flex-row items-center justify-between max-sm:flex-col max-sm:gap-6 py-10">
                            <h2 className="text-[40px] font-bold font-roboto-condensed max-sm:text-center">
                                Enterate de nuestra ultimas novedades
                            </h2>
                            <Link
                                to={"/inicio/novedades"}
                                className="text-[16px] text-primary-red font-medium border border-primary-red w-[172px] h-[47px] bg-white flex justify-center items-center"
                            >
                                VER TODAS
                            </Link>
                        </div>

                        <div className="flex flex-row flex-wrap gap-5 justify-start max-md:justify-center">
                            {novedades
                                .filter((nove) => nove.featured === 1)
                                .map((novedad, index) => (
                                    <NovedadesCard
                                        key={index}
                                        newsObject={novedad}
                                    />
                                ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
