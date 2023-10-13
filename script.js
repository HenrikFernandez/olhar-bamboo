// Array para manter o carrinho
const cart = [];

// Selecionar elementos HTML relevantes
const cartItems = document.getElementById('cart-items');
const checkoutWhatsAppButton = document.getElementById('checkout-whatsapp');

function addToCart(productName, quantity) {
    for (let i = 0; i < quantity; i++) {
        cart.push(productName);
    }
    updateCartView();
}

function removeFromCart(productName) {
    const index = cart.indexOf(productName);
    if (index !== -1) {
        cart.splice(index, 1);
        updateCartView();
    }
}

function updateCartView() {
    cartItems.innerHTML = '';
    cart.forEach((item) => {
        const listItem = document.createElement('li');
        listItem.textContent = item;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remover';
        removeButton.classList.add('remove-from-cart');
        removeButton.addEventListener('click', () => removeFromCart(item));

        listItem.appendChild(removeButton);
        cartItems.appendChild(listItem);
    });
}

checkoutWhatsAppButton.addEventListener('click', () => {
    if (cart.length > 0) {
        const message = `Pedido de produtos:\n${cart.join('\n')}`;
        const encodedMessage = encodeURIComponent(message);
        const whatsappURL = 'https://wa.me/5592982229102/?text=' + encodedMessage;
        window.location.href = whatsappURL;
    }
});

const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
        const productName = event.target.getAttribute('data-product');
        const quantityInput = event.target.previousElementSibling;
        const quantity = parseInt(quantityInput.value, 10);
        addToCart(productName, quantity);
    });
});
