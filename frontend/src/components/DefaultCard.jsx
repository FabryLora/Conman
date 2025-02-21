import { motion } from "motion/react";
import { Link } from "react-router-dom";
import defaultImage from "../assets/default-card-image.png";

export default function DefaultCard({ cardObject, images }) {
    const removeAccents = (str) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };

    console.log(images);

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="h-[366px] w-[288px] flex flex-col font-roboto-condensed  border border-[#EAEAEA] shadow-sm"
        >
            <Link
                className="flex justify-center h-[287px]"
                to={`/inicio/${removeAccents(
                    cardObject.category.name.split(" ").join("-").toLowerCase()
                )}/${cardObject.id}`}
            >
                {cardObject?.images[0]?.image_url ? (
                    <img
                        className="object-cover w-full h-full border-b"
                        src={cardObject?.images[0]?.image_url}
                        alt=""
                    />
                ) : (
                    <img
                        className="object-cover w-full h-full border-b"
                        src={defaultImage}
                        alt=""
                    />
                )}
            </Link>
            <h3 className="text-[16px] pl-4 h-full flex items-center ">
                {cardObject.name}
            </h3>
        </motion.div>
    );
}
