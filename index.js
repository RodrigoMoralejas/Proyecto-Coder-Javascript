alert("Bienvenido al baul de items, ingrese sus items")

const baul = []

const contenidoBaul = []

const mainDiv = document.getElementById("main")

let parrafosHijos

//Funcion que inicia la app
const iniciarApp = () => {

    const mostrarBaul = () => {
        for (let i = 0; i < baul.length; i++) {
            const itemDiv = document.createElement("p")
            itemDiv.classList.add("parrafo")
            itemDiv.innerHTML = `${baul[i].item} ${baul[i].cantidad}`
            mainDiv.append(itemDiv)
        }

        parrafosHijos = document.querySelectorAll("p")
    }

    const pedirOtroItem = () => {
        let otroItem = prompt("Desea ingresar otro item? SI/NO").toUpperCase()
        if (otroItem === "SI") {
            iniciarApp()
        } else if (otroItem === "NO") {
            alert("Adios")
        } else {
            alert("Ingrese respuesta valida")
            pedirOtroItem()
        }
    }

    const pedirItem = () => {
        let itemUsuario = prompt("Ingrese su item: ")
        let itemCantidad = parseInt(prompt("Ingrese la cantidad de items a dejar"))
        baul.push({
            item: itemUsuario,
            cantidad: itemCantidad
        })
        pedirOtroItem()
    }
    pedirItem()

    //Boton mostrar items
    const botonMostrar = document.getElementById("boton")
    
    botonMostrar.addEventListener("click", () => {
        if (mainDiv.children.length === 0) {
            mostrarBaul()
        }
        if(mainDiv.children.length >= 1) {
            for(let i = 0; i < parrafosHijos.length; i++) {
                parrafosHijos[i].classList.toggle("parrafo")
                parrafosHijos[i].classList.toggle("parrafo2")
            }
        }
    })
}

//Inicio de app
iniciarApp()