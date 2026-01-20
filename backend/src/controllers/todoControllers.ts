import { Request, Response } from "express";
import Todo, {ITodo} from "../models/Todo";

// GET TODO
export const getTodos = async (req: Request, res: Response): Promise<void> => {
    try {
        const todos = await Todo.find().sort({createdAt: -1});
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({message: 'Error fetching todos', error});
    }
}

//GET TODO BY ID
export const getTodoById = async (req: Request, res: Response): Promise<void> => {
    try {
        const todo = await Todo.findById(req.params.id);
        if(!todo){
            res.status(404).json({ message: 'Todo not found' });
            return;
        }
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({message: 'Error fetching todo', error});
    }
};

//CREATE NEW TODO
export const createTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const {title, description} = req.body;
        
        if(!title){
            res.status(400).json({message: 'Title is Required'});
            return;
        }

        const newTodo: ITodo = new Todo({
            title,
            description: description || ''
        })

        const savedTodo = await newTodo.save();

        res.status(201).json(savedTodo);
    } catch (error) {
        res.status(500).json({message: 'Error creating todo', error});
    }
};

//UPDATE TODO
export const updateTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const {id} = req.params;
        const {title, description, completed} = req.body;

        if (!id) {
            res.status(404).json({ message: 'id not found' });
            return;
        }

        const todo = await Todo.findById(id);

        if (!todo) {
            res.status(404).json({ message: 'Todo not found' });
            return;
        }
        if (title !== undefined) todo.title = title;
        if (description !== undefined) todo.description = description;
        if (completed !== undefined) todo.completed = completed;

        const updatedTodo = await todo.save();
        res.status(200).json(updatedTodo);
    } catch (error) {
        res.status(500).json({message: 'Error updating todo', error});
    }
};

//TOGGLE STATUS
export const toggleTodoStatus = async (req: Request, res: Response): Promise<void> =>{
    try {
        const todo = await Todo.findById(req.params.id);

        if(!todo){
            res.status(404).json({message: "Todo not found"});
            return;
        }

        todo.completed = !todo.completed;
        const updatedTodo = await todo.save();
        res.status(200).json(updatedTodo);
    } catch (error) {
        res.status(500).json({message: "Error in toggling todo status", error});
    }
}

//DELETE TODO
export const deleteTodo = async (req: Request, res: Response): Promise<void> =>{
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);

        if(!todo){
            res.status(404).json({message: "Todo not found"});
            return;
        }

        res.status(200).json({message: "Todo Deleted Successfully"});

    } catch (error) {
        res.status(500).json({message: "Error deleting todo", error});
    }
};