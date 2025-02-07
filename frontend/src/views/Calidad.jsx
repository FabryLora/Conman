import { Helmet } from "react-helmet-async";
import bannerImage from "../assets/calidad/banner-image.png";
import itemIcon from "../assets/icons/item-icon.svg";
import FileComponent from "../components/FileComponent";
import { useStateContext } from "../contexts/ContextProvider";

export default function Calidad() {
    const { pdfInfo, metadatos } = useStateContext();

    const itemList = [
        "Satisfacer las necesidades de nuestros clients actuales y potenciales, con productos innovadores y de alta calidad, que hagan que nuestros clientes nos valoren y distingan, reconociendo en nuestra forma de trabajo, un modelo de comportamiento distintivo.",
        "Reconocer al personal como el activo principal de nuestra empresa, fomentando un clima que favorezca el compromiso, la formación, el involucramiento y la iniciativa.",
        "Elegir proveedores que se adhieran a nuestros principios.",
        "Fabricar terminales y accesorios para instalaciones óleo-hidráulicas y neumáticas que respondan a las necesidades de nuestros clientes.",
    ];

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
            <div className="flex flex-col gap-20 py-20">
                <div className="flex flex-row gap-10">
                    <div className="w-1/2 flex justify-center">
                        <div className="pl-20 flex flex-col justify-evenly leading-relaxed gap-8">
                            <h2 className="font-bold text-[40px]">
                                Politicas de Calidad
                            </h2>
                            <p className="text-[16px]">
                                La Dirección de CONMAN se compromete a cumplir
                                la presente Política de la Calidad, mejorando en
                                forma contínua el Sistema de Gestión de Calidad
                                en concordancia con su contexto, la normativa
                                legal vigente y otros aplicables, enfocado en la
                                productividad eficiente y el alcance de todos
                                los objetivos propuestos.
                            </p>
                            <ul className="flex flex-col gap-2">
                                <p>Tambien recuerda:</p>
                                {itemList.map((item, index) => (
                                    <li
                                        key={index}
                                        className="flex items-start gap-1"
                                    >
                                        <img src={itemIcon} alt="" />
                                        <p>{item}</p>
                                    </li>
                                ))}
                            </ul>
                            <p className="font-semibold">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Quo eligendi sunt dolor veniam
                                quod libero nostrum blanditiis animi dicta.
                                Ratione eligendi dignissimos earum culpa
                                corrupti dolore reiciendis, nihil obcaecati
                                aliquid?
                            </p>
                        </div>
                    </div>

                    <div className="w-1/2">
                        <img className="w-full" src={bannerImage} alt="" />
                    </div>
                </div>
                <div className="flex flex-row justify-evenly">
                    {pdfInfo.map((fileObject, index) => (
                        <FileComponent key={index} fileObject={fileObject} />
                    ))}
                </div>
            </div>
        </div>
    );
}
