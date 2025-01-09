// Variáveis para armazenar o estado do carrinho
let cart = [];
let cartCount = 0;
let cartTotal = 0;

// Função para atualizar o carrinho no front-end
function updateCart() {
    const cartCountElement = document.getElementById('cart-count');
    const cartItemsElement = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    
    // Atualiza o número de itens no carrinho
    cartCountElement.textContent = cartCount;

    // Exibe os itens no carrinho
    cartItemsElement.innerHTML = '';
    cart.forEach((item, index) => {
        const itemElement = document.createElement('p');
        itemElement.textContent = `${item.name} - $${item.price}`;
        
        // Botão para remover o item
        const removeButton = document.createElement('button');
        removeButton.classList.add('remove-btn');
        removeButton.textContent = 'Remover';
        removeButton.onclick = () => removeFromCart(index);

        itemElement.appendChild(removeButton);
        cartItemsElement.appendChild(itemElement);
    });

    // Atualiza o total
    cartTotalElement.textContent = cartTotal.toFixed(2);
}

// Função para adicionar ao carrinho
const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const productName = button.getAttribute('data-product');
        const productPrice = parseFloat(button.getAttribute('data-price'));
        
        // Adiciona o produto ao carrinho
        cart.push({ name: productName, price: productPrice });
        
        // Atualiza o contador e o total
        cartCount++;
        cartTotal += productPrice;
        
        // Atualiza a exibição do carrinho
        updateCart();
    });
});

// Função para remover do carrinho
function removeFromCart(index) {
    // Remove o item do carrinho
    const removedItem = cart.splice(index, 1)[0];
    
    // Atualiza o contador e o total
    cartCount--;
    cartTotal -= removedItem.price;

    // Atualiza a exibição do carrinho
    updateCart();
}

// Função para finalizar a compra
function finalizarCompra() {
    if (cartCount === 0) {
        alert("O carrinho está vazio. Adicione produtos antes de finalizar a compra.");
    } else {
        alert("Compra finalizada com sucesso!");
        cart = [];
        cartCount = 0;
        cartTotal = 0;
        updateCart();
    }
}