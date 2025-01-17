import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import barsIcon from "../assets/icons/bars-solid.svg";
import chevronDownWhite from "../assets/icons/chevron-down-white.svg";
import chevronDown from "../assets/icons/chevron-down.svg";
import fbIcon from "../assets/icons/fbIcon.svg";
import igIcon from "../assets/icons/igIcon.svg";
import phoneIcon from "../assets/icons/phone.svg";
import searchIcon from "../assets/icons/search.svg";
import letterIcon from "../assets/icons/sobre.svg";
import xmark from "../assets/icons/xmark-solid.svg";
import conmanLogo from "../assets/logos/conman-logo.png";
import { useStateContext } from "../contexts/ContextProvider";

export default function Navbar() {
    const { contactInfo, fetchContactInfo } = useStateContext();
    const [tinyMenu, setTinyMenu] = useState(false);

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
            <nav className="flex relative flex-row items-center pl-10 gap-20 w-full h-[85px] shadow-sm max-lg:justify-center">
                <Link className="w-[267px] h-[57px]" to={"/"}>
                    <img src={conmanLogo} alt="Logo" className="w-full" />
                </Link>
                <ul className="flex flex-row gap-5 w-full max-lg:hidden">
                    {links.map((link) => (
                        <div
                            className="flex gap-1 max-xl:text-sm items-center"
                            key={link.title}
                        >
                            <Link to={link.href}>{link.title}</Link>
                            {link.chevron && (
                                <img src={chevronDown} alt="Chevron" />
                            )}
                        </div>
                    ))}
                </ul>
                <button
                    onClick={() => setTinyMenu(!tinyMenu)}
                    className="w-[24px] h-[24px] absolute left-10 lg:hidden"
                >
                    <img src={barsIcon} alt="" />
                </button>
            </nav>
            <AnimatePresence>
                {tinyMenu && (
                    <div className="absolute top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.5)] z-20">
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-col absolute top-0 left-0 h-screen w-1/2 bg-primary-blue"
                        >
                            <button
                                onClick={() => setTinyMenu(false)}
                                className="absolute h-[16px] w-[16px] right-4 top-2"
                            >
                                <img src={xmark} alt="" />
                            </button>
                            <ul className="flex flex-col gap-5 p-10 text-white w-full">
                                {links.map((link) => (
                                    <div
                                        className="flex gap-1 justify-between items-center"
                                        key={link.title}
                                    >
                                        <Link to={link.href}>{link.title}</Link>
                                        {link.chevron && (
                                            <img
                                                className="w-[16px] h-[16px]"
                                                src={chevronDownWhite}
                                                alt="Chevron"
                                            />
                                        )}
                                    </div>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
