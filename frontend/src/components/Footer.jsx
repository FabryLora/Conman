import { Link } from "react-router-dom";
import fbIcon from "../assets/icons/fbIcon.svg";
import igIcon from "../assets/icons/igIcon.svg";
import letterIcon from "../assets/icons/letter-red-icon.svg";
import locationIcon from "../assets/icons/location-red-icon.svg";
import phoneIcon from "../assets/icons/phone-red-icon.svg";
import whatsappIcon from "../assets/icons/whatsapp-red-icon.svg";
import cosmanWhiteLogo from "../assets/logos/conman-white-logo.png";

export default function Footer() {
    const links = [
        { title: "Nosotros", href: "/nosotros" },
        { title: "Terminales y accesorios", href: "/terminales-y-accesorios" },
        { title: "Mangueras", href: "/mangueras" },
        { title: "Acoples rapidos", href: "/acoples-rapidos" },
        { title: "Productos", href: "/productos" },
        { title: "Calidad", href: "/calidad" },
        { title: "Novedades", href: "/novedads" },
        { title: "Contacto", href: "/contacto" },
    ];

    const social = [
        { logo: fbIcon, href: "#" },
        { logo: igIcon, href: "#" },
    ];

    const contactInfo = [
        {
            icon: locationIcon,
            text: "Remedios de Escalada de San Martín 3771 - (1822) Valentin Alsina. Buenos Aires, Argentina",
        },
        { icon: phoneIcon, text: "+54 11 2345 6789" },
        { icon: letterIcon, text: "Rz6wI@example.com" },
        { icon: whatsappIcon, text: "+54 11 2345 6789" },
    ];
    return (
        <footer className="bg-primary-blue h-[402px] font-roboto-condensed text-white flex flex-col justify-between">
            <div className="flex flex-row gap-10 justify-evenly items-center h-full">
                {/* logos y redes */}
                <div className="flex flex-col justify-center items-center gap-3">
                    <div className="flex flex-col">
                        <img src={cosmanWhiteLogo} alt="" />
                    </div>
                    <div className="flex flex-row gap-4">
                        {social.map((item, index) => (
                            <img
                                className="w-[26px] h-[26px]"
                                key={index}
                                src={item.logo}
                                alt=""
                            />
                        ))}
                    </div>
                </div>

                {/* footer nav */}
                <div className="flex flex-col gap-7">
                    <h2 className="text-xl font-semibold">Secciones</h2>
                    <div className="grid grid-cols-2 grid-rows-4 gap-4">
                        {links.map((item, index) => (
                            <Link
                                className="text-base"
                                key={index}
                                to={item.href}
                            >
                                {item.title}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* contact info */}
                <div className="flex flex-col gap-3">
                    <h2 className="text-xl font-semibold">Datos de Contacto</h2>
                    <div className="flex flex-col gap-3">
                        {contactInfo.map((item, index) => (
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
            <div className="h-[60px] flex flex-row justify-between items-center px-5 text-[14px] bg-primary-blue-dark">
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
