import React, { useState } from 'react';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, text: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    setIsEditing(true);
    setEditText(todo.text);
  };

  const handleSave = () => {
    if (editText.trim() !== todo.text) {
      onUpdate(todo.id, editText);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id, todo.completed)}
        className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
      />
      
      <div className="flex-1">
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyPress}
            onBlur={handleSave}
            className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            autoFocus
          />
        ) : (
          <span
            className={`${
              todo.completed 
                ? 'line-through text-gray-500' 
                : 'text-gray-900'
            } cursor-pointer`}
            onClick={handleEdit}
          >
            {todo.text}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="text-green-600 hover:text-green-800 text-sm font-medium"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="text-gray-600 hover:text-gray-800 text-sm font-medium"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleEdit}
              className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="text-red-600 hover:text-red-800 text-sm font-medium"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TodoItem;