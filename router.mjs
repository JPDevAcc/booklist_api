import express from "express";
import * as booklist from "./bookController.mjs"
const router = express.Router() ;

// Routes
router.get("/booklist/count", booklist.main.count) ; // Get count of all books
router.get("/booklist", booklist.main.index) ; // Get all books
router.get("/booklist/range/:indexStart/:indexEnd", booklist.main.indexRange) ; // Get range of books by start and end index
router.get('/booklist/:id', booklist.main.show) ; // Get book by id
router.post("/create", booklist.main.create) ; // Create new book entry
router.delete("/delete/:id", booklist.main.remove) ; // Delete book by id
router.put("/booklist/:id", booklist.main.update) ; // Update book title and author by id
router.patch("/booklist/isread/:id", booklist.main.setReadStatus) ; // Set book read/unread status by id
router.get("/booklist/search/:op", booklist.search.findBooksBy) ; // Get books matching the specified criteria
router.delete("/burn/:author", booklist.main.bookburn) ; // Remove ("burn") books by author (replace spaces in url with %20)

export default router ;