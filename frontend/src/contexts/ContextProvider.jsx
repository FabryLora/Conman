import { createContext, useContext, useEffect, useState } from "react";
import axiosClient from "../axios.js";

const StateContext = createContext({
    userToken: null,
    setUserToken: () => {},
    adminToken: null,
    setAdminToken: () => {},
    userInfo: [],
    fetchUserInfo: () => {},
    adminInfo: {},
    fetchAdminInfo: () => {},
    nosotrosFirst: [],
    fetchNosotrosFirstInfo: () => {},
    contactInfo: {},
    fetchContactInfo: () => {},
    sliderInfo: {},
    fetchSliderInfo: () => {},
    categoryInfo: [],
    fetchCategoryInfo: () => {},
    productInfo: [],
    fetchProductInfo: () => {},
    subCategoryInfo: [],
    fetchSubCategoryInfo: () => {},
    provincias: [],
    fetchProvincias: () => {},
    allUsers: [],
    fetchAllUsers: () => {},
    addToCart: () => {},
    removeFromCart: () => {},
    cart: [],
    realProducts: [],
    fetchRealProducts: () => {},
    sliderImage: [],
    fetchSliderImage: () => {},
    pdfInfo: [],
    fetchPdfInfo: () => {},
});

export const ContextProvider = ({ children }) => {
    const [contactInfo, setContactInfo] = useState({});
    const [userInfo, setUserInfo] = useState({});
    const [adminInfo, setAdminInfo] = useState({});
    const [sliderInfo, setSliderInfo] = useState({});
    const [sliderImage, setSliderImage] = useState([]);
    const [categoryInfo, setCategoryInfo] = useState([]);
    const [productInfo, setProductInfo] = useState([]);
    const [subCategoryInfo, setSubCategoryInfo] = useState([]);
    const [provincias, setProvincias] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [realProducts, setRealProducts] = useState([]);
    const [pdfInfo, setPdfInfo] = useState([]);
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const addToCart = (product) => {
        const exists = cart.find((item) => item.id === product.id);
        let updatedCart;
        if (exists) {
            updatedCart = cart.map((item) =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
        } else {
            updatedCart = [...cart, { ...product, quantity: 1 }];
        }
        setCart(updatedCart);
    };

    const removeFromCart = (productId) => {
        const updatedCart = cart.filter((item) => item.id !== productId);
        setCart(updatedCart);
    };

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const [userToken, _setUserToken] = useState(
        localStorage.getItem("TOKEN") || ""
    );
    const [adminToken, _setAdminToken] = useState(
        localStorage.getItem("ADMIN_TOKEN") || ""
    );
    const [nosotrosFirstInfo, setNosotrosFirstInfo] = useState({});

    const setUserToken = (token) => {
        if (token) {
            localStorage.setItem("TOKEN", token);
        } else {
            localStorage.removeItem("TOKEN");
        }
        _setUserToken(token);
    };

    const setAdminToken = (token) => {
        if (token) {
            localStorage.setItem("ADMIN_TOKEN", token);
        } else {
            localStorage.removeItem("ADMIN_TOKEN");
        }
        _setAdminToken(token);
    };

    const fetchUserInfo = () => {
        axiosClient.get("/me").then(({ data }) => {
            setUserInfo(data);
        });
    };

    const fetchAllUsers = () => {
        axiosClient.get("/allusers").then(({ data }) => {
            setAllUsers(data.data);
        });
    };

    const fetchNosotrosFirstInfo = () => {
        axiosClient.get("/nosotros-first").then(({ data }) => {
            setNosotrosFirstInfo(data.data[0]);
        });
    };

    const fetchContactInfo = () => {
        axiosClient.get("/contact-info").then(({ data }) => {
            setContactInfo(data.data[0]);
        });
    };

    const fetchSliderInfo = () => {
        axiosClient.get("/slider").then(({ data }) => {
            setSliderInfo(data.data[0]);
        });
    };

    const fetchSliderImage = () => {
        axiosClient.get("/sliderimage").then(({ data }) => {
            setSliderImage(data.data);
        });
    };

    const fetchCategoryInfo = () => {
        axiosClient.get("/category").then(({ data }) => {
            setCategoryInfo(data.data);
        });
    };

    const fetchProductInfo = () => {
        axiosClient.get("/product").then(({ data }) => {
            setProductInfo(data.data);
        });
    };

    const fetchSubCategoryInfo = () => {
        axiosClient.get("/subcategory").then(({ data }) => {
            setSubCategoryInfo(data.data);
        });
    };

    const fetchProvincias = () => {
        axiosClient.get("/provincia").then(({ data }) => {
            setProvincias(data.data);
        });
    };

    const fetchRealProducts = () => {
        axiosClient.get("/realproducts").then(({ data }) => {
            setRealProducts(data.data);
        });
    };

    const fetchPdfInfo = () => {
        axiosClient.get("/pdf").then(({ data }) => {
            setPdfInfo(data.data);
        });
    };

    useEffect(() => {
        fetchNosotrosFirstInfo();
        fetchContactInfo();
        fetchSliderInfo();
        fetchCategoryInfo();
        fetchProductInfo();
        fetchSubCategoryInfo();
        fetchProvincias();
        fetchAllUsers();
        fetchRealProducts();
        fetchSliderImage();
        fetchPdfInfo();
    }, []);

    useEffect(() => {
        if (userToken) {
            fetchUserInfo();
        }
    }, [userToken]);

    const fetchAdminInfo = () => {
        axiosClient.get("/me-admin").then(({ data }) => {
            setAdminInfo(data);
        });
    };

    useEffect(() => {
        if (adminToken) {
            fetchAdminInfo();
        }
    }, [adminToken]);

    return (
        <StateContext.Provider
            value={{
                pdfInfo,
                fetchPdfInfo,
                sliderImage,
                fetchSliderImage,
                realProducts,
                fetchRealProducts,
                cart,
                removeFromCart,
                addToCart,
                allUsers,
                fetchAllUsers,
                provincias,
                fetchProvincias,
                subCategoryInfo,
                fetchSubCategoryInfo,
                productInfo,
                fetchProductInfo,
                categoryInfo,
                fetchCategoryInfo,
                sliderInfo,
                fetchSliderInfo,
                contactInfo,
                fetchContactInfo,
                nosotrosFirstInfo,
                fetchNosotrosFirstInfo,
                adminInfo,
                fetchAdminInfo,
                adminToken,
                setAdminToken,
                userToken,
                setUserToken,
                userInfo,
                fetchUserInfo,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
