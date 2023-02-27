import express from "express";
import * as todos from "./todosController.mjs"
const router = express.Router() ;

// Routes
router.get('/todo/:id', todos.show) ;
router.get("/todo", todos.index) ;
router.post("/create", todos.create) ;
router.delete("/delete/:id", todos.remove) ;
router.put("/todo/:id", todos.update) ;

/*
// (for some reason these only work locally - not on render deployments)
router.get('/todo/:id', todos.show) ;
router.get("/todo", todos.index) ;
router.post("/todo", todos.create) ;
router.delete("/todo/:id", todos.remove) ;
router.put("/todo/:id", todos.update) ;
*/

export default router ;