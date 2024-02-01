import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router";

import { useSelector } from "react-redux";
import ProjectPopUp from "./ProjectPopUp";

const FavoriteList = () => {
  const Navigate = useNavigate();
  const [ishover, setIshover] = useState(0);
  const [isclicked, setIsClicked] = useState(false);
  const favoriteList = useSelector((state) => state.favorite.data);
  const dropDownStyle = {
    display: "flex",
    justifyContent: "space-between",
    padding: ".5rem .5rem .5rem .5rem",
    cursor: "pointer",
    backgroundColor: "#ffaaa1",
  };
  const projectList = {
    display: " flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
    paddingRight: "1rem",
  };

  return (
    <div>
      <div style={dropDownStyle}>
        <div>Favorites</div>
        <div onClick={() => setIsClicked((pre) => !pre)}>
          {isclicked ? <IoIosArrowDown /> : <MdKeyboardArrowRight />}
        </div>
      </div>
      <div style={{ padding: ".5rem" }}>
        {isclicked &&
          favoriteList.map((e) => {
            return (
              <div
                onMouseOver={() => {
                  setIshover(e.id);
                }}
                onMouseLeave={() => {
                  setIshover(!e.id);
                }}
                key={e.id}
                style={{
                  ...projectList,
                  backgroundColor: ishover === e.id ? "#f6efee" : "transparent",
                }}
              >
                <div
                  style={{ padding: ".5rem 40% .5rem .5rem" }}
                  onClick={() => Navigate("/project/" + e.id)}
                >
                  {"# "}
                  {e.name}
                </div>
                <div>
                  {ishover === e.id && (
                    <ProjectPopUp
                      projectId={e.id}
                      projectName={e.name}
                      isfav={e.is_favorite}
                    />
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default FavoriteList;
