const uriCreate = '../../Dependentes/Post';
const uriList = '../../Dependentes/GetList/' + document.getElementById('Id').value;
const uriDelete = '../../Dependentes/Delete/';
const uriPut = '../../Dependentes/Put/';
const uriGetItem = '../../Dependentes/GetItem/';

//Vai no banco e trás todos os dependentes
listItem();


//Função de adicionar um novo item
function addItem() {
    const addNome = document.getElementById('ModalNome');
    const addParentesco = document.getElementById('ModalParentesco');
    const addDataNascimento = document.getElementById('ModalDataNascimento');
    const addPessoaId = document.getElementById('Id');

    const dependente = {
        "Nome": addNome.value.trim(),
        "Parentesco": addParentesco.value.trim(),
        "DataNascimento": new Date(addDataNascimento.value.trim().replace(/(\d+[/])(\d+[/])/, '$2$1')),
        "PessoaId": addPessoaId.value.trim(),
    };

    fetch(uriCreate, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dependente),
    })
        .then(response => response.json())
        .then(() => {
            listItem();
            ExibirMensagem();
        })
        .catch(error => console.error('Ocorreu um erro: ', error));
}

//Função que faz a requisição dos dependentes
function listItem() {
    fetch(uriList).then(function (response) {
        response.json().then(function (data) {
            //Pega a lista de objeto JSON para adicionar no body da tabela
            addBodyTable(data); 
        });
    }).catch(function (err) {
        console.error('Failed retrieving information', err);
    });
}

//Função responsavel por popular o corpo da tabela no HTML, atraves do JSON que foi retornado  pelo listItem
function addBodyTable(data) {
    //Função que limpa a tabela caso esteja populado, para evitar que duplique itens
    cleanList();

    var table = document.getElementById('table-dependente');
    data.forEach(function (object) {
        //Formatando a data para o padrão BR
        var date = new Date(object.dataNascimento)
        var dateFormat = (String(date.getDate()).padStart(2, '0')) + "/" + String((date.getMonth() + 1)).padStart(2, '0') + "/" + date.getFullYear()


        var tr = document.createElement('tr');
        tr.innerHTML = '<td>' + object.nome + '</td>' +
            '<td>' + object.parentesco + '</td>' +
            '<td>' + dateFormat + '</td>' +
            '<button type="button" class="btn btn-primary" onclick="editGetItem(\'' + object.id + '\')" data-toggle="modal" data-target="#modalDependenteEdit">Editar</button>' +
            '<button type="button" class="btn btn-danger" onclick="deleteItem(\'' + object.id + '\')">Deletar</button>';
        table.appendChild(tr);
    });
}

//Função que limpa o body da tabela
function cleanList() {
    const table = document.getElementById('table-dependente');
    while (table.firstChild) {
        table.removeChild(table.lastChild);
    }
}

//Função que deleta o item
function deleteItem(Id) {
    fetch(uriDelete + Id, {
        method: 'DELETE',
    }).then(function () {
        listItem();
        ExibirMensagem();
    }).catch(function (err) {
        console.error('Failed retrieving information', err);
    });
}

//Função que tras informações de um dependente especifico para popular o modal de edit
function editGetItem(Id) {
    fetch(uriGetItem + Id, {
        method: 'GET',
    }).then(function (response) {
        response.json().then(function (data) {
            var date = new Date(data.dataNascimento)
            var dateFormat = (String(date.getDate()).padStart(2, '0')) + "/" + String((date.getMonth() + 1)).padStart(2, '0') + "/" + date.getFullYear()

            document.getElementById('ModalNomeEdit').value = data.nome;
            document.getElementById('ModalParentescoEdit').value = data.parentesco;
            document.getElementById('ModalDataNascimentoEdit').value = dateFormat;
            document.getElementById('ModalIdDependenteEdit').value = data.id;

        });
    }).catch(function (err) {
        console.error('Failed retrieving information', err);
    });
}

//Função que manda as informações para ser editada na controller
function editItem() {
    const addNome = document.getElementById('ModalNomeEdit');
    const addParentesco = document.getElementById('ModalParentescoEdit');
    const addDataNascimento = document.getElementById('ModalDataNascimentoEdit');
    const addPessoaId = document.getElementById('Id');
    const addIdDependente = document.getElementById('ModalIdDependenteEdit');

    const dependente = {
        "Id": addIdDependente.value,
        "Nome": addNome.value.trim(),
        "Parentesco": addParentesco.value.trim(),
        "DataNascimento": new Date(addDataNascimento.value.trim().replace(/(\d+[/])(\d+[/])/, '$2$1')),
        "PessoaId": addPessoaId.value.trim(),
    };

    fetch(uriPut + addIdDependente.value, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dependente)
    }).then(function () {
        listItem();
        ExibirMensagem();
    }).catch(function (err) {
        console.error('Failed retrieving information', err);
    });
}