import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";
import Button from "../styles/Button";
import Spinner from "./Spinner";
import { api } from "../utils/api";
import { validateEmail } from "../utils";
import { useOvermind } from "../store";

const SelectStyled = styled.div`
  position: relative;
  z-index: 10;
  .btn {
    width: 32px;
    height: 32px;
    border-radius: 4px;
    color: var(--white);
    background: var(--blue);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:hover {
      filter: brightness(90%);
    }
  }

  .options {
    width: 245px;
    min-height: 50px;
    max-height: 220px;
    padding: 10px;
    background: var(--bgWhite);
    border: var(--border-light);
    border-radius: 12px;
    position: absolute;
    top: 40px;
    left: 0px;
    overflow: hidden;
    overflow-y: auto;
    box-shadow: var(--bs2);
    z-index: 20;
    h4 {
      color: var(--textDark);
      font-size: 0.8rem;
    }
    p {
      color: var(--textGrey);
      font-size: 0.8rem;
    }

    .search-input {
      width: 100%;
      height: 32px;
      border-radius: 8px;
      box-shadow: var(--bs1);
      margin: 12px 0px 20px;
      position: relative;
      input {
        width: 100%;
        height: 100%;
        border-radius: inherit;
        font-size: 0.8rem;
        color: var(--textDark);
        padding-left: 15px;
        border: var(--border-light);
        outline: none;
        &:focus {
          border: 1px solid var(--blue);
        }
      }

      .searchBtn {
        border: none;
        width: 28px;
        height: 28px;
        border-radius: 8px;
        background: var(--blue);
        color: var(--white);
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 2px;
        right: 2px;
        .material-icons {
          font-size: 1rem;
        }
      }
    }

    .results {
      margin-top: 15px;
      width: 100%;
      min-height: 40px;
      max-height: 200px;
      overflow: auto;
      p {
        color: var(--textGrey);
        font-size: 0.8rem;
        text-align: center;
      }
      .result-user {
        width: 100%;
        height: 40px;
        background: var(--bgGrey);
        color: var(--textDark);
        font-size: 0.9rem;
        display: flex;
        align-items: center;
        padding-left: 10px;
        border-radius: 8px;
        cursor: pointer;
        &:hover {
          filter: brightness(90%);
        }
      }
    }
  }
`;

export default function InviteMemberDropdown() {
  const {
    actions: { boards: boardsActions },
  } = useOvermind();

  const [showOptions, setShowOptions] = useState(false);
  const [query, setQuery] = useState("");
  const [resultUser, setResultUser] = useState(null);
  const [noUserFound, setNoUserFound] = useState(false);
  const [loading, setLoading] = useState(false);

  const ref = useRef(null);

  useEffect(() => {
    if (!showOptions) {
      setQuery("");
      setResultUser(null);
      setNoUserFound(false);
      setLoading(false);
    }
  }, [showOptions]);

  useOutsideClick(ref, closeDropdown);

  function closeDropdown() {
    setShowOptions(false);
  }

  async function submitQuery() {
    if (query === "") {
      return;
    }
    if (!validateEmail(query)) {
      window.alert("Please provide a valid email address");
    }
    setLoading(true);
    try {
      const res = await api.get(`/users?email=${query}`);
      if (res.data.success) {
        if (res.data.data.length > 0) {
          setLoading(false);
          setNoUserFound(false);
          setResultUser(res.data.data[0]);
        } else {
          setLoading(false);
          setNoUserFound(true);
          setResultUser(null);
        }
      } else {
        setLoading(false);
        setNoUserFound(true);
        setResultUser(null);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      setResultUser(null);
      setNoUserFound(false);
    }
  }

  function preventReturn(e) {
    if (e.which === 13 /* Enter */) {
      submitQuery();
      e.preventDefault();
    }
  }

  function addMember() {
    setLoading(true);
    boardsActions.addMemberToBoard({
      newMember: resultUser,
      cb: (code) => {
        setLoading(false);
        if (code) {
          if (code === 1) {
            alert("User already member of board");
          }
          if (code === 2) {
            alert("Network error");
          }
          return;
        }

        setShowOptions(false);
      },
    });
  }

  return (
    <SelectStyled ref={ref}>
      <div className="btn" onClick={() => setShowOptions(true)}>
        +
      </div>
      {showOptions && (
        <div className="options">
          <h4>Invite to board</h4>
          <p>Search users by email address</p>
          <div className="search-input">
            <input
              type="email"
              placeholder="Email address..."
              value={query}
              onChange={(e) => setQuery(e.target.value.toLowerCase())}
              onKeyPress={preventReturn}
            />
            <div className="searchBtn" onClick={submitQuery}>
              <span className="material-icons">search</span>
            </div>
          </div>

          <div className="results">
            {loading && (
              <p style={{ textAlign: "center" }}>
                <Spinner />
              </p>
            )}
            {!loading && noUserFound && (
              <p>Looks like that person isn't a Thullo user yet.</p>
            )}
            {!loading && resultUser && (
              <div className="result-user">{resultUser.name}</div>
            )}
          </div>
          <Button
            disabled={!resultUser || loading}
            style={{ margin: "20px auto 0px" }}
            onClick={addMember}
          >
            {loading ? <Spinner /> : "Invite"}
          </Button>
        </div>
      )}
    </SelectStyled>
  );
}
