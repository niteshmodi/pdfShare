import React from "react";
import { Routes, Route } from "react-router-dom";
import { useParams } from "react-router-dom"; // Import the useParams hook

import Login from "../login/Login";
import Register from "../register/Register";
import Profile from "../profile/Profile";
import Logout from "../logout/Logout";
import Home from "../home/Home";
import File from "../profile/File"; // Import the File component
import PrivateRoute from "./PrivateRoute";

const Routing = ({ user }) => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login user={user} />} />
            <Route path='/register' element={<Register user={user} />} />
            <Route element={<PrivateRoute user={user} />}>
                <Route path='/profile' element={<Profile />} />
                <Route path='/logout' element={<Logout />} />
                <Route path='/file/:fileName' element={<FileWrapper />} /> 
            </Route>
        </Routes>
    );
};

const FileWrapper = () => {
    const { fileName } = useParams();
    return <File fileName={fileName} />;
};

export default Routing;
