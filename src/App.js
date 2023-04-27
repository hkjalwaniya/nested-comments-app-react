import { useState } from "react";
import "./styles.css";
import { v4 as uuidv4 } from "uuid";
import CommentBox from "./CommentBox";
import Comment from "./Comment";
export default function App() {
  const [comments, setComments] = useState({});
  const getNewComment = (commentText, isRootNode = false, parentCommentId) => {
    const id = uuidv4().slice(0, 8);
    return {
      id,
      commentText,
      isRootNode,
      childComments: [],
      parentCommentId
    };
  };
  const handleAddComment = (commentText, parentCommentId) => {
    let newComment;
    if (parentCommentId) {
      newComment = getNewComment(commentText, false, parentCommentId);
      setComments((comments) => ({
        ...comments,
        [parentCommentId]: {
          ...comments[parentCommentId],
          childComments: [
            ...comments[parentCommentId].childComments,
            newComment.id
          ]
        }
      }));
    } else {
      newComment = getNewComment(commentText, true, null);
    }
    setComments((comments) => ({
      ...comments,
      [newComment.id]: newComment
    }));
  };

  const commentMapper = (comment) => {
    return {
      ...comment,
      childComments: comment.childComments
        .map((id) => comments[id])
        .map((comment) => commentMapper(comment))
    };
  };
  const mappedComments = Object.values(comments)
    .filter((comment) => !comment.parentCommentId)
    .map(commentMapper);
  return (
    <div className="app">
      <div className="comments-section">
        <h1>Nested Comment Box</h1>
        <CommentBox handleAddComment={handleAddComment} />

        <div
          className={
            mappedComments.length ? "comments-wrapper" : "comments-wrapper hide"
          }
        >
          {mappedComments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              handleAddComment={handleAddComment}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
