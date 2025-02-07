export default function NosotrosCard({ title, text, icon }) {
    return (
        <div className="flex relative flex-col font-roboto-condensed bg-white w-[391px] h-[390px] p-7 ">
            <div className="absolute -top-10 flex items-center justify-center w-[77px] h-[77px] bg-primary-red">
                <img src={icon} alt="" />
            </div>
            <div className="pt-6 flex flex-col gap-3 overflow-hidden">
                <h2 className="text-[30px] font-semibold">{title}</h2>
                <p className="text-[15px] text-[#515A53] break-words leading-relaxed whitespace-pre-line">
                    {text}
                </p>
            </div>
        </div>
    );
}
