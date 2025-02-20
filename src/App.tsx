import viteLogo from '/vite.svg'

// classの重複気にしなければstyled-jsxじゃなくstyleタグそのままでもいいかもね

function App() {
  return (
    <>
      <div>
        <img src={viteLogo} className="logo" alt="Vite logo" />
      </div>
      <h1>Vite + React</h1>
      <h2 className="text-3xl font-bold underline">
        Hello world!
      </h2>
      <style jsx>{`
        h1 {
          color: red;
        }
      `}</style>
    </>
  )
}

export default App
