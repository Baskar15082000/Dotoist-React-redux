import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Button, Input } from "antd";
import { useNavigate } from "react-router";
import { Header } from "antd/es/layout/layout";
import { getProjectTask, addTask } from "../features/projectTaskSlice";
import { useDispatch, useSelector } from "react-redux";
import { addTaskApi, getProjectTaskApi } from "../api";
import { IoIosCheckmark } from "react-icons/io";

const ProjectView = () => {
  const Navigate = useNavigate();
  const [isclicked, setIsclicked] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const dispatch = useDispatch();
  const { id } = useParams();
  const [onhover, setOnHover] = useState(false);
  const projectTask = useSelector((state) => state.projectTask.data);
  var projectName = useSelector((state) =>
    state.project.data.filter((e) => e.id === id)
  );
  projectName = projectName[0].name;

  useEffect(() => {
    getProjectTaskApi().then((res) => dispatch(getProjectTask({ res, id })));
  }, []);

  function onchange(e) {
    setTaskName(e.target.value);
  }
  function onchangeDescription(e) {
    setTaskDescription(e.target.value);
  }
  function onsubmit() {
    if (taskName !== "") {
      addTaskApi(taskName, taskDescription, id).then((res) =>
        dispatch(addTask(res))
      );
      setTaskName("");
      setTaskDescription("");
    }
  }
  return (
    <div>
      <Header style={{ backgroundColor: "white", cursor: "pointer" }}>
        <div onClick={() => Navigate("/")}>
          My Project <span>/</span>
        </div>
      </Header>
      <div style={{ padding: "1rem 0rem 0rem 10rem" }}>
        <div style={{ fontSize: "1.3rem", paddingBottom: "1rem" }}>
          {projectName}
        </div>
        <div style={{ width: "50rem" }}>
          {projectTask.map((e) => {
            return (
              <div
                key={e.id}
                style={{
                  display: "flex",
                  padding: "1rem",
                  borderBottom: "solid 1px",
                }}
              >
                <div
                  style={{
                    width: "1rem",
                    height: "1rem",
                    marginRight: "1rem",
                    border: "solid 1px",
                    borderRadius: "50%",
                  }}
                  onMouseEnter={() => setOnHover(e.id)}
                  onMouseLeave={() => setOnHover((pre) => !pre)}
                >
                  {onhover === e.id && (
                    <IoIosCheckmark style={{ padding: "0px 0px 0px 0px" }} />
                  )}
                </div>
                <div>
                  <div>{" " + e.content}</div>
                  <div>{e.description}</div>
                </div>
              </div>
            );
          })}

          <div
            style={{ cursor: "pointer", margin: " 1rem 0rem 0rem 0" }}
            onClick={() => setIsclicked(true)}
          >
            <span style={{ color: "red" }}>+</span> <span>Add task</span>
          </div>
          {isclicked && (
            <div>
              <Input
                placeholder="Task Name"
                onChange={onchange}
                value={taskName}
                style={{ border: "none" }}
              />
              <Input
                placeholder="Description"
                onChange={onchangeDescription}
                value={taskDescription}
                style={{ border: "none" }}
              />
              <div>
                <Button onClick={onsubmit}>add</Button>{" "}
                <Button onClick={() => setIsclicked(false)}>cancle</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectView;
