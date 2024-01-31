import React, { useEffect, useState } from "react";
import Sider from "antd/es/layout/Sider";
import { v4 as uuidv4 } from "uuid";
import { IoIosArrowDown } from "react-icons/io";
import { MdKeyboardArrowRight } from "react-icons/md";
import { fetchProjects } from "../api";
import { getProjects } from "../features/projectSlice";
import { getFavoriteList } from "../features/favoriteListSlice";

import { useSelector, useDispatch } from "react-redux";
import ProjectList from "./ProjectList";
import AddProjectModal from "./AddProjectModal";
import FavoriteList from "./FavoriteList";

const SideBar = () => {
  const projects = useSelector((state) => state.project.data);
  const [isOver, setIsover] = useState(false);
  const [isclicked, setIsClicked] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    fetchProjects().then((res) => {
      dispatch(getProjects(res));
      dispatch(getFavoriteList(res));
    });
  }, []);

  function getchild() {}
  const dropDownStyle = {
    display: "flex",
    justifyContent: "space-between",
    padding: ".5rem .5rem .5rem .5rem",
    cursor: "pointer",
    backgroundColor: "#ffaaa1",
    margin: "1rem 0 1rem 0",
  };
  const dropDownListStyle = {
    textAlign: "center",
    padding: "1rem 50% 0 0",
  };
  return (
    <Sider style={{ backgroundColor: "#faf8f7" }}>
      <div style={{ margin: "1rem 0rem 2rem .5rem", fontSize: "1rem" }}>
        Baskar
      </div>
      <FavoriteList />
      <div
        style={dropDownStyle}
        onMouseOver={() => setIsover(true)}
        onMouseLeave={() => setIsover(false)}
      >
        <div>My Projects </div>
        {isOver && (
          <div style={{ paddingLeft: "2rem" }}>
            <AddProjectModal isside={true} />
          </div>
        )}
        <div onClick={() => setIsClicked((pre) => !pre)}>
          {isclicked ? <IoIosArrowDown /> : <MdKeyboardArrowRight />}
        </div>
      </div>
      {isclicked && (
        <div>
          <ProjectList project={projects} isside={true} />
        </div>
      )}
    </Sider>
  );
};

export default SideBar;
