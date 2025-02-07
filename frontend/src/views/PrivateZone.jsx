import { useEffect, useState } from "react";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import NavbarPrivado from "../components/NavBarPrivado";
import { useStateContext } from "../contexts/ContextProvider";

export default function PrivateZone() {
    const { userToken } = useStateContext();

    const location = useLocation();

    const [cleanPathname, setCleanPathname] = useState(
        location.pathname.replace(/^\/+/, "").replace(/-/g, " ").split("/")
    );

    useEffect(() => {
        setCleanPathname(
            location.pathname.replace(/^\/+/, "").replace(/-/g, " ").split("/")
        );
    }, [location]);

    if (!userToken) {
        <Navigate to={"/"} />;
    }

    return (
        <div className="font-roboto-condensed w-full">
            <NavbarPrivado />
            <div className="absolute flex flex-row gap-1 items-center justify-center  text-[#515A53] left-20 top-[150px]">
                <Link to={"/"}>Inicio</Link>
                <p>{">"}</p>
                <Link to={"#"}>{cleanPathname[1]}</Link>
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    );
}
