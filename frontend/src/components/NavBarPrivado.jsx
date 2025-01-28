import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import barsIcon from "../assets/icons/bars-solid.svg";
import chevronDownWhite from "../assets/icons/chevron-down-white.svg";
import fbIcon from "../assets/icons/fbIcon.svg";
import igIcon from "../assets/icons/igIcon.svg";
import phoneIcon from "../assets/icons/phone.svg";
import letterIcon from "../assets/icons/sobre.svg";
import xmark from "../assets/icons/xmark-solid.svg";
import conmanLogo from "../assets/logos/conman-logo.png";

import { useStateContext } from "../contexts/ContextProvider";

export default function NavbarPrivado() {
    const [tinyMenu, setTinyMenu] = useState(false);
    const [userLoged, setUserLoged] = useState(false);
    const [selectedLink, setSelectedLink] = useState("Productos");
    const { userToken, userInfo, contactInfo } = useStateContext();

    const socials = [
        { logo: fbIcon, href: "#" },
        { logo: igIcon, href: "#" },
    ];

    const links = [
        { title: "Productos", href: "/privado/productos", selected: false },
        { title: "Pedido", href: "/privado/pedido", selected: false },
        {
            title: "Lista de precios",
            href: "/privado/lista-de-precios",
            selected: false,
        },
    ];

    return (
        <div className="flex flex-col items-center justify-center font-roboto-condensed">
            <div className="bg-primary-blue h-[40px] w-full flex items-center justify-between pl-20 pr-10">
                <div className="flex gap-4 items-center text-[14px] text-white h-[16px]">
                    <div className="flex gap-2 items-center">
                        <img className="h-[16px]" src={letterIcon} alt="" />
                        <p>{contactInfo?.mail}</p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <img className="h-[16px]" src={phoneIcon} alt="" />
                        <p>{contactInfo?.phone}</p>
                    </div>
                </div>
                <div className="flex fle-row gap-4 h-full items-center">
                    <div className="flex flex-row gap-4 h-[16px] items-center justify-center">
                        {socials.map((social, index) => (
                            <Link key={index} to={social.href}>
                                <img src={social.logo} alt="" />
                            </Link>
                        ))}
                    </div>
                    {userToken && (
                        <div className="h-full relative">
                            <button
                                onClick={() => setUserLoged(!userLoged)}
                                className="w-[139px] h-full flex justify-center items-center bg-white"
                            >
                                <h2 className="font-medium text-sm text-primary-blue">
                                    {userInfo.name
                                        ? userInfo.name.toUpperCase()
                                        : ""}
                                </h2>
                            </button>
                            <AnimatePresence>
                                {userLoged && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -30 }}
                                        transition={{
                                            duration: 0.1,
                                            ease: "linear",
                                        }}
                                        className="absolute flex flex-col top-10 right-0 border broder-gray bg-white shadow-md p-5 font-roboto-condensed w-[367px] h-fit z-20"
                                    >
                                        <Link
                                            className="bg-primary-red text-white text-center p-4"
                                            to={"/privado"}
                                        >
                                            SECCION PRIVADA
                                        </Link>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            </div>
            <nav className="flex relative flex-row items-center pl-10 gap-20 w-full h-[85px] shadow-sm max-lg:justify-center">
                <Link className="w-[267px] h-[57px]" to={"/"}>
                    <img src={conmanLogo} alt="Logo" className="w-full" />
                </Link>
                <ul className="flex flex-row gap-5 w-full justify-end pr-10 max-lg:hidden">
                    {links.map((linkInfo) => (
                        <li
                            onClick={() => setSelectedLink(linkInfo.title)}
                            key={linkInfo.title}
                        >
                            <Link
                                className={`${
                                    linkInfo.title === selectedLink
                                        ? "font-bold"
                                        : ""
                                }`}
                                to={linkInfo.href}
                            >
                                {linkInfo.title}
                            </Link>
                        </li>
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
