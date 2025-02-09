import { Link } from "react-router-dom";

export default function DefaultBanner({ title, href, bannerImage }) {
    return (
        <div className="h-[298px] flex relative w-full font-roboto-condensed bg-primary-blue text-white">
            <img
                className="absolute w-full h-full opacity-50"
                src={bannerImage}
                alt=""
            />
            <div className=" flex flex-col justify-between absolute h-full px-20 max-sm:px-6">
                <div className="flex flex-row items-center gap-1 text-sm pt-6">
                    <Link to={"/"}>Inicio</Link>
                    <p>{">"}</p>
                    <Link to={href}>
                        {title?.charAt(0).toUpperCase() + title?.slice(1)}
                    </Link>
                </div>
                <h2 className="text-[42px] font-bold pb-10">
                    {title?.charAt(0).toUpperCase() + title?.slice(1)}
                </h2>
            </div>
        </div>
    );
}
