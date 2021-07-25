
if(!localStorage.getItem('clientes')){
    localStorage.setItem('clientes',JSON.stringify([]))
    clientes()
}
//------------------------------------------------------------inicializando o array ----------------------------------

function clientes() {
    localStorage.setItem('listaClientes', false);
    clientes = [
        { "id": "1", "nome": "Jeferson Silveira", "cpf": "12.123.123-12", "email": "jef@email.com", "telefone": "42984455221", "cep": "84050550", "numero": "1100", "complemento": "casa", "dataNascimento": "1982-05-13" },
        { "id": "2", "nome": "Ana Almeida", "cpf": "12.123.123-12", "email": "ana@email.com", "telefone": "42984455221", "cep": "84050550", "numero": "1100", "complemento": "casa", "dataNascimento": "1986-05-13" },
        { "id": "3", "nome": "Ivo Silva", "cpf": "12.123.123-12", "email": "ivo@email.com", "telefone": "42984455221", "cep": "84050550", "numero": "1100", "complemento": "casa", "dataNascimento": "1977-05-13" },
        { "id": "4", "nome": "Zeno Calisto", "cpf": "12.123.123-12", "email": "zeno@email.com", "telefone": "42984455221", "cep": "84050550", "numero": "1100", "complemento": "casa", "dataNascimento": "1994-05-13" }
    ]
    let lista = JSON.stringify(clientes);
    localStorage.setItem('clientes', lista);
    localStorage.setItem('listaClientes', true);
    clientes = JSON.parse(localStorage.getItem('clientes'))
}
//------------------------------------------------------------inicializa localstorage se não existir ainda
if (!localStorage.getItem('listaClientes')) {
    clientes();
}

//-------------------------------------------------------------declaraçao das variaveis que vem dos inputs
clientes = JSON.parse(localStorage.getItem('clientes'))



var id = clientes.length;
var nome = document.getElementById('nome');
var cpf = document.getElementById('cpf');
var email = document.getElementById('email');
var telefone = document.getElementById('telefone');
var cep = document.getElementById('cep');
var numero = document.getElementById('numero');
var complemento = document.getElementById('complemento');
var dataNascimento = document.getElementById('dataNascimento');
var btnSubmit = document.getElementById('btnSubmit');
var erro = document.getElementById('erro');
// -------------------------------------------------- analisa se todos os inpputs estiver com dados
// ----------------------------------------------------- e ativa o botão submit
function ativarSubmit() {
    let flag = true;
    var form = document.getElementsByTagName('input');
    for (let i = 0; i < form.length - 1; i++) {
        if (form[i].value == "") {
            flag = false;
        }
    }
    if (flag) {
        btnSubmit.removeAttribute('disabled')
        erro.classList.add("d-none");
    } else {
        erro.classList.remove("d-none")
    }
}
// ----------------------------------------------  ativa o campo numero depois que o usuario preenche o cep
function ativarNumero() {
    if (cep.value) {
        numero.removeAttribute('disabled')
        complemento.removeAttribute('disabled')
    }
}
function save() {
    loading();
    mostraModal();
    setClient();
    setStorage();

};
function loading() {
    var loader = document.getElementById('loader');
    loader.classList.remove('d-none');
    setTimeout(function () {
        loader.classList.add('d-none')
    }, 3000);
}
// ----------------------------------------coloca o cliente criado no array antes de salvar no local storage
function setClient() {
    console.log(clientes)
    var cliente = {
        'id': clientes.length + 1,
        'nome': nome.value,
        'cpf': cpf.value,
        'email': email.value,
        'telefone': telefone.value,
        'cep': cep.value,
        'numero': numero.value,
        'complemento': complemento.value,
        'dataNascimento': dataNascimento.value
    }
    clientes.push(cliente);
    return;
}
// -----------------------------------------------------------------salva os dados no localstorage
function setStorage() {
    console.log(clientes)
    localStorage.setItem('clientes', JSON.stringify(clientes));
    return;
}


// ---------------------------------------------------------------funcoes do modal
function mostraModal() {
    let modalSuccess = document.getElementById('modal-success')
    let modal = document.getElementById('modal-info');
    modalSuccess.classList.remove('d-none');
    // -----------------------------------------------------------fecha modal    
    modal.classList.remove('d-none');
    montarModal()
}

