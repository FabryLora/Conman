import { Navigate, Outlet } from "react-router-dom";
import NavbarPrivado from "../components/NavBarPrivado";
import { useStateContext } from "../contexts/ContextProvider";

export default function PrivateZone() {
    const { userToken } = useStateContext();

    if (!userToken) {
        <Navigate to={"/"} />;
    }

    return (
        <div className="font-roboto-condensed w-full">
            <NavbarPrivado />
            <div>
                <Outlet />
            </div>
        </div>
    );
}
