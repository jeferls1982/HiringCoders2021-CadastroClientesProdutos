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

var cards_produtos = document.getElementById('cards_produtos')
if (localStorage.getItem('produtos')) {
    var produtos = JSON.parse(localStorage.getItem('produtos'))
    const path_static_img = 'static/img/'
    var listaCardsProdutos = "";

    produtos.forEach(produto => {
        if (produto.promocao == "true") {
            listaCardsProdutos += `
        <div class="col">
            <div class="card p-3 shadow-sm m-3">
            <img src="${path_static_img}${produto.img}" class="card-img-top" alt="${produto.nome}" width="100px">
            <div class="card-body">
                <h5 class="card-title">${produto.nome}</h5>
                <p class="card-text text-danger justify-content-end">R$ ${produto.valorVenda}</p>
                <p><small>${produto.descricao}</small></p>
            </div>
            </div>
        </div>
        `
        }

    });

    cards_produtos.innerHTML = listaCardsProdutos
} else {
    let msg = document.getElementById("semProdutos")
    msg.innerHTML = `<h1 class="m-3 alert alert-danger">Nenhum produto cadastrado</h1>`
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
    window.location.href = "index.html";
}


