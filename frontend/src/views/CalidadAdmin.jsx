import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axiosClient from "../axios";
import PDFComponent from "../components/PDFComponent";
import { useStateContext } from "../contexts/ContextProvider";

const CalidadAdmin = () => {
    const { pdfInfo, fetchPdfInfo } = useStateContext();

    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");
    const [name, setName] = useState("name");

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            setMessage("Selecciona un archivo PDF");
            return;
        }

        const formData = new FormData();
        formData.append("pdf", file);
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
        <>
            <ToastContainer />
            <div className="p-4">
                <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileChange}
                />
                <button
                    onClick={handleUpload}
                    className="bg-green-500 text-white px-4 py-2 rounded-md ml-2 hover:bg-green-700"
                >
                    Subir PDF
                </button>
            </div>

            {pdfInfo &&
                pdfInfo.map((file, index) => (
                    <PDFComponent key={index} pdfObject={file} />
                ))}
        </>
    );
};

export default CalidadAdmin;
