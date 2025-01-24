export default function DefaultCard({ cardObject }) {
    return (
        <div className="h-[366px] w-[288px] flex flex-col font-roboto-condensed border border-[#EAEAEA] shadow-sm">
            <div>
                {cardObject.image ? (
                    <img
                        className="max-h-[287px]"
                        src={cardObject.image}
                        alt=""
                    />
                ) : (
                    <div className="w-60 h-60">
                        <p>tamo</p>
                    </div>
                )}
            </div>
            <h3 className="text-[16px] pl-4 pt-4">{cardObject.name}</h3>
        </div>
    );
}
