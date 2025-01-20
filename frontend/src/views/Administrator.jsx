import { faChevronDown, faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, Outlet } from "react-router-dom";
import conmanWhiteLogo from "../assets/logos/conman-white-logo.png";

export default function Administrator() {
    return (
        <div className="flex flex-row">
            <div className="flex flex-col h-screen w-[300px] bg-primary-blue text-white">
                <div className="p-6">
                    <img src={conmanWhiteLogo} alt="" />
                </div>
                <nav className="">
                    <ul className="">
                        <li>
                            <div className="flex flex-row justify-between border-y py-2 px-2">
                                <div className="flex flex-row gap-2">
                                    <FontAwesomeIcon size="lg" icon={faHouse} />
                                    <Link to={"/adm/inicio"}>Inicio</Link>
                                </div>
                                <FontAwesomeIcon
                                    size="lg"
                                    icon={faChevronDown}
                                />
                            </div>
                        </li>
                        <li>
                            <div className="flex flex-row justify-between border-b py-2 px-2">
                                <div className="flex flex-row gap-2">
                                    <FontAwesomeIcon size="lg" icon={faHouse} />
                                    <Link to={"/adm/inicio"}>Inicio</Link>
                                </div>
                                <FontAwesomeIcon
                                    size="lg"
                                    icon={faChevronDown}
                                />
                            </div>
                        </li>
                    </ul>
                </nav>
            </div>
            <Outlet />
        </div>
    );
}
