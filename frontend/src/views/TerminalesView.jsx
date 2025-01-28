import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../axios";

export default function TerminalesView() {
    const [productInfo, setProductInfo] = useState(null);
    const [currentImage, setCurrentImage] = useState("");
    const { id } = useParams();

    useEffect(() => {
        axiosClient
            .get(`/products/${id}`)
            .then(({ data }) => {
                console.log("API Response:", data);
                setProductInfo(data.data);
                setCurrentImage(data.data.images[0].image_url);
            })
            .catch((error) => {
                console.error("Error fetching product data:", error);
            });
    }, [id]);

    if (!productInfo) {
        return <div>Loading...</div>; // Mostrar un mensaje mientras se carga la información
    }

    return (
        <div className="font-roboto-condensed w-[80%] mx-auto py-20">
            <div className="grid grid-cols-2 grid-rows-2 gap-4 gap-y-10">
                <div className="flex flex-row w-full gap-3">
                    <div className="flex flex-col justify-between h-[300px] overflow-y-auto scrollbar-hide gap-y-3">
                        {productInfo.images.map((image, index) => (
                            <button
                                onClick={() =>
                                    setCurrentImage(image?.image_url)
                                }
                                key={index}
                            >
                                <img
                                    src={image?.image_url}
                                    alt={image?.name}
                                    className={`w-[80px] h-[80px] object-cover border-[3px] border-gray-300 ${
                                        currentImage === image?.image_url
                                            ? "border-primary-red"
                                            : ""
                                    }`}
                                />
                            </button>
                        ))}
                    </div>
                    <div className="h-[500px] border border-gray-300">
                        <img
                            src={currentImage}
                            className="object-contain h-[500px] w-full"
                            alt=""
                        />
                    </div>
                </div>
                <div>
                    <div className="flex flex-col justify-between h-full">
                        <div>
                            <h2 className="font-bold text-[32px]">
                                {productInfo?.name}
                            </h2>
                            <p>{productInfo?.price}</p>
                        </div>
                        <div className="flex flex-row gap-10">
                            <button className="h-[47px] w-full text-primary-red border border-primary-red">
                                FICHA TECNICA
                            </button>
                            <button className="h-[47px] w-full bg-primary-red text-white">
                                CONSULTAR
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <table className="border-y w-full">
                            <tr>
                                <td>{productInfo?.code}</td>
                                <td>{productInfo?.price}</td>
                            </tr>
                        </table>
                    </div>
                </div>

                <div className="w-full h-full">
                    <div className="w-full h-full flex justify-center items-center">
                        <img
                            className="h-[333px]"
                            src={productInfo.images[1]?.image_url}
                            alt=""
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
