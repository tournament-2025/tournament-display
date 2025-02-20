import viteLogo from '/vite.svg'
import { useState } from 'react'

function App() {
  const [color, setColor] = useState("red")

  return (
    <>
      <style>{`
        .test {
          color: ${color};
        }
      `}</style>

      <div>
        <img src={viteLogo} className="logo" alt="Vite logo" />
      </div>
      <h1 className="test">aaaaa</h1>
      <h2 className="text-3xl font-bold underline">aaaaa</h2>
      <button onClick={() => setColor(color == "red" ? "green" : "red")}>color</button>
    </>
  )
}

export default App
