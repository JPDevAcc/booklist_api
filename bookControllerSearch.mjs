import createError from 'http-errors' ;
import { booklist } from './bookController.mjs';

// Return matching books according to given criteria
/* URL format: /[or|and]?f1=fieldName1&s1=searchValue1&f2=fieldName2&s2=searchValue2... */
export function findBooksBy(req, res, next) {
	// Get just the query values (i.e. only the order matters, not the parameter names themselves)
	const queryValues = Object.values(req.query) ;

	// Get logical operator
	const logicalOp = req.params.op ;
	if (!['or', 'and'].includes(logicalOp)) {
    return (next(createError(400, "Unknown operator"))) ;
  }

	// Get search criteria
	if (queryValues.length % 2 !== 0) {
		return (next(createError(400, "Invalid number of query arguments"))) ;
	}
	const searchCriteria = [] ;
	for (let i = 0; i < queryValues.length; i+=2) {
		searchCriteria.push({
			fieldName: queryValues[i],
			searchValue: queryValues[i + 1].toLowerCase()
		}) ;
	}
	
	// Get individual lists for each criteria
	const listsToCombine = [] ;
	for (const {fieldName, searchValue} of searchCriteria) {
		if (booklist[0] && booklist[0][fieldName] === undefined) {
			return (next(createError(400, "Unknown search field"))) ;
		}
		const bookList = booklist.filter(book => book[fieldName].toLowerCase() === searchValue) ;
		listsToCombine.push(bookList) ;
	}

	// Combine the lists and return the result
	const bookListCombined = combineLists(listsToCombine, logicalOp) ;
	res.send(bookListCombined) ;
}

// Combine lists with given boolean operator
function combineLists(listsToCombine, op) {
	if (op === 'or') {
		// Create object with all entries over all the lists, indexed by id
		const idToEntryTable = {} ;
		for (const list of listsToCombine) {
			for (const listEntry of list) {
				idToEntryTable[listEntry.id] = listEntry ;
			}
		}

		// Return just the entries (values of the object)
		return Object.values(idToEntryTable) ;
	}
	else if (op === 'and') {
		// Accumulate counts for entries in each list
		const idToCount = {} ;
		for (const list of listsToCombine) {
			for (const listEntry of list) {
				idToCount[listEntry.id] = (idToCount[listEntry.id] || 0) + 1 ;
			}
		}

		// Return only those entries that were present in all lists
		return listsToCombine[0].filter(entry => idToCount[entry.id] === listsToCombine.length) ; 
	}

	console.error("Invalid operator") ;
	return null ;
}