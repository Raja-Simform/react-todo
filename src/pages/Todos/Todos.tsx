import { useContext, type ChangeEvent } from "react";
import { Link, useNavigate, useSearchParams, Outlet } from "react-router-dom";
import { TodoContext } from "../../store/TodoContext";
import TodoCount from "../../components/TodoCount/TodoCount";

export default function Todos() {
  const context = useContext(TodoContext);
  const navigate = useNavigate();
  const [searchParam, setSearchParam] = useSearchParams();
  if (!context) {
    throw Error("raja-3");
  }
  const { todos } = context;

  const search = searchParam.get("search") || "";
  const filterTodos = todos.filter((todo) =>
    todo.text.toLowerCase().includes(search.toLowerCase())
  );

  function handleSearchChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (value) {
      setSearchParam({ search: value });
    } else {
      setSearchParam({});
    }
  }
  return (
    <>
      <h2>Welcome to my todo</h2>
      <TodoCount />
      <div>
        <input type="text" value={search} onChange={handleSearchChange} />
        <button onClick={() => navigate("/todos/new")}>Add</button>
      </div>
      {filterTodos.length === 0 ? (
        <p>No todos found.</p>
      ) : (
        <ul>
          {filterTodos.map((todo) => (
            <li key={todo.id} style={{ marginBottom: "0.5rem" }}>
              <Link to={`/todos/${todo.id}`}>
                {todo.done ? <s>{todo.text}</s> : todo.text}
              </Link>{" "}
              <small style={{ color: "#666"  }}>(Added: {todo.date})</small>
            </li>
          ))}
        </ul>
      )}
      <Outlet />
    </>
  );
}
