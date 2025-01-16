import shieldIcon from "../assets/icons/shield-icon.svg";
import acoples from "../assets/inicio/acoples.png";
import bannerHome from "../assets/inicio/banner-home.png";
import mangueras from "../assets/inicio/mangueras.png";
import novedades1 from "../assets/inicio/novedades-1.png";
import novedades2 from "../assets/inicio/novedades-2.png";
import novedades3 from "../assets/inicio/novedades-3.png";
import bannerCalidad from "../assets/inicio/pdc-banner.png";
import productos from "../assets/inicio/productos.png";
import quienes from "../assets/inicio/quienes.png";
import termales from "../assets/inicio/termales.png";
import iqnetLogo from "../assets/logos/iqnet-logo.png";
import iramLogo from "../assets/logos/iram-logo.png";
import Carousel from "../components/Carousel";
import Footer from "../components/Footer";
import HomeCategory from "../components/HomeCategory";
import Navbar from "../components/Navbar";
import Novedades from "../components/Novedades";

export default function Home() {
    const categories = [
        {
            name: "Terminales y accesorios",
            image: termales,
        },
        {
            name: "Mangueras",
            image: mangueras,
        },
        {
            name: "Acoples rapidos hidraulicos",
            image: acoples,
        },
        {
            name: "Productos",
            image: productos,
        },
    ];

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
        {
            image: novedades3,
            title: "FIMAQH",
            description:
                "Conmon exhibió su última generación de sistemas de monitoreo en tiempo real, diseñados para prevenir fallos en equipos y optimizar la eficiencia operativa. Estas herramientas no solo impulsan...",
            href: "#",
        },
    ];

    const carouselInfo = [
        {
            src: bannerHome,
            title: "CONMAN",
            description: "Productos de alta calidad y precicion",
        },
        {
            src: novedades2,
            title: "Prueba",
            description: "Productosasdrecicion",
        },
        {
            src: novedades3,
            title: "Prueba2",
            description: "Productos deasdecicion",
        },
    ];

    return (
        <>
            <Navbar />
            <div>
                <Carousel images={carouselInfo} />

                {/* categorias */}
                <div className="flex flex-col items-center w-[90%] mx-auto my-20 gap-3">
                    <h2 className="font-bold text-[40px] font-roboto-condensed self-start">
                        Categorias
                    </h2>
                    <div className="grid grid-cols-2 grid-rows-2 h-fit justify-items-center gap-5 w-full">
                        {categories.map((category, index) => (
                            <HomeCategory
                                key={index}
                                bgImage={category.image}
                                categoryTitle={category.name}
                            />
                        ))}
                    </div>
                </div>

                {/* Quienes somos */}
                <div className="flex flex-row lg:flex-row items-center lg:items-end my-10 font-roboto-condensed justify-center w-full h-full">
                    {/* Imagen - 50% */}
                    <div className="w-full lg:w-1/2 flex justify-center items-center">
                        <img
                            className="w-full h-auto lg:h-[678px] object-cover"
                            src={quienes}
                            alt="¿Quiénes somos?"
                        />
                    </div>
                    {/* Texto - 50% */}
                    <div className="flex flex-col gap-6 lg:gap-10 h-full w-full lg:w-1/2 px-6 lg:px-10">
                        <h2 className="text-[24px] sm:text-[32px] lg:text-[40px] font-bold text-center lg:text-left">
                            ¿Quiénes somos?
                        </h2>
                        <div className="flex flex-col gap-6 text-[14px] sm:text-[16px] text-justify max-w-[90%]">
                            <p>
                                Conman es una empresa con una gran trayectoria y
                                experiencia en la fabricación y venta de
                                terminales y accesorios para todo tipo de
                                instalaciones óleo-hidráulicas y neumáticas,
                                equipada para tal fin con tecnología de última
                                generación.
                            </p>
                            <p>
                                Nuestra prioridad es brindarle al cliente un
                                servicio integral y una rápida respuesta a sus
                                necesidades, y ofrecerle productos de máxima
                                calidad. Estamos muy bien posicionados en el
                                mercado, y distribuimos nuestros productos a lo
                                largo del todo el país, a través de vendedores
                                propios, y distribuidores.
                            </p>
                            <p>
                                En Conman fabricamos una amplia línea de
                                terminales y accesorios, y comercializamos
                                mangueras de alta, media y baja presión,
                                abasteciendo al agro y a la industria,
                                principalmente a la relacionada con la actividad
                                petrolera, brindando un servicio y asesoramiento
                                eficiente, lo que nos da una posición de
                                privilegio con respecto a la competencia. Además
                                fabricamos prensas hidráulicas para mangueras,
                                las cuales han tenido una excelente aceptación
                                en el mercado interno y en el exterior.
                            </p>
                        </div>
                        <div className="mt-auto">
                            <button className="bg-primary-red w-full sm:w-[200px] lg:w-[289px] h-[47px] text-white mx-auto lg:mx-0 mt-20">
                                MÁS INFO
                            </button>
                        </div>
                    </div>
                </div>

                {/* Piloticas de calidad */}
                <div className="flex relative h-[460px] w-full items-center justify-around bg-primary-blue mt-10 font-roboto-condensed text-white">
                    <img
                        className="absolute w-full h-full opacity-50"
                        src={bannerCalidad}
                        alt=""
                    />
                    <div className="flex flex-col items-start justify-center w-[60%] h-full">
                        <div className="w-[50px] h-[50px]">
                            <img className="" src={shieldIcon} alt="" />
                        </div>
                        <h2 className="font-bold text-[40px]">
                            Politicas de Calidad
                        </h2>
                        <p className="text-[16px]">
                            La Dirección de CONMAN se compromete a cumplir la
                            presente Política de la Calidad, mejorando en forma
                            contínua el Sistema de Gestión de Calidad en
                            concordancia con su contexto, la normativa legal
                            vigente y otros aplicables, enfocado en la
                            productividad eficiente y el alcance de todos los
                            objetivos propuestos.
                        </p>
                    </div>

                    <div className="flex flex-col gap-14 self-start pt-20 w-[242px]">
                        <div className="flex flex-row justify-between">
                            <img src={iramLogo} alt="" />
                            <img src={iqnetLogo} alt="" />
                        </div>
                        <button className="w-full h-[47px] border border-white">
                            MAS INFO
                        </button>
                    </div>
                </div>

                {/* Ultimas novedades */}
                <div className="bg-special-white flex flex-col items-center py-20">
                    <div className="flex flex-col w-[90%] gap-3">
                        <div className="flex flex-row items-center justify-between">
                            <h2 className="text-[40px] font-bold font-roboto-condensed">
                                Enterate de nuestra ultimas novedades
                            </h2>
                            <button className="text-[16px] text-primary-red font-medium border border-primary-red w-[172px] h-[47px] bg-white">
                                VER TODAS
                            </button>
                        </div>

                        <div className="flex flex-row flex-wrap gap-5 justify-between">
                            {novedades.map((novedad, index) => (
                                <Novedades key={index} newsObject={novedad} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
