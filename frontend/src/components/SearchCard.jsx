import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function SearchCard({ searchObject }) {
    return (
        <Link
            to={`/inicio/${searchObject.category.name.split(" ").join("-")}/${
                searchObject?.id
            }`}
            className="flex flex-row justify-between items-center border-b hover:bg-gray-300 p-2"
        >
            <div className="min-w-[60px] h-[60px] border flex justify-center items-center">
                {searchObject?.images[0] ? (
                    <img
                        className="object-cover w-full h-full"
                        src={searchObject.images[0]?.image_url}
                        alt=""
                    />
                ) : (
                    <FontAwesomeIcon icon={faImage} size="xl" />
                )}
            </div>
            <h2 className="text-black text-right">
                {searchObject?.name.toUpperCase()}
            </h2>
        </Link>
    );
}
