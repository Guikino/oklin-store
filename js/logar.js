import axios from "https://cdn.jsdelivr.net/npm/axios@1.6.7/+esm";

const email = document.querySelector("#email");
const password = document.querySelector("#password");
const loginForm = document.querySelector("#login-form");

async function login() {
  try {
    const verif = await axios.post("http://localhost:8081/users/login", {
      email: email.value,
      password: password.value,
    });
    localStorage.setItem("userId", verif.data.id)
    window.location.href = "../pages/index.html";
    
  } catch (error) {
    if (error.response) {
      alert("Erro: " + (error.response.data.message || "Email ou senha inválidos"));
    } else {
      alert("Erro de conexão com o servidor");
    }
  }
}

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email.value === "" || password.value === "" || !emailRegex.test(email.value) ) {
    alert("Preencha todos os campos corretamente.");
  } else {
    // As chamadas btoa() anteriores não tinham efeito prático e foram removidas.
    login();
  }
});
