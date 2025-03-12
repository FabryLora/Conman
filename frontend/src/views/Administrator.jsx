import {
    faBars,
    faChevronUp,
    faHouse,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import conmanWhiteLogo from "../assets/logos/conman-white-logo.png";
import { useStateContext } from "../contexts/ContextProvider";

export default function Administrator() {
    const { adminToken, setAdminToken, adminInfo } = useStateContext();
    const [sidebar, setSidebar] = useState(true);

    const MotionFontAwesomeIcon = motion.create(FontAwesomeIcon);
    const MotionLink = motion.create(Link);

    const location = useLocation();

    const [cleanPathname, setCleanPathname] = useState(
        location.pathname?.replace(/^\/+/, "").replace(/-/g, " ").split("/")
    );

    useEffect(() => {
        setCleanPathname(
            location.pathname?.replace(/^\/+/, "").replace(/-/g, " ").split("/")
        );
    }, [location]);

    const [dropdowns, setDropdowns] = useState([
        {
            id: "inicio",
            open: false,
            title: "Inicio",
            icon: faHouse,
            href: "#",
            subHref: [
                { title: "Slider", href: "/dashboard/slider" },
                { title: "Logos", href: "/dashboard/logos" },

                {
                    title: "Nosotros Inicio",
                    href: "/dashboard/nosotros-inicio",
                },
                { title: "Calidad Inicio", href: "/dashboard/calidad-inicio" },
            ],
        },
        {
            id: "catalogo",
            open: false,
            title: "Catalogo",
            icon: faHouse,
            href: "#",
            subHref: [
                { title: "Categorias", href: "/dashboard/categorias" },
                {
                    title: "Grupo de Productos",
                    href: "/dashboard/grupo-de-productos",
                },
                { title: "Productos", href: "/dashboard/productos" },
            ],
        },
        {
            id: "nosotros",
            open: false,
            title: "Nosotros",
            icon: faHouse,
            href: "#",
            subHref: [
                { title: "Nosotros", href: "/dashboard/nosotros" },
                { title: "Valores", href: "/dashboard/valores" },
            ],
        },
        {
            id: "calidad",
            open: false,
            title: "Calidad",
            icon: faHouse,
            href: "#",
            subHref: [
                { title: "Contenido", href: "/dashboard/contenido" },
                { title: "Archivos", href: "/dashboard/archivos" },
            ],
        },
        {
            id: "novedades",
            open: false,
            title: "Novedades",
            icon: faHouse,
            href: "#",
            subHref: [
                { title: "Tarjetas Novedades", href: "/dashboard/novedades" },
            ],
        },
        {
            id: "contacto",
            open: false,
            title: "Contacto",
            icon: faHouse,
            href: "#",
            subHref: [{ title: "Contacto", href: "/dashboard/contacto-admin" }],
        },
        {
            id: "usuarios",
            open: false,
            title: "Usuarios",
            icon: faHouse,
            href: "#",
            subHref: [
                { title: "Clientes", href: "/dashboard/clientes" },
                {
                    title: "Administradores",
                    href: "/dashboard/administradores",
                },
            ],
        },
        {
            id: "metadatos",
            open: false,
            title: "Metadatos",
            icon: faHouse,
            href: "#",
            subHref: [{ title: "Metadatos", href: "/dashboard/metadatos" }],
        },
        {
            id: "zonaprivada",
            open: false,
            title: "Zona Privada",
            icon: faHouse,
            href: "#",
            subHref: [
                { title: "Pedidos", href: "/dashboard/pedidos-privada" },
                {
                    title: "Lista de Precios",
                    href: "/dashboard/lista-de-precios",
                },
                {
                    title: "Informacion y Descuento",
                    href: "/dashboard/informacion",
                },
            ],
        },
        {
            id: "cargadedatos",
            open: false,
            title: "Carga de datos",
            icon: faHouse,
            href: "#",
            subHref: [
                {
                    title: "Cargar Mangueras",
                    href: "/dashboard/mangueras",
                },
                {
                    title: "Cargar Terminales",
                    href: "/dashboard/terminales",
                },
            ],
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
            <AnimatePresence>
                {sidebar && (
                    <motion.div
                        initial={{ x: -300 }}
                        animate={{ x: 0 }}
                        exit={{ x: -300 }}
                        transition={{ ease: "linear", duration: 0.2 }}
                        className="flex flex-col h-screen w-[300px] bg-primary-blue text-white overflow-y-auto scrollbar-hide"
                    >
                        <Link to={"/"} className="p-6">
                            <img src={conmanWhiteLogo} alt="" />
                        </Link>
                        <nav className="">
                            <ul className="">
                                <AnimatePresence>
                                    {dropdowns.map((drop) => (
                                        <li key={drop.id}>
                                            <button
                                                onClick={() =>
                                                    toggleDropdown(drop.id)
                                                }
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
                                                    size="lg"
                                                    icon={faChevronUp}
                                                />
                                            </button>
                                            <AnimatePresence>
                                                {drop.open && (
                                                    <motion.ul
                                                        initial={{ height: 0 }}
                                                        animate={{
                                                            height: "fit-content",
                                                        }}
                                                        exit={{ height: 0 }}
                                                        transition={{
                                                            ease: "linear",
                                                            duration: 0.2,
                                                        }}
                                                        className="flex flex-col gap-2 overflow-hidden py-2 h-fit"
                                                    >
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
                                                                    to={
                                                                        sub.href
                                                                    }
                                                                >
                                                                    {sub.title}
                                                                </MotionLink>
                                                            )
                                                        )}
                                                    </motion.ul>
                                                )}
                                            </AnimatePresence>
                                        </li>
                                    ))}
                                </AnimatePresence>
                            </ul>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="w-full flex flex-col overflow-y-auto h-screen scrollbar-hide">
                <div className="shadow-md py-3 flex flex-row justify-between items-center px-4 sticky top-0 bg-white">
                    <div className="flex flex-row gap-3">
                        <button onClick={() => setSidebar(!sidebar)}>
                            <FontAwesomeIcon
                                icon={faBars}
                                size="lg"
                                color="#000"
                            />
                        </button>
                        <h1 className="text-2xl">
                            {cleanPathname[1]?.charAt(0).toUpperCase() +
                                cleanPathname[1]?.slice(1) ||
                                "Bienvenido al Dashboard"}
                        </h1>
                    </div>

                    <div>
                        <div className="flex flex-row gap-2">
                            <div className="">
                                <h2>{adminInfo[0]?.name.toUpperCase()}</h2>
                            </div>
                            <button
                                className="relative "
                                onClick={() => setUserMenu(!userMenu)}
                            >
                                <FontAwesomeIcon color="#000" icon={faUser} />
                            </button>
                        </div>

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
                {cleanPathname[0] == "dashboard" &&
                    cleanPathname.length <= 1 && (
                        <div className="flex flex-col gap-3 p-4">
                            <h2 className="text-2xl font-bold">
                                Bienvenido al Panel de Administración
                            </h2>
                            <p className="text-lg">
                                Aquí podrás gestionar el contenido de tu sitio
                                web. Desde este panel podrás acceder a todas las
                                herramientas necesarias para mantener tu sitio
                                actualizado y optimizado.
                            </p>
                        </div>
                    )}
                <Outlet />
            </div>
        </div>
    );
}
