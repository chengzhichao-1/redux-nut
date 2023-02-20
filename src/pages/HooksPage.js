import { useReducer } from "react";
import { countReducer } from "../store";

const init = (initArg) => parseInt(initArg) 
export default function HooksPage() {
  const [state, dispatch] = useReducer(countReducer, '0', init)

  return (
    <div>
      <h1>{state}</h1>
      <button onClick={() => dispatch({type: "ADD"})}>+1</button>
    </div>
  )
}