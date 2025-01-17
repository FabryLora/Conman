export default function DefaultCard({ cardObject }) {
    return (
        <div className="h-[366px] w-[288px] flex flex-col font-roboto-condensed border border-[#EAEAEA] shadow-sm">
            <div>
                <img className="max-h-[287px]" src={cardObject.image} alt="" />
            </div>
            <h3 className="text-[16px] pl-4 pt-4">{cardObject.title}</h3>
        </div>
    );
}
