import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import fbIcon from "../assets/icons/fbIcon.svg";
import igIcon from "../assets/icons/igIcon.svg";
import letterIcon from "../assets/icons/letter-red-icon.svg";
import locationIcon from "../assets/icons/location-red-icon.svg";
import phoneIcon from "../assets/icons/phone-red-icon.svg";
import whatsappIcon from "../assets/icons/whatsapp-red-icon.svg";
import { useStateContext } from "../contexts/ContextProvider";

export default function Footer() {
    const { contactInfo, logos, categoryInfo } = useStateContext();

    function removeAccents(str) {
        return str?.normalize("NFD")?.replace(/[\u0300-\u036f]/g, "");
    }

    const soloDejarNumeros = (str) => {
        return str?.replace(/\D/g, "");
    };
    const location = useLocation();

    const [cleanPathname, setCleanPathname] = useState(
        location.pathname.replace(/^\/+/, "").replace(/-/g, " ").split("/")
    );

    useEffect(() => {
        setCleanPathname(
            location.pathname.replace(/^\/+/, "").replace(/-/g, " ").split("/")
        );
    }, [location]);

    return (
        <footer className="bg-primary-blue h-[402px] max-sm:h-fit font-roboto-condensed text-white flex flex-col justify-between">
            <div className="flex flex-row flex-wrap gap-10 justify-between w-[1240px] mx-auto max-sm:justify-start items-center h-full order-1 max-sm:flex-col max-sm:w-full">
                {/* logos y redes */}
                <div className="flex flex-col justify-center items-center gap-8 order-1 max-sm:mx-auto h-full sm:py-20">
                    <Link to={"/"} className="flex flex-col max-sm:py-5">
                        <img src={logos?.secundario_url} alt="" />
                    </Link>
                    <div className="flex flex-row gap-4">
                        {contactInfo?.fb && (
                            <a href={contactInfo?.fb} target="_black">
                                <img
                                    className="w-[26px] h-[26px]"
                                    src={fbIcon}
                                    alt=""
                                />
                            </a>
                        )}

                        {contactInfo?.ig && (
                            <a href={contactInfo?.ig} target="_black">
                                <img
                                    className="w-[26px] h-[26px]"
                                    src={igIcon}
                                    alt=""
                                />
                            </a>
                        )}
                    </div>
                </div>

                {/* footer nav */}
                <div
                    className={`flex flex-col gap-7 order-2 max-sm:px-8 h-full sm:py-20 ${
                        cleanPathname[0] === "privado" ? "hidden" : ""
                    }`}
                >
                    <h2 className="text-xl font-semibold">Secciones</h2>
                    <div className="grid grid-cols-2 grid-rows-4 gap-4 gap-x-10">
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
                <div className="flex flex-col gap-7 order-3 max-sm:px-8 max-sm:pb-4 h-full sm:py-20">
                    <h2 className="text-xl font-semibold">Datos de Contacto</h2>
                    <div className="flex flex-col gap-3">
                        {contactInfo?.location && (
                            <a
                                href={`https://maps.app.goo.gl/6oT6qDq5dr1cyWQV8`}
                                target="_blank"
                                className="flex flex-row gap-4 items-center"
                            >
                                <img
                                    className="w-[26px] h-[26px]"
                                    src={locationIcon}
                                    alt=""
                                />
                                <p className="text-base break-words max-w-[300px]">
                                    {contactInfo?.location}
                                </p>
                            </a>
                        )}
                        {contactInfo?.phone && (
                            <a
                                href={`tel:${soloDejarNumeros(
                                    contactInfo?.phone
                                )}`}
                                target="_blank"
                                className="flex flex-row gap-4 items-center"
                            >
                                <img
                                    className="w-[26px] h-[26px]"
                                    src={phoneIcon}
                                    alt=""
                                />
                                <p className="text-base break-words max-w-[300px]">
                                    {contactInfo?.phone}
                                </p>
                            </a>
                        )}
                        {contactInfo?.mail && (
                            <a
                                href={`mailto:${contactInfo?.mail}`}
                                target="_blank"
                                className="flex flex-row gap-4 items-center"
                            >
                                <img
                                    className="w-[26px] h-[26px]"
                                    src={letterIcon}
                                    alt=""
                                />
                                <p className="text-base break-words max-w-[300px]">
                                    {contactInfo?.mail}
                                </p>
                            </a>
                        )}
                        {contactInfo?.wp && (
                            <a
                                href={`https://wa.me/${soloDejarNumeros(
                                    contactInfo?.wp
                                )}`}
                                target="_blank"
                                className="flex flex-row gap-4 items-center"
                            >
                                <img
                                    className="w-[26px] h-[26px]"
                                    src={whatsappIcon}
                                    alt=""
                                />
                                <p className="text-base break-words max-w-[300px]">
                                    {contactInfo?.wp}
                                </p>
                            </a>
                        )}
                    </div>
                </div>
            </div>

            {/* copy y derechos */}
            <div className="bg-primary-blue-dark order-2 h-[60px]">
                <div className="h-full max-w-[1240px] mx-auto flex flex-row justify-between items-center text-[14px] max-sm:text-xs">
                    <p>
                        © Copyright 2025{" "}
                        <span className="font-semibold">Conman</span>. Todos los
                        derechos reservados
                    </p>
                    <p>by Osole</p>
                </div>
            </div>
        </footer>
    );
}
