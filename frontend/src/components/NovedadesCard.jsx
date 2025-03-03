import { Link } from "react-router-dom";

export default function NovedadesCard({ newsObject }) {
    return (
        <Link
            to={`/inicio/novedades/${newsObject.id}`}
            className={
                "bg-white h-[493px] w-[392px] font-roboto border text-left"
            }
        >
            <div className={"flex flex-col p-4 gap-3 h-full"}>
                <div className={"min-h-[246px]"}>
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
                    <button className=" w-fit font-medium mt-auto">
                        Leer más
                    </button>
                </div>
            </div>
        </Link>
    );
}
