import bannerHome from "../assets/inicio/banner-home.png"

export default function Home() {
  return (
    <div>
      <div style={{ backgroundImage: `url(${bannerHome})` }} className="h-[643px]  bg-center bg-cover flex flex-col gap-3 text-white items-start justify-center font-roboto">
        <div className="flex flex-col gap-3 w-[673px]">
          <h2 className="text-[56px]">Disenio, tecnologia y Servicio</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni voluptate quia tempore facilis! Sit corrupti optio maiores totam recusandae adipisci necessitatibus voluptas perferendis natus, a eligendi ut saepe consequuntur repudiandae.</p>
        </div>
        <button className="bg-primary-orange w-fit">MAS INFO</button>
      </div>
    </div>
  )
}
