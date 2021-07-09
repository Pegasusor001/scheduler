import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition (initial, replace = false) {
    if (replace){
      setMode(initial);
      const temp = history.slice(0,-1);
      temp.push(initial);
      setHistory(temp)
    } else {
      setMode(initial);
      setHistory(prev => [...prev, initial])
    }

  } 

  function back () {
    setMode(history.slice(-2)[0])
    setHistory(prev => prev.slice(0,-1))
  }
  console.log(history)
  return { mode, transition, back };
}
