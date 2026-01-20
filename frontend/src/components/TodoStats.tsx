import React from 'react'
import type { Todo } from '../types/todo'

interface TodoStatsProps{
    todos: Todo[];
}

const TodoStats: React.FC<TodoStatsProps> = ({ todos }) => {
    const totalTodos = todos.length;
    const completedTodos = todos.filter((todo) => todo.completed).length;
    const pendingTodos = totalTodos - completedTodos;
    
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
        <div className='bg-blue-50 p-4 rounded-lg border border-blue-100'>
            <h3 className="text-lg font-semibold text-blue-900">Total</h3>
            <p className="text-3xl font-bold text-blue-700">{totalTodos}</p>
            <p className="text-sm text-blue-600">All tasks</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
        <h3 className="text-lg font-semibold text-green-900">Completed</h3>
        <p className="text-3xl font-bold text-green-700">{completedTodos}</p>
        <p className="text-sm text-green-600">Finished tasks</p>
      </div>
      
      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
        <h3 className="text-lg font-semibold text-yellow-900">Pending</h3>
        <p className="text-3xl font-bold text-yellow-700">{pendingTodos}</p>
        <p className="text-sm text-yellow-600">Tasks to do</p>
      </div>
    </div>
  )
}

export default TodoStats