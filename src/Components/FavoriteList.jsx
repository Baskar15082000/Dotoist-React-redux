import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { MdKeyboardArrowRight } from "react-icons/md";

import { useSelector } from "react-redux";

const FavoriteList = () => {
  const [ishover, setIshover] = useState(0);
  const [isclicked, setIsClicked] = useState(false);
  const favoriteList = useSelector((state) => state.favorite.data);
  const dropDownStyle = {
    display: "flex",
    justifyContent: "space-between",
    padding: ".5rem .5rem .5rem .5rem",
    cursor: "pointer",
    backgroundColor: "#dc4c3e",
  };
  const projectList = {
    display: " flex",
    justifyContent: "space-between",
    alignItems: "center",

    cursor: "pointer",
    padding: "1rem",
  };
  console.log(favoriteList);
  return (
    <div>
      <div style={dropDownStyle}>
        <div>Favorites</div>
        <div onClick={() => setIsClicked((pre) => !pre)}>
          {isclicked ? <IoIosArrowDown /> : <MdKeyboardArrowRight />}
        </div>
      </div>
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
            
            key={e.id} style={projectList}>
              {"# "}
              {e.name}
            </div>
          );
        })}
    </div>
  );
};

export default FavoriteList;
