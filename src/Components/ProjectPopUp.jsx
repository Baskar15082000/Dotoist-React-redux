import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Popover, Button } from "antd";
import EditProjectPopUp from "./EditProjectPopUp";
import { PiDotsThreeOutlineThin } from "react-icons/pi";
import { deleteProjectApi, isFavoriteProjectApi } from "../api";
import { useDispatch, useSelector } from "react-redux";
import { deleteProject, setFavorite } from "../features/projectSlice";
import { MdDeleteForever } from "react-icons/md";
import { GrFavorite } from "react-icons/gr";
import { RiDislikeLine } from "react-icons/ri";
import { useNavigate } from "react-router";
import {
  getFavoriteList,
  addFavoriteList,
  removeFavoriteList,
} from "../features/favoriteListSlice";

const ProjectPopUp = ({
  projectId,
  project,
  projectName,
  isfav,
  setonc,
  setIshover,
}) => {
  const [open, setOpen] = useState(false);
  const [isfv, setIsFv] = useState(isfav);
  const projects = useSelector((state) => state.project.data);
  const Navigate = useNavigate();

  const dispatch = useDispatch();
  function handleDelete(id) {
    deleteProjectApi(id).then((status) => {
      dispatch(deleteProject(id));
      dispatch(removeFavoriteList(project));
    });
  }

  function onFavorite(id) {
    isFavoriteProjectApi(id, "true").then((res) => {
      dispatch(setFavorite(id));
      dispatch(addFavoriteList(res));
    });
  }
  function onFavoriteFalse(id) {
    isFavoriteProjectApi(id, "false").then((res) => {
      dispatch(setFavorite(id));
      dispatch(removeFavoriteList(res));
    });
  }

  const content = (
    <div
      style={{ color: "black", padding: "0px" }}
      onClick={() => setonc(false)}
    >
      <EditProjectPopUp
        hide={() => hide}
        projectId={projectId}
        projectName={projectName}
      />

      <div>
        {isfv ? (
          <Button
            onClick={() => onFavoriteFalse(projectId)}
            style={{
              border: "none",
              display: "flex",
              alignItems: "center",
              width: "100%",
            }}
          >
            <RiDislikeLine style={{ color: "#666", fontSize: "1rem" }} />
            <span style={{ paddingLeft: "1rem" }}>remove from favorites</span>
          </Button>
        ) : (
          <Button
            onClick={() => onFavorite(projectId)}
            style={{
              border: "none",
              display: "flex",
              alignItems: "center",
              width: "100%",
            }}
          >
            <GrFavorite style={{ color: "#666", fontSize: "1rem" }} />

            <span style={{ paddingLeft: "1rem" }}>add to favorites</span>
          </Button>
        )}
      </div>
      <div>
        <Button
          style={{
            border: "none",
            display: "flex",
            alignItems: "center",
            width: "100%",
          }}
          onClick={() => {
            handleDelete(projectId);
            Navigate("/");
          }}
        >
          <MdDeleteForever style={{ color: "red", fontSize: "1rem" }} />
          <span style={{ paddingLeft: "1rem" }}>Delete</span>
        </Button>
      </div>
    </div>
  );

  const popupStyle = {
    border: "none",
  };
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
    if (!newOpen) {
      console.log("jfjsfk");
      setonc(false);
      setIshover(0);
    }
  };

  return (
    <div>
      <Popover
        content={content}
        trigger="click"
        placement="bottomRight"
        onOpenChange={handleOpenChange}
      >
        <div type="text" style={popupStyle}>
          <PiDotsThreeOutlineThin
            className="three_btn"
            style={{
              fontSize: "1.2rem",
            }}
            onClick={() => setonc(true)}
          />
        </div>
      </Popover>
    </div>
  );
};

export default ProjectPopUp;
