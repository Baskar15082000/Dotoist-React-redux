import { useState } from "react";
import "./App.css";
import { Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import SiderBar from "./Components/SideBar";
import Project from "./Components/Project";
import { useSelector } from "react-redux";
import { Routes, Route, NavLink } from "react-router-dom";
import ProjectView from "./Components/ProjectView";

function App() {
  const project = useSelector((state) => state.project.data);
  const [projectClick, setProjectClick] = useState(true);
  function isclicked() {
    setProjectClick((pre) => !pre);
    console.log(projectClick);
  }

  return (
    <>
      <Layout style={{ height: "100vh" }}>
        <NavLink style={{ color: "black" }}>
          <SiderBar />
        </NavLink>
        <Layout>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Content style={{ backgroundColor: "white" }}>
                    {projectClick && <Project project={project} />}
                  </Content>
                </>
              }
            />
            <Route
              path="/project/:id"
              element={
                <Content style={{ backgroundColor: "white" }}>
                  <ProjectView />
                </Content>
              }
            />
          </Routes>
        </Layout>
      </Layout>
    </>
  );
}

export default App;
