import {
    faChevronUp,
    faHouse,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import conmanWhiteLogo from "../assets/logos/conman-white-logo.png";
import { useStateContext } from "../contexts/ContextProvider";

export default function Administrator() {
    const { adminToken, setAdminToken, adminInfo } = useStateContext();

    const MotionFontAwesomeIcon = motion.create(FontAwesomeIcon);
    const MotionLink = motion.create(Link);

    const location = useLocation();

    // Eliminar las barras iniciales y dividir la ruta en palabras
    const cleanPathname = location.pathname
        .replace(/^\/+/, "")
        .replace(/-/g, " ")
        .split("/");

    // Eliminar la primera palabra
    cleanPathname.shift(); // Elimina la primera palabra (índice 0)

    // Volver a unir las palabras restantes con '/'
    const finalPath = cleanPathname.join("/");

    const [dropdowns, setDropdowns] = useState([
        {
            id: "inicio",
            open: false,
            title: "Inicio",
            icon: faHouse,
            href: "#",
            subHref: [{ title: "Slider", href: "/dashboard/slider" }],
        },
        {
            id: "catalogo",
            open: false,
            title: "Catalogo",
            icon: faHouse,
            href: "#",
            subHref: [
                { title: "Categorias", href: "/dashboard/categorias" },
                { title: "Productos", href: "/dashboard/productos" },
            ],
        },
        {
            id: "nosotros",
            open: false,
            title: "Nosotros",
            icon: faHouse,
            href: "#",
            subHref: [{ title: "Nosotros", href: "/dashboard/nosotros" }],
        },
        {
            id: "calidad",
            open: false,
            title: "Calidad",
            icon: faHouse,
            href: "#",
            subHref: [{ title: "Slider", href: "#" }],
        },
        {
            id: "novedades",
            open: false,
            title: "Novedades",
            icon: faHouse,
            href: "#",
            subHref: [{ title: "Slider", href: "#" }],
        },
        {
            id: "contacto",
            open: false,
            title: "Contacto",
            icon: faHouse,
            href: "#",
            subHref: [{ title: "Contacto", href: "/dashboard/contacto-admin" }],
        },
    ]);

    const [userMenu, setUserMenu] = useState(false);

    const toggleDropdown = (id) => {
        setDropdowns((prevDropdowns) =>
            prevDropdowns.map((drop) =>
                drop.id === id ? { ...drop, open: !drop.open } : drop
            )
        );
    };

    const logout = (ev) => {
        ev.preventDefault();
        setAdminToken(null);
    };

    if (!adminToken) {
        return <Navigate to={"/adm"} />;
    }

    return (
        <div className="flex flex-row font-roboto-condensed">
            <div className="flex flex-col h-screen w-[300px] bg-primary-blue text-white">
                <Link to={"/"} className="p-6">
                    <img src={conmanWhiteLogo} alt="" />
                </Link>
                <nav className="">
                    <ul className="">
                        <AnimatePresence>
                            {dropdowns.map((drop) => (
                                <li key={drop.id}>
                                    <button
                                        onClick={() => toggleDropdown(drop.id)}
                                        className="flex flex-row w-full justify-between items-center border-b p-4"
                                    >
                                        <div className="flex flex-row gap-2">
                                            {/* <FontAwesomeIcon
                                                size="lg"
                                                icon={drop.icon}
                                            /> */}
                                            <Link to={drop.href}>
                                                {drop.title}
                                            </Link>
                                        </div>
                                        <MotionFontAwesomeIcon
                                            initial={{ rotate: 0 }}
                                            animate={{
                                                rotate: drop.open ? 180 : 0,
                                            }}
                                            exit={{ rotate: 0 }}
                                            transition={{
                                                ease: "linear",
                                                duration: 0.2,
                                            }}
                                            size="lg"
                                            icon={faChevronUp}
                                        />
                                    </button>
                                    <AnimatePresence>
                                        {drop.open && (
                                            <ul className="flex flex-col gap-2 overflow-hidden py-2 h-fit">
                                                {drop.subHref.map(
                                                    (sub, index) => (
                                                        <MotionLink
                                                            className="pl-4"
                                                            whileHover={{
                                                                backgroundColor:
                                                                    "#fff",
                                                                color: "#000",
                                                            }}
                                                            key={index}
                                                            to={sub.href}
                                                        >
                                                            {sub.title}
                                                        </MotionLink>
                                                    )
                                                )}
                                            </ul>
                                        )}
                                    </AnimatePresence>
                                </li>
                            ))}
                        </AnimatePresence>
                    </ul>
                </nav>
            </div>
            <div className="w-full flex flex-col overflow-y-auto h-screen">
                <div className="shadow-md py-3 flex flex-row justify-between px-4">
                    <h1 className="text-2xl pl-4 pt-2">
                        {finalPath.charAt(0).toUpperCase() + finalPath.slice(1)}
                    </h1>
                    <div>
                        <button
                            className="relative"
                            onClick={() => setUserMenu(!userMenu)}
                        >
                            <FontAwesomeIcon color="#000" icon={faUser} />
                        </button>
                        <AnimatePresence>
                            {userMenu && (
                                <motion.div
                                    initial={{ opacity: 0, y: -30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -30 }}
                                    transition={{
                                        duration: 0.1,
                                        ease: "linear",
                                    }}
                                    className="flex flex-col items-start absolute border-2 shadow- w-[300px] h-fit right-2 top-10 p-4 bg-white gap-4"
                                >
                                    <div className="">
                                        <h2>
                                            <span className="text-gray-500 pr-2">
                                                Usuario:
                                            </span>
                                            {adminInfo[0]?.name.toUpperCase()}
                                        </h2>
                                    </div>
                                    <button
                                        onClick={logout}
                                        className="bg-primary-red text-white w-full h-[40px]"
                                    >
                                        Cerrar Sesion
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
                <Outlet />
            </div>
        </div>
    );
}
