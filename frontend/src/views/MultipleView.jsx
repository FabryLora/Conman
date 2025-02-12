import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import axiosClient from "../axios";
import WhatsappComponent from "../components/WhatsappComponent";
import { useStateContext } from "../contexts/ContextProvider";

export default function MultipleView() {
    const { realProducts } = useStateContext();
    const [productInfo, setProductInfo] = useState(null);
    const [currentImage, setCurrentImage] = useState("");
    const { id } = useParams();
    const location = useLocation();

    const [cleanPathname, setCleanPathname] = useState(
        location.pathname.replace(/^\/+/, "").replace(/-/g, " ").split("/")
    );

    useEffect(() => {
        setCleanPathname(
            location.pathname.replace(/^\/+/, "").replace(/-/g, " ").split("/")
        );
    }, [location]);

    useEffect(() => {
        axiosClient
            .get(`/products/${id}`)
            .then(({ data }) => {
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

    const downloadPDF = async () => {
        try {
            const filename = productInfo?.file_url.split("/").pop(); // Extraer solo el nombre del archivo

            const response = await axiosClient.get(
                `/downloadfile/${filename}`,
                {
                    responseType: "blob",
                }
            );

            const blob = new Blob([response.data], { type: "application/pdf" });
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = productInfo?.name;
            document.body.appendChild(a);
            a.click();

            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error al descargar el PDF:", error);
        }
    };

    return (
        <div className="font-roboto-condensed w-[80%] mx-auto py-20">
            <div className="grid grid-cols-2 grid-rows-2 gap-4 gap-y-10 max-lg:grid-cols-1 max-lg:grid-rows-4">
                <div className="relative flex flex-row w-full gap-3">
                    <div className="flex flex-row gap-1 items-center justify-center absolute -top-14 -left-24 text-[#515A53] max-lg:-left-0">
                        <Link to={"/"}>{cleanPathname[0]}</Link>
                        <p>{">"}</p>
                        <Link
                            to={`/inicio/${cleanPathname[1]
                                .split(" ")
                                .join("-")}`}
                        >
                            {cleanPathname[1]}
                        </Link>
                        <p>{">"}</p>
                        <Link>{productInfo?.name}</Link>
                    </div>
                    <div className="lg:absolute -left-24 flex flex-col h-[300px] w-fit  gap-y-3">
                        {productInfo.images.map((image, index) => (
                            <button
                                className={` border-[3px] border-gray-300 w-[80px] h-[80px] ${
                                    currentImage === image?.image_url
                                        ? "border-primary-red"
                                        : ""
                                }`}
                                onClick={() =>
                                    setCurrentImage(image?.image_url)
                                }
                                key={index}
                            >
                                <img
                                    src={image?.image_url}
                                    alt={image?.name}
                                    className="object-cover w-full h-full"
                                />
                            </button>
                        ))}
                    </div>
                    <div className="h-[500px] w-full border border-gray-300">
                        <img
                            src={currentImage}
                            className="object-contain h-full w-full"
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
                            <p>{productInfo?.description}</p>
                        </div>
                        <div className="flex flex-row gap-10">
                            <button
                                onClick={downloadPDF}
                                className="h-[47px] w-full text-primary-red border border-primary-red"
                            >
                                FICHA TECNICA
                            </button>
                            <Link
                                to={"/inicio/contacto"}
                                className="h-[47px] w-full bg-primary-red text-white flex items-center justify-center"
                            >
                                CONSULTAR
                            </Link>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <table className="border-y w-full">
                            <thead>
                                <tr className="border-b bg-gray-200">
                                    <td>CODIGO</td>
                                    <td>NOMBRE</td>
                                </tr>
                            </thead>
                            <tbody>
                                {realProducts
                                    .filter(
                                        (realProduct) =>
                                            realProduct.product.name ===
                                            productInfo.name
                                    )
                                    .map((cosas) => (
                                        <tr key={cosas.id}>
                                            <td>{cosas?.code}</td>
                                            <td>{cosas?.name}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="w-full h-[333px] self-center ">
                    <img
                        className="w-full h-full object-contain"
                        src={productInfo?.image_url}
                        alt=""
                    />
                </div>
            </div>
            <WhatsappComponent />
        </div>
    );
}
