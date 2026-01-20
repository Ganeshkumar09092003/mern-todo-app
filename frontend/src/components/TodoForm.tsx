import type React from "react";
import { useState, useEffect } from "react";
import type { TodoFormData } from "../types/todo";

interface TodoFormProps {
  onSubmit: (data: TodoFormData) => void;
  initialData?: TodoFormData;
  isLoading?: boolean;
  mode?: "add" | "edit";
}

const EMPTY_FORM: TodoFormData = {
  title: "",
  description: "",
};

const TodoForm: React.FC<TodoFormProps> = ({
  onSubmit,
  initialData = EMPTY_FORM,
  isLoading = false,
  mode = "add",
}) => {
  const [formData, setFormData] = useState<TodoFormData>(initialData);

  /**
   * 🔑 IMPORTANT:
   * Sync form state when initialData changes (edit mode)
   */
  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isLoading) return;
    if (!formData.title.trim()) return;

    onSubmit(formData);

    // Reset only after adding (not editing)
    if (mode === "add") {
      setFormData(EMPTY_FORM);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md mb-6"
    >
      {/* Title */}
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          disabled={isLoading}
          required
          placeholder="What needs to be done?"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                     disabled:opacity-50"
        />
      </div>

      {/* Description */}
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Description (Optional)
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          value={formData.description}
          onChange={handleChange}
          disabled={isLoading}
          placeholder="Add some details..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                     disabled:opacity-50"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg
                   hover:bg-blue-700 focus:outline-none focus:ring-2
                   focus:ring-blue-500 focus:ring-offset-2
                   disabled:opacity-50 disabled:cursor-not-allowed
                   transition-colors"
      >
        {isLoading
          ? mode === "edit"
            ? "Updating..."
            : "Adding..."
          : mode === "edit"
          ? "Update Todo"
          : "Add Todo"}
      </button>
    </form>
  );
};

export default TodoForm;
