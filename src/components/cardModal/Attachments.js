import React, { useState } from "react";
import styled from "styled-components";
import { api } from "../../utils/api";
import { parseDate } from "../../utils";

const AttachmentsStyled = styled.div``;

const NewAttachmentStyled = styled.div`
  display: flex;
  align-items: center;
  .attachment-label {
    color: var(--textGrey);
    font-size: 0.8rem;
    margin-right: 15px;
    display: flex;
    align-items: center;
    .material-icons {
      font-size: 1.1rem;
    }
    span {
      margin-right: 5px;
    }
  }
`;

const AttachmentStyled = styled.div`
  margin: 10px 0px;
  display: flex;
  .attachment-preview {
    width: 80px;
    height: 60px;
    border-radius: 8px;
    background: var(--grey);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }

  .attachment-info {
    flex: 1;
    height: 100%;
    padding-left: 10px;
    .attachment-date {
      font-size: 0.8rem;
      color: var(--textGrey);
    }
    .attachment-name {
      font-size: 0.9rem;
      color: var(--textBlack);
    }
    .attachment-actions {
      margin-top: 5px;
      display: flex;
    }
  }
`;

const StyledBtn = styled.label`
  cursor: pointer;
  border: var(--border-light);
  min-width: 10px;
  padding: 0px 10px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  background: #fff;
  color: var(--textGrey);
  .material-icons {
    font-size: 1.1rem;
  }
  &:hover {
    filter: brightness(90%);
  }
`;

export default function Attachments({
  attachments,
  onUploadedAttachment,
  onDelete,
}) {
  return (
    <AttachmentsStyled>
      <NewAttachment onUploadedAttachment={onUploadedAttachment} />
      {attachments.map((att) => (
        <Attachment attachment={att} onDelete={onDelete} key={att._id} />
      ))}
    </AttachmentsStyled>
  );
}

function NewAttachment({ onUploadedAttachment }) {
  const [uploading, setUploading] = useState(false);

  async function uploadAttachment(e) {
    let file = e.target.files;
    if (!file) {
      //TODO: display message for user to select a file first
      return alert("Select a file first!");
    }
    const formData = new FormData();

    formData.append("file", file[0]);
    try {
      setUploading(true);
      const res = await api.post("/files/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.success) {
        onUploadedAttachment({
          name: file[0].name,
          url: res.data.data.Location,
        });
      }
      setUploading(false);
      console.log(res);
    } catch (err) {
      setUploading(false);
      console.log(err);
      //TODO: display message with error
    }
  }

  return (
    <NewAttachmentStyled>
      <div className="attachment-label">
        <span className="material-icons">description</span>
        <span>Attachments</span>
      </div>
      <StyledBtn htmlFor="file">
        <span className="material-icons">add</span>
        {!uploading ? <span>Add</span> : <span>Uploading...</span>}
      </StyledBtn>
      <input
        type="file"
        name="file"
        id="file"
        style={{ display: "none" }}
        onInput={uploadAttachment}
      />
    </NewAttachmentStyled>
  );
}

function Attachment({ attachment, onDelete }) {
  function checkIfPic(name) {
    if (!name || name === "") {
      return false;
    }
    let flag = false;
    const extensions = [".png", ".jpg", ".gif", ".jpeg"];
    extensions.forEach((ext) => {
      if (name.includes(ext)) {
        flag = true;
      }
    });
    return flag;
  }

  function downloadAttachment() {
    if (attachment.url === "") {
      return;
    }
    window.open(attachment.url, "_blank");
  }

  return (
    <AttachmentStyled>
      <div className="attachment-preview">
        {attachment.url !== "" && checkIfPic(attachment.name) ? (
          <img src={attachment.url} />
        ) : (
          <span style={{ textTransform: "uppercase" }}>{`${
            attachment.name[0] + attachment.name[1]
          }`}</span>
        )}
      </div>
      <div className="attachment-info">
        <div className="attachment-date">
          Added {parseDate(attachment.createdAt)}
        </div>
        <div className="attachment-name">{attachment.name}</div>
        <div className="attachment-actions">
          <StyledBtn
            style={{ marginRight: "10px" }}
            onClick={downloadAttachment}
          >
            Download
          </StyledBtn>
          <StyledBtn onClick={() => onDelete(attachment._id)}>Delete</StyledBtn>
        </div>
      </div>
    </AttachmentStyled>
  );
}
