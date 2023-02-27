import express from "express";
import * as booklist from "./bookController.mjs"
const router = express.Router() ;

// Routes
router.get('/booklist/:id', booklist.main.show) ;
router.get("/booklist", booklist.main.index) ;
router.post("/create", booklist.main.create) ;
router.delete("/delete/:id", booklist.main.remove) ;
router.put("/booklist/:id", booklist.main.update) ; // (this might need to have 'update' in the url to work on render deployment)
router.get("/booklist/search/:op", booklist.search.findBooksBy) ;

/*
// (for some reason these only work locally - not on render deployments)
router.get('/todo/:id', todos.show) ;
router.get("/todo", todos.index) ;
router.post("/todo", todos.create) ;
router.delete("/todo/:id", todos.remove) ;
router.put("/todo/:id", todos.update) ;
*/

export default router ;