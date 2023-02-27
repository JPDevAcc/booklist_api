import createError from 'http-errors' ;

let todos = [ ] ;
let idNo = 0 ;

export function index(req, res) {
	res.send(todos) ;
}

export function create(req, res, next) {
	if (!req.body.name) {
		return(next(createError(400, "Name is required"))) ;
	}
	
	todos.push({
		id: idNo,
		name: req.body
	}) ;
	idNo++ ;
	res.send({
		result: true
	})
}

export function show(req, res, next) {
	const todoItem = todos.find((todo) => todo.id == req.params.id)
	console.log("todoItem: ", todoItem) ;
	if (!todoItem) {
		return next(createError(404, "no todo with that id")) ;
	}
	res.send(todoItem) ;
}

export function remove(req, res, next) {
	const todoItem = todos.find((todo) => todo.id == req.params.id)
	console.log("todoItem: ", todoItem) ;
	if (!todoItem) {
		return next(createError(404, "no todo with that id")) ;
	}

	todos = todos.filter(todo => todo.id != req.params.id) ;

	res.send({
		result: true
	})
}

export function update(req, res, next) {
	if (!req.body.name) {
		return(next(createError(400, "Name is required"))) ;
	}

	const todoItem = todos.find((todo) => todo.id == req.params.id)
	console.log("todoItem: ", todoItem) ;
	if (!todoItem) {
		return next(createError(404, "No todo with that id")) ;
	}

	todoItem.name = req.body.name ;

	res.send({
		result: true
	})
}