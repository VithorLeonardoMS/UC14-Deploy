import { showUser } from "../../../js/showUser.js";

const form = document.getElementById("criar-produto");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const image = document.getElementById("imagem").value;
    const name = document.getElementById("nome").value;
    const brand = document.getElementById("marca").value;
    const model = document.getElementById("modelo").value;
    const price = Number(document.getElementById("preco").value);
    const description = document.getElementById("descricao").value;
    
    const params = new URLSearchParams(window.location.search);
    const userId = params.get("id");

    const userParams = {
        image,
        name,
        brand,
        model,
        price,
        description,
        userId
    }
    
    try{
        const res = await fetch("http://localhost:3000/api/product",{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userParams)
        });

        if(res.ok){
            alert("Produto criado com sucesso main.js");
        } else{
            const data = await res.json();
            alert(data.mensagem || "Erro ao ao criar produto main.js!")
        }
    } catch(error) {
        alert("Erro bizonho!");
        console.error("Erro ao criar usuário: ", error)
    }
})
