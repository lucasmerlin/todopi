import {useEffect, useMemo} from "react";
import {getClient} from "./lib/todoist";
import {DataProvider} from "@plasmicapp/host";
import {Navigate} from "react-router-dom";
import useSwr from "swr";
import {TodoistApi} from "@doist/todoist-api-typescript";


const getTasks = async (client: TodoistApi | null) => {
    if (!client) return [];

    const tasks = await client.getTasks({
        filter: "today | overdue",
    });
    tasks.sort((a, b) => {
        return new Date(a.due?.date || 0) > new Date(b.due?.date || 0) ? 1 : -1;
    });
    const today = tasks.filter(task => task.due?.date === new Date().toISOString().split("T")[0]);
    const due = tasks.filter(task => task.due?.date !== new Date().toISOString().split("T")[0]);
    return [...today, ...due];
}

export const TodoListProvider = ({children}: { children: React.ReactNode }) => {

    const client = useMemo(() => getClient(), []);

    const {data} = useSwr("tasks", () => getTasks(client), {
        refreshInterval: 30000,
    });

    useEffect(() => {
        (window as any)["version"] = ((window as any)["version"] || 0) + 1;
    }, [data]);

    if (!client) return <Navigate to={"/token-form"}/>;

    return <DataProvider name={"todos"} data={data}>{children}</DataProvider>;
}
