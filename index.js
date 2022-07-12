alert("Bienvenido al gestor de equipamento para aventuras! presiones ENTER para continuar")

//Arreglo donde se van a ir cargando los items
const mochila = []

//Pedir item y pusheo al arreglo
const pedirItem = () => {
    const nuevoItem = prompt("Ingrese un item a llevar: ")
    mochila.push(` ${nuevoItem}`)
}

//Consulta agregar mas items
const agregarMasItems = () => {
    let respuestaItems = prompt("Desea Ingresar mas items?: 1- SI 2- NO").toUpperCase()
    if (respuestaItems === "SI") {
        pedirItem()
        agregarMasItems()
    } else if (respuestaItems === "NO") {
        alert(`Su mochila de aventura contiene: ${mochila}`)
        alert("Suerte en su nuevo viaje!")
    } else {
        alert("Ingrese SI o NO como respuesta válida")
        agregarMasItems()
    }
}
//Funciones que inicializan la app
pedirItem()
agregarMasItems()