import bannerImage from "../assets/calidad/banner-image.png";
import itemIcon from "../assets/icons/item-icon.svg";
import conmanLogo from "../assets/logos/conman-logo.png";
import iqnetLogo from "../assets/logos/iqnet-logo.png";
import iramLogo from "../assets/logos/iram-logo.png";
import FileComponent from "../components/FileComponent";

export default function Calidad() {
    const itemList = [
        "Satisfacer las necesidades de nuestros clients actuales y potenciales, con productos innovadores y de alta calidad, que hagan que nuestros clientes nos valoren y distingan, reconociendo en nuestra forma de trabajo, un modelo de comportamiento distintivo.",
        "Reconocer al personal como el activo principal de nuestra empresa, fomentando un clima que favorezca el compromiso, la formación, el involucramiento y la iniciativa.",
        "Elegir proveedores que se adhieran a nuestros principios.",
        "Fabricar terminales y accesorios para instalaciones óleo-hidráulicas y neumáticas que respondan a las necesidades de nuestros clientes.",
    ];

    const fileInfoList = [
        { image: conmanLogo, title: "Politicas de calidad" },
        { image: iqnetLogo, title: "Certificado IQNET - ISO 9001:2015" },
        { image: iramLogo, title: "Certificado IRAM - ISO 9001:2015" },
    ];

    return (
        <div className="font-roboto-condensed">
            <div className="flex flex-col gap-20 py-20">
                <div className="flex flex-row">
                    <div className="w-1/2 flex justify-center">
                        <div className="w-[90%] flex flex-col justify-evenly leading-relaxed">
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
                    {fileInfoList.map((fileObject, index) => (
                        <FileComponent key={index} fileObject={fileObject} />
                    ))}
                </div>
            </div>
        </div>
    );
}
