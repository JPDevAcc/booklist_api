import { config } from "dotenv";
import express from "express";
import router from "./router.mjs" ;
import cors from "cors";
import mongoose from "mongoose";

// Init dotenv
config() ;

// Express setup + middleware stack
const app = express() ;
app.use(cors()) ;
app.use(express.json()) ;
app.use(express.urlencoded({ extended: false })) ;
app.use(router) ;

// Connect to DB
mongoose.connect(process.env.DBURI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
}) ;

// Database event handling
const db = mongoose.connection ;
db.on('error', console.error.bind(console, 'connection error:')) ; // Log connection errors
db.once('open', () => console.log("Datatbase connected")) ; // Open the connection

// Listen for connections
const port = process.env.PORT || 3000 ;
app.listen(port, () => {
	console.log(`My app is listening on port: ${port}`) ;
 }) ;