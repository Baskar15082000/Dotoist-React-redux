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

import {
  getFavoriteList,
  addFavoriteList,
  removeFavoriteList,
} from "../features/favoriteListSlice";

const ProjectPopUp = ({ projectId, projectName, isfav }) => {
  const [open, setOpen] = useState(false);
  const [isfv, setIsFv] = useState(isfav);
  const projects = useSelector((state) => state.project.data);

  const dispatch = useDispatch();
  function handleDelete(id) {
    deleteProjectApi(id).then((status) => {
      dispatch(deleteProject(id));
    });
  }
  const hide = () => {
    setOpen(false);
  };
  function onFavorite(id) {
    isFavoriteProjectApi(id, "true").then((res) => {
      hide();
      dispatch(setFavorite(id));
      dispatch(addFavoriteList(res));
    });
  }
  function onFavoriteFalse(id) {
    isFavoriteProjectApi(id, "false").then((res) => {
      hide();
      dispatch(setFavorite(id));
      dispatch(removeFavoriteList(res));
    });
  }

  const content = (
    <div style={{ color: "black", padding: "0px" }}>
      <EditProjectPopUp
        hide={hide}
        projectId={projectId}
        onClick={() => hide()}
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
          onClick={() => handleDelete(projectId)}
        >
          <MdDeleteForever style={{ color: "red", fontSize: "1rem" }} />
          <span style={{ paddingLeft: "1rem" }}>Delete</span>
        </Button>
      </div>
    </div>
  );

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };
  const popupStyle = {
    border: "none",
  };
  return (
    <div>
      <Popover
        content={content}
        trigger="click"
        open={open}
        onOpenChange={handleOpenChange}
        placement="bottomRight"
      >
        <div type="text" style={popupStyle}>
          <PiDotsThreeOutlineThin
            className="three_btn"
            style={{ fontSize: "1.2rem", hover: "none" }}
          />
        </div>
      </Popover>
    </div>
  );
};

export default ProjectPopUp;
