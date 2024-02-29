import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { useFecth } from './useFetch';

const  useStopWatch = () => {
  const [count, setCount] = useState(0)
  useEffect(() => {
    const interval = setInterval(()=>{
      setCount((prev)=>prev + 1)
    }, 1500)
    return () => clearInterval(interval);
  },[])

  return count
}

function App() {
  const [url, setUrl] = useState(null)
  console.log("App Rendering");
 const count =useStopWatch()

const {data} = useFecth({url:url, onSuccess: (json) => console.log(json)})
  return (
    <>
      <h1>{JSON.stringify(data)}</h1>
      <div>count: {count}</div>
      <button onClick={()=> setUrl("/shima.json")}>Shima</button>
      <button onClick={()=> setUrl("/amir.json")}>Amir</button>
    </>
  )
}

export default App
