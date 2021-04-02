import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Modal from "./Modal";
import Input from "../styles/Input";
import Button from "../styles/Button";
import { useOvermind } from "../store";
import Spinner from "../components/Spinner";
import Select from "./Select";
import VisibilitySelect from "./VisibilitySelect";

import UnsplashSearch from "./UnsplashSearch";

const NewBoardModalStyled = styled.div`
  width: 310px;
  height: 290px;
  padding: 24px;
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

  .cover-container {
    width: 100%;
    height: 78px;
    border-radius: 8px;
    background: var(--grey);
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .row {
    display: flex;
    align-items: center;
    height: 50px;
    margin: 10px 0px;
  }

  .position-end {
    justify-content: flex-end;
  }

  .space {
    justify-content: space-between;
  }
`;

const SelectStyled = styled.div`
  text-transform: capitalize;
  width: 120px;
  height: 32px;
  border-radius: 8px;
  background: var(--bgGrey);
  color: var(--textGrey);
  display: flex;
  align-items: center;
  padding-left: 20px;
  cursor: pointer;
  .material-icons {
    font-size: 1.2rem;
    margin-right: 10px;
  }

  &:hover {
    filter: brightness(90%);
  }
`;

export default function NewBoardModal({ show, closeModal }) {
  const [boardName, setBoardName] = useState("");
  const [coverPhoto, setCoverPhoto] = useState("");
  const [coverPhotoLoading, setCoverPhotoLoading] = useState(false);
  const [visibility, setVisibility] = useState("public");

  const {
    actions: { boards: boardActions },
    state: { boards: boardsState },
  } = useOvermind();

  useEffect(() => {
    setBoardName("");
    setVisibility("public");
  }, [show]);

  useEffect(() => {
    async function getRandomPhoto() {
      setCoverPhotoLoading(true);
      try {
        const res = await fetch(`https://source.unsplash.com/1600x900/?office`);
        if (res.ok) {
          const randomPhoto = res.url;
          setCoverPhoto(randomPhoto);
        }
        setCoverPhotoLoading(false);
      } catch (err) {
        setCoverPhotoLoading(false);
      }
    }
    if (show) getRandomPhoto();
  }, [show]);

  const { boardsLoading, boardsError } = boardsState;

  function submitHandler(e) {
    e.preventDefault();
    boardActions.addBoard({
      form: {
        name: boardName,
        coverPhoto,
        visibility,
      },
      cb: closeModal,
    });
  }

  function visibilityChangeHandler(val) {
    setVisibility(val);
  }

  function selectPhotoHandler(photo) {
    setCoverPhoto(photo);
  }

  return (
    <Modal show={show} onClose={closeModal}>
      <NewBoardModalStyled>
        <form onSubmit={submitHandler}>
          <div className="close-btn" onClick={closeModal}>
            <span className="material-icons">close</span>
          </div>
          <div className="cover-container">
            {coverPhotoLoading ? <Spinner /> : <img src={coverPhoto} alt="" />}
          </div>
          <div className="row">
            <Input
              style={{ width: "100%" }}
              placeholder="Add board title"
              required={true}
              name="name"
              value={boardName}
              autocomplete="off"
              onChange={(e) => setBoardName(e.target.value.toLowerCase())}
            />
          </div>
          <div className="row space">
            <UnsplashSearch selectPhoto={selectPhotoHandler} />
            <VisibilitySelect
              visibility={visibility}
              changeVisibility={setVisibility}
            />
            {/* <Select
              value={visibility}
              onChange={visibilityChangeHandler}
              options={[
                {
                  title: "Private",
                  icon: <span className="material-icons">lock</span>,
                  value: "private",
                },
                {
                  title: "Public",
                  icon: <span className="material-icons">lock_open</span>,
                  value: "public",
                },
              ]}
            /> */}
          </div>
          <div className="row position-end">
            <Button
              bg="var(--bgWhite)"
              color="var(--textGrey)"
              style={{ marginRight: "10px" }}
              onClick={closeModal}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={boardsLoading}>
              {boardsLoading ? <Spinner /> : "+ Create"}
            </Button>
          </div>
        </form>
      </NewBoardModalStyled>
    </Modal>
  );
}
