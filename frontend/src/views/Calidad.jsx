import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import FileComponent from "../components/FileComponent";
import { useStateContext } from "../contexts/ContextProvider";

export default function Calidad() {
    const { pdfInfo, metadatos, calidadInfo } = useStateContext();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="font-roboto-condensed">
            <Helmet>
                <meta
                    name="description"
                    content={
                        metadatos?.find(
                            (dato) => dato.seccion.toLowerCase() === "calidad"
                        )?.descripcion
                    }
                />
                <meta
                    name="keywords"
                    content={metadatos
                        ?.find(
                            (dato) => dato.seccion.toLowerCase() === "calidad"
                        )
                        ?.keywords?.split(" ")
                        .join(",")}
                />
            </Helmet>
            <style>
                {`
                            .custom-content div > span {
                                font-size: 16px !important; /* Cambia 1.25rem a 1rem */
                            }

                            .custom-content p {
                                line-height: normal !important; /* Cambia 1.25rem a 1rem */
                            }
 
   
                `}
            </style>
            <div className="flex flex-col gap-20 py-20 items-end">
                <div className="flex flex-row gap-10 w-[1570px] ml-auto max-lg:flex-col">
                    <div className="flex flex-col h-full w-full  md:max-w-full lg:max-w-none items-center max-lg:order-2">
                        <div className="flex flex-col gap-6 items-start overflow-y-auto w-full max-h-[700pxpx]">
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: calidadInfo?.text || "",
                                }}
                                className="custom-content font-roboto-condensed  prose prose-sm sm:prose lg:prose-lg xl:prose-xl w-full min-w-full max-w-full 
                                [&_ul]:list-none 
                                [&_ul_li]:relative 
                                [&_ul_li]:pl-8 
                                [&_ul_li:before]:absolute 
                                [&_ul_li:before]:left-0 
                                [&_ul_li:before]:top-1 
                                [&_ul_li:before]:content-[url('/src/assets/icons/item-icon.svg')]"
                            ></div>
                        </div>
                    </div>

                    <div className=" max-lg:order-1 w-full max-lg:h-[500px]">
                        <img
                            className="w-full h-full object-cover"
                            src={calidadInfo?.image_url}
                            alt=""
                        />
                    </div>
                </div>
                <div className="flex flex-row justify-between w-[1240px] mx-auto max-md:flex-col max-md:items-center max-md:gap-10">
                    {pdfInfo.map((fileObject, index) => (
                        <FileComponent key={index} fileObject={fileObject} />
                    ))}
                </div>
            </div>
        </div>
    );
}
