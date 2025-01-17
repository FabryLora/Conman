import downloadIcon from "../assets/icons/download-icon.svg";

export default function FileComponent({ fileObject }) {
    return (
        <div className="w-[392px] h-[80px] border border-[#EAEAEA] bg-special-white">
            <div className="flex flex-row items-center">
                <div className="w-[78px] h-[78px] flex items-center justify-center bg-white flex-shrink-0">
                    <img
                        className="w-full h-full object-contain"
                        src={fileObject.image}
                        alt=""
                    />
                </div>

                <div className="flex flex-row justify-between items-center w-full px-5">
                    <div className="flex flex-col gap-1">
                        <p className="font-medium">{fileObject.title}</p>
                        <p>PDF / 145kb</p>
                    </div>
                    <button>
                        <img
                            className="w-[24px] h-[24px]"
                            src={downloadIcon}
                            alt="Download Icon"
                        />
                    </button>
                </div>
            </div>
        </div>
    );
}
