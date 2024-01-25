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
export async function deleteProjectApi(id){
  const res = await axios
    .delete("https://api.todoist.com/rest/v2/projects/"+id, {
      headers: "Authorization: Bearer 8a59fd10edc3e15c09e8d0f90cf4bf77f1d129e5",
    })
    .then((res) => res.status)
    .catch((err) => console.log(err));
  return res;
};