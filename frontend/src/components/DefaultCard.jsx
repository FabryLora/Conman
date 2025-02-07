import { motion } from "motion/react";
import { Link } from "react-router-dom";

export default function DefaultCard({ cardObject, images }) {
    const removeAccents = (str) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="h-[366px] w-[288px] flex flex-col font-roboto-condensed border border-[#EAEAEA] shadow-sm"
        >
            <Link
                className="flex justify-center h-[287px]"
                to={`/inicio/${removeAccents(
                    cardObject.category.name.split(" ").join("-").toLowerCase()
                )}/${cardObject.id}`}
            >
                {images ? (
                    <img
                        className="object-cover w-full h-full"
                        src={images[0]?.image_url}
                        alt=""
                    />
                ) : (
                    <div className="w-60 h-60">
                        <p>{typeof images}</p>
                    </div>
                )}
            </Link>
            <h3 className="text-[16px] pl-4 pt-4">{cardObject.name}</h3>
        </motion.div>
    );
}
