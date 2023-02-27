import express from "express";
import * as booklist from "./bookController.mjs"
const router = express.Router() ;

// Routes
router.get('/booklist/:id', booklist.show) ;
router.get("/booklist", booklist.index) ;
router.post("/create", booklist.create) ;
router.delete("/delete/:id", booklist.remove) ;
router.put("/booklist/:id", booklist.update) ;

/*
// (for some reason these only work locally - not on render deployments)
router.get('/todo/:id', todos.show) ;
router.get("/todo", todos.index) ;
router.post("/todo", todos.create) ;
router.delete("/todo/:id", todos.remove) ;
router.put("/todo/:id", todos.update) ;
*/

export default router ;