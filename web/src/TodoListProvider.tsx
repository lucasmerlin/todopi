import {useEffect, useState} from "react";
import {TodoistEntity} from "@doist/todoist-api-typescript";
import {client} from "./lib/todoist";
import {DataProvider} from "@plasmicapp/host";
import useSwr from "swr";


const getTasks = async () => {
    const tasks = await client.getTasks({
        filter: "today | overdue",
    });
    return tasks.sort((a, b) => {
        return new Date(a.due?.date || 0) > new Date(b.due?.date || 0) ? 1 : -1;
    });
}

export const TodoListProvider = ({children}: {children: React.ReactNode}) => {
    const {data} = useSwr("tasks", getTasks, {
        refreshInterval: 30000,
    });

    useEffect(() => {
        (window as any)["version"] = ((window as any)["version"] || 0) + 1;
    }, [data]);

    return <DataProvider name={"todos"} data={data}>{children}</DataProvider>;
}
