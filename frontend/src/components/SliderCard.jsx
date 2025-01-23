import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";
export default function SliderCard({ sliderObject }) {
    const { fetchSliderInfo } = useStateContext();

    const [sliderInfo, setSliderInfo] = useState({
        image: sliderObject.image,
        image_url: sliderObject.image_url,
        title: sliderObject.title,
        subtitle: sliderObject.subtitle,
        link: sliderObject.link,
    });
    const [editable, setEditable] = useState(false);

    const onImageChange = (ev) => {
        const file = ev.target.files[0];

        const reader = new FileReader();
        reader.onload = () => {
            console.log(reader.result);
            setSliderInfo({
                ...sliderInfo,
                image: file,
                image_url: reader.result,
            });
            ev.target.value = "";
        };
        reader.readAsDataURL(file);
    };

    const update = (e) => {
        e.preventDefault();
        const payload = { ...sliderInfo };
        if (payload.image) {
            payload.image = payload.image_url;
        }
        delete payload.image_url;
        axiosClient.put(`/slider/${sliderObject.id}`, payload).then(() => {
            fetchSliderInfo();
        });
    };

    return (
        <tr className="w-fit h-fit text-center">
            <td className="border border-gray-300 p-2 flex items-center">
                {editable ? (
                    <div>
                        <img src={sliderInfo?.image_url} alt="" />
                        <input
                            onChange={onImageChange}
                            type="file"
                            name=""
                            id=""
                        />
                    </div>
                ) : (
                    <img src={sliderObject?.image_url} className="" />
                )}
            </td>
            <td className="border border-gray-300 p-2">
                {editable ? (
                    <input
                        className="text-center"
                        onChange={(e) => {
                            setSliderInfo({
                                ...sliderInfo,
                                title: e.target.value,
                            });
                        }}
                        type="text"
                        value={sliderInfo.title}
                    />
                ) : (
                    <p>{sliderObject?.title}</p>
                )}
            </td>
            <td className="border border-gray-300 p-2">
                {editable ? (
                    <input
                        className="text-center"
                        onChange={(e) => {
                            setSliderInfo({
                                ...sliderInfo,
                                subtitle: e.target.value,
                            });
                        }}
                        type="text"
                        value={sliderInfo.subtitle}
                    />
                ) : (
                    <p>{sliderObject?.subtitle}</p>
                )}
            </td>
            <td className="border border-gray-300 p-2">
                {editable ? (
                    <input
                        className="text-center"
                        onChange={(e) => {
                            setSliderInfo({
                                ...sliderInfo,
                                link: e.target.value,
                            });
                        }}
                        type="text"
                        value={sliderInfo.link}
                    />
                ) : (
                    <p>{sliderObject?.link} </p>
                )}
            </td>
            <td className="border border-gray-300 p-2 text-center">
                {editable ? (
                    <div className="flex flex-row gap-2 w-fit ">
                        <button
                            onClick={() => setEditable(false)}
                            className="bg-red-500 text-white rounded-md p-2"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={update}
                            className="bg-blue-600 text-white rounded-md p-2"
                        >
                            Actualizar
                        </button>
                    </div>
                ) : (
                    <button onClick={() => setEditable(true)}>
                        <FontAwesomeIcon icon={faPenToSquare} size="2xl" />
                    </button>
                )}
            </td>
        </tr>
    );
}
