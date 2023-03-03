import createError from 'http-errors';
import Book from './models/book.mjs';

// Respond with number of records
export async function count(req, res, next) {
	try {
		return res.send({count: await Book.count()}) ;
	}
	catch(err) {
		console.log("Error:", err) ;
		return next(createError(400, "Something went wrong! Oh no!"));
	}
}

export function index(req, res) {
    Book.find()
    .then((book) => {
        res.send(book)
    })
}

// Respond with records in given range
export async function indexRange(req, res, next) {
	const limit = (req.params.indexEnd - req.params.indexStart) ;
	try {
		return res.send(await Book.find().limit(limit).skip(req.params.indexStart)) ;
	}
	catch(err) {
		console.log("Error:", err) ;
		return next(createError(400, "Something went wrong! Oh no!"));
	}
}

export function create(req, res, next) {
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

export function show(req, res, next) {
    Book.findById(req.params.id).then((book) => {
        if (!book) return (next(createError(404, "Booklist item not found")));
        res.send(book);
    }).catch(() => {
        return (next(createError(400, "Something went wrong! Oh no!")));
    })
};

export function remove(req, res, next) {
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

export function update(req, res, next) {
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

// Set the read/unread status for the specified book
export async function setReadStatus(req, res, next) {
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