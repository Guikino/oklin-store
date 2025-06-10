import axios from "axios"

async function buscar(){
    const res = await axios.get("http://localhost:3000/api/sneakers/popular")
    console.log(res.data)
}
