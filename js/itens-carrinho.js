const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

const quantidadeDeItensNoCarrinho = document.querySelector(".header__cart-count")
quantidadeDeItensNoCarrinho.innerHTML = carrinho.length

