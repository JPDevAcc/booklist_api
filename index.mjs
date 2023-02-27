import express from "express";
const app = express() ;
const port = process.env.PORT || 3000 ;
import router from "./router.mjs" ;
import cors from "cors";

app.use(cors()) ;
app.use(express.json()) ;
app.use(express.urlencoded({ extended: false })) ;
app.use(router) ;

app.listen(port, () => {
	console.log(`My app is listening on localhost: ${port}`) ;
 }) ;