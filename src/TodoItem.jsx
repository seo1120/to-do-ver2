import React from 'react';

function TodoItem({ todo, index, onToggle, onDelete, isDarkMode = false }) {
  return (
    <div className={`p-4 border rounded-lg transition-all duration-300 transform hover:scale-105 ${
      todo.completed 
        ? isDarkMode
          ? 'bg-gray-800 border-gray-600 opacity-75' 
          : 'bg-gray-50 border-gray-200 opacity-75'
        : isDarkMode
          ? 'bg-gray-700 border-gray-600 hover:shadow-lg hover:shadow-gray-900/20' 
          : 'bg-white border-gray-300 hover:shadow-md'
    }`}>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3 flex-1">
          <div className={`cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 transition-colors ${
            isDarkMode ? 'hover:text-gray-300' : 'hover:text-gray-500'
          }`}>
            ⋮⋮
          </div>
          <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
            todo.completed 
              ? isDarkMode
                ? 'bg-gray-600 text-gray-400'
                : 'bg-gray-300 text-gray-600'
              : isDarkMode
                ? 'bg-pink-500 text-white'
                : 'bg-pink-400 text-white'
          }`}>
            {index + 1}
          </div>
          <span className={`transition-colors ${
            todo.completed 
              ? 'line-through text-gray-500' 
              : isDarkMode 
                ? 'text-gray-200' 
                : 'text-gray-800'
          }`}>
            {todo.text}
          </span>
        </div>
        <div className="flex gap-2 ml-4">
          <button 
            onClick={() => onToggle(index)}
            className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
              todo.completed
                ? 'bg-orange-500 hover:bg-orange-600 text-white'
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            {todo.completed ? '미완료' : '완료'}
          </button>
          <button 
            onClick={() => onDelete(index)}
            className="px-3 py-1 text-xs font-medium bg-red-500 hover:bg-red-600 text-white rounded transition-colors"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}

export default TodoItem;
