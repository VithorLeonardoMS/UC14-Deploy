import { gerarProdutos } from "./gerarProdutos.js";

async function carregarProdutos(){
    try{
        const res = await fetch("http://localhost:3000/api/product",{
            method:"GET",
            headers:{
                "Content-Type": "application/json"
            },
        });
    
        if(res.ok){
            const products = await res.json();
            gerarProdutos(products);
        } else{
            const data = await res.json();
            alert(data.mensagem || "Erro ao realizar criar produto!")
        }
    } catch(error) {
        alert("Erro bizonho!");
        console.error("Erro ao criar usuário: ", error)
    }

}

carregarProdutos();

const deletar = document.getElementById("btn-deletar")

deletar.addEventListener("click", async ()=> {

    // closest(".container") → sobe até o contêiner pai mais próximo.
    const container = deletar.closest(".container");

    // querySelector(".topo-produto h6") → seleciona o <h6> dentro de .topo-produto.
    const productId = Number(container.querySelector(".topo-produto h6.productId").value);

    if(!productId){
        alert("Erro ao deletar produto apartir do id")
        return;
    }

    try{
        const res = await fetch(`http://localhost:3000/api/product/${productId}`,{
            method:"DELETE",
            headers:{
                "Content-Type": "application/json"
            },
        });
    
        if(res.ok){
            alert("Produto deletado com sucesso")
            carregarProdutos();
        } else{
            const data = await res.json();
            alert(data.mensagem || "Erro ao apagar produto!")
        }
    } catch(error) {
        alert("Erro bizonho!");
        console.error("Erro ao deletar produto: ", error)
    }

})
