// import { openDb } from '../configDB.js'; 
import { openDb } from "../configDB.js";

export async function createTableEmpresa() {
    openDb().then(db => {
        db.exec('CREATE TABLE IF NOT EXISTS Empresa (id INTEGER PRIMARY KEY, nome_empresa TEXT, cnpj TEXT, endereco TEXT)'); 
    })
}

export async function selectEmpresas (req, res) {
    return openDb().then(db => {
        return db.all('SELECT * FROM Empresa')
        .then(empresas => res.json(empresas)); 
    })
}

export async function selectEmpresa (req, res) {
    let id = req.query.id; 

    return openDb().then(db => {
        return db.get('SELECT * FROM Empresa WHERE id = ?', [id])
        .then(empresa => res.json(empresa));
    })
}

export async function insertEmpresa(req, res) {
    let empresa = req.body; 
    openDb().then(db => {
        db.run('INSERT INTO Empresa (nome_empresa, cnpj, endereco) VALUES (?,?,?)', [empresa.nome_empresa, empresa.cnpj, empresa.endereco]); 
    })
    res.json({
        "statusCode" : 200
    })

}

export async function updateEmpresa(req, res) {
    let empresa = req.body; 
    openDb().then(db => {
        db.run('UPDATE Empresa SET nome_empresa = ?, cnpj = ?, endereco = ? WHERE id = ?', [empresa.nome_empresa, empresa.cnpj, empresa.endereco, empresa.id]); 
    })

    res.json({
        "statusCode" : 200
    })
}

export async function deleteEmpresa  (req, res) {
    let id = req.body.id
     openDb().then(db => {
        db.get('DELETE FROM Empresa WHERE id = ?', [id])
        .then(res => res)
    })

    res.json({
        "statusCode" : 200
    })
}