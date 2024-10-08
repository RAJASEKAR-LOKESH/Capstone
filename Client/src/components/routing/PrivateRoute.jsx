import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

// PrivateRoute component
function PrivateRoute({ children }) {
    // get user from context
    const { user } = useContext(AuthContext);

    // if user is not logged in, redirect to login page
    if (!user) {
        console.log("Private Route", user);
        return <Navigate to="/login" />;
    }

    // if user is logged in, render the children
    return children;
}

export default PrivateRoute;