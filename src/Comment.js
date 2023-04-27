import { useState } from "react";
export default function Comment({ comment, handleAddComment }) {
  const [replyComment, setReplyComment] = useState("");
  const [isReplying, setIsReplying] = useState(false);
  const { commentText, childComments, id } = comment;
  const handleChange = (e) => {
    setReplyComment(e.target.value);
  };
  const handleReplyClick = (e) => {
    setIsReplying(!isReplying);
  };
  const handleAddReplyButtonClick = () => {
    handleAddComment(replyComment, id);
    setReplyComment("");
    setIsReplying(false);
  };
  const handleAddReplyCancel = () => {
    setReplyComment("");
    setIsReplying(false);
  };
  return (
    <div className="comment">
      <div className="parent-comment">
        <span className="comment-text">{commentText}</span>
        {isReplying && (
          <div className="reply-actions">
            <input type="text" onChange={handleChange} value={replyComment} />
            <button
              onClick={handleAddReplyButtonClick}
              disabled={!replyComment.length}
            >
              Add
            </button>
            <button onClick={handleAddReplyCancel}>Cancel</button>
          </div>
        )}
        {!isReplying && (
          <span>
            <a
              style={{
                color: "blue",
                cursor: "pointer",
                fontSize: "12px"
              }}
              onClick={handleReplyClick}
            >
              Add a reply
            </a>
          </span>
        )}
      </div>
      {childComments &&
        childComments.map((childComment) => (
          <div className="reply-comment">
            <Comment
              key={childComment.id}
              comment={childComment}
              handleAddComment={handleAddComment}
            />
          </div>
        ))}
    </div>
  );
}
