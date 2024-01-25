import { useState } from "react";
import "./App.css";
import { Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import SiderBar from "./Components/SideBar";
import Project from "./Components/Project";
import { useSelector } from "react-redux";
import AddProjectModal from "./Components/AddProjectModal";

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
        <SiderBar onclick={isclicked} />
        <Layout>
          <Header style={{ backgroundColor: "white" }}></Header>
          <Content style={{ backgroundColor: "white" }}>
            {projectClick && <Project project={project} />}
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default App;
