import createError from 'http-errors' ;

import { booklist } from './bookController.mjs' ;
let idNo = 4 ; // One or length of test-data + 1

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

    filterInPlace(booklist, booklist => booklist.id != req.params.id) ;
    res.send({
        result: true
    })
}

export function update(req, res, next) {
	if (!req.body.title) {
        return (next(createError(400, 'Title is required')))
    }
		console.log(booklist, req.params.id) ;
    const booklistItem = booklist.find(bookList => bookList.id == req.params.id)
    if (!booklistItem) {
        return (next(createError(404, "Booklist item not found")))
    }

		booklistItem.title = req.body.title ;

    res.send({
        result: true
    })
}

function filterInPlace(arr, callback) {
	return arr.splice(0, arr.length, ...arr.filter(callback)) ;
}