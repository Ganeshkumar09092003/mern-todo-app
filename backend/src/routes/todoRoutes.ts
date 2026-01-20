import { Router } from "express";
import { createTodo, deleteTodo, getTodoById, getTodos, toggleTodoStatus, updateTodo } from "../controllers/todoControllers";

const router = Router();
router.get('/', getTodos);
router.get('/:id',getTodoById);
router.post('/',createTodo);
router.put('/:id', updateTodo);
router.patch('/:id/toggle', toggleTodoStatus);
router.delete('/:id', deleteTodo);

export default router;