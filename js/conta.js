import axios from "https://cdn.jsdelivr.net/npm/axios@1.6.7/+esm";


const userId = localStorage.getItem("userId")

async function dataUser(){
    let avatarHeader = document.querySelector("#avatar-header")  
    let avatarMain = document.querySelector("#avatar-main") 
    let username = document.querySelector("#username");
    let email = document.querySelector("#email");
    const loginLink = document.querySelector("#login-link")
    if(userId){
        const dataUserAvatar = await axios.get(`http://localhost:8081/users/${userId}`)
        avatarHeader.src = dataUserAvatar.data.avatar
        avatarMain.src = dataUserAvatar.data.avatar
        loginLink.href = "../pages/conta.html"
        username.innerHTML = dataUserAvatar.data.username
        email.innerHTML = dataUserAvatar.data.email
    }
  }
dataUser()








//cartao dados
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal-cartao");
  const abrirBtn = document.getElementById("abrir-modal");
  const fecharBtn = document.getElementById("fechar-modal");
  const numeroCartao = document.getElementById("numero-cartao");
  const nomeCartao = document.getElementById("nome-cartao");
  const validadeCartao = document.getElementById("validade-cartao");

  abrirBtn.addEventListener("click", () => {
    const dados = localStorage.getItem("cartao");
    if (dados) {
      try {
        const cartao = JSON.parse(dados);
        nomeCartao.textContent = ` titular: ${cartao.nome}`;
        numeroCartao.textContent = `Número: ${cartao.numero}`;
        validadeCartao.textContent = `Validade: ${cartao.validade}`;
      } catch {
        numeroCartao.textContent = "Erro ao carregar número";
        validadeCartao.textContent = "Erro ao carregar validade";
      }
    } else {
      numeroCartao.textContent = "Nenhum cartão salvo.";
      validadeCartao.textContent = "";
    }

    modal.style.display = "flex";
  });

  fecharBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});






