import React, { createContext, useEffect, useState } from "react";
import http from "../utils/http";
import setAuthToken from "../utils/setAuthToken";
import {jwtDecode} from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);

    const setUserFromToken = (token) => {
        try {
            const decodedToken = jwtDecode(token); // Decode token to get user data (e.g., role)
            setUser({
                _id: decodedToken._id,
                name: decodedToken.name,
                role: decodedToken.role, // Assuming role is included in the token
            });
        } catch (error) {
            console.error("Invalid token", error);
        }
    };

    // check if token is present in local storage
    useEffect(() => {
        // set token in local storage
        if (token) {
            setAuthToken(token);
            setUserFromToken(token);
            http
                .get("/user")
                .then((res) => {
                    setUser(res.data);
                })
                .catch((err) => {
                    setToken(null);
                    sessionStorage.removeItem("token");
                    console.log(err);
                    setAuthToken(null);
                });
        }
    }, [token]);

    // login function
    const login = async (email, password) => {
        const res = await http.post("/auth/login", { email, password });
        const { token } = res.data; // token is the JWT token
        setToken(token);
        sessionStorage.setItem("token", token);// set the token in local storage
        console.log("Token", token);
        setAuthToken(token);
        setUserFromToken(token);

        const userResponse = await http.get("/user");
        console.log("User Response", userResponse.data);
        setUser(userResponse.data);
    };

    //update user
    const updateUser = (updatedUser) => {
        setUser(updatedUser); // This function will update the user state
    };

    // logout function

    const logout = () => {
        setUser(null);
        setToken(null);
        sessionStorage.removeItem("token");
        setAuthToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, updateUser, token }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext; 