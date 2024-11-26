// Inicializa o carrinho vazio e o total
let carrinho = [];
let totalCarrinho = 0;

// Função para adicionar um item ao carrinho
function BuyerConfirm() {
    // Recupera as informações do produto
    const imagemProduto = event.target.closest('.card-produto').querySelector('.img-item img').src;
    console.log(imagemProduto)
    const produtoNome = event.target.closest('.card-produto').querySelector('.item-description p').innerText;
    const produtoPreco = parseFloat(event.target.closest('.card-produto').querySelector('.item-description span i').innerText.replace('R$', '').replace(',', '.').replace('.', '').trim());

    // Adiciona o produto ao carrinho
    carrinho.push({ imagem: imagemProduto, nome: produtoNome, preco: produtoPreco });

    // Atualiza o total do carrinho
    totalCarrinho += produtoPreco;

    // Exibe o modal de confirmação
    const modalConfirm = document.querySelector('.modal-confirm');
    modalConfirm.classList.add("active");
    setTimeout(() => modalConfirm.classList.remove("active"),2000);

    // Atualiza a lista de itens no carrinho
    atualizarCarrinho();
}

// Função para atualizar a lista de itens no carrinho e o total
function atualizarCarrinho() {
    const itensCarrinho = document.getElementById('itens-carrinho');
    const totalElemento = document.getElementById('total-carrinho');

    // Limpa a lista de itens
    itensCarrinho.innerHTML = '';

    // Adiciona os itens do carrinho à lista
    carrinho.forEach((item, index) => {
        const minicard = document.createElement('div');
        minicard.classList.add('card-carrinho');

        // Conteúdo do minicard
        minicard.innerHTML = `
            <div class="img-carrinho">
                <img src="${item.imagem}" alt="imagem produto">
            </div>

            <div class="carrinho-description">
                <h3 class="nome-produto">${item.nome}</h3>
                <p class="preco-produto">R$${item.preco.toFixed(2).replace(".", ",")}</p>
                <input type="number" min="1" value="1">
            </div>

            <button class="remover-produto" onclick="removerProduto(${index})"><ion-icon name="trash-bin-outline"></ion-icon></button>
        `;

        // Adiciona o minicard ao carrinho
        itensCarrinho.appendChild(minicard);
    });

    // Atualiza o total do carrinho
    totalElemento.textContent = totalCarrinho.toFixed(2);
}

// Função para remover um produto do carrinho
function removerProduto(index) {
    // Remove o item do carrinho
    const produtoRemovido = carrinho.splice(index, 1)[0];

    // Atualiza o total do carrinho
    totalCarrinho -= produtoRemovido.preco;

    // Atualiza a lista de itens no carrinho
    atualizarCarrinho();
}

// Função para finalizar a compra
function finalizarCompra() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio. Adicione itens para finalizar a compra.");
        return;
    }

    // Exibe uma mensagem de sucesso
    alert("Compra finalizada com sucesso! Total: R$" + totalCarrinho.toFixed(2));

    // Limpa o carrinho e o total
    carrinho = [];
    totalCarrinho = 0;

    // Atualiza a interface
    atualizarCarrinho();
}
