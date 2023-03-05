import Homepage from './components/Homepage';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {PlasmicCanvasHost} from "@plasmicapp/host";
import {TodoListProvider} from "./TodoListProvider";
import TokenForm from "./components/TokenForm";

const router = createBrowserRouter([
    {path: '/', element: <TodoListProvider><Homepage/></TodoListProvider>},
    {path: "/plasmic-host", element: <TodoListProvider><PlasmicCanvasHost/></TodoListProvider>},
    {path: "/token-form", element: <TokenForm/>}
])

function App() {
    return (
        <>
            <RouterProvider router={router}/>
        </>
    );
}


export default App;
