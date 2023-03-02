import createError from 'http-errors';
import Book from './models/book.mjs';
import { ObjectId } from 'mongoose';

export function index(req, res) {
    Book.find()
    .then((book) => {
        res.send(book)
    })
}

// export function create(req, res, next) {
// 	if (!req.body.title) {
//         return (next(createError(400, 'Title is required')))
//     }

//     booklist.push({
//         id: idNo,
//         title: req.body.title,
//         read: false,
//         author: req.body.author
//     })
//     idNo++
//     res.send({
//         result: true
//     })
// }

export function create(req, res, next) {
    if (!req.body.title) {
        return (next(createError(400, 'Title is required')))
    }

    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        read: false
    });

    book.save().then(book => {
        if (book) res.send(book);
    }).catch(() => {
        return (next(createError(400, "Some error!")));
    })
};

// export function show(req, res, next) {
// 	const booklistItem = booklist.find(bookList => bookList.id == req.params.id)
//     if (!booklistItem) {
//         return (next(createError(404, "Booklist item not found")))
//     }
//     res.send(booklistItem)
// }

export function show(req, res, next) {
    Book.findById(req.params.id).then((book) => {
        if (!book) return (next(createError(404, "Booklist item not found")));
        res.send(book);
    }).catch(() => {
        return (next(createError(400, "Something went wrong! Oh no!")));
    })
};

// export function remove(req, res, next) {
// 	const booklistItem = booklist.find(bookList => bookList.id == req.params.id)
//     if (!booklistItem) {
//         return (next(createError(404, "Booklist item not found")))
//     }

//     filterInPlace(booklist, booklist => booklist.id != req.params.id) ;
//     res.send({
//         result: true
//     })
// }

export function remove(req, res, next) {
    Book.deleteOne({ _id: (req.params.id) })
        .then((book) => {
            if (book.deletedCount) {
                return res.send({ result: true })
            } 
            return (next(createError(400, "Book doesn't exist")));
        }).catch(() => {
            return (next(createError(400, "Something went wrong! Oh no!")));
        })
};

// export function update(req, res, next) {
//     if (!req.body.title) {
//         return (next(createError(400, 'Title is required')))
//     }
//     console.log(booklist, req.params.id);
//     const booklistItem = booklist.find(bookList => bookList.id == req.params.id)
//     if (!booklistItem) {
//         return (next(createError(404, "Booklist item not found")))
//     }

//     booklistItem.title = req.body.title;

//     res.send({
//         result: true
//     })
// }

export function update(req, res, next) {
    if (!req.body.title) {
        return (next(createError(400, 'Title is required')))
    }
    Book.findById(req.params.id).then((book) => {
        if (!book) return (next(createError(404, "Booklist item not found")));
        book.title = req.body.title
        book.author = req.body.author
        book.save().then(() => res.send({ result: true }))
    }).catch(() => {
        return (next(createError(400, "Something went wrong! Oh no!")));
    })
};

////use sparingly - this will delete all books by a given author (put %20 in place of spaces in url)
export function bookburn(req, res, next) {
    Book.deleteMany({ author: req.params.author })
        .then((book) => {
            if (book.deletedCount) {
                return res.send({ result: true });
            } else {
                return next(createError(404, "No books by this author were found"));
            }
        })
        .catch(() => {
            return next(createError(400, "Something went wrong! Oh no!"));
        });
}