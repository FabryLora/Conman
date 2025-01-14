import { Link } from "react-router-dom"
import narvicLogo from "../assets/logos/narvic-logo.png"
import snikerLogo from "../assets/logos/sniker-logo.png"
import fbIcon from "../assets/icons/facebook.svg"
import igIcon from "../assets/icons/instagram.svg"
import phoneIcon from "../assets/icons/phone.svg"
import letterIcon from "../assets/icons/sobre.svg"
import { useStateContext } from "../contexts/ContextProvider"
import { useEffect } from "react"

export default function Navbar() {

    const { contactInfo, fetchContactInfo } = useStateContext()

    const links = [
        { title: "Inicio", href: "#" },
        { title: "Nosotros", href: "#" },
        { title: "Bota Rural", href: "#" },
        { title: "Bota Nautica", href: "#" },
        { title: "Catalogo", href: "#" },
        { title: "Novedades", href: "#" },
        { title: "Contacto", href: "#" }
    ]

    useEffect(() => {
        fetchContactInfo()
    }, [])


    return (
        <div className="flex flex-col items-center justify-center">
            <div className="bg-primary-orange h-[40px] w-full flex items-center justify-around">

                <div className="flex gap-2 items-center text-white h-[16px]">
                    <div className="flex gap-2">
                        <img src={letterIcon} alt="" />
                        <h2>{contactInfo.mail}</h2>
                    </div>
                    <div className="flex gap-2">
                        <img src={phoneIcon} alt="" />
                        <h2>{contactInfo.phone}</h2>
                    </div>
                </div>

                <div className="flex flex-row gap-2 bg-white h-full items-center w-[65px] justify-center">
                    <div>
                        <img src={fbIcon} alt="" />
                    </div>
                    <div>
                        <img src={igIcon} alt="" />
                    </div>

                </div>
            </div>
            <nav className="flex flex-row items-center justify-around w-full h-[85px]">
                <div><img src={narvicLogo} alt="" /></div>
                <ul className="flex flex-row gap-4">
                    {links.map(link => (
                        <Link className="text-base" key={link.title} to={link.href}>{link.title}</Link>
                    ))}
                </ul>
                <div><img src={snikerLogo} alt="" /></div>
            </nav>

        </div>
    )
}
