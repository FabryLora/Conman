import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import barsIcon from "../assets/icons/bars-solid.svg";
import chevronDownWhite from "../assets/icons/chevron-down-white.svg";
import fbIcon from "../assets/icons/fbIcon.svg";
import igIcon from "../assets/icons/igIcon.svg";
import phoneIcon from "../assets/icons/phone.svg";
import letterIcon from "../assets/icons/sobre.svg";
import xmark from "../assets/icons/xmark-solid.svg";

import { useStateContext } from "../contexts/ContextProvider";

export default function NavbarPrivado() {
    const [tinyMenu, setTinyMenu] = useState(false);
    const [userLoged, setUserLoged] = useState(false);
    const [selectedLink, setSelectedLink] = useState("Productos");
    const {
        userToken,
        userInfo,
        contactInfo,
        logos,
        cart,
        setUserToken,
        clearCart,
    } = useStateContext();

    const [cartProd, setCartProd] = useState(cart.length);

    const userMenu = useRef(null);

    const location = useLocation();

    const [cleanPathname, setCleanPathname] = useState(
        location.pathname.replace(/^\/+/, "").replace(/-/g, " ").split("/")
    );

    useEffect(() => {
        setCleanPathname(
            location.pathname.replace(/^\/+/, "").replace(/-/g, " ").split("/")
        );
    }, [location]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (userMenu.current && !userMenu.current.contains(event.target)) {
                setUserLoged(false); // Cierra el contenedor si se hace clic fuera
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        setCartProd(cart.length);
    }, [cart]);

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
        <div className="fixed w-full top-0 flex flex-col items-center justify-center font-roboto-condensed z-[100]">
            <div className="bg-primary-blue w-full">
                <div className="max-w-[1240px] mx-auto h-[40px] w-full flex items-center justify-between  max-sm:pl-0 max-sm:justify-end">
                    <div className="flex gap-4 items-center text-[14px] text-white h-[16px] max-sm:hidden">
                        {contactInfo?.mail && (
                            <a
                                href={`mailto:${contactInfo?.mail}`}
                                className="flex gap-2 items-center"
                            >
                                <img
                                    className="h-[16px]"
                                    src={letterIcon}
                                    alt=""
                                />
                                <p>{contactInfo?.mail}</p>
                            </a>
                        )}
                        {contactInfo?.phone && (
                            <a
                                href={`tel:${contactInfo?.phone}`}
                                className="flex gap-2 items-center"
                            >
                                <img
                                    className="h-[16px]"
                                    src={phoneIcon}
                                    alt=""
                                />
                                <p>{contactInfo?.phone}</p>
                            </a>
                        )}
                    </div>
                    <div className="flex fle-row gap-4 h-full items-center">
                        <div className="flex flex-row gap-4 h-[16px] items-center justify-center">
                            {contactInfo?.ig && (
                                <a
                                    target="_blanck"
                                    rel="noopener noreferrer"
                                    href={contactInfo?.ig}
                                >
                                    <img src={igIcon} alt="" />
                                </a>
                            )}
                            {contactInfo?.fb && (
                                <a
                                    target="_blanck"
                                    rel="noopener noreferrer"
                                    href={contactInfo?.fb}
                                >
                                    <img src={fbIcon} alt="" />
                                </a>
                            )}
                        </div>
                        {userToken && (
                            <div className="h-full relative">
                                <button
                                    onClick={() => setUserLoged(!userLoged)}
                                    className="w-[139px] h-full flex justify-center items-center bg-white"
                                >
                                    <h2 className="font-medium text-sm text-primary-blue">
                                        {userInfo?.name
                                            ? userInfo?.name.toUpperCase()
                                            : ""}
                                    </h2>
                                </button>
                                <AnimatePresence>
                                    {userLoged && (
                                        <motion.div
                                            ref={userMenu}
                                            initial={{ opacity: 0, y: -30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -30 }}
                                            transition={{
                                                duration: 0.1,
                                                ease: "linear",
                                            }}
                                            className="absolute flex flex-col gap-4 top-10 right-0 border broder-gray bg-white shadow-md p-5 font-roboto-condensed w-[367px] h-fit z-20"
                                        >
                                            <Link
                                                onClick={() => {
                                                    setUserToken("");
                                                    clearCart;
                                                }}
                                                to={"/"}
                                                className="bg-primary-red text-white text-center px-4 py-2"
                                            >
                                                CERRAR SESION
                                            </Link>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <nav className="flex bg-white relative flex-row gap-24 w-full h-[85px] shadow-sm justify-between max-xl:justify-center">
                <div className="w-[1240px] mx-auto flex relative flex-row justify-between items-center max-sm:justify-center">
                    <Link className="w-[267px] h-[57px]" to={"/"}>
                        <img
                            src={logos?.principal_url}
                            alt="Logo"
                            className="w-full h-full object-contain"
                        />
                    </Link>
                    <ul className="flex flex-row gap-5 w-full justify-end max-lg:hidden">
                        {links.map((linkInfo) => (
                            <li
                                className="relative"
                                onClick={() => setSelectedLink(linkInfo.title)}
                                key={linkInfo.title}
                            >
                                {linkInfo.title === "Pedido" &&
                                    cart.length !== 0 && (
                                        <div className="absolute -top-2 -right-2 text-sm bg-primary-red text-white w-[17px] h-[18px] flex justify-center items-center rounded-full">
                                            <p>{cartProd}</p>
                                        </div>
                                    )}
                                <Link
                                    className={`${
                                        linkInfo?.title?.toLowerCase() ===
                                        cleanPathname[1]?.toLowerCase()
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
                        className="w-[24px] h-[24px] absolute left-10 lg:hidden max-sm:left-5"
                    >
                        <img src={barsIcon} alt="" />
                    </button>
                </div>
            </nav>
            <AnimatePresence>
                {tinyMenu && (
                    <div className="absolute top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.5)] z-20">
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-col absolute top-0 left-0 h-screen w-1/2 max-sm:w-[70%] bg-primary-blue"
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
                                        <Link
                                            onClick={() => setTinyMenu(false)}
                                            to={link.href}
                                        >
                                            {link.title}
                                        </Link>
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
