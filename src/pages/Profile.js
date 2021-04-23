import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams, useLocation } from "react-router-dom";
import { useOvermind } from "../store";
import Spinner from "../components/Spinner";
import { getInitials } from "../utils";
import Button from "../styles/Button";
import { api } from "../utils/api";

const ProfileStyled = styled.div`
  padding-top: 24px;
  height: 100%;
  width: 100%;
  position: relative;

  .profile-header {
    display: flex;
    align-items: center;
    justify-content: center;
    .profile-photo-small {
      width: 48px;
      height: 48px;
      border-radius: 100%;
      background: var(--grey);
      margin-right: 10px;
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
  }

  .profile-form-container {
    padding-top: 20px;
    width: 530px;
    border-top: var(--border-light);
    margin: 30px auto 0px;
    display: flex;
    .profile-form {
      width: 300px;
      margin-right: 20px;
      .input-group {
        margin: 10px 0px;
        label {
          display: block;
        }
        input {
          border: var(--border-light);
          border-radius: 4px;
          outline: none;
          font-size: 0.9rem;
          padding-left: 10px;
          height: 34px;
          width: 100%;
          &:focus {
            border: 1px solid var(--blue);
          }
        }
        textarea {
          border: var(--border-light);
          border-radius: 4px;
          outline: none;
          font-size: 0.9rem;
          padding: 10px;
          width: 100%;
          &:focus {
            border: 1px solid var(--blue);
          }
        }
      }
    }
  }

  .profile-avatar {
    flex: 1;
    display: flex;
    align-items: center;
    flex-direction: column;

    .avatar-container {
      position: relative;
      margin-top: 10px;
      width: 120px;
      height: 120px;
      border-radius: 100%;
      background: var(--grey);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      font-size: 2rem;
      img {
        object-fit: cover;
        width: 100%;
        height: 100%;
      }

      .avatar-loading {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.4);
        display: flex;
        justify-content: center;
        align-items: center;
        .material-icons {
          color: #fff;
        }
      }

      .change-avatar {
        font-size: 1rem;
        position: absolute;
        bottom: 0px;
        left: 0px;
        width: 100%;
        height: 50%;
        justify-content: center;
        align-items: center;
        background: rgba(0, 0, 0, 0.4);
        color: #fff;
        display: none;
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }

      &:hover {
        .change-avatar {
          display: flex;
        }
      }
    }
  }
`;

export default function Profile() {
  const {
    state: { user: userState },
    actions: { boards: boardActions, user: userActions },
  } = useOvermind();

  useEffect(() => {
    boardActions.resetActiveBoard();
    boardActions.getBoards();
  }, []);

  const [formState, setFormState] = useState({
    name: userState.user.name,
    email: userState.user.email,
    bio: userState.user.bio,
  });

  const [avatarUploading, setAvatarUploading] = useState(false);

  function updateFormState(e) {
    let formStateCopy = { ...formState };
    formStateCopy[e.target.name] = e.target.value;
    setFormState(formStateCopy);
  }

  function submitHandler(e) {
    e.preventDefault();
    userActions.updateProfile(formState);
  }

  async function avatarChangeHandler(e) {
    let file = e.target.files;
    if (!file) {
      return;
    }
    const formData = new FormData();

    formData.append("file", file[0]);
    try {
      setAvatarUploading(true);
      const res = await api.post("/files/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.success) {
        if (res.data.data.Location !== "") {
          userActions.updateProfile({ photo: res.data.data.Location });
        }
      }
      setAvatarUploading(false);
    } catch (err) {
      setAvatarUploading(false);
      //TODO: display message with error
    }
  }

  return (
    <ProfileStyled>
      <div className="profile-header">
        <div className="profile-photo-small">
          {userState.user.photo !== "" ? (
            <img src={userState.user.photo} alt="" />
          ) : (
            <span>{getInitials(userState.user.name)}</span>
          )}
        </div>
        <span>{userState.user.name}</span>
      </div>
      <div className="profile-form-container">
        <div className="profile-form">
          <form onSubmit={submitHandler}>
            <div className="input-group">
              <label htmlFor="">Full Name</label>
              <input
                type="text"
                value={formState.name}
                name="name"
                onChange={updateFormState}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="">Email address</label>
              <input
                type="email"
                name="email"
                value={formState.email}
                onChange={updateFormState}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="">Bio</label>
              <textarea
                value={formState.bio}
                onChange={updateFormState}
                name="bio"
              ></textarea>
            </div>
            <Button
              style={{ width: "100%" }}
              disabled={userState.user.userLoading}
              type="submit"
            >
              {userState.userLoading ? <Spinner /> : "SAVE"}
            </Button>
          </form>
        </div>

        <div className="profile-avatar">
          <span>Avatar</span>
          <div className="avatar-container">
            {userState.user.photo !== "" && (
              <img src={userState.user.photo} alt="" />
            )}
            {userState.user.photo === "" && !avatarUploading && (
              <span>{getInitials(userState.user.name)}</span>
            )}
            {avatarUploading && (
              <div className="avatar-loading">
                <Spinner />
              </div>
            )}
            <label className="change-avatar" htmlFor="changeAvatar">
              Change
            </label>
            <input
              type="file"
              id="changeAvatar"
              onChange={avatarChangeHandler}
              style={{ display: "none" }}
            />
          </div>
        </div>
      </div>
    </ProfileStyled>
  );
}
