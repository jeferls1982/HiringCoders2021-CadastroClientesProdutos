//---------------------------------------------------------criando local storage se não existir
if(!localStorage.getItem('categorias')){
    localStorage.setItem('categorias', JSON.stringify([]))
}
if(!localStorage.getItem('categorias')){
    localStorage.setItem('categorias', JSON.stringify([]))
}
var categorias = JSON.parse(localStorage.getItem('categorias'))
var produtos = JSON.parse(localStorage.getItem('produtos'));
console.log(produtos.length)

if (!categorias) {
    categorias = [
        { id: 0, nome: "Eletros" }
    ]
    localStorage.setItem('categorias', JSON.stringify(categorias))
    this.listarCategorias()
} else {
    categorias = JSON.parse(localStorage.getItem('categorias'))
    this.listarCategorias()
}

//categorias.push({ id: 1, nome: "Móveis planejados" })
// --------------------------------------------------------------------------------

// -------------------------------------------------------------------listando categorias

function listarCategorias() {
    var listaCategorias = document.getElementById('listaCategorias')
    let lsCat = "";
    categorias.forEach(cat => {
        //----------------------------------contar produtos por categoria
            let count = 0
            produtos.forEach(prod => {
                if(prod.categoria == cat.id){
                    count++                    
                }
            });

            lsCat +=
                `
        <button type="button" class="btn btn-primary m-3">
            ${cat.nome} <span class="badge bg-secondary">${count}</span>
        </button>
        `
    })
    listaCategorias.innerHTML = lsCat
}
const btn = document.getElementById('submit');
btn.addEventListener("click", function (e) {
    e.preventDefault();
    let categoria = document.getElementById('inputCategoria').value;
    let id = categorias.length
    categorias.push({ id: id, nome: categoria })
    localStorage.setItem('categorias', JSON.stringify(categorias));
    listarCategorias()
    document.getElementById('inputCategoria').value = "";

})

function limparCategorias() {
    localStorage.setItem('produtos', JSON.stringify([]))
    localStorage.setItem('categorias', JSON.stringify([]))
    window.location.href = "index.html";
}






