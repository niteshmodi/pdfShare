import React, { useEffect, useState } from "react";
import http from "../../utils/http";
import './File.css'; // Import the CSS file for the File component

const File = ({ fileName }) => {
    const [fileData, setFileData] = useState(null);
    const [comments, setComments] = useState([]);
    const [newCommentText, setNewCommentText] = useState("");

    useEffect(() => {
        getFileData();
    }, []);

    const getFileData = async () => {
        const response = await http.get(`/comment/${fileName}`);
        setComments(response.data);
    };

    const handleNewCommentSubmit = async (event) => {
        event.preventDefault();
        const response = await http.post(`/comment/${fileName}`, { text: newCommentText })
        setComments(comments.concat(response.data));
        setNewCommentText("");
    };

    return (
        <div className="file-container">

          <div className="filetitle">
          <h1 className="file-name">{fileName}</h1>
          </div>
          
            <div className="comment-box">
                <h2>Join the Discussion!</h2>
                <form className="comment-form" onSubmit={handleNewCommentSubmit}>
                    <div className="comment-form-fields">
                        <textarea placeholder="Comment" rows="4" required value={newCommentText} onChange={event => setNewCommentText(event.target.value)}></textarea>
                    </div>
                    <div className="comment-form-actions">
                        <button type="submit">Post Comment</button>
                    </div>
                </form>
                <h3>Comments</h3>
                <h4 className="comment-count">
                    {getCommentsTitle(comments.length)}
                </h4>
                <ul className="comment-list">
                    {comments.map(comment => (
                        <li key={comment._id} className="comment">
                            <p className="comment-header">{comment.user.name}</p>
                            <p className="comment-body">- {comment.text}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );

    function getCommentsTitle(commentCount) {
        if (commentCount === 0) {
            return 'No comments yet';
        } else if (commentCount === 1) {
            return "1 comment";
        } else {
            return `${commentCount} comments`;
        }
    }
};

export default File;
