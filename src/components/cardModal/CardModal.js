import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory, useLocation } from "react-router-dom";
import { api } from "../../utils/api";
import Spinner from "../Spinner";
import { useOvermind } from "../../store";

import CardTitle from "./CardTitle";
import DescriptionBox from "../DescriptionBox";
import UnsplashSearch from "../UnsplashSearch";
import AssignMember from "./AssignMember";
import LabelSelect from "../LabelSelect";
import Comments from "./Comments";
import Attachments from "./Attachments";

const CardModalStyled = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;

  .card-modal {
    width: 660px;
    padding: 24px;
    margin-top: 70px;
    background: var(--white);
    border-radius: 8px;
    box-shadow: var(--bs2);
    position: relative;
    .close-btn {
      position: absolute;
      top: 10px;
      right: 10px;
      width: 32px;
      height: 32px;
      background: var(--blue);
      color: var(--white);
      font-size: 1.1rem;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    .cover-image {
      width: 100%;
      height: 130px;
      border-radius: 8px;
      background: var(--bgGrey);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .main-container {
      width: 100%;
      min-height: 200px;
      display: flex;
      gap: 24px;
      .main {
        flex: 1;
        height: 100%;
      }
      aside {
        width: 150px;
        height: 100%;

        .actions-header {
          display: flex;
          gap: 10px;
          align-items: center;
          color: var(--textGrey);
          font-size: 0.8rem;
          margin: 24px 0px;
        }
      }
    }
  }
`;

export default function CardModal({ cardId }) {
  const {
    actions: { lists: listsActions },
    state: { user: userState },
  } = useOvermind();

  const [cardState, setCardState] = useState(null);
  const [cardLoading, setCardLoading] = useState(true);
  const location = useLocation();
  const history = useHistory();

  //loading state
  const [addingNewComment, setAddingNewComment] = useState(false);
  const [updatingComment, setUpdatingComment] = useState(false);
  //////

  useEffect(() => {
    async function getCardData() {
      if (!cardId) return;
      try {
        const res = await api.get(`/cards/${cardId}`);
        console.log(res);
        if (res.data.success) {
          console.log(res.data.data.comments);
          res.data.data.comments.sort(function (a, b) {
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
          setCardState(res.data.data);
          setCardLoading(false);
        } else {
          //TODO: Handle unsuccessful response
          console.log("Handle unsuccessful response");
          setCardLoading(false);
        }
      } catch (err) {
        console.log(err);
        setCardLoading(false);
      }
    }
    getCardData();
  }, [cardId]);

  function closeModal() {
    history.push(location.pathname);
  }

  function descriptionChangeHandler(val) {
    updateAjaxCall({ description: val });
  }

  function coverChangeHandler(val) {
    updateAjaxCall({ coverPhoto: val });
  }

  function onTitleChangeHandler(val) {
    updateAjaxCall({ title: val });
  }

  function addMemberHandler(member) {
    updateAjaxCall({
      members: [...cardState.members.map((m) => m._id), member._id],
    });
  }

  function removeMemberHandler(memberId) {
    let newMembers = cardState.members.filter(
      (member) => member._id !== memberId
    );

    updateAjaxCall({
      members: newMembers,
    });
  }

  function addLabelHandler(val) {
    updateAjaxCall({
      labels: [...cardState.labels, val],
    });
  }

  function removeLabelHandler(id) {
    let nweLabels = cardState.labels.filter((label) => label._id !== id);

    updateAjaxCall({
      labels: nweLabels,
    });
  }

  async function addCommentHandler(text) {
    let newComment = {
      text,
      createdBy: userState.user._id,
      cardId: cardState._id,
    };

    try {
      setAddingNewComment(true);
      const res = await api.post(`/comments`, newComment);
      if (res.data.success) {
        let newComment = res.data.data;
        updateAjaxCall(
          {
            comments: [...cardState.comments.map((c) => c._id), newComment._id],
          },
          () => {
            setAddingNewComment(false);
          }
        );
      } else {
        //TODO: handle notification for unsuccessful update
        setAddingNewComment(false);
        console.log("TODO: handle notification for unsuccessful update");
      }
    } catch (err) {
      //TODO: handle notification for unsuccessful update
      setAddingNewComment(false);
      console.log(err);
    }
  }

  async function updateCommentHandler(newComment) {
    try {
      setUpdatingComment(newComment.id);
      const res = await api.put(`/comments/${newComment.id}`, {
        text: newComment.text,
      });
      if (res.data.success) {
        let updatedComment = res.data.data;
        console.log(updatedComment);
        let cardStateCopy = { ...cardState };
        let newComments = cardStateCopy.comments.map((comment) => {
          if (comment._id === updatedComment._id) {
            return updatedComment;
          }
          return comment;
        });
        cardStateCopy.comments = newComments;
        setCardState(cardStateCopy);
        setUpdatingComment(false);
      } else {
        //TODO: handle notification for unsuccessful update
        setUpdatingComment(false);
        console.log("TODO: handle notification for unsuccessful update");
      }
    } catch (err) {
      //TODO: handle notification for unsuccessful update
      setUpdatingComment(false);
      console.log(err);
    }
  }

  async function deleteCommentHandler(id) {
    try {
      const res = await api.delete(`/comments/${id}`);
      if (res.data.success) {
        let updatedComment = res.data.data;

        let cardStateCopy = { ...cardState };
        let newComments = cardStateCopy.comments.filter((comment) => {
          if (comment._id !== id) {
            return comment;
          }
        });
        cardStateCopy.comments = newComments;

        updateAjaxCall({ comments: [...newComments.map((c) => c._id)] }, () => {
          setCardState(cardStateCopy);
        });
      } else {
        //TODO: handle notification for unsuccessful update
        console.log("TODO: handle notification for unsuccessful update");
      }
    } catch (err) {
      //TODO: handle notification for unsuccessful update
      console.log(err);
    }
  }

  function uploadAttachmentHandler(attachment) {
    updateAjaxCall({
      attachments: [...cardState.attachments, attachment],
    });
  }

  function deleteAttachmentHandler(id) {
    let newAttachments = cardState.attachments.filter((att) => att._id !== id);
    updateAjaxCall({
      attachments: newAttachments,
    });
  }

  async function updateAjaxCall(props, cb) {
    try {
      const res = await api.put(`/cards/${cardState._id}`, props);
      if (res.data.success) {
        let updatedCard = res.data.data;
        updatedCard.comments.sort(function (a, b) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setCardState(updatedCard);
        listsActions.updateCardInList({
          listId: updatedCard.listId._id,
          updatedCard: updatedCard,
        });
        if (cb) {
          cb();
        }
      } else {
        //TODO: handle notification for unsuccessful update
        console.log("1 could not update card");
      }
    } catch (err) {
      //TODO: handle notification for unsuccessful update
      console.log("2 could not update card");
    }
  }

  //TODO: Handle if card does not exist
  if (!cardState && !cardLoading) {
    return (
      <CardModalStyled onClick={closeModal}>
        <div className="card-modal" onClick={(e) => e.stopPropagation()}>
          <h4>Card not found</h4>
        </div>
      </CardModalStyled>
    );
  }

  if (cardLoading) {
    return (
      <CardModalStyled onClick={closeModal}>
        <div
          className="card-modal"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <Spinner />
        </div>
      </CardModalStyled>
    );
  }

  return (
    <CardModalStyled onClick={closeModal}>
      <div className="card-modal" onClick={(e) => e.stopPropagation()}>
        <div className="close-btn" onClick={closeModal}>
          <span className="material-icons">close</span>
        </div>

        {cardState.coverPhoto !== "" && (
          <div className="cover-image">
            <img src={cardState.coverPhoto} />
          </div>
        )}

        <div className="main-container">
          <div className="main">
            <CardTitle
              title={cardState.title}
              listTitle={cardState.listId.title}
              onTitleChange={onTitleChangeHandler}
            />
            <DescriptionBox
              description={cardState.description}
              onSave={descriptionChangeHandler}
            />

            <Attachments
              onUploadedAttachment={uploadAttachmentHandler}
              attachments={cardState.attachments}
              onDelete={deleteAttachmentHandler}
            />

            <Comments
              comments={cardState.comments}
              onAddComment={addCommentHandler}
              onUpdateComment={updateCommentHandler}
              addingNewComment={addingNewComment}
              updatingComment={updatingComment}
              onDelete={deleteCommentHandler}
            />
          </div>
          <aside>
            <div className="actions-header">
              <span className="material-icons">account_circle</span>
              Actions
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <UnsplashSearch
                btnStyle={{ width: "100%" }}
                selectPhoto={coverChangeHandler}
              />

              <LabelSelect
                btnStyle={{ width: "100%" }}
                labels={cardState.labels}
                onAddLabel={addLabelHandler}
                onRemoveLabel={removeLabelHandler}
              />

              <AssignMember
                members={cardState.members}
                addMember={addMemberHandler}
                removeMember={removeMemberHandler}
              />
            </div>
          </aside>
        </div>
      </div>
    </CardModalStyled>
  );
}
