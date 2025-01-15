import {Link} from "react-router-dom"

export default function Novedades({newsObject}) {
  return (
    <div className="bg-white h-[493px] w-[392px] font-roboto">
        <div className="flex flex-col p-4 gap-3">
            <img className="w-full h-[246px]" src={newsObject.image} alt="" />
            <h2 className="text-[24px] font-medium">{newsObject.title}</h2>
            <p className="text-[16px]">{newsObject.description}</p>
            <Link to={newsObject.href} className="font-medium">Leer mas</Link>
        </div>
    </div>
  )
}
