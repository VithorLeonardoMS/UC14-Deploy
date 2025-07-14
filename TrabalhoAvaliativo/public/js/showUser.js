export async function showUser(id) {
    try{
        const res = await fetch(`http://localhost:3000/api/users/${id}`,{
            method:"GET",
            headers:{
                "Content-Type": "application/json"
            }
        });

        if(res.ok){
            alert("Produto pegado com sucesso em showUser.js");
            return await res.json() 
        } else{
            const data = await res.json();
            alert(data.message || "Erro ao realizar pegar produto pelo id!")
        }
    } catch(error) {
        alert("Erro bizonho em show.js!");
        console.error("Erro ao criar usuário: ", error)
    }
}