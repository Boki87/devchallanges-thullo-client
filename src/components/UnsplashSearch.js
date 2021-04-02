import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { SelectButton } from "../styles/SelectButton";
import Spinner from "./Spinner";

const SelectStyled = styled.div`
  position: relative;

  .options {
    width: 245px;
    height: 300px;
    padding: 8px;
    background: var(--bgWhite);
    border: var(--border-light);
    border-radius: 12px;
    position: absolute;
    top: 40px;
    left: 0px;
    overflow: hidden;
    overflow-y: auto;
    z-index: 1;
    h4 {
      color: var(--textDark);
      font-size: 0.8rem;
    }
    p {
      color: var(--textGrey);
      font-size: 0.8rem;
    }

    .results-container {
      width: 100%;
      min-height: 100px;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      grid-gap: 8px;
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
  }
`;

const ImageThumbStyled = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 4px;
  overflow: hidden;
  background: var(--bgGrey);
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

function ImageThumb({ img, selectPhoto }) {
  const { thumb, regular } = img;

  return (
    <ImageThumbStyled onClick={() => selectPhoto(regular)}>
      <img src={thumb} alt="" />
    </ImageThumbStyled>
  );
}

export default function UnsplashSearch({ selectPhoto }) {
  const [resultPhotos, setResultPhotos] = useState([]);
  const [resultsLoading, setResultsLoading] = useState(false);

  const [showOptions, setShowOptions] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef(null);

  useOutsideClick(ref, closeDropdown);

  useEffect(() => {
    function listenForEscKey(event) {
      if (event.key === "Escape") {
        closeDropdown();
      }
    }

    window.addEventListener("keyup", listenForEscKey);

    return () => window.removeEventListener("keyup", listenForEscKey);
  }, []);

  useEffect(() => {
    setQuery("");
    unsplashSearch("office");
  }, [showOptions]);

  function closeDropdown() {
    setShowOptions(false);
  }

  function queryChangeHandler(e) {
    setQuery(e.target.value.toLowerCase());
  }

  async function submitQuery() {
    if (query === "") {
      return;
    }

    unsplashSearch(query);
  }

  async function unsplashSearch(q) {
    setResultsLoading(true);
    const endpoint = `https://api.unsplash.com/search/photos?page=1&per_page=12&query=${q}&client_id=n18gqcBvjkh30NIhgxLxwc_omz8C6EN56SUXaw9FOCs`;
    const response = await fetch(endpoint);

    if (!response.ok) {
      throw Error(response.statusText);
      setResultsLoading(false);
    }
    const json = await response.json();
    setResultsLoading(false);
    setResultPhotos(json.results);
  }

  function selectPhotoHandler(photo) {
    selectPhoto(photo);
    closeDropdown();
  }

  function preventReturn(e) {
    if (e.which === 13 /* Enter */) {
      submitQuery();
      e.preventDefault();
    }
  }
  return (
    <SelectStyled ref={ref}>
      <SelectButton onClick={() => setShowOptions(true)}>
        <div className="icon">
          <span className="material-icons">collections</span>
        </div>
        <span>Cover</span>
      </SelectButton>
      {showOptions && (
        <div className="options">
          <h4>Photo Search</h4>
          <p>Search Unsplash for photos</p>

          <div className="search-input">
            <input
              type="search"
              placeholder="Keywords..."
              value={query}
              onChange={queryChangeHandler}
              onKeyPress={preventReturn}
            />
            <div className="searchBtn" onClick={submitQuery}>
              <span className="material-icons">search</span>
            </div>
          </div>

          {!resultsLoading && resultPhotos.length === 0 && (
            <p>No results for given keyword</p>
          )}
          <div style={{ textAlign: "center" }}>
            {resultsLoading && <Spinner />}
          </div>
          <div className="results-container">
            {!resultsLoading &&
              resultPhotos.map((photo) => (
                <ImageThumb
                  img={photo.urls}
                  key={photo.urls.thumb}
                  selectPhoto={selectPhotoHandler}
                />
              ))}
          </div>
        </div>
      )}
    </SelectStyled>
  );
}
