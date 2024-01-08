const url_base = "http://localhost:3000"; 

const buttonListar = document.getElementById('button-listar'); 
const table = document.getElementById('table'); 
const tableBody = document.getElementById('table-body'); 

const formConsultarId = document.getElementById('form-consultar-id'); 
const formCadastrar = document.getElementById('form-cadastrar'); 
const formAtualizar = document.getElementById('form-atualizar');
const formDeletar = document.getElementById('form-deletar'); 


buttonListar.addEventListener('click', () => {
    fetchPeopleApi(); 
})

formConsultarId.addEventListener('submit', (e) => {
    e.preventDefault(); 
    
    const formData = Object.fromEntries(new FormData(formConsultarId)); 
     
    fetchPersonApi(formData.id); 
})

formCadastrar.addEventListener('submit', (e) => {
    e.preventDefault(); 

    const formData = Object.fromEntries(new FormData(formCadastrar)); 
    fetchRegisterPerson(formData); 
    
})

formAtualizar.addEventListener('submit', (e) => {
    e.preventDefault()

    const formData = Object.fromEntries(new FormData(formAtualizar)); 
    
    fetchUpdatePerson(formData); 
})

formDeletar.addEventListener('submit', (e) => {
    e.preventDefault(); 

    const formData = Object.fromEntries(new FormData(formDeletar)); 

    fetchDeletePerson(formData); 
})

const fetchPeopleApi = () => {
    const url = `${url_base}/pessoas`; 

    fetch(url)
    .then(response => response.json())
    .then(data => {
        printPeopleInScreen(data); 
        console.log(data)
    })
}

const fetchPersonApi = (id) => {
    const url = `${url_base}/pessoa?id=${id}`
    
    fetch(url)
    .then(response => response.json())
    .then(data => {
        printPersonInScreen(data)
        console.log(data); 
    }); 
}

const fetchRegisterPerson = (person) => {
    const url = `${url_base}/pessoa`; 
    
    fetch(url, {
        method: "POST", 
        headers: {
            "Content-Type" : "application/json"
        }, 
        body: JSON.stringify(person)
    })

    .then(response => response.json())
    .then(response => {
        if (!response) {
            alert('Server not working!')
        
        } else {
            formCadastrar.reset()
            alert("Person registered!")
        }
    })
}

const fetchUpdatePerson = (person) => {
    const url = `${url_base}/pessoa`; 

    fetch(url, {
        method: "PUT", 
        headers: {
            "Content-Type" : "application/json"
        }, 
        body: JSON.stringify(person)
    })

    .then(response => response.json())
    .then(response => {
        if (!response) {
            alert("Server not working"); 
        } else {
            formAtualizar.reset()
            alert("Update executed!");
        }
    })
}

const fetchDeletePerson = (id) => {
    const url = `${url_base}/pessoa`; 

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
            alert("Server not working!")
        } else {
            formDeletar.reset()
            alert("Delete executed!"); 
        }
    })
}

const printPeopleInScreen = (data) => {
    tableBody.textContent = "";

    data.forEach(register => {
        const row = document.createElement('tr'); 
        
        row.innerHTML = `
            <td> ${register.id} </td>
            <td> ${register.nome} </td>
            <td> ${register.idade} </td>
        `
        tableBody.append(row);
        table.append(tableBody);
    })
}

const printPersonInScreen = (data) => {
    tableBody.textContent = ""

    const row = document.createElement('tr')
    
    row.innerHTML = `
        <td> ${data.id} </td>
        <td> ${data.nome} </td>
        <td> ${data.idade} </td> 
    `
    tableBody.append(row)
    table.append(tableBody);
}