import { useEffect, useState } from "react";
import type { Todo, TodoFormData } from "./types/todo";
import TodoForm from "./components/TodoForm";
import TodoStats from "./components/TodoStats";
import TodoItem from "./components/TodoItem";
import { todoApi } from "./services/api";

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  const [error, setError] = useState<string | null>(null);

  const [isFetchingTodos, setIsFetchingTodos] = useState(false);
  const [isSavingTodo, setIsSavingTodo] = useState(false);

  /* ================= FETCH TODOS ================= */

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setIsFetchingTodos(true);
      setError(null);
      const response = await todoApi.getAll();
      setTodos(response.data);
    } catch (err) {
      setError("Failed to fetch todos. Please check if the backend is running.");
      console.error(err);
    } finally {
      setIsFetchingTodos(false);
    }
  };

  /* ================= ADD / UPDATE ================= */

  const handleAddTodo = async (formData: TodoFormData) => {
    try {
      setIsSavingTodo(true);
      setError(null);

      if (editingTodo) {
        await todoApi.update(editingTodo._id, formData);
        setEditingTodo(null);
      } else {
        await todoApi.create(formData);
      }

      await fetchTodos();
    } catch (err) {
      setError("Failed to save todo. Please try again.");
      console.error(err);
    } finally {
      setIsSavingTodo(false);
    }
  };

  /* ================= TOGGLE ================= */

  const handleToggleTodo = async (id: string) => {
    try {
      setError(null);
      await todoApi.toggleStatus(id);
      await fetchTodos();
    } catch (err) {
      setError("Failed to update todo status.");
      console.error(err);
    }
  };

  /* ================= DELETE ================= */

  const handleDeleteTodo = async (id: string) => {
    if (!window.confirm("Are you sure about deleting this todo?")) return;

    try {
      setError(null);
      await todoApi.delete(id);
      await fetchTodos();
    } catch (err) {
      setError("Failed to delete todo.");
      console.error(err);
    }
  };

  /* ================= EDIT ================= */

  const handleEditTodo = (todo: Todo) => {
    setEditingTodo(todo);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingTodo(null);
  };

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-4xl">

        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            📝 MERN Todo App
          </h1>
          <p className="text-gray-600">
            Full-stack Todo App with React, Express, MongoDB & TypeScript
          </p>
        </header>

        {/* Form */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl shadow-sm mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              {editingTodo ? "Edit Todo" : "Add Todo"}
            </h2>

            {editingTodo && (
              <button
                onClick={handleCancelEdit}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-lg"
              >
                Cancel Edit
              </button>
            )}
          </div>

          <TodoForm
            mode={editingTodo ? "edit" : "add"}
            onSubmit={handleAddTodo}
            isLoading={isSavingTodo}
            initialData={
              editingTodo
                ? {
                    title: editingTodo.title,
                    description: editingTodo.description || "",
                  }
                : undefined
            }
          />
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Stats */}
        {todos.length > 0 && <TodoStats todos={todos} />}

        {/* List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h2 className="text-2xl font-bold text-gray-800">
              Your Todos ({todos.length})
            </h2>
          </div>

          {isFetchingTodos ? (
            <div className="p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-gray-600">Loading todos...</p>
            </div>
          ) : todos.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No todos yet. Add one above 👆
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {todos.map((todo) => (
                <div key={todo._id} className="p-6 hover:bg-gray-50">
                  <TodoItem
                    todo={todo}
                    onToggle={handleToggleTodo}
                    onDelete={handleDeleteTodo}
                    onEdit={handleEditTodo}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="text-center mt-8 text-gray-600 text-sm">
          © 2026 Ganesh Kumar S.
        </footer>
      </div>
    </div>
  );
};

export default App;
