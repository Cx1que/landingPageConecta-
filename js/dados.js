const url = "https://app-avaliacao-brh0avd2ahegehac.brazilsouth-01.azurewebsites.net/projeto2/fecaf/listar/contatos";

async function carregarDados() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erro na API: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Dados recebidos:", data);

        if (data.status_code === 200 && Array.isArray(data.contatos)) {
            preencherCards(data.contatos);
        } else {
            console.error("Formato inesperado dos dados:", data);
        }
    } catch (error) {
        console.error("Erro ao carregar dados:", error.message);
    }
}

function preencherCards(contatos) {
    const cardContainer = document.querySelector("#cardProdutos");
    if (!cardContainer) {
        console.error("Elemento #cardProdutos não encontrado no DOM.");
        return;
    }

    cardContainer.innerHTML = "";

    contatos.forEach(contato => {
        const card = document.createElement("div");
        card.classList.add("card");

        const img = document.createElement("img");
        img.src = contato.image || "https://via.placeholder.com/150";
        img.alt = contato.nome || "Imagem não disponível";
        card.appendChild(img);

        const nome = document.createElement("h3");
        nome.textContent = contato.nome || "Nome não informado";
        card.appendChild(nome);

        const telefone = document.createElement("p");
        telefone.textContent = `Telefone: ${contato.telefone || "Não informado"}`;
        card.appendChild(telefone);

        const email = document.createElement("p");
        email.textContent = `E-mail: ${contato.email || "Não informado"}`;
        card.appendChild(email);

        cardContainer.appendChild(card);
    });
}

document.addEventListener("DOMContentLoaded", carregarDados);
