export async function getUserByEmail(email) {
    try{
        console.log("Buscando usuário pelo email:", email);
        const res = await fetch(`http://localhost:3000/api/users/email/${encodeURIComponent(email)}`,{
            method:"GET",
            headers:{
                "Content-Type": "application/json"
            },
        });

        console.log("Resposta do servidor getUserByEmail:", res.status);

        if(res.ok){
            const data = await res.json();
            console.log("Dados do usuário obtidos:", data);
            return data;
        } else{
            const data = await res.json();
            console.warn("Erro na API getUserByEmail:", data);
            alert(data.message || "Erro ao realizar getUserByEmail!")
            return null;
        }
    } catch(error) {
        alert("Erro bizonho em show.js!");
        console.error("Erro ao criar usuário: ", error)
        return null;
    }
}