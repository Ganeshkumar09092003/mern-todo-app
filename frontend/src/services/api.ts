import axios from "axios";
import type { Todo } from "../types/todo";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
})

export const todoApi = {
    // get all todos
    getAll: () => api.get<Todo[]>('/todos'),

    // get todo by id
    getById: (id: string) => api.get<Todo>(`/todos/${id}`),

    //create todo 
    create: (data: { title: string; description?: string }) => api.post('/todos', data),

    //update todo 
    update: (id: string, data: Partial<{ title: string; description?: string; completed: boolean}>) => api.put(`/todos/${id}`, data),

    //toggleStatus of completed
    toggleStatus: (id: string) => api.patch(`/todos/${id}/toggle`),

    // Detele todo
    delete: (id: string) => api.delete(`/todos/${id}`)

}