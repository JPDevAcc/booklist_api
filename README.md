# booklist_api

A group project to create an API in Node/Express for accessing and modifying a book-list (containing title, author, and read/unread status), with MongoDB used for the database.

Core API requirements were the ability to:
- Add books
- Return, edit, and remove books by id
- Return all books

Extensions:
- Search by any combination of fields (or|and)
- Remove ("burn") books by an author
- Retrieve number of books in database
- Retrieve a range of books by start and end index

Endpoints:

[GET] /booklist/count

[GET] /booklist

[GET] /booklist/range/:indexStart/:indexEnd

[GET] /booklist/:id

[POST] /create (body = title:String, author:String)

[DELETE] /delete/:id

[PUT] /booklist/:id (body = title:String, author:String)

[PATCH] /booklist/isread/:id (body = read:Boolean)

[GET] /booklist/search/:op

[DELETE] /burn/:author
