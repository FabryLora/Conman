import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function NovedadesCard({ newsObject }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed top-0 left-0 w-screen h-screen z-[1000] flex justify-center items-center bg-black bg-opacity-50 overflow-y-auto"
                    >
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden w-[90%]  flex flex-col relative">
                            {/* Botón de cierre */}
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-3 right-3 text-white hover:text-gray-400 transition"
                            >
                                <FontAwesomeIcon icon={faX} size="xl" />
                            </button>

                            {/* Imagen de portada */}
                            <div className="w-full h-64 min-h-[300px]">
                                <img
                                    className="w-full h-full object-cover"
                                    src={newsObject?.image_url}
                                    alt="Noticia"
                                />
                            </div>

                            {/* Contenido */}
                            <div className="p-6 flex flex-col gap-3 max-h-[600px] overflow-y-auto">
                                <h1 className="text-2xl font-bold text-gray-900">
                                    {newsObject.title}
                                </h1>
                                <p className="text-gray-700 whitespace-pre-line">
                                    {newsObject.text}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <motion.button
                initial={{ scale: 1 }}
                whileHover={{ scale: 0.98 }}
                onClick={() => setIsOpen(!isOpen)}
                className={
                    "bg-white h-[493px] w-[392px] font-roboto border text-left"
                }
            >
                <div className={"flex flex-col p-4 gap-3 h-full"}>
                    <div className={isOpen ? "w-1/2" : "min-h-[246px]"}>
                        <img
                            className={"w-full h-full object-cover"}
                            src={newsObject.image_url}
                            alt=""
                        />
                    </div>
                    <div className="flex flex-col w-full h-full justify-between">
                        <div>
                            <h2 className="text-[24px] font-medium">
                                {newsObject.title}
                            </h2>
                            <p className="text-[16px] break-words max-h-[120px] overflow-hidden whitespace-pre-line">
                                {newsObject.text}
                            </p>
                        </div>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className=" w-fit font-medium mt-auto"
                        >
                            Leer más
                        </button>
                    </div>
                </div>
            </motion.button>
        </div>
    );
}
