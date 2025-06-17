import axios from "https://cdn.jsdelivr.net/npm/axios@1.6.7/+esm";

// --- Usuário autenticado ---
const userId = localStorage.getItem("userId");

async function dataUser() {
  const avatarHeader = document.querySelector("#avatar");
  const loginLink = document.querySelector("#login-link");

  if (userId) {
    const { data } = await axios.get(`http://localhost:8081/users/${userId}`);
    avatarHeader.src = data.avatar;
    loginLink.href = "../pages/conta.html";
  }
}
dataUser();

// --- Carrinho ---
function atualizarContadorCarrinho() {
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  const contador = document.querySelector('.cart-count');

  if (carrinho.length > 0) {
    contador.textContent = carrinho.length;
    contador.style.display = 'inline-block';
  } else {
    contador.textContent = '0';
    contador.style.display = 'none';
  }
}

function itemAdicionadoAoCarrinho() {
  const modal = document.getElementById('modal');
  const modalContent = document.getElementById('modalContent');

  modalContent.style.opacity = '1';
  modalContent.style.transform = 'translateY(0)';
  modal.style.display = 'flex';

  setTimeout(() => {
    modalContent.style.opacity = '0';
    modalContent.style.transform = 'translateY(-20px)';

    setTimeout(() => {
      modal.style.display = 'none';
    }, 500);
  }, 1500);
}

function adicionarAoCarrinho(produto) {
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  carrinho.push(produto);
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  itemAdicionadoAoCarrinho();
  atualizarContadorCarrinho();
}

// --- Busca ---
async function buscarProdutos() {
  try {
    const resposta = await fetch('http://localhost:3000/api/sneakers/popular');
    if (!resposta.ok) throw new Error('Erro ao buscar produtos');
    return await resposta.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function buscarTenisEspecifico(nome) {
  try {
    const resposta = await fetch(`http://localhost:3000/api/sneakers/search?q=${nome}`);
    if (!resposta.ok) throw new Error('Erro ao buscar produtos');
    return await resposta.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

// --- Estrelas ---
function gerarEstrelas(nota) {
  let estrelas = '';
  for (let i = 0; i < 5; i++) {
    estrelas += `<i class="fas fa-star${i < nota ? '' : '-o'}"></i>`;
  }
  return estrelas;
}

// --- Renderização de Produtos ---
function criarCardProduto(produto) {
  const item = document.createElement('div');
  item.className = 'prod';
  item.innerHTML = `
    <img src="${produto.thumbnail}" alt="${produto.shoeName}">
    <div class="descricao">
      <span>${produto.brand || 'Marca desconhecida'}</span>
      <h5>${produto.shoeName}</h5>
      <div class="nota">${gerarEstrelas(5)}</div>
      <h4>R$${produto.retailPrice ? produto.retailPrice.toFixed(2) : '---'}</h4>
    </div>
    <a href="#" class="card" aria-label="Adicionar ${produto.shoeName} ao carrinho">
      <span><i class="fas fa-shopping-cart"></i></span>
    </a>
  `;

  item.querySelector('.card').addEventListener('click', e => {
    e.preventDefault();
    adicionarAoCarrinho({
      id: produto.styleID || null,
      shoeName: produto.shoeName,
      brand: produto.brand || 'Marca desconhecida',
      price: produto.retailPrice || 0,
      thumbnail: produto.thumbnail,
      description: produto.description || 'Descrição não disponível'
    });
  });

  return item;
}

async function exibirProdutos() {
  const produtos = await buscarProdutos();
  const container = document.querySelector('.lista-produtos');
  container.innerHTML = '';
  produtos.forEach(produto => container.appendChild(criarCardProduto(produto)));
  atualizarContadorCarrinho();
}

async function exibirTenisPorMarca(nome, seletor) {
  const produtos = await buscarTenisEspecifico(nome);
  const container = document.querySelector(seletor);
  container.innerHTML = '';
  produtos.forEach(produto => container.appendChild(criarCardProduto(produto)));
  atualizarContadorCarrinho();
}

// --- Inicialização ---
document.addEventListener('DOMContentLoaded', () => {
  exibirProdutos();
  exibirTenisPorMarca("jordan", ".lista-produtos2");
  exibirTenisPorMarca("adidas", ".lista-produtos3");
  exibirTenisPorMarca("puma", ".lista-produtos4");
  exibirTenisPorMarca("nike", ".lista-produtos5");

  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  atualizarContadorCarrinho();
});
