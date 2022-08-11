//Elements from DOM
const formLogin = document.getElementById("formLogin")
const nameLogin = document.getElementById("nameLogin")
const passLogin = document.getElementById("passLogin")
const btnLogin = document.getElementById("btnLogin")

const userLogin = []

localStorage.setItem("usersDB", userLogin)

formLogin.addEventListener("submit", (e) => {
    e.preventDefault()

    const nameInput = nameLogin.value
    const passInput = passLogin.value
    
    console.log(nameInput)
    console.log(passInput)
})

