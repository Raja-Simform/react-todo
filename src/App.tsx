import "./App.css";
import { TodoProvider } from "./store/TodoContext";
import { Router } from "./components/Route/Router";

function App() {
  return (
    <div >
      <TodoProvider>
        <Router />
      </TodoProvider>
    </div>
  );
}

export default App;

 {/* <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/todos' >
              <Route index element={<Todos/>}/>
              <Route path="new" element={<AddTodo/>}/>
              <Route path=":id" element={<TodoDetail/>}/>
        </Route>
        <Route path="*" element={<h2>Page Not Found</h2>}/>
      </Routes> */}
