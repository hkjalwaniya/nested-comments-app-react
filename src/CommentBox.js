import { useState } from "react";
export default function CommentBox({ handleAddComment }) {
  const [comment, setComment] = useState("");

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleButtonClick = () => {
    setComment("");
    handleAddComment(comment, null);
  };

  return (
    <div className="comment-input">
      <input type="text" onChange={handleChange} value={comment} />
      <button onClick={handleButtonClick}>Add Comment</button>
    </div>
  );
}
