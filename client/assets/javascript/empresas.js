const url_base = "http://localhost:3000"; 

const buttonListar = document.getElementById('button-listar');
const table = document.getElementById('table'); 
const tableBody = document.getElementById('table-body'); 

const formConsultarId = document.getElementById('form-consultar-id'); 
const formCadastrar = document.getElementById('form-cadastrar'); 
const formAtualizar = document.getElementById('form-atualizar'); 
const formDeletar = document.getElementById('form-deletar'); 


buttonListar.addEventListener('click', () => {
    fetchCompaniesApi();
});

formConsultarId.addEventListener('submit', (e) => {
    e.preventDefault()

    const formData = Object.fromEntries(new FormData(formConsultarId).entries())

    fetchCompanyApi(formData.id)
})

formCadastrar.addEventListener('submit', (e) => {
    e.preventDefault(); 

    const formData = Object.fromEntries(new FormData(formCadastrar).entries()); 
    
    fetchRegisterCompany(formData); 
})

formAtualizar.addEventListener('submit', (e) => {
    e.preventDefault(); 

    const formData = Object.fromEntries(new FormData(formAtualizar).entries());
    
    fetchUpdateCompany(formData); 
})

formDeletar.addEventListener('submit', (e) => {
    e.preventDefault(); 

    const formData = Object.fromEntries(new FormData(formDeletar).entries()); 

    fetchDeleteCompany(formData); 
})


const fetchCompaniesApi = () => {
    const url = `${url_base}/empresas`; 

    fetch(url)
    .then(response => response.json())
    .then(data => {
        printCompaniesInScreen(data); 
    })
}

const fetchCompanyApi = (id) => {
    const url = `${url_base}/empresa?id=${id}`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        printCompanyScreen(data)
    }); 

}

const fetchRegisterCompany = (company) => {
    const url = `${url_base}/empresa`; 

    fetch(url, {
        method: "POST", 
        headers: {
            "Content-Type" : "application/json" 
        }, 
        body: JSON.stringify(company)
    })
    .then(response => response.json())
    .then(response => {
        if (!response) {
            alert("Server not working!")
        } else {
            formCadastrar.reset()
            alert("Register executed!"); 
        }
    })
}

const fetchUpdateCompany = (company) => {
    const url = `${url_base}/empresa`; 

    fetch(url, {
        method: "PUT", 
        headers: {
            "Content-Type" : "application/json"
        }, 
        body: JSON.stringify(company)
    })
    .then(response => response.json())
    .then (response => {
        if (!response) {
            alert("Server not working!")
        } else {
            formAtualizar.reset(); 
            alert("Update executed!"); 
        }
    })
}

const fetchDeleteCompany = (id) => {
    const url = `${url_base}/empresa`; 

    fetch(url, {
        method: "DELETE", 
        headers: {
            "Content-Type" : "application/json"
        }, 
        body: JSON.stringify(id)
    })
    .then(response => response.json())
    .then(response => {
        if (!response) {
            alert("Server not working!");
        } else {
            formDeletar.reset(); 
            alert("Delete executed!"); 
        }
    })
}

const printCompaniesInScreen = (data) => {
    tableBody.textContent = ""; 

    data.forEach(register => {
        const row = document.createElement('tr'); 

        row.innerHTML = `
            <td> ${register.id}</td>
            <td> ${register.nome_empresa}</td>
            <td> ${register.cnpj}</td>
            <td> ${register.endereco}</td>
        `
        
        tableBody.append(row); 
        table.append(tableBody); 

    });
};

const printCompanyScreen = (data) => {
    tableBody.textContent = ""; 

    const row = document.createElement('tr'); 

    row.innerHTML = `
        <td> ${data.id}</td>
        <td> ${data.nome_empresa}</td>
        <td> ${data.cnpj}</td>
        <td> ${data.endereco}</td>
    `

    tableBody.append(row); 
    table.append(tableBody); 
}

