import { Link } from "react-router-dom"
import conmanLogo from "../assets/logos/conman-logo.png"
import fbIcon from "../assets/icons/fbIcon.svg"
import igIcon from "../assets/icons/igIcon.svg"
import phoneIcon from "../assets/icons/phone.svg"
import letterIcon from "../assets/icons/sobre.svg"
import searchIcon from "../assets/icons/search.svg"
import chevronDown from "../assets/icons/chevron-down.svg"
import { useStateContext } from "../contexts/ContextProvider"
import { useEffect } from "react"

export default function Navbar() {

    const { contactInfo, fetchContactInfo } = useStateContext()

    const links = [
        { title: "Nosotros", href: "#", chevron: false },
        { title: "Terminales y accesorios", href: "#", chevron: true },
        { title: "Mangueras", href: "#", chevron: true },
        { title: "Acoples rapidos", href: "#", chevron: true  },
        { title: "Productos", href: "#", chevron: true  },
        { title: "Calidad", href: "#", chevron: false  },
        { title: "Novedades", href: "#", chevron: false  },
        { title: "Contacto", href: "#", chevron: false  }
    ]

    const socials = [
        { logo: fbIcon , href: "#" },
        { logo: igIcon, href: "#" }

    ]

    useEffect(() => {
        fetchContactInfo()
    }, [])


    return (
        <div className="flex flex-col items-center justify-center font-roboto-condensed">
            <div className="bg-primary-blue h-[40px] w-full flex items-center justify-between pl-20 pr-10">

                <div className="flex gap-4 items-center text-[14px] text-white h-[16px]">
                    <div className="flex gap-2 items-center">
                        <img className="h-[16px]" src={letterIcon} alt="" />
                        <h2>{contactInfo.mail}</h2>
                    </div>
                    <div className="flex gap-2 items-center">
                        <img className="h-[16px]" src={phoneIcon} alt="" />
                        <h2>{contactInfo.phone}</h2>
                    </div>
                </div>

                <div className="flex flex-row gap-4 h-[16px] items-center justify-center">
                    {socials.map(social => (
                        <Link key={social.href} to={social.href}>
                            <img src={social.logo} alt="" />
                        </Link>
                    ))}
                    <button>
                        <img src={searchIcon} alt="" />
                    </button>

                </div>
            </div>
            <nav className="flex flex-row items-center pl-20 pr-10 gap-32 w-full h-[85px] shadow-sm">
                <Link to={"/"}><img src={conmanLogo} alt="" /></Link>
                <ul className="flex flex-row gap-10 text-[15px]">
                    {links.map(link => (
                        <div className="flex gap-1" key={link.title}>
                            <Link className="text-base" to={link.href}>{link.title}</Link>
                            {link.chevron && <img src={chevronDown} alt="" />}
                        </div>
                        
                    ))}
                </ul>
                
            </nav>

        </div>
    )
}
