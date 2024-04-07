import ClassCompCounter from "./components/ClassCompCounter"
import FuncCompHooksCounter from "./components/FuncCompHooksCounter"
import FuncCompRecomposeCounter from "./components/FuncCompRecomposeCounter"

function App() {

  return (
    <div>
      <p>-------------------------------------------------</p>
      <p>Class Component</p>
      <ClassCompCounter />
      <br />
      <p>-------------------------------------------------</p>
      <p>Func Component × recompose</p>
      <FuncCompRecomposeCounter />
      <br />
      <p>-------------------------------------------------</p>
      <p>Func Component × Hooks</p>
      <FuncCompHooksCounter />
    </div>
  )
}

export default App
