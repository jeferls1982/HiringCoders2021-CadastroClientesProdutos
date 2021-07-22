clientes = [
    { "id": "1", "nome": "Jeferson Silveira", "cpf": "12.123.123-12", "email": "jef@email.com", "telefone": "42984455221", "cep": "84050550", "numero": "1100", "complemento": "casa", "dataNascimento": "1982-05-13" },
    { "id": "2", "nome": "Ana Almeida", "cpf": "12.123.123-12", "email": "ana@email.com", "telefone": "42984455221", "cep": "84050550", "numero": "1100", "complemento": "casa", "dataNascimento": "1986-05-13" },
    { "id": "3", "nome": "Ivo Silva", "cpf": "12.123.123-12", "email": "ivo@email.com", "telefone": "42984455221", "cep": "84050550", "numero": "1100", "complemento": "casa", "dataNascimento": "1977-05-13" },
    { "id": "4", "nome": "Zeno Calisto", "cpf": "12.123.123-12", "email": "zeno@email.com", "telefone": "42984455221", "cep": "84050550", "numero": "1100", "complemento": "casa", "dataNascimento": "1994-05-13" }
]

if (!localStorage.getItem('clientes')) {
    let lista = JSON.stringify(clientes);
    localStorage.setItem('clientes', lista);
} else {
    clientes = JSON.parse(localStorage.getItem('clientes'))
}

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


function ativarNumero() {
    if (cep.value) {
        numero.removeAttribute('disabled')
        complemento.removeAttribute('disabled')
    }
}

function save() {
    this.loading();
    this.mostraModal();
    this.setClient();
    this.setStorage();

};
function loading() {
    var loader = document.getElementById('loader');
    loader.classList.remove('d-none');
    setTimeout(function () {
        loader.classList.add('d-none')
    }, 3000);
}
function setClient() {
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

function setStorage() {
    localStorage.setItem('clientes', clientes);
    return;
}

function montarModal() {
    var table = document.getElementById('table-modal')
    table.innerHTML = `
    <tr>
    <td>Nome:</td>
    <td>${nome.value}</td>
  </tr>
  <tr>
    <td>Dt Nasc:</td>
    <td>${dataNascimento.value}</td>
  </tr>
  <tr>
    <td>Email:</td>
    <td>${email.value}</td>
  </tr>
  <tr>
    <td>CPF:</td>
    <td>${cpf.value}</td>
  </tr>
  <tr>
    <td>Fone:</td>
    <td>${telefone.value}</td>
  </tr>
  <tr>
    <td>Rua:</td>
    <td><small>${logradouro.value}</small></td>
  </tr>
  <tr>
  <tr>
    <td>Numero:</td>
    <td>${numero.value}</td>
  </tr>
  <tr>
  <tr>
    <td>Compl:</td>
    <td>${complemento.value}</td>
  </tr>
  <tr>
    <td>Cidade:</td>
    <td>${cidade.value}</td>
  </tr>
  <tr>
    <td>UF:</td>
    <td>${uf.value}</td>
  </tr>      
    `
}

function mostraModal() {
    let modalSuccess = document.getElementById('modal-success')
    let modal = document.getElementById('modal-info');
    modalSuccess.classList.remove('d-none');
    modal.classList.remove('d-none');
    // -----------------------------------------------------------fecha modal
    
}



function fechaModal() {
    let modalSuccess = document.getElementById('modal-success')
    let modal = document.getElementById('modal-info');
    modalSuccess.classList.add('d-none');
    modal.classList.add('d-none');
    // -----------------------------------------------------------fecha modal
    window.location.href = "index.html";
}










let clienteTexto = '{"nome":"Angelo", "idade":86, "cidade":"São Paulo", "estado":"SP"}'
let cliente = JSON.parse(clienteTexto)

var linhas = ""
clientes.forEach(e => {
    linhas += `<tr>
                  <th scope='row'>${e['email']}</th>
                  <td>${e['nome']}</td>
                  <td>${getIdade(e['dataNascimento'])}</td>
                  <td>${e['telefone']}</td>
                </tr>`
});




document.getElementById("table-clientes").innerHTML = linhas


function getIdade(dataNascimento) {
    const now = new Date(); // Data de hoje
    const nasc = new Date(dataNascimento); // Outra data no passado
    const diff = Math.abs(now.getTime() - nasc.getTime()); // Subtrai uma data pela outra
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24)); // Divide o total pelo total de milisegundos correspondentes a 1 dia. (1000 milisegundos = 1 segundo).
    const anos = Math.round(days / 365);

    return `${anos} anos`

}























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

