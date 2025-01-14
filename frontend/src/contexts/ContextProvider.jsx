import { createContext, useContext, useState } from "react";
import axiosClient from "../axios.js"

const StateContext = createContext({
    contactInfo: {},
    fetchContactInfo: () => { }
})

export const ContextProvider = ({ children }) => {
    const [contactInfo, setContactInfo] = useState([]);

    const fetchContactInfo = () => {
        axiosClient
            .get("/contactinfo")
            .then((res) => {
                setContactInfo(res.data.data[0]);
            })
            .catch((error) => {
                console.error("Error buscando la ingformacion del contacto", error);
            });
    };


    return (
        <StateContext.Provider
            value={{
                contactInfo,
                fetchContactInfo
            }}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);