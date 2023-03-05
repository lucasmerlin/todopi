import Homepage from './components/Homepage';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {PlasmicCanvasHost} from "@plasmicapp/host";
import {TodoListProvider} from "./TodoListProvider";

const router = createBrowserRouter([
    {path: '/', element: <Homepage/>},
    {path: "/plasmic-host", element: <PlasmicCanvasHost/>},
])

function App() {
    return (
        <TodoListProvider>
            <RouterProvider router={router}/>
        </TodoListProvider>
    );
}


export default App;
