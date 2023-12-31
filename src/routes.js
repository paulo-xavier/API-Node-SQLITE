import { Router } from "express";
import { createTable, insertPessoa, selectPessoas, selectPessoa, updatePessoa, deletePessoa } from './Controller/Pessoa.js'; 


import { createTableEmpresa, insertEmpresa, selectEmpresas, selectEmpresa, updateEmpresa, deleteEmpresa } from './Controller/Empresa.js';

const router = Router()

router.get('/', (req, res) => {
    res.json({
        "statusCode" : 200, 
        "msg" : "Api rodando!"
    })
})

router.get('/pessoas', selectPessoas);
router.get('/pessoa', selectPessoa);
router.post('/pessoa', insertPessoa); 
router.put('/pessoa', updatePessoa); 
router.delete('/pessoa', deletePessoa); 

router.get('/empresas', selectEmpresas); 
router.get('/empresa', selectEmpresa); 
router.post('/empresa', insertEmpresa); 
router.put('/empresa', updateEmpresa); 
router.delete('/empresa', deleteEmpresa); 

export default router; 