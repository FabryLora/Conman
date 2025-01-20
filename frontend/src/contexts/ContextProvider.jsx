import { createContext, useContext, useEffect, useState } from "react";
import axiosClient from "../axios.js";

const StateContext = createContext({
    userToken: null,
    setUserToken: () => {},

    userInfo: {},
    fetchUserInfo: () => {},
});

export const ContextProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState({});
    const [userToken, _setUserToken] = useState(
        localStorage.getItem("TOKEN") || ""
    );

    const setUserToken = (token) => {
        if (token) {
            localStorage.setItem("TOKEN", token);
        } else {
            localStorage.removeItem("TOKEN");
        }
        _setUserToken(token);
    };

    const fetchUserInfo = () => {
        axiosClient.get("/me").then(({ data }) => {
            setUserInfo(data);
        });
    };

    useEffect(() => {
        if (userToken) {
            fetchUserInfo();
        }
    }, [userToken]);

    return (
        <StateContext.Provider
            value={{
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
