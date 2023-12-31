import { openDb } from '../configDB.js'; 

export async function createTableEmpresa() {
    openDb().then(db => {
        db.exec('CREATE TABLE IF NOT EXISTS Empresa (id INTEGER PRIMARY KEY, nome_empresa TEXT, cnpj TEXT, endereco TEXT)'); 
    })
}

export async function insertEmpresa(empresa) {
    openDb().then(db => {
        db.run('INSERT INTO Empresa (nome_empresa, cnpj, endereco) VALUES (?,?,?)', [empresa.nome_empresa, empresa.cnpj, empresa.endereco]); 
    })
}

export async function selectEmpresas () {
    return openDb().then(db => {
        return db.all('SELECT * FROM Empresa')
        .then(res => res); 
    })
}

export async function selectEmpresa (id) {
    return openDb().then(db => {
        return db.get('SELECT * FROM Empresa WHERE id = ?', [id])
        .then(res => res);
    })
}

export async function updateEmpresa(empresa) {
    openDb().then(db => {
        db.run('UPDATE Empresa SET nome_empresa = ?, cnpj = ?, endereco = ? WHERE id = ?', [empresa.nome_empresa, empresa.cnpj, empresa.endereco, empresa.id]); 
    })
}

export async function deleteEmpresa (id) {
    return openDb().then(db => {
        return db.get('DELETE FROM Empresa WHERE id = ?', [id])
        .then(res => res)
    })
}


