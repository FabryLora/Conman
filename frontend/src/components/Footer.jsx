import { Link } from "react-router-dom";
import fbIcon from "../assets/icons/fbIcon.svg";
import igIcon from "../assets/icons/igIcon.svg";
import letterIcon from "../assets/icons/letter-red-icon.svg";
import locationIcon from "../assets/icons/location-red-icon.svg";
import phoneIcon from "../assets/icons/phone-red-icon.svg";
import whatsappIcon from "../assets/icons/whatsapp-red-icon.svg";
import { useStateContext } from "../contexts/ContextProvider";

export default function Footer() {
    const { contactInfo, logos, categoryInfo, userToken } = useStateContext();

    function removeAccents(str) {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    const social = [
        { logo: fbIcon, href: contactInfo?.fb },
        { logo: igIcon, href: contactInfo?.ig },
    ];

    const contactoInfo = [
        {
            icon: locationIcon,
            text: contactInfo?.location,
        },
        { icon: phoneIcon, text: contactInfo?.phone },
        { icon: letterIcon, text: contactInfo?.mail },
        { icon: whatsappIcon, text: contactInfo?.wp },
    ];
    return (
        <footer className="bg-primary-blue h-[402px] max-sm:h-fit font-roboto-condensed text-white flex flex-col justify-between">
            <div className="flex flex-row flex-wrap gap-10 justify-evenly max-sm:justify-start items-center h-full order-1">
                {/* logos y redes */}
                <div className="flex flex-col justify-center items-center gap-8 order-1 max-sm:mx-auto">
                    <div className="flex flex-col max-sm:py-5">
                        <img src={logos?.secundario_url} alt="" />
                    </div>
                    <div className="flex flex-row gap-4">
                        {social.map((item, index) => (
                            <a href={item?.href} target="_black" key={index}>
                                <img
                                    className="w-[26px] h-[26px]"
                                    src={item.logo}
                                    alt=""
                                />
                            </a>
                        ))}
                    </div>
                </div>

                {/* footer nav */}
                <div className="flex flex-col gap-7 order-2 max-sm:px-8">
                    <h2 className="text-xl font-semibold">Secciones</h2>
                    <div className="grid grid-cols-2 grid-rows-4 gap-4 gap-x-10">
                        {}
                        <Link className="text-base" to={"/inicio/nosotros"}>
                            Nosotros
                        </Link>
                        {categoryInfo?.map((item, index) => (
                            <Link
                                key={index}
                                className="text-base"
                                to={`/inicio/${removeAccents(
                                    item.name.split(" ").join("-").toLowerCase()
                                )}`}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <Link className="text-base" to={"/inicio/calidad"}>
                            Calidad
                        </Link>
                        <Link className="text-base" to={"/inicio/novedades"}>
                            Novedades
                        </Link>
                        <Link className="text-base" to={"/inicio/contacto"}>
                            Contacto
                        </Link>
                    </div>
                </div>

                {/* contact info */}
                <div className="flex flex-col gap-3 order-3 max-sm:px-8 max-sm:pb-4">
                    <h2 className="text-xl font-semibold">Datos de Contacto</h2>
                    <div className="flex flex-col gap-3">
                        {contactoInfo.map((item, index) => (
                            <div
                                className="flex flex-row gap-4 items-center"
                                key={index}
                            >
                                <img
                                    className="w-[26px] h-[26px]"
                                    src={item.icon}
                                    alt=""
                                />
                                <p className="text-base break-words max-w-[300px]">
                                    {item.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* copy y derechos */}
            <div className="h-[60px] flex flex-row justify-between items-center px-5 text-[14px] bg-primary-blue-dark order-2">
                <p>
                    © Copyright 2024{" "}
                    <span className="font-semibold">Conman</span>. Todos los
                    derechos reservados
                </p>
                <p>by Osole</p>
            </div>
        </footer>
    );
}
