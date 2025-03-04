import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export default function HomeCategory({ categoryObject }) {
    const { setLinkInfo } = useStateContext();

    const MotionLink = motion.create(Link);

    const quitarTildes = (str) => {
        return str?.normalize("NFD")?.replace(/[\u0300-\u036f]/g, "");
    };

    return (
        <MotionLink
            whileHover={{ scale: 0.99 }}
            transition={{ duration: 0.2 }}
            onClick={() => setLinkInfo("")}
            to={`/inicio/${quitarTildes(
                categoryObject?.name?.toLowerCase()?.split(" ")?.join("-")
            )}`}
            className="flex relative justify-center items-center bg-cover bg-no-repeat bg-center w-full h-[365px] overflow-hidden max-md:min-w-[365px] text-center"
            onMouseEnter={() => {}}
            onMouseLeave={() => {}}
        >
            <div className="absolute w-full h-full">
                <img
                    src={categoryObject?.image_url}
                    alt=""
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="absolute w-full h-full bg-black opacity-50"></div>
            <h2 className="absolute text-center z-10 text-[28px] text-white font-roboto-condensed font-semibold">
                {categoryObject.name.toUpperCase()}
            </h2>
        </MotionLink>
    );
}
