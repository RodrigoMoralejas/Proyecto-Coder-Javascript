
alert("Bienvenido al baul de items, ingrese sus items")

const baul = []

const contenidoBaul = []

//Funcion que inicia la app
const iniciarApp = () => {

    const mostrarBaul = () => {
    
        baul.map((itemsArray) => {
            contenidoBaul.push(`${itemsArray.item} ${itemsArray.cantidad}`)
        })
        alert(`Estos son sus items: ${contenidoBaul}`)
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
