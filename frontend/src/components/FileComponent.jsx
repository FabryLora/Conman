import downloadIcon from "../assets/icons/download-icon.svg";
import axiosClient from "../axios";

export default function FileComponent({ fileObject }) {
    const downloadPDF = async () => {
        try {
            const filename = fileObject?.pdf_url.split("/").pop(); // Extraer solo el nombre del archivo

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
            a.download = fileObject?.name;
            document.body.appendChild(a);
            a.click();

            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error al descargar el PDF:", error);
        }
    };

    return (
        <div className="w-[392px] h-[80px] border border-[#EAEAEA] bg-special-white">
            <div className="flex flex-row items-center">
                <div className="w-[78px] h-[78px] flex items-center justify-center bg-white flex-shrink-0">
                    <img
                        className="w-full h-full object-contain"
                        /* src={fileObject.image} */
                        alt=""
                    />
                </div>

                <div className="flex flex-row justify-between items-center w-full px-5">
                    <div className="flex flex-col gap-1">
                        <p className="font-medium">{fileObject?.name}</p>
                        <p>
                            {fileObject?.formato.split("/")[1].toUpperCase() ||
                                "desconocido"}{" "}
                            /{" "}
                            {fileObject?.peso
                                ? `${(fileObject.peso / 1024).toFixed(2)} KB`
                                : "Desconocido"}
                        </p>
                    </div>
                    <button className="w-[24px] h-[24px]" onClick={downloadPDF}>
                        <img
                            className="w-full h-full object-contain"
                            src={downloadIcon}
                            alt="Download Icon"
                        />
                    </button>
                </div>
            </div>
        </div>
    );
}
