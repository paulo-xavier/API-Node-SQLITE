// import { openDb } from './configDB.js'; 
import { createTable, insertPessoa, selectPessoas, selectPessoa, updatePessoa, deletePessoa } from './Controller/Pessoa.js'; 
import express from 'express'; 

import { createTableEmpresa, insertEmpresa, selectEmpresas, selectEmpresa, updateEmpresa, deleteEmpresa } from './Controller/Empresa.js';

const app = express(); 
const port = 3000; 

app.use(express.json()); 

// createTable()
// createTableEmpresa(); 

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




/* Empresa */ 

app.get('/empresas', async (req, res) => {
    let empresas = await selectEmpresas(); 
    res.json(empresas); 

}); 

app.get('/empresa', async (req, res) => {
    let empresa = await selectEmpresa(req.body.id); 
    res.json(empresa)

}); 


app.post('/empresa', (req, res) => {
    
    insertEmpresa(req.body); 
    res.json({
        "statusCode" : 200
    });
})

app.put('/empresa', (req, res) => {
    if (req.body && !req.body.id) {
        
        res.json({
            "statusCode" : 404, 
            "msg" : "Você precisa informar um id"
        })
    
    } else {

        updateEmpresa(req.body)
        res.json({
            "statusCode" : 200
        })
    }
})

app.delete('/empresa', async (req, res) => {
    let empresa = await deleteEmpresa(req.body.id); 
    res.json(empresa)
})



