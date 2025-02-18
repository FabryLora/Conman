import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axiosClient from "../axios";
import PDFComponent from "../components/PDFComponent";
import { useStateContext } from "../contexts/ContextProvider";

const CalidadAdmin = () => {
    const { pdfInfo, fetchPdfInfo } = useStateContext();

    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");
    const [name, setName] = useState("");
    const [image, setImage] = useState();

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            setMessage("Selecciona un archivo PDF");
            return;
        }

        const formData = new FormData();
        formData.append("pdf", file);
        if (image) {
            formData.append("image", image);
        }

        formData.append("name", name);

        try {
            const response = await axiosClient.post("/upload-pdf", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            fetchPdfInfo();
            toast.success("PDF subido correctamente");
        } catch (error) {
            toast.error("Error al subir el archivo");
        }
    };

    return (
        <div className="p-5 flex flex-col gap-5">
            <ToastContainer />

            <div className="shadow-md p-5 border w-fit flex flex-col gap-2">
                <h1 className="text-2xl font-bold">Crear campo de archivo:</h1>
                <label
                    htmlFor="inis"
                    className="bg-indigo-500 p-2 text-white rounded-md text-center w-full cursor-pointer"
                >
                    Elegir Imagen
                </label>
                <p>{image?.name}</p>
                <input
                    id="inis"
                    type="file"
                    onChange={handleImageChange}
                    className="hidden"
                />
                <label
                    htmlFor="ini"
                    className="bg-indigo-500 p-2 text-white rounded-md text-center w-full cursor-pointer"
                >
                    Elegir Archivo
                </label>
                <p>{file?.name}</p>
                <label htmlFor="name">Nombre:</label>
                <input
                    className="border-black border pl-2 outline-none"
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    id="name"
                />
                <input
                    id="ini"
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileChange}
                    className="hidden"
                />
                <button
                    onClick={handleUpload}
                    className="bg-green-500 text-white w-full py-2 rounded-md  hover:bg-green-700"
                >
                    Subir PDF
                </button>
            </div>

            <div className="flex-wrap flex flex-col gap-10">
                <h1 className="text-2xl font-bold">Campos creados:</h1>
                <div className="flex flex-row flex-wrap gap-10">
                    {pdfInfo &&
                        pdfInfo.map((file, index) => (
                            <PDFComponent key={index} pdfObject={file} />
                        ))}
                </div>
            </div>
        </div>
    );
};

export default CalidadAdmin;
