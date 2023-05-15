import createError from 'http-errors';
import getBookModel from './models/book.mjs';

// Retrieve number of records
export async function count(req, res, next) {
	const Book = getBookModel() ;
	
	try {
		return res.send({count: await Book.count()}) ;
	}
	catch(err) {
		console.log("Error:", err) ;
		return next(createError(400, "Something went wrong! Oh no!"));
	}
}

// Retrieve all books
export function index(req, res) {
		const Book = getBookModel() ;

    Book.find()
    .then((book) => {
        res.send(book)
    })
}

// Retrieve books in given range by start and end index
export async function indexRange(req, res, next) {
	const Book = getBookModel() ;

	const limit = (req.params.indexEnd - req.params.indexStart) ;
	try {
		return res.send(await Book.find().limit(limit).skip(req.params.indexStart)) ;
	}
	catch(err) {
		console.log("Error:", err) ;
		return next(createError(400, "Something went wrong! Oh no!"));
	}
}

// Create new book entry
export function create(req, res, next) {
		const Book = getBookModel() ;

    if (!req.body.title) {
      return (next(createError(400, 'Title is required')))
    }
		if (!req.body.author) {
      return (next(createError(400, 'Author is required')))
    }

    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        read: false
    });

    book.save().then(book => {
        if (book) res.send(book);
    }).catch(() => {
        return (next(createError(400, "Something went wrong! Oh no!")));
    })
};

// Return book by id
export function show(req, res, next) {
		const Book = getBookModel() ;

    Book.findById(req.params.id).then((book) => {
        if (!book) return (next(createError(404, "Booklist item not found")));
        res.send(book);
    }).catch(() => {
        return (next(createError(400, "Something went wrong! Oh no!")));
    })
};

// Remove a book by id
export function remove(req, res, next) {
		const Book = getBookModel() ;

    Book.deleteOne({ _id: (req.params.id) })
        .then((book) => {
            if (book.deletedCount) {
                return res.send({ result: true })
            } 
            return (next(createError(404, "Book doesn't exist")));
        }).catch(() => {
            return (next(createError(400, "Something went wrong! Oh no!")));
        })
};

// Update title and author by id
export function update(req, res, next) {
		const Book = getBookModel() ;

    if (!req.body.title) {
      return (next(createError(400, 'Title is required')))
    }
		if (!req.body.author) {
      return (next(createError(400, 'Author is required')))
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

// Set the read/unread status by id
export async function setReadStatus(req, res, next) {
	const Book = getBookModel() ;

	if (req.body.read === undefined) return (next(createError(400, 'Read status is required')))
	try {
		const book = await Book.findById(req.params.id) ;
		if (!book) return (next(createError(404, "Booklist item not found")));
		book.read = req.body.read
		await book.save() ;
		res.send({ result: true }) ;
	}
	catch {
		return (next(createError(400, "Something went wrong! Oh no!")));
	}
}

// "Burn" books by the specified author | use sparingly - this will delete all books by a given author (put %20 in place of spaces in url)
export function bookburn(req, res, next) {
	const Book = getBookModel() ;

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