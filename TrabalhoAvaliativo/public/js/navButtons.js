
const inicio = document.getElementById("nav-inicio")
const produtos = document.getElementById("nav-produtos")
const meusProdutos = document.getElementById("nav-meus-produtos")
const criarProduto = document.getElementById("nav-criar-produto")



inicio.addEventListener("click",async ()=>{
    const params = new URLSearchParams(window.location.search);
    const userId = params.get("id");
    window.location.href = `../TelaInicial/telaInicial.html?id=${encodeURIComponent(userId)}`;
})

produtos.addEventListener("click",async ()=>{
    const params = new URLSearchParams(window.location.search);
    const userId = params.get("id");
    window.location.href = `../produtos/produtos.html?id=${encodeURIComponent(userId)}`;
})

meusProdutos.addEventListener("click",async ()=>{
    const params = new URLSearchParams(window.location.search);
    const userId = params.get("id");
    window.location.href = `?id=${encodeURIComponent(userId)}`;
})

criarProduto.addEventListener("click",async ()=>{
    const params = new URLSearchParams(window.location.search);
    const userId = params.get("id");
    window.location.href = `../criarProduto/criarProduto.html?id=${encodeURIComponent(userId)}`;
})

/**
 * <header>
        <img id="logo-do-site" src="https://www.pichau.com.br/logo-pichau-2021-dark.png" alt="Logo do site">
        <div class="header-container">
            <nav class="nav-buttons">
                <button id="nav-inicio"> Inicio </button>
                <button id="nav-produtos"> Produtos </button>
                <button id="nav-meus-produtos"> Meus produtos</button>
                <button id="nav-criar-produto"> Criar Produto</button>
            </nav>
            <form class="pesquisar">
                <input id="barra-de-pesquisa" type="text" placeholder="pesquisar" aria-label="Pesquisar">
                <button type="submit">Buscar</button>
            </form>
        </div>
    </header>
 */