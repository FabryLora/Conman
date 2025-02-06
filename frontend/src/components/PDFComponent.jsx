import { useState } from "react";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";

export default function PDFComponent({ pdfObject, onUpdate }) {
    const { fetchPdfInfo } = useStateContext();
    const [name, setName] = useState(pdfObject?.name);
    const [pdf, setPdf] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        setPdf(e.target.files[0]);
        console.log(pdf);
    };

    const downloadPDF = async () => {
        try {
            const filename = pdfObject?.pdf_url.split("/").pop(); // Extraer solo el nombre del archivo

            const response = await axiosClient.get(
                `/download-pdf/${filename}`,
                {
                    responseType: "blob",
                }
            );

            const blob = new Blob([response.data], { type: "application/pdf" });
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = pdfObject?.name;
            document.body.appendChild(a);
            a.click();

            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error al descargar el PDF:", error);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("name", name);
        if (pdf) {
            formData.append("pdf", pdf);
        }

        try {
            await axiosClient.post(
                `/pdf/${pdfObject?.id}?_method=PUT`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );

            fetchPdfInfo();
        } catch (error) {
            console.error("Error al actualizar:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            method="POST"
            onSubmit={handleUpdate}
            className="p-4 border rounded-lg shadow-md"
        >
            <h2 className="text-lg font-semibold mb-2">{pdfObject?.name}</h2>

            <div className="mb-2">
                <label className="block font-medium">Editar nombre:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border p-2 rounded w-full"
                />
            </div>

            <div className="mb-2">
                <label className="block font-medium">Subir nuevo PDF:</label>
                <input
                    type="file"
                    onChange={handleFileChange}
                    className="border p-2 rounded w-full"
                />
            </div>

            <div className="flex gap-2">
                <button
                    onClick={downloadPDF}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                    Descargar PDF
                </button>

                <button
                    type="submit"
                    disabled={loading}
                    className={`px-4 py-2 rounded-md ${
                        loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-green-500 hover:bg-green-700 text-white"
                    }`}
                >
                    {loading ? "Actualizando..." : "Actualizar PDF"}
                </button>
            </div>
        </form>
    );
}
