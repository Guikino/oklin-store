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
        console.log(dataUserAvatar.data.id)
        avatarHeader.src = dataUserAvatar.data.avatar
        avatarMain.src = dataUserAvatar.data.avatar
        loginLink.href = "../pages/conta.html"
        username.innerHTML = dataUserAvatar.data.username
        email.innerHTML = dataUserAvatar.data.email
    }
  }
dataUser()




