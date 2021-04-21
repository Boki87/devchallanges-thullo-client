import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Button from "../../styles/Button";
import MemberAvatar from "../MemberAvatar";
import { useOvermind } from "../../store";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { parseDate } from "../../utils";

const CommentsStyled = styled.div``;

const NewCommentStyled = styled.div`
  margin: 10px 0px;
  width: 100%;
  border-radius: 8px;
  border: var(--border-light);
  padding: 15px;
  box-shadow: var(--bs1);
  .textarea-container {
    display: flex;
    gap: 10px;
    textarea {
      border: none;
      outline: none;
      font-size: 1rem;
      resize: none;
    }
  }
`;

const CommentStyled = styled.div`
  margin: 20px 0px;
  .comment-header {
    display: flex;
    justify-content: space-between;

    .comment-actions {
      font-size: 0.8rem;
      color: var(--textGrey);
      span {
        cursor: pointer;
        &:hover {
          color: var(--textBlack);
        }
      }
    }
    .comment-created-by {
      display: flex;
      align-items: center;
      gap: 10px;
      .created-by-name-date {
        display: flex;
        flex-direction: column;
        .created-by-name {
          flex: 1;
          display: flex;
          align-items: center;
          font-size: 0.8rem;
          color: var(--textDark);
        }
        .created-by-date {
          flex: 1;
          display: flex;
          align-items: center;
          font-size: 0.7rem;
          color: var(--textGrey);
        }
      }
    }
  }

  .comment-body {
    margin-top: 10px;
    font-size: 0.9rem;
    border-radius: 8px;
    p {
      color: var(--textGrey);
    }
    textarea {
      border: none;
      outline: none;
      font-size: 1rem;
      resize: none;
    }
  }
`;

///Comments container
export default function Comments({
  comments,
  onAddComment,
  addingNewComment,
  updatingComment,
  onUpdateComment,
  onDelete,
}) {
  return (
    <CommentsStyled>
      <NewComment onSave={onAddComment} addingNewComment={addingNewComment} />
      {comments.map((comment) => (
        <Comment
          comment={comment}
          onUpdateComment={onUpdateComment}
          updatingComment={updatingComment}
          onDelete={onDelete}
          key={comment._id}
        />
      ))}
    </CommentsStyled>
  );
}

///New Comment
function NewComment({ onSave, addingNewComment }) {
  const {
    state: { user: userState },
  } = useOvermind();

  const textareaRef = useRef(null);
  const containerRef = useRef(null);
  const [textAreaHeight, setTextAreaHeight] = useState("auto");
  const [text, setText] = useState("");
  const [canSave, setCanSave] = useState(false);
  const [isOpened, setIsOpened] = useState(false);

  useOutsideClick(containerRef, function () {
    setText("");
    setIsOpened(false);
  });

  useEffect(() => {
    if (text.trim() === "") {
      setTextAreaHeight(`auto`);
      setCanSave(false);
    } else {
      setCanSave(true);
      setTextAreaHeight(`${textareaRef.current.scrollHeight}px`);
    }
  }, [text]);

  function onSaveHandler() {
    onSave(text);
    setText("");
    setIsOpened(false);
  }

  function startInput() {
    setIsOpened(true);
    setTimeout(() => {
      textareaRef.current.focus();
    });
  }

  return (
    <NewCommentStyled ref={containerRef}>
      <div className="textarea-container">
        {isOpened && (
          <>
            <MemberAvatar member={userState.user} />
            <textarea
              ref={textareaRef}
              name=""
              placeholder="Write a comment..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{ height: textAreaHeight }}
            ></textarea>
          </>
        )}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {!isOpened && (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <MemberAvatar member={userState.user} />
            <span onClick={startInput} style={{ color: "var(--textGrey)" }}>
              Write a comment...
            </span>
          </div>
        )}
        <Button
          bg="var(--blue)"
          color="#fff"
          style={{ marginLeft: "auto" }}
          onClick={onSaveHandler}
          disabled={!canSave}
        >
          {addingNewComment ? "Saving..." : "Comment"}
        </Button>
      </div>
    </NewCommentStyled>
  );
}

///Comment
function Comment({ comment, onDelete, onUpdateComment, updatingComment }) {
  const {
    state: { user: userState },
  } = useOvermind();

  const ref = useRef(null);
  const commentContainerRef = useRef(null);
  const [textAreaHeight, setTextAreaHeight] = useState("auto");
  const [text, setText] = useState(comment.text);
  const [canSave, setCanSave] = useState(false);
  const [isOpened, setIsOpened] = useState(false);

  useState(() => {
    setText(comment.text);
  }, [comment?.text]);

  useEffect(() => {
    if (text.trim() === "") {
      setTextAreaHeight(`auto`);
      setCanSave(false);
    } else {
      setCanSave(true);
      if (ref.current) {
        setTextAreaHeight(`${ref.current.scrollHeight}px`);
      }
    }
  }, [text]);

  function closeEdit() {
    setIsOpened(false);
  }
  function cancelEdit() {
    setText(comment.text);
    setIsOpened(false);
  }

  useOutsideClick(commentContainerRef, closeEdit);

  function updateCommentHandler() {
    onUpdateComment({ id: comment._id, text });
    closeEdit();
  }

  return (
    <CommentStyled ref={commentContainerRef}>
      <div className="comment-header">
        <div className="comment-created-by">
          <MemberAvatar member={comment.createdBy} />
          <div className="created-by-name-date">
            <span className="created-by-name">{comment.createdBy.name}</span>
            <span className="created-by-date">
              on {parseDate(comment.createdAt)}
            </span>
          </div>
        </div>

        {!isOpened && userState.user._id === comment.createdBy._id && (
          <div className="comment-actions">
            <span onClick={() => setIsOpened(true)}>Edit </span>-
            <span onClick={() => onDelete(comment._id)}> Delete</span>
          </div>
        )}

        {isOpened && (
          <div className="comment-actions">
            <span onClick={cancelEdit}>Cancel</span>
          </div>
        )}
      </div>
      <div
        className="comment-body"
        style={{
          border: isOpened ? "var(--border-light)" : "none",
          padding: isOpened ? "15px" : "0px",
          boxShadow: isOpened ? "var(--bs1)" : "none",
        }}
      >
        {!isOpened && !updatingComment && (
          <p style={{ whiteSpace: "pre" }}>{comment.text}</p>
        )}
        {!isOpened && updatingComment === comment._id && <p>Saving...</p>}
        {isOpened && (
          <textarea
            ref={ref}
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ height: textAreaHeight }}
          ></textarea>
        )}

        {isOpened && (
          <div>
            <Button
              bg="var(--blue)"
              color="#fff"
              style={{ marginLeft: "auto" }}
              onClick={updateCommentHandler}
              disabled={!canSave}
            >
              {updatingComment ? "Saving..." : "Save"}
            </Button>
          </div>
        )}
      </div>
    </CommentStyled>
  );
}
