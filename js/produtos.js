if (localStorage.getItem('user')) {
    let login = document.querySelectorAll(".userOff")
    login.forEach(element => {
        element.classList.add("d-none")
    });
    const usuario = document.getElementById('userLogado');
    usuario.innerHTML = localStorage.getItem('user')
} else {
    let login = document.querySelectorAll(".userOn")
    login.forEach(element => {
        element.classList.add("d-none")
    });
}
function login(params) {
    let user = document.getElementById('user').value
    let msg = `Bem vindo: <i>${user}</i>`
    localStorage.setItem('user', msg)
    window.location.href = "index.html";
}

function logout() {
    let login = document.querySelectorAll(".userOn")
    login.forEach(element => {
        element.classList.add("d-none")
    });
    localStorage.removeItem('user')
    window.location.href = "../../index.html";
}

if (!localStorage.getItem('produtos')) {
    localStorage.setItem('produtos', JSON.stringify([]))

}
var produtos = JSON.parse(localStorage.getItem('produtos'));
var cards_produtos = document.getElementById('cards_produtos');
const path_static_img = '../../static/img/'


function testCategorias() {
    var categorias = JSON.parse(localStorage.getItem('categorias'))
    if (categorias.length == 0) {
        alert("Você precisa cadastrar pelo menos uma Categoria")
        window.location.href = "index.html";
    } else {
        setSelect();
    }
}
listarProdutos()
function listarProdutos() {
    var listaCardsProdutos = "";

    produtos.forEach(produto => {

        listaCardsProdutos +=
            `
    <div class="col">
        <div class="card p-3 shadow-sm m-3">
        <img src="${produto.img}" class="card-img-top" alt="${produto.nome}" width="100px">
        <div class="card-body">
            <h5 class="card-title">${produto.nome}</h5>
            <p class="card-text text-danger justify-content-end">R$ ${produto.valorVenda}</p>
            <p><small>${produto.descricao}</small></p>
        </div>
        </div>
    </div>
    `
    });

    cards_produtos.innerHTML = listaCardsProdutos
}


// --------------------------------------------------------------------salvar produto
//-----------------------------------------------------------------montando select categorias
function setSelect() {
    var categorias = JSON.parse(localStorage.getItem('categorias'))
    const selectCategoria = document.getElementById('selectCategoria');
    var optionsCategorias = "<option>Selecione...</option>"
    categorias.forEach(categoria => {
        optionsCategorias += `<option value="${categoria.id}">${categoria.nome}</option>`
    });
    selectCategoria.innerHTML = optionsCategorias;
}

//------------------------------------------------------------------fim do select
class Produto {
    id;
    categoria;
    nome;
    prodCodigo;
    descricao;
    valorCompra;
    valorVenda;
    promocao;
    estoque;
    img
}


function setProduto() {
    var produto = new Produto();
    produto.id = produtos.length
    produto.categoria = document.getElementById('selectCategoria').value
    produto.nome = document.getElementById('prodNome').value
    produto.codigo = document.getElementById('prodCodigo').value
    produto.descricao = document.getElementById('prodDescricao').value
    produto.valorCompra = document.getElementById('valorCompra').value
    produto.valorVenda = document.getElementById('valorVenda').value
    produto.estoque = document.getElementById('estoque').value
    produto.promocao = document.querySelector('input[name="promocao"]:checked').value;
    produto.img = document.getElementById('img').value;
    return produto
    console.log(produto)
}

function validaProduto(produto) {
    if (
        produto.nome == "" ||
        produto.codigo == "" ||
        produto.descricao == "" ||
        produto.valorCompra == "" ||
        produto.valorVenda == "" ||
        produto.estoque == "" ||
        produto.promocao == ""
    ) {
        return false;
    } else {
        return true;
    }
}
function setMsg(status, msg) {
    let msgOk = document.getElementById('msgOk');
    let msgErro = document.getElementById('msgErro');
    if (status) {
        msgErro.classList.add("d-none")
        msgOk.classList.remove("d-none")
    } else {
        msgOk.classList.add("d-none")
        msgErro.classList.remove("d-none")
    }
}
function enableSubmit(params) {
    submitProduto.removeAttribute("disabled")
}



const submitProduto = document.getElementById('cadastraProduto');
submitProduto.addEventListener("click", function (e) {
    e.preventDefault();
    var produto = setProduto();
    alert("Produto cadastrado com sucesso :)")
    if (validaProduto(produto)) {
        setMsg(true, "Produto Cadastrado!")
        produtos.push(produto)
        localStorage.setItem('produtos', JSON.stringify(produtos))
        listarProdutos()
        window.location.href = "index.html";
    } else {
        setMsg(false, "Preencha todos os campos")
    }



})






function limparProdutos() {
    localStorage.setItem('produtos', JSON.stringify([]))
    window.location.href = "index.html";
}




