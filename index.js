alert("Bienvenido al baul de items, ingrese sus items")

const baul = []

const contenidoBaul = []

//Funcion que inicia la app
const iniciarApp = () => {

    const mostrarBaul = () => {

        const mainDiv = document.getElementById("main")

        for(let i = 0; i < baul.length; i++) {
            const itemDiv = document.createElement("p")
            itemDiv.classList.add("parrafo")
            itemDiv.innerHTML = `${baul[i].item} ${baul[i].cantidad}`
            mainDiv.append(itemDiv)
        }
    }

    const pedirOtroItem = () => {
        let otroItem = prompt("Desea ingresar otro item? SI/NO").toUpperCase()
        if (otroItem === "SI") {
            iniciarApp()
        } else if (otroItem === "NO") {
            mostrarBaul()
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
}

//Inicio de app
iniciarApp()