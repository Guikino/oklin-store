import axios from "https://cdn.jsdelivr.net/npm/axios@1.6.7/+esm";

const email = document.querySelector("#email");
const avatar = document.querySelector("#avatar");
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const loginForm = document.querySelector("#login-form");

async function login() {
  try {
    const verif = await axios.post("http://localhost:8081/users", {
      email: email.value,
      password: password.value,
      username: username.value,
      avatar: avatar.value,
    });
    console.log("Usuário Criado:", verif.data);
    window.location.href = "../pages/logar.html";
  } catch (error) {
    if (error.response) {
      alert("Erro: " + (error.response.data.message));
    } else {
      alert("Erro de conexão com o servidor");
    }
  }
}

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (email.value === "" || password.value === "" || !email.value.includes("@") || !email.value.includes(".") ||
  username.value === "" || avatar.value === "" ) {
    alert("Preencha todos os campos corretamente.");
  } else {
    btoa(email.value)
    btoa(password.value)
    
    login();
  }
});
