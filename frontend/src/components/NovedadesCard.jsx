import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function NovedadesCard({ newsObject }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            {isOpen && (
                <div>
                    <div className="fixed top-0 left-0 bg-black opacity-50 w-screen h-screen z-[60]"></div>
                    <div className="fixed w-[80%] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[60]  flex h-[80%]  bg-white max-lg:flex-col max-lg:pt-10">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute right-3 top-2"
                        >
                            <FontAwesomeIcon icon={faX} size="xl" />
                        </button>
                        <div className="w-1/2 max-lg:h-1/2 max-lg:w-full flex ">
                            <img
                                className="w-full h-full object-contain"
                                src={newsObject?.image_url}
                                alt=""
                            />
                        </div>
                        <div className="w-1/2 max-lg:h-1/2 max-lg:w-full">
                            <div className="flex flex-col gap-3 p-4">
                                <h1 className="text-[30px]">
                                    {newsObject.title}
                                </h1>
                                <p className="break-words whitespace-pre-line w-full max-h-[600px] overflow-y-auto max-lg:max-h-[250px]">
                                    {newsObject.text}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <button
                onClick={() => setIsOpen(!isOpen)}
                className={
                    "bg-white h-[493px] w-[392px] font-roboto border text-left"
                }
            >
                <div className={"flex flex-col p-4 gap-3 h-full"}>
                    <div className={isOpen ? "w-1/2" : "h-[246px]"}>
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
            </button>
        </div>
    );
}