function montarModal() {
    
    var table = document.getElementById('table-modal')
    let linhaModal =`
        <tr>
            <td>Nome</td>
            <td>${nome.value}</td>
        </tr>
        <tr>
            <td>Email</td>
            <td>${email.value}</td>
        </tr>
        <tr>
            <td>Telefone</td>
            <td>${telefone.value}</td>
        </tr>
        <tr>
            <td>CPF</td>
            <td>${cpf.value}</td>
        </tr>
    ` ;
    table.innerHTML = linhaModal;
    
    
}

function fechaModal() {
    let modalSuccess = document.getElementById('modal-success')
    let modal = document.getElementById('modal-info');
    modalSuccess.classList.add('d-none');
    modal.classList.add('d-none');
    // -----------------------------------------------------------fecha modal
    window.location.href = "index.html";
}




// let clienteTexto = '{"nome":"Angelo", "idade":86, "cidade":"São Paulo", "estado":"SP"}'
// let cliente = JSON.parse(clienteTexto)
if (localStorage.getItem('listaClientes')) {
    var linhas = ""
    clientes.forEach(e => {
        linhas += `<tr>
                  <th scope='row'>${e['email']}</th>
                  <td>${e['nome']}</td>
                  <td>${getIdade(e['dataNascimento'])}</td>
                  <td>${e['telefone']}</td>
                </tr>`
    });
}




document.getElementById("table-clientes").innerHTML = linhas







// -----------------------------------------------------funcao calcula idade em anos
function getIdade(dataNascimento) {
    const now = new Date(); // Data de hoje
    const nasc = new Date(dataNascimento); // Outra data no passado
    const diff = Math.abs(now.getTime() - nasc.getTime()); // Subtrai uma data pela outra
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24)); // Divide o total pelo total de milisegundos correspondentes a 1 dia. (1000 milisegundos = 1 segundo).
    const anos = Math.round(days / 365);
    return `${anos} anos`
}






if(localStorage.getItem('user')){
    let login = document.querySelectorAll(".userOff")
    login.forEach(element => {
        element.classList.add("d-none")
    });
    const usuario = document.getElementById('userLogado');
    usuario.innerHTML = localStorage.getItem('user')
}else{
    let login = document.querySelectorAll(".userOn")
    login.forEach(element => {
        element.classList.add("d-none")
    });
}
function login(params) {    
    let user = document.getElementById('user').value    
    let msg = `Bem vindo: <i>${user}</i>`
    localStorage.setItem('user', msg )
    window.location.href = "index.html";
}

function logout(){    
    let login = document.querySelectorAll(".userOn")
    login.forEach(element => {
        element.classList.add("d-none")
    });
    localStorage.removeItem('user')
    window.location.href = "../../index.html";
}














// ---------------------------------------------------------funcao para consulta no viaCep
function limpa_formulário_cep() {
    //Limpa valores do formulário de cep.
    document.getElementById('logradouro').value = ("");

    document.getElementById('cidade').value = ("");
    document.getElementById('uf').value = ("");

}

function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.
        document.getElementById('logradouro').value = (conteudo.logradouro);

        document.getElementById('cidade').value = (conteudo.localidade);
        document.getElementById('uf').value = (conteudo.uf);

    } //end if.
    else {
        //CEP não Encontrado.
        limpa_formulário_cep();
        alert("CEP não encontrado.");
    }
}

function pesquisacep(valor) {

    //Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if (validacep.test(cep)) {

            //Preenche os campos com "..." enquanto consulta webservice.
            document.getElementById('logradouro').value = "...";

            document.getElementById('cidade').value = "...";
            document.getElementById('uf').value = "...";


            //Cria um elemento javascript.
            var script = document.createElement('script');

            //Sincroniza com o callback.
            script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=meu_callback';

            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);

        } //end if.
        else {
            //cep é inválido.
            limpa_formulário_cep();
            alert("Formato de CEP inválido.");
        }
    } //end if.
    else {
        //cep sem valor, limpa formulário.
        limpa_formulário_cep();
    }
};

