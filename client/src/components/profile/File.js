import React, { useEffect, useState } from "react";
import http from "../../utils/http";

const File = ({ fileName }) => {
    const [fileData, setFileData] = useState(null);
    const [comments, setComments] = useState([]);
    const [newCommentText, setNewCommentText] = useState("");

    useEffect(() => {
        getFileData();
    }, []);

    const getFileData = async () => {
        const response = await http.get(`/file/${fileName}`);
        console.log(response,'response');
        setFileData(response.data.fileData);
        setComments(response.data.comments);
        //this is not working properly
        //in frontend it is working propery
        console.log("filedata",fileData)
        console.log("comments",comments)
    };

    const handleNewCommentSubmit = async (event) => {
        event.preventDefault();
        const response = await http.post(`/comment/${fileName}`, { text: newCommentText, user: comments.user })
        setComments(comments.concat(response.data));
        setNewCommentText("");
    };

    return (
        <>
            <h1>{fileName}</h1>
            {/* {fileData && (
                <object data={`data:application/pdf;base64,${fileData}`} type="application/pdf" width="100%" height="600px">
                    <p>PDF cannot be displayed.</p>
                </object>
            )} */}
            <h2>Comments</h2>
            <ul>
                {comments.map(comment => (
                    <li key={comment._id}>{comment.text} - {comment.user}</li>
                    //problem 
                ))}
            </ul>
            <form onSubmit={handleNewCommentSubmit}>
                <input type="text" value={newCommentText} onChange={event => setNewCommentText(event.target.value)} />
                <button type="submit">Add Comment</button>

            </form>
        </>
    );
};

export default File;
