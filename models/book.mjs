import { Schema, model } from 'mongoose';

const bookSchema = Schema({
	title: String,
	author: String,
	read: Boolean
})

export { bookSchema };

const getModel = () => model(global.userCollectionsPrefix + 'Book', bookSchema) ;
export default getModel ;