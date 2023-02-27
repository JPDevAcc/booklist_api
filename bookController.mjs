export const booklist = [] ;

// TODO: REMOVE THIS WHEN DATABASE FUNCTIONALITY IMPLEMENTED!
const USE_TEST_DATA = true ;
if (USE_TEST_DATA) {
	booklist[0] =
	{
		id: 1,
		"title": "SomeTitle",
		"author": "SomeOtherAuthor",
		"read": false,
	}
	booklist[1] =
	{
		id: 2,
		"title": "SomeOtherTitle",
		"author": "SomeAuthor",
		"read": false
	}
	booklist[2] =
	{
		id: 3,
		"title": "SomeOtherTitleStill",
		"author": "SomeAuthor",
		"read": false
	}
}

import * as main from './bookControllerMain.mjs' ;
import * as search from './bookControllerSearch.mjs' ;

export {main, search} ;