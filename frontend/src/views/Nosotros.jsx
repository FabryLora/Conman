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
            <div className="flex flex-row lg:flex-row items-center my-10 font-roboto-condensed justify-center w-full h-full">
                {/* Imagen - 50% */}
                <div className="w-full lg:w-1/2 flex justify-center items-center">
                    <img
                        className="w-full h-auto lg:h-[678px] object-cover"
                        src={nosotrosFirstInfo.image_url}
                        alt="¿Quiénes somos?"
                    />
                </div>
                {/* Texto - 50% */}
                <div className="flex flex-col gap-6 lg:gap-10 h-full lg:w-1/2 px-6 lg:px-10 items-center ">
                    <div className="flex flex-col gap-6 text-[14px] sm:text-[16px] text-justify  items-start max-w-[80%] leading-relaxed">
                        <h2 className="text-[24px] sm:text-[32px] lg:text-[40px] font-bold text-center lg:text-left">
                            ¿Quiénes somos?
                        </h2>
                        <p>
                            Conman es una empresa con una gran trayectoria y
                            experiencia en la fabricación y venta de terminales
                            y accesorios para todo tipo de instalaciones
                            óleo-hidráulicas y neumáticas, equipada para tal fin
                            con tecnología de última generación.
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
                            En Conman fabricamos una amplia línea de terminales
                            y accesorios, y comercializamos mangueras de alta,
                            media y baja presión, abasteciendo al agro y a la
                            industria, principalmente a la relacionada con la
                            actividad petrolera, brindando un servicio y
                            asesoramiento eficiente, lo que nos da una posición
                            de privilegio con respecto a la competencia. Además
                            fabricamos prensas hidráulicas para mangueras, las
                            cuales han tenido una excelente aceptación en el
                            mercado interno y en el exterior.
                        </p>
                        <p>
                            Somos una Empresa en continuo crecimiento, nuestro
                            trabajo no culmina cuando alcanzamos el objetivo
                            propuesto, sino que éste genera otro de mayor
                            envergadura, y así es como no dejamos de crecer.
                            Nuestros proyectos están fundamentados sobre bases
                            sólidas y nuestra capacidad de lucha es inagotable,
                            renovándonos ante las exigencias del mercado y
                            manteniéndonos en competitividad continuamente, con
                            una calidad humana que hace que la tarea sea más
                            fácil de realizar
                        </p>
                    </div>
                </div>
            </div>

            <div className="h-[639px] w-full bg-special-white flex justify-center">
                <div className="w-[90%]">
                    <h2 className="font-bold text-[40px] pb-20 pt-16">
                        ¿Porque elegirnos?
                    </h2>
                    <div className="flex flex-row justify-between">
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
