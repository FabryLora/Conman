import { useEffect, useState } from "react";

const Carousel = ({ images, autoScrollInterval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Cambiar imagen automáticamente después de un intervalo
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, autoScrollInterval);
    return () => clearInterval(interval);
  }, [currentIndex, autoScrollInterval]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full h-[750px] overflow-hidden">
      {/* Imagen y contenido */}
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-cover object-bottom"
          />
          <div className="absolute inset-0 flex flex-col justify-center gap-16 pl-16 text-white font-roboto">
            <div>
              <div className="relative text-6xl font-bold">
                <span className="absolute bottom-[2px] text-primary-blue">{image.title}</span>
                <span className="text-gray-700">{image.title}</span>
              </div>
              <div className="relative text-[25px]">
                <span className="absolute bottom-[1px] text-primary-blue">{image.description}</span>
                <span className="text-gray-700">{image.description}</span>
              </div>
              
            </div>
            
            <button className="bg-primary-red text-white w-[172px] h-[47px] font-roboto-condensed">
              MAS INFO
            </button>
          </div>
        </div>
      ))}

      {/* Indicadores */}
      <div className="absolute bottom-16 left-16 flex space-x-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-[37px] h-[8px] bg-white transition-opacity duration-300 ${
              index === currentIndex ? "opacity-100" : "opacity-50"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
