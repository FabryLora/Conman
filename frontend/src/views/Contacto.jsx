import letterIcon from "../assets/icons/letter-red-icon.svg";
import locationIcon from "../assets/icons/location-red-icon.svg";
import phoneIcon from "../assets/icons/phone-red-icon.svg";
import whatsappIcon from "../assets/icons/whatsapp-red-icon.svg";

export default function Contacto() {
    const contactInfo = [
        {
            icon: locationIcon,
            text: "Remedios de Escalada de San Martín 3771 - (1822) Valentin Alsina. Buenos Aires, Argentina",
        },
        { icon: letterIcon, text: "info@conman.com.ar" },
        { icon: phoneIcon, text: "54 + 11 4208-5568" },
        { icon: whatsappIcon, text: "54 + 11 6134-3773" },
    ];

    const inputInfo = [
        { title: "Nombre", type: "text", id: "nombre" },
        { title: "Telefono", type: "number", id: "nombre" },
        { title: "Email", type: "email", id: "nombre" },
        { title: "Empresa", type: "text", id: "nombre" },
    ];

    return (
        <div className="flex justify-center">
            <div className="font-roboto-condensed text-[#515A53] py-20 flex flex-col gap-20 w-[90%]">
                <div className="flex flex-row justify-between">
                    <div className="w-1/2 flex flex-col gap-10">
                        <p className="text-[18px]">
                            Para mayor información, no dude en contactarse
                            mediante el siguiente formulario, o a través de
                            nuestras vías de comunicación.
                        </p>
                        <div className="flex flex-col gap-4 justify-start">
                            {contactInfo.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex flex-row items-center gap-3"
                                >
                                    <img src={item.icon} alt="" />
                                    <p className="break-words w-[50%]">
                                        {item.text}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="w-1/2 flex justify-end">
                        <form className="w-fit flex flex-col gap-10" action="">
                            <div className="grid grid-cols-2 grid-rows-2 gap-5 items-center justify-center w-fit">
                                {inputInfo.map((info, index) => (
                                    <div
                                        className="flex flex-col gap-2"
                                        key={index}
                                    >
                                        <label htmlFor={info.id}>
                                            {info.title}
                                        </label>
                                        <input
                                            className="border pl-3 w-[264px] h-[48px]"
                                            type={info.type}
                                            name={info.id}
                                            id={info.id}
                                        />
                                    </div>
                                ))}
                                <div className="col-span-2">
                                    <label htmlFor="mensaje">Mensaje</label>
                                    <textarea
                                        className="w-full h-[155px] border p-3"
                                        type="text"
                                        name="mensaje"
                                        id="mensaje"
                                    />
                                </div>
                            </div>
                            <button className="w-full h-[47px] bg-primary-red text-white">
                                ENVIAR MENSAJE
                            </button>
                        </form>
                    </div>
                </div>
                <div className="flex justify-center">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3281.4647215277473!2d-58.4196176234808!3d-34.66821886090883!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccc7fe2a9ac01%3A0xd6121cc1d8cbb189!2sConman%20Argentina!5e0!3m2!1ses-419!2sar!4v1737124645441!5m2!1ses-419!2sar"
                        className="w-full h-[520px]"
                        allowfullscreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
        </div>
    );
}
