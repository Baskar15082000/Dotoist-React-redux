import React from "react";
import { v4 as uuidv4 } from "uuid";
import { PiDotsThreeOutlineThin } from "react-icons/pi";
import { deleteProjectApi, isFavoriteProjectApi } from "../api";
import { useDispatch } from "react-redux";
import { deleteProject } from "../features/projectSlice";
import EditProjectPopUp from "./EditProjectPopUp";
import { getFavoriteList } from "../features/favoriteListSlice";

const FavoritePopUp = () => {
  const [open, setOpen] = useState(false);
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
    console.log(id);
    isFavoriteProjectApi(id, true).then((res) =>
      dispatch(getFavoriteList([res]))
    );
  }
  const content = (
    <div style={{ color: "black", padding: "0px" }}>
      <EditProjectPopUp
        hide={hide}
        projectId={projectId}
        onClick={() => hide()}
        projectName={projectName}
      />
      <p>
        <Button
          style={{ border: "none", padding: "0" }}
          onClick={() => handleDelete(projectId)}
        >
          Delete
        </Button>
      </p>
      <p>
        <Button
          onClick={() => onFavorite(projectId)}
          style={{ border: "none", padding: "0" }}
        >
          add to favorites
        </Button>
      </p>
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
        placement="topRight"
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

export default FavoritePopUp;
