import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
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
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";
import SearchCard from "./SearchCard";

export default function Navbar() {
    const [tinyMenu, setTinyMenu] = useState(false);
    const [userMenu, setUserMenu] = useState(false);
    const [userLoged, setUserLoged] = useState(false);
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [search, setSearch] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [login, setLogin] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const searchBarRef = useRef(null);
    const tinyMenuRef = useRef(null);
    const loginRef = useRef(null);
    const signupRef = useRef(null);
    const [signup, setSignup] = useState(false);
    const [registro, setRegistro] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const location = useLocation();

    const [cleanPathname, setCleanPathname] = useState(
        location.pathname.replace(/^\/+/, "").replace(/-/g, " ").split("/")
    );

    useEffect(() => {
        setCleanPathname(
            location.pathname.replace(/^\/+/, "").replace(/-/g, " ").split("/")
        );
    }, [location]);

    const { setLinkInfo, categoryInfo, logos } = useStateContext();

    function removeAccents(str) {
        return str?.normalize("NFD")?.replace(/[\u0300-\u036f]/g, "");
    }

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50); // Cambia cuando baja 50px
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                searchBarRef.current &&
                !searchBarRef.current.contains(event.target)
            ) {
                setSearch(false); // Cierra el contenedor si se hace clic fuera
            }
            if (
                // Cierra el menú si se hace clic fuera
                tinyMenuRef.current &&
                !tinyMenuRef.current.contains(event.target)
            ) {
                setTinyMenu(false);
            }
            if (
                // Cierra el menú si se hace clic fuera
                loginRef.current &&
                !loginRef.current.contains(event.target)
            ) {
                setUserMenu(false);
            }
            if (
                // Cierra el menú si se hace clic fuera
                signupRef.current &&
                !signupRef.current.contains(event.target)
            ) {
                setSignup(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const { setUserToken, userToken, userInfo, contactInfo, productInfo } =
        useStateContext();

    const onSubmit = (ev) => {
        ev.preventDefault();
        setLogin(true);
        axiosClient
            .post("/login", {
                name: user,
                password: password,
            })
            .then(({ data }) => {
                setUserToken(data.token);
                setLogin(false);
            })
            .catch((error) => {
                if (error.response && error.response.data.error) {
                    const errorMessage = error.response.data.error;
                    if (
                        errorMessage ===
                        "The provided credentials are not correct"
                    ) {
                        setErrorMessage(
                            "Las credenciales proporcionadas son incorrectas."
                        );
                    } else if (
                        errorMessage ===
                        "Your account is not authorized. Please contact support."
                    ) {
                        setErrorMessage("Tu cuenta no está autorizada.");
                    } else {
                        setErrorMessage(
                            "Ocurrió un error inesperado. Inténtalo de nuevo."
                        );
                    }
                } else {
                    setErrorMessage(
                        "Ocurrió un problema con la conexión. Inténtalo nuevamente."
                    );
                }
                setError(true);
                setLogin(false);
            });
    };

    const soloDejarNumeros = (str) => {
        return str?.replace(/\D/g, "");
    };

    const toggleDropdown = (id) => {
        setDropdowns((prevDropdowns) =>
            prevDropdowns.map((drop) =>
                drop.id === id ? { ...drop, open: !drop.open } : drop
            )
        );
    };

    const toggleChevronAnimation = (id) => {
        setDropdowns((prevDropdowns) =>
            prevDropdowns.map((drop) =>
                drop.id === id
                    ? { ...drop, chevronAnimation: !drop.chevronAnimation }
                    : drop
            )
        );
    };

    const [dropdowns, setDropdowns] = useState([{}]);

    useEffect(() => {
        setDropdowns([
            ...categoryInfo.map((category) => ({
                id: category.name,
                open: false,
                href: `/inicio/${removeAccents(
                    category.name.toLowerCase().split(" ").join("-")
                )}`,
                chevron: true,
                chevronAnimation: false,
                order_value: category.order_value,
                subHref: category.subcategories
                    .sort((a, b) => {
                        if (
                            typeof a.order_value === "number" &&
                            typeof b.order_value === "number"
                        ) {
                            return a.order_value - b.order_value; // Orden numérico ascendente
                        }
                        return String(a.order_value).localeCompare(
                            String(b.order_value),
                            undefined,
                            { numeric: true }
                        );
                    })
                    .map((subcategory) => ({
                        title: subcategory.name,
                        href: `/inicio/${category.name
                            .toLowerCase()
                            .split(" ")
                            .join("-")}`,
                    })),
            })),
        ]);
    }, [categoryInfo]);

    const { provincias } = useStateContext();

    const [userSubmitInfo, setUserSubmitInfo] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        razon_social: "",
        dni: "",
        telefono: "",
        direccion: "",
        provincia: "",
        localidad: "",
        codigo_postal: "",
        autorizado: "0",
        discount: "0",
    });

    const onSubmitt = (ev) => {
        ev.preventDefault();
        setRegistro(true);
        axiosClient
            .post("/signup", userSubmitInfo)
            .then(({ data }) => {
                setSignup(false);
                toast.success(
                    "Tu usuario fue creado con exito. Espera que un administrador lo apruebe.",
                    { position: "top-center", autoClose: 6000 }
                );
                setRegistro(false);
            })
            .catch((error) => {
                if (error.response) {
                    setError(
                        Object.values(error.response.data.errors || {})
                            .flat()
                            .join(" ")
                    );
                } else {
                    setError("Ocurrió un error. Intenta nuevamente.");
                }
                setRegistro(false);
                toast.error("El correo electrónico ya ha sido tomado", {
                    position: "top-center",
                });
            });
    };

    const handleInputChange = (ev) => {
        const { name, value } = ev.target;
        setUserSubmitInfo({ ...userSubmitInfo, [name]: value });
    };

    return (
        <div className="fixed w-full top-0 z-50  flex flex-col items-center justify-center font-roboto-condensed ">
            <ToastContainer />
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
                                href={`tel:${soloDejarNumeros(
                                    contactInfo?.phone
                                )}`}
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
                    <div className="flex flex-row gap-4 max-sm:pr-4 h-full items-center">
                        <div
                            ref={searchBarRef}
                            className="relative flex flex-row items-center max-sm:justify-end gap-3"
                        >
                            <AnimatePresence>
                                <div
                                    className={`flex flex-row items-center gap-2 rounded-md  ${
                                        search ? "border px-2" : ""
                                    } ${userToken ? "max-sm:w-[60%]" : ""}`}
                                >
                                    <motion.div
                                        className={`flex items-center rounded-md overflow-hidden w-fit text-white
                                }`}
                                        animate={{ width: search ? 250 : 40 }} // Controla la expansión
                                        initial={{ width: 40 }}
                                        exit={{ width: 40 }}
                                        transition={{
                                            duration: 0.3,
                                            ease: "easeInOut",
                                        }}
                                    >
                                        <input
                                            id="searchid"
                                            type="text"
                                            value={searchTerm}
                                            onChange={(e) =>
                                                setSearchTerm(e.target.value)
                                            }
                                            className={`bg-transparent outline-none w-full transition-opacity duration-300 text-base ${
                                                search
                                                    ? "opacity-100"
                                                    : "opacity-0"
                                            }`}
                                            autoFocus={search}
                                        />
                                    </motion.div>

                                    <label
                                        className="cursor-pointer max-sm:min-w-[15px] max-sm:h-[15px]"
                                        htmlFor="searchid"
                                        onClick={() => {
                                            setSearch(!search);
                                            setSearchTerm("");
                                        }}
                                    >
                                        <img
                                            src={searchIcon}
                                            alt="Buscar"
                                            className=" max-sm:w-full max-sm:h-full max-sm:object-contain"
                                        />
                                    </label>
                                </div>
                            </AnimatePresence>
                            <AnimatePresence>
                                {search && searchTerm && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -8 }}
                                        className="absolute flex flex-col top-8 bg-white shadow-md p-5 font-roboto-condensed w-[367px] h-[439px] z-40 max-sm:-right-9"
                                    >
                                        <h2 className="font-bold text-[24px] py-5">
                                            Resultados de busqueda
                                        </h2>
                                        <div className="flex flex-col overflow-y-auto scrollbar-hide">
                                            {productInfo
                                                .filter((product) =>
                                                    product.name
                                                        .toLowerCase()
                                                        .includes(
                                                            searchTerm.toLowerCase()
                                                        )
                                                )
                                                .map((product, index) => (
                                                    <SearchCard
                                                        key={index}
                                                        searchObject={product}
                                                    />
                                                ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                        {contactInfo?.fb && (
                            <a
                                target="_blanck"
                                href={contactInfo?.fb}
                                rel="noopener noreferrer"
                                className="max-sm:hidden"
                            >
                                <img src={fbIcon} alt="" />
                            </a>
                        )}
                        {contactInfo?.ig && (
                            <a
                                target="_blanck"
                                href={contactInfo?.ig}
                                rel="noopener noreferrer"
                                className="max-sm:hidden"
                            >
                                <img src={igIcon} alt="" />
                            </a>
                        )}

                        <div className="relative flex flex-row gap-4 h-[16px] items-center justify-center ">
                            {!userToken && (
                                <>
                                    <button
                                        onClick={() => {
                                            setUserMenu(!userMenu);
                                            setSignup(false);
                                        }}
                                    >
                                        <img
                                            className="h-[15px] w-[15px]"
                                            src={userIcon}
                                            alt=""
                                        />
                                    </button>
                                    <AnimatePresence>
                                        {userMenu && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                                transition={{
                                                    duration: 0.2,
                                                    ease: "linear",
                                                }}
                                                ref={loginRef}
                                                className="absolute flex flex-col top-10 right-0 max-sm:-right-1 bg-white shadow-md p-5 font-roboto-condensed w-[367px] h-[439px] z-40 border"
                                            >
                                                {error && (
                                                    <p className="text-red-500">
                                                        {errorMessage}
                                                    </p>
                                                )}
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
                                                                onChange={(
                                                                    ev
                                                                ) =>
                                                                    setUser(
                                                                        ev
                                                                            .target
                                                                            .value
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
                                                                Contraseña
                                                            </label>
                                                            <input
                                                                value={password}
                                                                onChange={(
                                                                    ev
                                                                ) =>
                                                                    setPassword(
                                                                        ev
                                                                            .target
                                                                            .value
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
                                                        {login
                                                            ? "Iniciando sesion..."
                                                            : "Iniciar sesion"}
                                                    </button>
                                                </form>
                                                <div className="flex flex-col items-center">
                                                    <p>¿No tenes usuario?</p>
                                                    <button
                                                        onClick={() => {
                                                            setSignup(true);
                                                            setUserMenu(false);
                                                        }}
                                                        className="text-primary-red"
                                                    >
                                                        REGISTRATE
                                                    </button>
                                                </div>
                                            </motion.div>
                                        )}
                                        {signup && (
                                            <motion.div
                                                ref={signupRef}
                                                initial={{ opacity: 0, y: -20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                                transition={{
                                                    duration: 0.2,
                                                    ease: "linear",
                                                }}
                                                className="absolute flex flex-col top-10 right-0 max-sm:-right-4 bg-white shadow-md p-5 font-roboto-condensed z-40 border w-[400px]"
                                            >
                                                <h2 className="text-2xl font-bold pb-5">
                                                    Registro
                                                </h2>
                                                <form
                                                    onSubmit={onSubmitt}
                                                    className="w-fit h-full flex flex-col gap-3"
                                                >
                                                    <div className="grid grid-cols-2 gap-3">
                                                        <div className="flex flex-col gap-2 col-span-2">
                                                            <label htmlFor="name">
                                                                Nombre de
                                                                usuario
                                                            </label>
                                                            <input
                                                                value={
                                                                    userSubmitInfo.name
                                                                }
                                                                onChange={
                                                                    handleInputChange
                                                                }
                                                                className="w-full h-[45px] border pl-2"
                                                                type="text"
                                                                name="name"
                                                                id="name"
                                                                required
                                                            />
                                                        </div>
                                                        <div className="flex flex-col gap-2">
                                                            <label htmlFor="password">
                                                                Contraseña
                                                            </label>
                                                            <input
                                                                value={
                                                                    userSubmitInfo.password
                                                                }
                                                                onChange={
                                                                    handleInputChange
                                                                }
                                                                className="w-full h-[45px] border pl-2"
                                                                type="password"
                                                                name="password"
                                                                id="password"
                                                                required
                                                            />
                                                        </div>
                                                        <div className="flex flex-col gap-2">
                                                            <label htmlFor="password_confirmation">
                                                                Confirmar
                                                                contraseña
                                                            </label>
                                                            <input
                                                                value={
                                                                    userSubmitInfo.password_confirmation
                                                                }
                                                                onChange={
                                                                    handleInputChange
                                                                }
                                                                className="w-full h-[45px] border pl-2"
                                                                type="password"
                                                                name="password_confirmation"
                                                                id="password_confirmation"
                                                                required
                                                            />
                                                        </div>
                                                        <div className="flex flex-col gap-2">
                                                            <label htmlFor="email">
                                                                Email
                                                            </label>
                                                            <input
                                                                value={
                                                                    userSubmitInfo.email
                                                                }
                                                                onChange={
                                                                    handleInputChange
                                                                }
                                                                className="w-full h-[45px] border pl-2"
                                                                type="email"
                                                                name="email"
                                                                id="email"
                                                                required
                                                            />
                                                        </div>
                                                        <div className="flex flex-col gap-2">
                                                            <label htmlFor="razon_social">
                                                                Razón Social
                                                            </label>
                                                            <input
                                                                value={
                                                                    userSubmitInfo.razon_social
                                                                }
                                                                onChange={
                                                                    handleInputChange
                                                                }
                                                                className="w-full h-[45px] border pl-2"
                                                                type="text"
                                                                name="razon_social"
                                                                id="razon_social"
                                                                required
                                                            />
                                                        </div>
                                                        <div className="flex flex-col gap-2">
                                                            <label htmlFor="dni">
                                                                DNI / CUIT
                                                            </label>
                                                            <input
                                                                value={
                                                                    userSubmitInfo.dni
                                                                }
                                                                onChange={
                                                                    handleInputChange
                                                                }
                                                                className="w-full h-[45px] border pl-2"
                                                                type="text"
                                                                name="dni"
                                                                id="dni"
                                                                required
                                                            />
                                                        </div>
                                                        <div className="flex flex-col gap-2">
                                                            <label htmlFor="telefono">
                                                                Teléfono
                                                            </label>
                                                            <input
                                                                value={
                                                                    userSubmitInfo.telefono
                                                                }
                                                                onChange={
                                                                    handleInputChange
                                                                }
                                                                className="w-full h-[45px] border pl-2"
                                                                type="text"
                                                                name="telefono"
                                                                id="telefono"
                                                                required
                                                            />
                                                        </div>
                                                        <div className="flex flex-col gap-2 col-span-2">
                                                            <label htmlFor="direccion">
                                                                Dirección
                                                            </label>
                                                            <input
                                                                value={
                                                                    userSubmitInfo.direccion
                                                                }
                                                                onChange={
                                                                    handleInputChange
                                                                }
                                                                className="w-full h-[45px] border pl-2"
                                                                type="text"
                                                                name="direccion"
                                                                id="direccion"
                                                                required
                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-3 col-span-2 gap-5">
                                                            <div className="flex flex-col gap-2">
                                                                <label htmlFor="provincia">
                                                                    Provincia
                                                                </label>
                                                                <select
                                                                    required
                                                                    value={
                                                                        userSubmitInfo.provincia
                                                                    }
                                                                    onChange={(
                                                                        ev
                                                                    ) =>
                                                                        setUserSubmitInfo(
                                                                            {
                                                                                ...userSubmitInfo,
                                                                                provincia:
                                                                                    ev
                                                                                        .target
                                                                                        .value,
                                                                                localidad:
                                                                                    "",
                                                                            }
                                                                        )
                                                                    }
                                                                    className="py-2 border h-[45px]"
                                                                    name="provincia"
                                                                    id="provincia"
                                                                >
                                                                    <option value="">
                                                                        Selecciona
                                                                        una
                                                                        provincia
                                                                    </option>
                                                                    {provincias.map(
                                                                        (
                                                                            pr
                                                                        ) => (
                                                                            <option
                                                                                key={
                                                                                    pr.id
                                                                                }
                                                                                value={
                                                                                    pr.name
                                                                                }
                                                                            >
                                                                                {
                                                                                    pr.name
                                                                                }
                                                                            </option>
                                                                        )
                                                                    )}
                                                                </select>
                                                            </div>
                                                            <div className="flex flex-col gap-2">
                                                                <label htmlFor="localidad">
                                                                    Localidad
                                                                </label>
                                                                <select
                                                                    required
                                                                    value={
                                                                        userSubmitInfo.localidad
                                                                    }
                                                                    onChange={(
                                                                        ev
                                                                    ) =>
                                                                        setUserSubmitInfo(
                                                                            {
                                                                                ...userSubmitInfo,
                                                                                localidad:
                                                                                    ev
                                                                                        .target
                                                                                        .value,
                                                                            }
                                                                        )
                                                                    }
                                                                    className="py-2 border h-[45px]"
                                                                    name="localidad"
                                                                    id="localidad"
                                                                >
                                                                    <option value="">
                                                                        Selecciona
                                                                        una
                                                                        localidad
                                                                    </option>
                                                                    {provincias
                                                                        .find(
                                                                            (
                                                                                pr
                                                                            ) =>
                                                                                pr.name ===
                                                                                userSubmitInfo.provincia
                                                                        )
                                                                        ?.localidades.map(
                                                                            (
                                                                                loc,
                                                                                index
                                                                            ) => (
                                                                                <option
                                                                                    key={
                                                                                        index
                                                                                    }
                                                                                    value={
                                                                                        loc.name
                                                                                    }
                                                                                >
                                                                                    {
                                                                                        loc.name
                                                                                    }
                                                                                </option>
                                                                            )
                                                                        )}
                                                                </select>
                                                            </div>
                                                            <div className="flex flex-col gap-2">
                                                                <label htmlFor="codigo_postal">
                                                                    Codigo
                                                                    postal
                                                                </label>
                                                                <input
                                                                    value={
                                                                        userSubmitInfo.codigo_postal
                                                                    }
                                                                    onChange={
                                                                        handleInputChange
                                                                    }
                                                                    className="border py-2 pl-2 h-[45px]"
                                                                    type="text"
                                                                    name="codigo_postal"
                                                                    id="codigo_postal"
                                                                    required
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <button
                                                        className="w-[325px] h-[47px] bg-primary-red text-white self-center my-5"
                                                        type="submit"
                                                    >
                                                        {registro
                                                            ? "REGISTRANDO..."
                                                            : "REGISTRARSE"}
                                                    </button>
                                                </form>
                                                <div className="flex flex-col items-center">
                                                    <p>¿Ya tenes usuario?</p>
                                                    <button
                                                        onClick={() => {
                                                            setSignup(false);
                                                            setUserMenu(true);
                                                        }}
                                                        className="text-primary-red"
                                                    >
                                                        INICIAR SESION
                                                    </button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </>
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
                                                className="bg-primary-red text-white text-center px-4 py-2"
                                                to={"/privado"}
                                            >
                                                SECCION PRIVADA
                                            </Link>
                                            <button
                                                onClick={() => setUserToken("")}
                                                type="button"
                                                className="bg-primary-red text-white text-center px-4 py-2"
                                            >
                                                CERRAR SESION
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <nav
                className={`flex relative flex-row gap-24 w-full h-[85px]  justify-between max-xl:justify-center transition-all duration-300 ${
                    scrolled || cleanPathname[0]
                        ? "bg-white shadow-md text-black"
                        : "bg-transparent text-white"
                } ${cleanPathname[0] === "inicio" ? "fixed" : "sticky"}`}
            >
                <div className="w-[1240px] mx-auto flex relative flex-row justify-between items-center max-sm:justify-center">
                    <div className="w-[267px] h-[57px]">
                        <Link className="" to={"/"}>
                            <img
                                src={
                                    scrolled || cleanPathname[0]
                                        ? logos?.principal_url
                                        : logos?.secundario_url
                                }
                                alt="Logo"
                                className="w-full h-full object-contain"
                            />
                        </Link>
                    </div>

                    <ul className="flex flex-row gap-5 justify-end w-full max-xl:hidden items-center">
                        <Link
                            className="hover:text-gray-500"
                            to={"/inicio/nosotros"}
                        >
                            Nosotros
                        </Link>
                        {dropdowns
                            .sort((a, b) => {
                                if (a.order_value < b.order_value) return -1;
                                if (a.order_value > b.order_value) return 1;
                                return 0;
                            })
                            .map((drop) => (
                                <div
                                    onMouseEnter={() => toggleDropdown(drop.id)}
                                    onMouseLeave={() => toggleDropdown(drop.id)}
                                    className={`relative flex gap-1 max-xl:text-sm items-center `}
                                    key={drop.id}
                                >
                                    <div className="relative flex flex-row items-center gap-1">
                                        <Link
                                            onClick={() => setLinkInfo("")}
                                            className={` whitespace-nowrap ${
                                                scrolled || cleanPathname[0]
                                                    ? "hover:text-gray-500"
                                                    : "hover:text-gray-200"
                                            }`}
                                            to={drop.href}
                                        >
                                            {drop.id}
                                        </Link>
                                        {drop.chevron && (
                                            <img
                                                className="w-[13px] "
                                                src={
                                                    scrolled || cleanPathname[0]
                                                        ? chevronDown
                                                        : chevronDownWhite
                                                }
                                                alt="Chevron"
                                            />
                                        )}
                                    </div>

                                    <AnimatePresence>
                                        {drop.open && drop.subHref && (
                                            <motion.div
                                                initial={{ height: 0 }}
                                                animate={{
                                                    height: "fit-content",
                                                }}
                                                exit={{ height: 0 }}
                                                className="absolute flex flex-col top-6 left-0 bg-[#CBCBCB] shadow-md font-roboto-condensed w-[200px] h-fit max-h-[600px] overflow-y-auto scrollbar-hide z-40 overflow-hidden"
                                            >
                                                {drop.subHref.map((sub) => (
                                                    <Link
                                                        onClick={() =>
                                                            setLinkInfo(
                                                                sub.title
                                                            )
                                                        }
                                                        className={`flex flex-row items-center justify-between px-2 border-b border-white hover:text-gray-700 py-1 ${
                                                            scrolled ||
                                                            cleanPathname[0]
                                                                ? ""
                                                                : "text-black"
                                                        }`}
                                                        key={sub.title}
                                                        to={`${drop.href}`}
                                                    >
                                                        {sub.title}
                                                        <FontAwesomeIcon
                                                            icon={
                                                                faChevronRight
                                                            }
                                                            color={"#000"}
                                                        />
                                                    </Link>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        <Link
                            className="hover:text-gray-500"
                            to={"/inicio/calidad"}
                        >
                            Calidad
                        </Link>
                        <Link
                            className="hover:text-gray-500 pl-[13px]"
                            to={"/inicio/novedades"}
                        >
                            Novedades
                        </Link>
                        <Link
                            className="hover:text-gray-500 pl-[13px]"
                            to={"/inicio/contacto"}
                        >
                            Contacto
                        </Link>
                    </ul>
                    <button
                        onClick={() => setTinyMenu(!tinyMenu)}
                        className="w-[20px] h-[20px] absolute left-20 max-sm:left-6 xl:hidden"
                    >
                        <img src={barsIcon} alt="" />
                    </button>
                </div>
            </nav>
            <AnimatePresence>
                {tinyMenu && (
                    <div className="absolute top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.5)] z-40">
                        <motion.div
                            ref={tinyMenuRef}
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-col absolute top-0 left-0 h-screen w-1/2 bg-primary-blue max-sm:w-[80%]"
                        >
                            <button
                                onClick={() => setTinyMenu(false)}
                                className="absolute h-[16px] w-[16px] right-4 top-2"
                            >
                                <img src={xmark} alt="" />
                            </button>
                            <ul className="flex flex-col gap-5 p-10 text-white w-full">
                                <Link
                                    onClick={() => setTinyMenu(false)}
                                    className="mx-2 hover:text-gray-600 whitespace-nowrap border-b"
                                    to={"/inicio/nosotros"}
                                >
                                    Nosotros
                                </Link>
                                {dropdowns.map((drop) => (
                                    <div
                                        className="relative flex-col justify-between gap-1 items-center p-2"
                                        key={drop.id}
                                    >
                                        <div className="flex flex-row justify-between w-full items-center border-b">
                                            <Link
                                                onClick={() => {
                                                    setLinkInfo("");
                                                    setTinyMenu(false);
                                                }}
                                                className="hover:text-gray-600 whitespace-nowrap"
                                                to={drop.href}
                                            >
                                                {drop.id}
                                            </Link>
                                            {drop.chevron && (
                                                <motion.button
                                                    animate={{
                                                        rotateZ:
                                                            drop.chevronAnimation
                                                                ? 180
                                                                : 0,
                                                    }}
                                                    transition={{
                                                        ease: "linear",
                                                    }}
                                                    onClick={() => {
                                                        toggleDropdown(drop.id);
                                                        toggleChevronAnimation(
                                                            drop.id
                                                        );
                                                    }}
                                                    className="h-5 w-5"
                                                >
                                                    <img
                                                        src={chevronDownWhite}
                                                        alt=""
                                                    />
                                                </motion.button>
                                            )}
                                        </div>
                                        <AnimatePresence>
                                            {drop.open &&
                                                drop.subHref &&
                                                tinyMenu && (
                                                    <motion.div
                                                        initial={{ height: 0 }}
                                                        animate={{
                                                            height: "fit-content",
                                                        }}
                                                        transition={{
                                                            duration: 0.2,
                                                            ease: "linear",
                                                        }}
                                                        exit={{ height: 0 }}
                                                        className=" flex flex-col w-full font-roboto-condensed gap-1 pt-2 overflow-hidden"
                                                    >
                                                        {drop.subHref.map(
                                                            (sub) => (
                                                                <Link
                                                                    onClick={() => {
                                                                        setLinkInfo(
                                                                            sub.title
                                                                        );
                                                                        setTinyMenu(
                                                                            false
                                                                        );
                                                                    }}
                                                                    className="flex flex-row items-center justify-between mx-5 hover:text-gray-600"
                                                                    key={
                                                                        sub.title
                                                                    }
                                                                    to={
                                                                        sub.href
                                                                    }
                                                                >
                                                                    {sub.title}
                                                                </Link>
                                                            )
                                                        )}
                                                    </motion.div>
                                                )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                                <Link
                                    onClick={() => setTinyMenu(false)}
                                    className="border-b mx-2 hover:text-gray-600 whitespace-nowrap"
                                    to={"/inicio/calidad"}
                                >
                                    Calidad
                                </Link>
                                <Link
                                    onClick={() => setTinyMenu(false)}
                                    className="border-b mx-2 hover:text-gray-600 whitespace-nowrap"
                                    to={"/inicio/nosotros"}
                                >
                                    Novedades
                                </Link>
                                <Link
                                    onClick={() => setTinyMenu(false)}
                                    className="mx-2 hover:text-gray-600 whitespace-nowrap border-b"
                                    to={"/inicio/contacto"}
                                >
                                    Contacto
                                </Link>
                            </ul>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
