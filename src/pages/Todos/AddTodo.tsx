import { useContext, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { TodoContext } from "../../store/TodoContext";
import TodoCount from "../../components/TodoCount/TodoCount";

export default function AddTodo() {
  const context = useContext(TodoContext);
  if (!context) {
    throw Error("wrong-raja");
  }
  const { dispatch } = context;
  const [text, setText] = useState<string>("");
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (text.trim() === "") {
      alert("Todo text cannot be empty");
      return;
    }
    dispatch({ type: "ADD_TODO", payload: { text } });
    setText("");
    navigate("/todos");
  }

  return (
    <div>
      <TodoCount />
      <h3>Add New Todo</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter todo text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ padding: "0.5rem", width: "300px" }}
        />
        <button
          type="submit"
          style={{ marginLeft: "1rem", padding: "0.5rem 1rem" }}
        >
          Add
        </button>
      </form>
      <button
        onClick={() => navigate("/todos")}
        style={{ marginTop: "1rem", background: "#cd1010" }}
      >
        Back to Todos
      </button>
    </div>
  );
}
