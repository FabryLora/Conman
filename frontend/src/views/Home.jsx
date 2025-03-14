import { motion } from "motion/react";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, Navigate } from "react-router-dom";
import shieldIcon from "../assets/icons/shield-icon.svg";

import bannerCalidad from "../assets/inicio/pdc-banner.png";
import iqnetLogo from "../assets/logos/iqnet-logo.png";
import iramLogo from "../assets/logos/iram-logo.png";
import Carousel from "../components/Carousel";
import Footer from "../components/Footer";
import HomeCategory from "../components/HomeCategory";
import Navbar from "../components/Navbar";
import NovedadesCard from "../components/NovedadesCard";
import WhatsappComponent from "../components/WhatsappComponent";
import { useStateContext } from "../contexts/ContextProvider";

export default function Home() {
    const {
        nosotrosInicio,
        fetchNosotrosInicio,
        categoryInicio,
        categoryInfo,
        calidadInicio,
        novedades,
        metadatos,
        userToken,
    } = useStateContext();

    const MotionLink = motion.create(Link);

    useEffect(() => {
        fetchNosotrosInicio();
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (userToken) {
        return <Navigate to={"/privado"} />;
    }

    return (
        <div className="overflow-hidden">
            <Helmet>
                <title>Conman</title>
                <meta
                    name="description"
                    content={
                        metadatos?.find(
                            (dato) => dato.seccion.toLowerCase() === "inicio"
                        )?.descripcion
                    }
                />
                <meta
                    name="keywords"
                    content={metadatos
                        ?.find(
                            (dato) => dato.seccion.toLowerCase() === "inicio"
                        )
                        ?.keywords.split(" ")
                        .join(",")}
                />
            </Helmet>
            <Navbar />
            <Carousel />
            <div>
                {/* categorias */}
                <div className="flex flex-col items-center max-w-[1240px] mx-auto my-20 gap-3 overflow-hidden max-lg:w-full">
                    <h2 className="font-bold text-[40px] font-roboto-condensed self-start max-lg:pl-5">
                        Categorías
                    </h2>
                    <motion.div
                        initial={{ oapcity: 0, y: 200 }}
                        whileInView={{ oapcity: 1, y: 0 }}
                        transition={{ duration: 1.5 }}
                        className="grid grid-cols-2 grid-rows-2 h-fit justify-items-center gap-5 w-full max-md:w-screen max-md:flex max-md:flex-row max-md:overflow-x-scroll max-md:scrollbar-hide"
                    >
                        {categoryInfo
                            .filter((category) => category.destacado === 1)
                            .sort((a, b) => {
                                if (a.order_value < b.order_value) return -1;
                                if (a.order_value > b.order_value) return 1;
                                return 0;
                            })
                            .map((category, index) => (
                                <HomeCategory
                                    key={index}
                                    categoryObject={category}
                                />
                            ))}
                    </motion.div>
                </div>

                {/* Quienes somos */}
                <div className="max-lg:relative max-lg:h-fit flex flex-row max-lg:flex-col my-10 font-roboto-condensed justify-center w-full h-full overflow-hidden">
                    {/* Imagen - 50% */}

                    <motion.div
                        initial={{ oapcity: 0, x: -200 }}
                        whileInView={{ oapcity: 1, x: 0 }}
                        transition={{ duration: 1.2 }}
                        className="w-full lg:w-1/2 flex justify-center items-center max-lg:w-full max-lg:h-[400px] h-[700px]"
                    >
                        <img
                            className="w-full h-full  object-cover object-center"
                            src={nosotrosInicio?.image_url}
                            alt="¿Quiénes somos?"
                        />
                    </motion.div>
                    {/* Texto - 50% */}
                    <motion.div
                        initial={{ oapcity: 0, x: 200 }}
                        whileInView={{ oapcity: 1, x: 0 }}
                        transition={{ duration: 1.2 }}
                        className=" max-lg:items-center flex flex-col  justify-end  w-1/2 max-lg:text-white  overflow-hidden px-14 pt-10 gap-40 max-2xl:gap-24 max-lg:w-full"
                    >
                        <div className="flex flex-col items-start overflow-y-auto max-h-[700px] w-full ">
                            <style>
                                {`
                                    .custom-content div > span {
                                        font-size: 16px !important; /* Cambia 1.25rem a 1rem */
                                    }
                                    .custom-content  p {
                                        font-size: 16px !important; /* Cambia 1.25rem a 1rem */
                                    }
                                    
                                `}
                            </style>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: nosotrosInicio?.text || "",
                                }}
                                className="custom-content font-roboto-condensed prose prose-sm sm:prose lg:prose-lg xl:prose-xl w-full min-w-full max-w-full"
                            ></div>
                        </div>
                        <div className="">
                            <MotionLink
                                initial={{ scale: 1 }}
                                whileHover={{ scale: 0.95 }}
                                to={"/inicio/nosotros"}
                                className="bg-primary-red w-[289px] h-[47px] text-white flex justify-center items-center  max-xl:mt-0"
                            >
                                MÁS INFO
                            </MotionLink>
                        </div>
                    </motion.div>
                </div>

                {/* Piloticas de calidad */}
                <div className="flex relative h-[460px] w-full items-center justify-around bg-primary-blue font-roboto-condensed text-white max-sm:flex-col max-sm:h-fit max-sm:pb-32 max-sm:py-10">
                    <img
                        className="absolute w-full h-full opacity-50"
                        src={bannerCalidad}
                        alt=""
                    />
                    <div className="max-w-[1240px] mx-auto flex flex-row items-center justify-between w-full h-full max-sm:flex-col max-sm:items-center max-sm:justify-center">
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
                            <MotionLink
                                initial={{ scale: 1 }}
                                whileHover={{ scale: 0.95 }}
                                to={"/inicio/calidad"}
                                className="absolute w-full h-[47px] -bottom-28 border border-white flex justify-center items-center"
                            >
                                MAS INFO
                            </MotionLink>
                        </div>
                    </div>
                </div>

                {/* Ultimas novedades */}
                <div className="bg-special-white flex flex-col items-center pb-16">
                    <div className="flex flex-col w-full max-w-[1240px] mx-auto">
                        <div className="flex flex-row items-center justify-between max-sm:flex-col max-sm:gap-6 py-10">
                            <h2 className="text-[40px] font-bold font-roboto-condensed max-sm:text-center">
                                Enterate de nuestra ultimas novedades
                            </h2>
                            <MotionLink
                                initial={{ scale: 1 }}
                                whileHover={{ scale: 0.95 }}
                                to={"/inicio/novedades"}
                                className="text-[16px] text-primary-red font-medium border border-primary-red w-[172px] h-[47px] bg-white flex justify-center items-center"
                            >
                                VER TODAS
                            </MotionLink>
                        </div>

                        <div className="flex flex-row flex-wrap gap-5 justify-between max-md:justify-center">
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
            <WhatsappComponent />
            <Footer />
        </div>
    );
}
