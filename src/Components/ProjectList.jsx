import React, { useState } from "react";
import ProjectPopUp from "./ProjectPopUp";
import { useNavigate } from "react-router";

const ProjectList = ({ project, isside }) => {
  const [ishover, setIshover] = useState(0);
  const Navigate = useNavigate();
  const [onc, setonc] = useState(false);

  var projectList = {};
  if (!isside) {
    projectList = {
      display: " flex",
      width: "50rem",

      alignItems: "center",
      paddingRight: "20px",

      cursor: "pointer",
    };
  } else {
    projectList = {
      display: " flex",
      justifyContent: "space-between",
      alignItems: "center",
      paddingRight: "20px",
      cursor: "pointer",
    };
  }
  const st1 = {
    display: "flex",
    flex: "1",
    padding: ".5rem",
  };

  return (
    <div>
      <div>
        {project.map((e) => {
          return (
            <div
              style={{
                ...projectList,
                backgroundColor: ishover === e.id ? "#faf8f7" : "transparent",
                margin: ".5rem",
                borderRadius: "5px",
              }}
              key={e.id}
              onMouseOver={() => {
                setIshover(e.id);
              }}
              onMouseLeave={() => {
                if (onc) {
                  setIshover(e.id);
                } else {
                  setIshover(!e.id);
                }
              }}
            >
              <div onClick={() => Navigate("/project/" + e.id)} style={st1}>
                {"# " + e.name}
              </div>
              <div>
                {ishover === e.id && (
                  <ProjectPopUp
                    setonc={setonc}
                    projectId={e.id}
                    projectName={e.name}
                    isfav={e.is_favorite}
                    setIshover={setIshover}
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

export default ProjectList;
