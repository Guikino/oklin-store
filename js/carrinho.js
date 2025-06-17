import axios from "https://cdn.jsdelivr.net/npm/axios@1.6.7/+esm";
const userId = localStorage.getItem("userId")

async function dataUser(){
    let avatarHeader = document.querySelector("#avatar")  
    const loginLink = document.querySelector("#login-link")
    if(userId){
        const {data} = await axios.get(`http://localhost:8081/users/${userId}`)
        avatarHeader.src = data.avatar
        loginLink.href = "../pages/conta.html"
    }
  }
dataUser()
