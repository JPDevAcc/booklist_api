import { Schema, model } from 'mongoose';

const bookSchema = Schema({
	title: String,
	author: String,
	read: Boolean
})

const Book = model("Book", bookSchema) ;
export default Book ;