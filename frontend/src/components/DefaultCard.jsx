import { Link } from "react-router-dom";

export default function DefaultCard({ cardObject, images }) {
    return (
        <div className="h-[366px] w-[288px] flex flex-col font-roboto-condensed border border-[#EAEAEA] shadow-sm">
            <Link
                className="flex justify-center h-[287px]"
                to={`/inicio/terminales-y-accesorios/${cardObject.id}`}
            >
                {images ? (
                    <img
                        className="object-cover w-full h-full"
                        src={images[0].image_url}
                        alt=""
                    />
                ) : (
                    <div className="w-60 h-60">
                        <p>{typeof images}</p>
                    </div>
                )}
            </Link>
            <h3 className="text-[16px] pl-4 pt-4">{cardObject.name}</h3>
        </div>
    );
}
