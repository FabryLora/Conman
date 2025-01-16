import { useEffect } from "react";
import { Link } from "react-router-dom";
import chevronDown from "../assets/icons/chevron-down.svg";
import fbIcon from "../assets/icons/fbIcon.svg";
import igIcon from "../assets/icons/igIcon.svg";
import phoneIcon from "../assets/icons/phone.svg";
import searchIcon from "../assets/icons/search.svg";
import letterIcon from "../assets/icons/sobre.svg";
import conmanLogo from "../assets/logos/conman-logo.png";
import { useStateContext } from "../contexts/ContextProvider";

export default function Navbar() {
    const { contactInfo, fetchContactInfo } = useStateContext();

    const links = [
        { title: "Nosotros", href: "/inicio/nosotros", chevron: false },
        {
            title: "Terminales y accesorios",
            href: "/terminales-y-accesorios",
            chevron: true,
        },
        { title: "Mangueras", href: "/mangueras", chevron: true },
        {
            title: "Acoples rapidos",
            href: "/inicio/acoples-rapidos-hidraulicos",
            chevron: true,
        },
        { title: "Productos", href: "/productos", chevron: true },
        { title: "Calidad", href: "/calidad", chevron: false },
        { title: "Novedades", href: "/novedades", chevron: false },
        { title: "Contacto", href: "/contacto", chevron: false },
    ];

    const socials = [
        { logo: fbIcon, href: "#" },
        { logo: igIcon, href: "#" },
    ];

    useEffect(() => {
        fetchContactInfo();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center font-roboto-condensed">
            <div className="bg-primary-blue h-[40px] w-full flex items-center justify-between pl-20 pr-10">
                <div className="flex gap-4 items-center text-[14px] text-white h-[16px]">
                    <div className="flex gap-2 items-center">
                        <img className="h-[16px]" src={letterIcon} alt="" />
                        <h2>{contactInfo.mail}</h2>
                    </div>
                    <div className="flex gap-2 items-center">
                        <img className="h-[16px]" src={phoneIcon} alt="" />
                        <h2>{contactInfo.phone}</h2>
                    </div>
                </div>

                <div className="flex flex-row gap-4 h-[16px] items-center justify-center">
                    {socials.map((social, index) => (
                        <Link key={index} to={social.href}>
                            <img src={social.logo} alt="" />
                        </Link>
                    ))}
                    <button>
                        <img src={searchIcon} alt="" />
                    </button>
                </div>
            </div>
            <nav className="flex flex-row items-center pl-5 pr-5 md:pl-20 md:pr-10 gap-5 md:gap-32 w-full h-[60px] md:h-[85px] shadow-sm">
                <Link to={"/"}>
                    <img src={conmanLogo} alt="Logo" className="h-8 md:h-10" />
                </Link>
                <ul className="flex flex-col md:flex-row gap-5 md:gap-10 text-sm md:text-base 2xl:text-[2px]">
                    {links.map((link) => (
                        <div
                            className="flex gap-1 items-center"
                            key={link.title}
                        >
                            <Link
                                className="text-sm md:text-base"
                                to={link.href}
                            >
                                {link.title}
                            </Link>
                            {link.chevron && (
                                <img src={chevronDown} alt="Chevron" />
                            )}
                        </div>
                    ))}
                </ul>
            </nav>
        </div>
    );
}
