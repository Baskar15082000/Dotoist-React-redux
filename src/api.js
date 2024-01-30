import axios from "axios";
import { v4 as uuidv4 } from "uuid";
export async function fetchProjects() {
  const res = await axios
    .get(" https://api.todoist.com/rest/v2/projects ", {
      headers: "Authorization: Bearer 8a59fd10edc3e15c09e8d0f90cf4bf77f1d129e5",
    })
    .then((result) => result.data)
    .catch((err) => {
      console.log(err);
    });
  // console.log(res);
  return res;
}

export async function addProject(name) {
  const res = await axios
    .post(
      "https://api.todoist.com/rest/v2/projects",
      {
        name: name,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Request-Id": uuidv4(),
          Authorization: "Bearer 8a59fd10edc3e15c09e8d0f90cf4bf77f1d129e5",
        },
      }
    )
    .then((res) => res.data)
    .catch((err) => console.log(err));

  return res;
}
export async function deleteProjectApi(id) {
  const res = await axios
    .delete("https://api.todoist.com/rest/v2/projects/" + id, {
      headers: "Authorization: Bearer 8a59fd10edc3e15c09e8d0f90cf4bf77f1d129e5",
    })
    .then((res) => res.status)
    .catch((err) => console.log(err));
  return res;
}

export async function editProjectApi(id, name) {
  console.log(id, name);
  const res = await axios
    .post(
      "https://api.todoist.com/rest/v2/projects/" + id,
      {
        name: name,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Request-Id": uuidv4(),
          Authorization: " Bearer 8a59fd10edc3e15c09e8d0f90cf4bf77f1d129e5",
        },
      }
    )
    .then((res) => res.data)
    .catch((err) => console.log(err));
  return res;
}
export async function isFavoriteProjectApi(id, state) {
  console.log(id, state);
  const res = await axios
    .post(
      "https://api.todoist.com/rest/v2/projects/" + id,
      {
        is_favorite: state,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Request-Id": uuidv4(),
          Authorization: " Bearer 8a59fd10edc3e15c09e8d0f90cf4bf77f1d129e5",
        },
      }
    )
    .then((res) => res.data)
    .catch((err) => console.log(err));
  return res;
}
export async function getProjectTaskApi() {
  const res = await axios
    .get(" https://api.todoist.com/rest/v2/tasks/", {
      headers: {
        Authorization: " Bearer 8a59fd10edc3e15c09e8d0f90cf4bf77f1d129e5",
      },
    })
    .then((res) => res.data)
    .catch((error) => console.log(error));
  return res;
}

export async function addTaskApi(name, description, id) {
  const res = await axios
    .post(
      "https://api.todoist.com/rest/v2/tasks",
      { content: name, project_id: id, description: description },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Request-Id": uuidv4(),
          Authorization: " Bearer 8a59fd10edc3e15c09e8d0f90cf4bf77f1d129e5",
        },
      }
    )
    .then((res) => res.data)
    .catch((error) => console.log(error));
  return res;
}

export async function deleteTaskApi(id) {
  const res = await axios
    .delete("https://api.todoist.com/rest/v2/tasks/" + id, {
      headers: {
        Authorization: " Bearer 8a59fd10edc3e15c09e8d0f90cf4bf77f1d129e5",
      },
    })
    .then()
    .catch((error) => console.log(error));
}

export async function editTaskApi(taskId, projectId, name, description) {
  //console.log(taskId, projectId, name, description);
  const res = await axios
    .post(
      "https://api.todoist.com/rest/v2/tasks/" + taskId,
      { content: name, project_id: projectId, description: description },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Request-Id": uuidv4(),
          Authorization: " Bearer 8a59fd10edc3e15c09e8d0f90cf4bf77f1d129e5",
        },
      }
    )
    .then((res) => res.data)
    .catch((error) => console.log(error));
  return res;
}

export async function getProjectName(id) {
  const res = await axios
    .get("https://api.todoist.com/rest/v2/projects/" + id, {
      headers: {
        Authorization: " Bearer 8a59fd10edc3e15c09e8d0f90cf4bf77f1d129e5",
      },
    })
    .then((res) => res.data)
    .catch((error) => console.log(error));
  return res;
}

export async function completeTaskApi(id) {
  console.log(id);
  const res = await axios
    .post(
      "https://api.todoist.com/rest/v2/tasks/" + id + "/close",
      {},

      {
        headers: {
          Authorization: "  Bearer 8a59fd10edc3e15c09e8d0f90cf4bf77f1d129e5",
        },
      }
    )
    .then((res) => console.log(res.data))
    .catch((error) => console.log(error));
  return res;
}
