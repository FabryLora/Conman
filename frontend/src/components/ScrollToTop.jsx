import { useEffect } from "react";
import { useLocation } from "react-router-dom";
const ScrollToTop = () => {
    const location = useLocation();

    // Usamos useEffect para detectar cuando la ubicación cambie y hacer scroll al inicio
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    console.log(location);

    return null; // Este componente no necesita renderizar nada
};

export default ScrollToTop;
