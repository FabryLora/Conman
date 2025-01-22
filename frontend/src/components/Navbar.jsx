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
import userIcon from "../assets/icons/user-icon.svg";
import xmark from "../assets/icons/xmark-solid.svg";
import conmanLogo from "../assets/logos/conman-logo.png";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";

export default function Navbar() {
    const [tinyMenu, setTinyMenu] = useState(false);
    const [userMenu, setUserMenu] = useState(false);
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");

    const { setUserToken, userToken, userInfo } = useStateContext();

    const onSubmit = (ev) => {
        ev.preventDefault();
        axiosClient
            .post("/login", {
                name: user,
                password: password,
            })
            .then(({ data }) => {
                setUserToken(data.token);
            });
    };

    const links = [
        { title: "Nosotros", href: "/inicio/nosotros", chevron: false },
        {
            title: "Terminales y accesorios",
            href: "/inicio/terminales-y-accesorios",
            chevron: true,
        },
        { title: "Mangueras", href: "/inicio/mangueras", chevron: true },
        {
            title: "Acoples rapidos",
            href: "/inicio/acoples-rapidos-hidraulicos",
            chevron: true,
        },
        { title: "Productos", href: "/inicio/productos", chevron: true },
        { title: "Calidad", href: "/inicio/calidad", chevron: false },
        { title: "Novedades", href: "/inicio/novedades", chevron: false },
        { title: "Contacto", href: "/inicio/contacto", chevron: false },
    ];

    const socials = [
        { logo: fbIcon, href: "#" },
        { logo: igIcon, href: "#" },
    ];

    return (
        <div className="flex flex-col items-center justify-center font-roboto-condensed">
            <div className="bg-primary-blue h-[40px] w-full flex items-center justify-between pl-20 pr-10">
                <div className="flex gap-4 items-center text-[14px] text-white h-[16px]">
                    <div className="flex gap-2 items-center">
                        <img className="h-[16px]" src={letterIcon} alt="" />
                    </div>
                    <div className="flex gap-2 items-center">
                        <img className="h-[16px]" src={phoneIcon} alt="" />
                    </div>
                </div>
                <div className="flex fle-row gap-4 h-full items-center">
                    <div className="flex flex-row gap-4 h-[16px] items-center justify-center">
                        {socials.map((social, index) => (
                            <Link key={index} to={social.href}>
                                <img src={social.logo} alt="" />
                            </Link>
                        ))}
                        <button>
                            <img src={searchIcon} alt="" />
                        </button>

                        {!userToken && (
                            <>
                                <button onClick={() => setUserMenu(!userMenu)}>
                                    <img
                                        className="h-[15px] w-[15px]"
                                        src={userIcon}
                                        alt=""
                                    />
                                </button>
                                {userMenu && (
                                    <div className="absolute flex flex-col top-10 right-10 bg-white shadow-md p-5 font-roboto-condensed w-[367px] h-[439px] z-20">
                                        <h2 className="font-bold text-[24px] py-5">
                                            Iniciar sesion
                                        </h2>
                                        <form
                                            onSubmit={onSubmit}
                                            className="w-full h-full flex flex-col justify-around gap-3"
                                            action=""
                                        >
                                            <div>
                                                <div className="flex flex-col gap-2">
                                                    <label htmlFor="user">
                                                        Usuario
                                                    </label>
                                                    <input
                                                        value={user}
                                                        onChange={(ev) =>
                                                            setUser(
                                                                ev.target.value
                                                            )
                                                        }
                                                        className="w-[328px] h-[45px] border pl-2"
                                                        type="text"
                                                        name="user"
                                                        id="user"
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-2">
                                                    <label htmlFor="password">
                                                        Contras;e
                                                    </label>
                                                    <input
                                                        value={password}
                                                        onChange={(ev) =>
                                                            setPassword(
                                                                ev.target.value
                                                            )
                                                        }
                                                        className="w-[328px] h-[45px] border pl-2"
                                                        type="password"
                                                        name="password"
                                                        id="password"
                                                    />
                                                </div>
                                            </div>

                                            <button
                                                className="w-[325px] h-[47px] bg-primary-red text-white self-center"
                                                type="submit"
                                            >
                                                INICIAR SESION
                                            </button>
                                        </form>
                                        <div className="flex flex-col items-center">
                                            <p>¿No tenes usuario?</p>
                                            <Link
                                                className="text-primary-red"
                                                to={"/registro"}
                                            >
                                                REGISTRATE
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                    {userToken && (
                        <div className="w-[139px] h-full flex justify-center items-center bg-white">
                            <h2 className="font-medium text-sm text-primary-blue">
                                {userInfo.name
                                    ? userInfo.name.toUpperCase()
                                    : ""}
                            </h2>
                        </div>
                    )}
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
