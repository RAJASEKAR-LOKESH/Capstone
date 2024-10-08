import React from "react";
import { Route, Routes } from "react-router-dom";

import Login from "../login/Login";
import Register from "../register/Register";
import Profile from "../profile/Profile";
import Home from "../home/Home"
import Logout from "../logout/Logout";
import PrivateRoute from "./PrivateRoute";
import EventApproval from "../admin/EventApproval";
import Analytics from "../analytics/Analytics";
import UpdateProfile from "../profile/UpdateProfile";
import Dashboard from "../user/Dashboard";
import Organizerdashboard from "../organizer/Organizerdashboard";


function Routing({ user }) {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login user={user} />} />
            <Route path="/register" element={<Register user={user} />} />
            <Route element={<PrivateRoute user={user} />}>
                <Route path="/profile" element={<Profile />} />
                <Route path="/eventApproval" element={<EventApproval />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/updateProfile" element={<UpdateProfile />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/organizerdashboard" element={<Organizerdashboard />} />
            </Route>

        </Routes>
    );
}