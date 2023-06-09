import React, { useState, useEffect } from "react";
import http from "../../utils/http";
import { Link } from "react-router-dom"; // Import the Link component
import "./home.css";
const Home = () => {
    const [uploads, setUploads] = useState([]);

    useEffect(() => {
        getUploads();
    }, []);

    const getUploads = async () => {
        const response = await http.get('/uploads');
        setUploads(response.data);
    };

    return (
        <>
             <div>
                 <div className="title">
                  <h1>DashBoard</h1>
                 </div>
                 <div className="title">
                 <ul>
                {uploads.map(upload => (
                    <li key={upload}>
                        <div className="pdf-box">
                            <Link to={`/file/${upload}`}>{upload}</Link>
                        </div>
                    </li>
                ))}
            </ul>
                 </div>
             </div>
            
            
        </>
    );
};

export default Home;
