import createError from 'http-errors' ;

let booklist = []
let idNo = 0

export function index(req, res) {
	res.send(booklist)
}

export function create(req, res, next) {
	if (!req.body.title) {
        return (next(createError(400, 'Title is required')))
    }

    booklist.push({
        id: idNo,
        title: req.body.title,
        read: false,
        author: req.body.author
    })
    idNo++
    res.send({
        result: true
    })
}

export function show(req, res, next) {
	const booklistItem = booklist.find(bookList => bookList.id == req.params.id)
    if (!booklistItem) {
        return (next(createError(404, "Booklist item not found")))
    }
    res.send(booklistItem)
}

export function remove(req, res, next) {
	const booklistItem = booklist.find(bookList => bookList.id == req.params.id)
    if (!booklistItem) {
        return (next(createError(404, "Booklist item not found")))
    }

    booklist = booklist.filter(bookList => bookList.id != req.params.id)
    res.send({
        result: true
    })
}

export function update(req, res, next) {
	if (!req.body.title) {
        return (next(createError(400, 'Title is required')))
    }
    const booklistItem = booklist.find(bookList => bookList.id == req.params.id)
    if (!booklistItem) {
        return (next(createError(404, "Booklist item not found")))
    }

    booklist = booklist.map(bookList => {
        if (bookList.id == req.params.id) {
            bookList.title = req.body.title
        }
        return bookList
    })

    res.send({
        result: true
    })
}