import { useEffect, useState } from "react";
import commentService from "../../services/commentService";

function Comments({ cardId }){
    const [comments, setComments] = useState([]);

    const [text, setText] = useState("");

    const [loading, setLoading] = useState(true);

    const [submitting, setSubmitting] = useState(false);

    const [error, setError] = useState("");

    useEffect(() => {
        const fetchComments = async () => {
            try{
                setLoading(true);
                setError("");

                const data = await commentService.getComments(cardId);
                setComments(data);
            }

            catch(error){
                console.error("Failed to fetch comments:", error);

                setError(
                    error.response?.data?.message || 'Failed to load comments.'
                );
            }

            finally{
                setLoading(false);
            }
        };

        if(cardId){
            fetchComments();
        }
    }, [cardId]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const trimmedText = text.trim();

        if(!trimmedText){
            return;
        }

        try{
            setSubmitting(true);
            setError("");

            const newComment = await commentService.createComment(cardId, trimmedText);
            setComments((previousComments) => [
                ...previousComments,
                newComment
            ]);

            setText("");
        }

        catch(error){
            console.error("Failed to add comment:", error);

            setError(
                error.response?.data?.message || "Failed to add comment."
            );
        }

        finally{
            setSubmitting(false);
        }
    };

    return (
        <div className="comments-section">
            <div className="comments-header">
                <h3>Comments</h3>
                <span>{comments.length}</span>
            </div>

            {loading && (
                <p className="comments-status">Loading comments...</p>
            )}

            {!loading && comments.length === 0 && (
                <p className="comments-status">No comments yet.</p>
            )}

            {!loading && comments.length > 0 && (
                <div className="comments-list">
                    {comments.map((comment) => (
                        <div key={comment._id} className="comment">
                            <div className="comment-header">
                                <strong>
                                    {comment.user?.name || "Unknown User"}
                                </strong>

                                <span>
                                    {new Date(comment.createdAt).toLocaleString()}
                                </span>
                            </div>

                            <p className="comment-text">
                                {comment.text}
                            </p>
                        </div>
                    ))}
                </div>
            )}

            {error && (
                <p className="error-message">{error}</p>
            )}

            <form className="comment-form" onSubmit={handleSubmit}>
                <textarea value={text} onChange={(event) => setText(event.target.value)} placeholder="Write a comment..." rows="3" disabled={submitting}/>
                    <button type="submit" className="primary-button" disabled={submitting || !text.trim()}>
                        {submitting ? "Adding..." : "Comment"}
                    </button>
            </form>
        </div>
    );
}

export default Comments;