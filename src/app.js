// import { openDb } from './configDB.js'; 
import { createTable, insertPessoa, selectPessoas, selectPessoa, updatePessoa, deletePessoa } from './Controller/Pessoa.js'; 
import express from 'express'; 

const app = express(); 
const port = 3000; 

app.use(express.json()); 

createTable()

app.get('/', (req, res) => {
    res.send("Api running"); 
})

app.get('/pessoas', async (req, res) => {
    let pessoas = await selectPessoas(); 

    res.json(pessoas); 

})

app.get('/pessoa', async (req, res) => {
    let pessoa = await selectPessoa(req.body.id); 
    
    res.json(pessoa); 

})

app.post('/pessoa', (req, res) => {

    insertPessoa(req.body); 
    res.json({
        "statusCode": 200 
    })
} )

app.put('/pessoa', (req, res) => {

    if (req.body && !req.body.id){
        res.json({
            "statusCode" : "400", 
            "msg" : "Você precisa informar um id!"
        })
    } else {

        updatePessoa(req.body); 
        res.json({
            "statusCode": 200 
        })
    }


})

app.delete('/pessoa', async (req, res) => {
    let pessoa = await deletePessoa(req.body.id); 
    
    res.json(pessoa); 

})


app.listen(port, () => console.log("Api running")); 


