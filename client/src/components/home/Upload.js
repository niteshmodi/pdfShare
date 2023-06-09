import React, { useState } from 'react';
import http from '../../utils/http';

const Upload = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    }

    const handleUpload = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append('pdf', file);

        try {
            console.log("i am here");
            const response = await http.post('/upload', formData);
            console.log(response.data);
        } catch (error) {
            console.log("i am in errror")
            console.error(error);
        }
    }

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
}

export default Upload;
