import {TodoistApi} from "@doist/todoist-api-typescript";

// load token from query string
const token = new URLSearchParams(window.location.search).get("token");

if (!token) {
  throw new Error("No token found in query string");
}

export const client = new TodoistApi(token);
