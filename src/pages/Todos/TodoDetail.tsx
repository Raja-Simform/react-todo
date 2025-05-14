import { useContext, useState } from "react";
import { TodoContext } from "../../store/TodoContext";
import TodoCount from "../../components/TodoCount/TodoCount";
import { useNavigate, useParams } from "react-router-dom";
export default function TodoDetail() {
  const context = useContext(TodoContext);
  if (!context) {
    throw Error("raja-2");
  }
  const { todos, dispatch } = context;
  const { id } = useParams<{ id: string }>();
  const todoId = id ?? "";
  const todo = todos.find((t) => t.id === todoId);
  const [editText, setEditText] = useState(todo?.text || "");
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  if (!todo) {
    return <p>Todo not found</p>;
  }

  function toggleDone() {
    dispatch({ type: "DONE_TODO", payload: { id: todoId } });
  }

  function saveEdit() {
    if (editText.trim() === "") {
      alert("Todo text cannot be empty");
      return;
    }
    dispatch({ type: "EDIT_TODO", payload: { id: todoId, text: editText } });
    setIsEditing(false);
  }

  return (
    <div
      style={{ border: "1px solid #ddd", padding: "1rem", marginTop: "1rem" }}
    >
      <TodoCount />
      <h3>Todo Detail</h3>
      <p>
        <strong>ID:</strong> {todo.id}
      </p>
      <p>
        <strong>Created At:</strong> {todo.date}
      </p>
      <p>
        <strong>Status:</strong> {todo.done ? "Done" : "Not Done"}
      </p>
      <p>
        <strong>Text:</strong>{" "}
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            style={{ width: "300px" }}
          />
        ) : todo.done ? (
          <s>{todo.text}</s>
        ) : (
          todo.text
        )}
      </p>
      <div>
        <button onClick={toggleDone} style={{ marginRight: "1rem" }}>
          Mark as {todo.done ? "Not Done" : "Done"}
        </button>
        {isEditing ? (
          <>
            <button onClick={saveEdit} style={{ marginRight: "1rem" }}>
              Save
            </button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </>
        ) : (
          <button onClick={() => setIsEditing(true)}>Edit</button>
        )}
      </div>
      <button
        onClick={() => navigate("/todos")}
        style={{ marginTop: "1rem", background: "#611818" }}
      >
        Back to Todos
      </button>
    </div>
  );
}
