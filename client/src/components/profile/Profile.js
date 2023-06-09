//your uploads
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import http from "../../utils/http";
import Upload from "../home/Upload";
import "./profile.css";
const Profile = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  useEffect(() => {
    getUserProfile();
  }, [uploadedFiles]);

  const getUserProfile = async () => {
    const response = await http.get("/user");
    console.log(response);
    setUploadedFiles(response.data.uploadedFiles);
  };

  return (
    <>
      <div className="uploads-container">
        <h1>Your Uploads</h1>
        <div>
          <ul>
            {uploadedFiles.map((file) => (
              <li key={file}>
                <div className="pdf-box">
                  <Link to={`/file/${file}`}>{file}</Link>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <Upload />
      </div>
    </>
  );
};

export default Profile;
