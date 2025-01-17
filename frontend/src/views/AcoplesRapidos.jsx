import exampleImage from "../assets/acoples/example.png";
import DefaultCard from "../components/DefaultCard";
import DefaultCategory from "../components/DefaultCategory";
export default function AcoplesRapidos() {
    const exampleObject = [
        { image: exampleImage, title: "SERIE B" },
        { image: exampleImage, title: "SERIE P" },
        { image: exampleImage, title: "SERIE E" },
    ];

    const exampleCategoryObject = [
        { title: "ACOPLES HIDRAULICOS", href: "#" },
        { title: "ACOPLES HIDRAULICOS", href: "#" },
    ];

    return (
        <div className="flex flex-row w-full py-20 px-5 font-roboto-condensed">
            <div className="w-[20%]">
                {exampleCategoryObject.map((cardObject, index) => (
                    <h3
                        key={index}
                        className={`font-bold text-[16px] border-y border-[#EAEAEA] py-2`}
                    >
                        ACOPLES HIDRAULICOS
                    </h3>
                ))}
            </div>
            <div className="flex flex-row justify-evenly w-[80%]">
                {exampleObject.map((cardObject, index) => (
                    <DefaultCard key={index} cardObject={cardObject} />
                ))}
            </div>
        </div>
    );
}
