import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Button, Input } from "antd";
import { useNavigate } from "react-router";
import { Header } from "antd/es/layout/layout";
import {
  getProjectTask,
  addTask,
  editTask,
  completeTask,
} from "../features/projectTaskSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  addTaskApi,
  completeTaskApi,
  editTaskApi,
  getProjectName,
  getProjectTaskApi,
} from "../api";
import { IoIosCheckmark } from "react-icons/io";
import { Breadcrumb } from "antd";
import TaskPopUp from "./TaskPopUp";
import MoveProject from "./MoveProject";

const ProjectView = () => {
  const Navigate = useNavigate();
  const [isclicked, setIsclicked] = useState(false);
  const [isclickedEdit, setIsclickedEdit] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const dispatch = useDispatch();
  const { id } = useParams();
  const [onhover, setOnHover] = useState(false);
  const projectTask = useSelector((state) => state.projectTask.data);
  const [isHoverPOpUp, setIsHoverPOpup] = useState(false);
  const [projectName, setProjectName] = useState("");

  useEffect(() => {
    getProjectName(id)
      .then((res) => {
        setProjectName(res.name);
      })
      .then(() => {
        getProjectTaskApi().then((res) =>
          dispatch(getProjectTask({ res, id }))
        );
      });
  }, [id]);

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
  function onsubmitEdit(taskId) {
    if (taskName !== "") {
      editTaskApi(taskId, id, taskName, taskDescription).then((res) => {
        dispatch(editTask(res));
        setTaskName("");
        setTaskDescription("");
        setIsclickedEdit(false);
      });
    }
  }

  function onEditTask(id, name, description) {
    setIsclickedEdit(id);
    setTaskName(name);
    setTaskDescription(description);
  }
  function completeTaskFunction(taskid) {
    completeTaskApi(taskid).then((res) => dispatch(completeTask(taskid)));
  }
  return (
    <div>
      <Header
        style={{
          backgroundColor: "white",
          color: "#666",
          cursor: "pointer",
          padding: "2rem",
        }}
      >
        <Breadcrumb>
          <Breadcrumb.Item onClick={() => Navigate("/")}>
            My projects /
          </Breadcrumb.Item>
        </Breadcrumb>
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
                  padding: ".5rem 0 .5rem 0 ",
                  marginBottom: "1rem",
                  borderBottom: "solid 1px",
                }}
                onMouseOver={() => setIsHoverPOpup(e.id)}
                onMouseLeave={() => setIsHoverPOpup(!e.id)}
              >
                {!isclickedEdit && (
                  <div
                    style={{
                      width: "1rem",
                      height: "1rem",
                      marginRight: "1rem",
                      border: "solid 1px",
                      borderRadius: "50%",
                    }}
                    onClick={() => completeTaskFunction(e.id)}
                    onMouseEnter={() => setOnHover(e.id)}
                    onMouseLeave={() => setOnHover((pre) => !pre)}
                  >
                    {onhover === e.id && <IoIosCheckmark />}
                  </div>
                )}
                <div>
                  <div
                    style={{
                      display: "flex",
                      width: "48rem",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      {isclickedEdit === e.id ? (
                        <div
                          style={{
                            border: "solid 1px",
                            width: "50rem",
                            borderRadius: "5px",
                            padding: "1rem",
                          }}
                        >
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
                            <Button onClick={() => onsubmitEdit(e.id)}>
                              save
                            </Button>{" "}
                            <Button
                              onClick={() => {
                                setIsclickedEdit(false);
                                setTaskName("");
                                setTaskDescription("");
                              }}
                            >
                              cancel
                            </Button>
                            <MoveProject projectName={projectName} />
                          </div>
                        </div>
                      ) : (
                        e.content
                      )}
                    </div>
                    {isHoverPOpUp === e.id && (
                      <TaskPopUp
                        onEditTask={onEditTask}
                        id={e.id}
                        name={e.content}
                        description={e.description}
                      />
                    )}
                  </div>
                  <div>{!isclickedEdit && e.description}</div>
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
