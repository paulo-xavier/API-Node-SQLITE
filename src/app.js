import express from 'express'; 
import router from './routes.js';

const app = express(); 
const port = 3000; 

app.use(express.json()); 
app.use(router); 

app.listen(port, () => console.log("Api running")); 