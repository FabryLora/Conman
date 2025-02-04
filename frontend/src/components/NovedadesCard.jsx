import { useState } from "react";

export default function NovedadesCard({ newsObject }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className={
                isOpen
                    ? "absolute z-10 w-full h-full bg-white"
                    : "bg-white h-[493px] w-[392px] font-roboto"
            }
        >
            <div
                className={
                    isOpen
                        ? "flex flex-row p-4 gap-3 h-full"
                        : "flex flex-col p-4 gap-3 h-full"
                }
            >
                <div className={isOpen ? "w-1/2" : ""}>
                    <img
                        className={
                            isOpen ? "w-full h-full" : "w-full h-[246px]"
                        }
                        src={newsObject.image}
                        alt=""
                    />
                </div>
                <div className="flex flex-col w-full h-full justify-between">
                    <div>
                        <h2 className="text-[24px] font-medium">
                            {newsObject.title}
                        </h2>
                        <p className="text-[16px]">{newsObject.description}</p>
                    </div>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className=" w-fit font-medium mt-auto"
                    >
                        {isOpen ? "Cerrar" : "Leer más"}
                    </button>
                </div>
            </div>
        </div>
    );
}
