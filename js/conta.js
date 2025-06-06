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
    console.log("Usuário autenticado:", verif.data);
    alert("Login realizado com sucesso!");
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
  if (email.value === "" || password.value === "" || !email.value.includes("@")) {
    alert("Preencha todos os campos corretamente.");
  } else {
    btoa(email.value)
    btoa(password.value)
    login();
  }
});
