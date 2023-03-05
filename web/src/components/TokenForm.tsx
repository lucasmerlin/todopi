import {useRef} from "react";
import {useNavigate} from "react-router-dom";


export default function TokenForm() {

    const input = useRef<HTMLInputElement>(null);
    const navigate = useNavigate()

    const apply = () => {
        localStorage.setItem("token", input.current?.value || "");
        navigate("/plasmic-host");
    }

    return <>
        <label>Enter Todoist Token</label>
        <input ref={input}/>
        <button onClick={() => apply()}>Apply</button>
    </>

}
