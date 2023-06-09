import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import http from "../../utils/http";
import Upload from "../home/Upload";

const Profile = () => {
    const [uploadedFiles, setUploadedFiles] = useState([]);

    useEffect(() => {
        getUserProfile();
    }, []);

    const getUserProfile = async () => {
        const response = await http.get("/user");
        console.log(response);
        setUploadedFiles(response.data.uploadedFiles);
    };

    return (
        <>
            <h1>Your Uploads</h1>
            <ul>
                {uploadedFiles.map(file => (
                    <li key={file}>
                    <Link to={`/file/${file}`}>{file}</Link>
                    </li>
                ))}
            </ul>
            <Upload />
        </>
    );
};

export default Profile;
