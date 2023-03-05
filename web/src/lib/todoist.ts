import {TodoistApi} from "@doist/todoist-api-typescript";

export const getClient = () => {
    const token = new URLSearchParams(window.location.search).get("token") || localStorage.getItem("token");
    const client = token ? new TodoistApi(token) : null;

    return client;
}
