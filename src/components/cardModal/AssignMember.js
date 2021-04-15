import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Member from "../Member";
import Button from "../../styles/Button";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { useOvermind } from "../../store";

const AssignMemberStyled = styled.div`
  position: relative;
  z-index: 10;
  margin-top: 20px;

  .invited-member {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 35px;
    margin: 5px 0px;
    .material-icons {
      display: none;
      cursor: pointer;
      color: var(--blue);
    }

    &:hover {
      .material-icons {
        display: block;
      }
    }
  }

  .members-header {
    display: flex;
    gap: 10px;
    align-items: center;
    color: var(--textGrey);
    font-size: 0.8rem;
  }

  .no-members {
    font-size: 0.8rem;
    color: var(--textGrey);
    margin: 10px 0px;
  }

  .add-member-btn {
    width: 100%;
    height: 32px;
    border-radius: 8px;
    padding: 0px 12px;
    background: var(--lightBlue);
    color: var(--blue);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.7rem;
    .material-icons {
      font-size: 1rem;
    }
    &:hover {
      filter: brightness(90%);
    }
  }

  .options {
    width: 245px;
    height: 280px;
    padding: 10px;
    background: var(--bgWhite);
    border: var(--border-light);
    border-radius: 12px;
    position: absolute;
    bottom: -285px;
    left: 0px;
    overflow: hidden;
    overflow-y: auto;
    box-shadow: var(--bs2);
    z-index: 20;
    display: flex;
    flex-direction: column;
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
      border: var(--border-light);
      border-radius: 8px;
      padding: 0px 10px;
      /* margin-top: 15px; */
      width: 100%;
      /* min-height: 40px;
      max-height: 100px; */
      flex: 1;
      overflow: auto;
    }
  }
`;

const MemberToAssignStyled = styled.div`
  width: 100%;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .btn {
    width: 32px;
    height: 32px;
    background: var(--blue);
    color: var(--white);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    .material-icons {
      font-size: 1.2rem;
    }
  }
`;

function MemberToAssign({ member, addMember }) {
  return (
    <MemberToAssignStyled>
      <Member member={member} />
      <div className="btn" onClick={() => addMember(member)}>
        <span className="material-icons">person_add</span>
      </div>
    </MemberToAssignStyled>
  );
}

export default function AssignMember({ members, addMember, removeMember }) {
  const {
    state: { boards: boardsState, user: userState },
  } = useOvermind();

  const [showOptions, setShowOptions] = useState(false);

  const [filteredMembers, setFilteredMembers] = useState([]);

  const [filterString, setFilterString] = useState("");

  useEffect(() => {
    let membersIds = members.map((m) => m._id);

    let allMembers = [userState.user, ...boardsState.activeBoard.members];

    let boardMembers = allMembers.filter((m) => {
      if (!membersIds.includes(m._id)) {
        return m;
      }
    });

    if (filterString !== "") {
      setFilteredMembers(
        boardMembers.filter((m) =>
          m.name.toLowerCase().includes(filterString.trim().toLowerCase())
        )
      );
    } else {
      setFilteredMembers(boardMembers);
    }
  }, [members, filterString]);

  const ref = useRef(null);

  useOutsideClick(ref, closeDropdown);

  function closeDropdown() {
    setShowOptions(false);
  }

  function preventReturn(e) {
    if (e.which === 13 /* Enter */) {
      e.preventDefault();
    }
  }

  function removeMemberHandler(id) {
    removeMember(id);
  }

  return (
    <AssignMemberStyled ref={ref}>
      <div className="members-header">
        <span className="material-icons">people</span>
        Members
      </div>
      <div className="members-container">
        {members.length === 0 && (
          <span className="no-members">No members yet...</span>
        )}
        {members.map((member) => (
          <div className="invited-member" key={member._id}>
            <Member member={member} key={member._id} />

            <span
              className="material-icons"
              onClick={() => removeMemberHandler(member._id)}
            >
              remove_circle
            </span>
          </div>
        ))}
      </div>

      <div className="add-member-btn" onClick={() => setShowOptions(true)}>
        <span>Assign a member</span>
        <span className="material-icons">add</span>
      </div>

      {showOptions && (
        <div className="options">
          <h4>Members</h4>
          <p>Assign members to this card</p>
          <div className="search-input">
            <input
              type="text"
              placeholder="User..."
              onChange={(e) => setFilterString(e.target.value)}
              onKeyPress={preventReturn}
            />
            <div className="searchBtn">
              <span className="material-icons">search</span>
            </div>
          </div>

          <div className="results">
            {filteredMembers.map((m) => (
              <MemberToAssign member={m} addMember={addMember} key={m._id} />
            ))}
          </div>
        </div>
      )}
    </AssignMemberStyled>
  );
}
