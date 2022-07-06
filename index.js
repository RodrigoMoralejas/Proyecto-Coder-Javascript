alert("Elija un numero, tire un dado y pruebe su suerte. Presione ENTER para continuar")

let numeroRandom = Math.floor(Math.random() * 6 + 1)

const lanzarDados = () => {
    let pedidoNumero = parseInt(prompt("Escoja un numero del 1 al 6"))
    
    
    switch (true) {
        case pedidoNumero > 0 && pedidoNumero < 7:
            alert("Presione ENTER para lanzar el dado")
            if (pedidoNumero === numeroRandom) {
                alert("Ganaste")
            } else {
                alert(`Perdiste, el numero que salio es ${numeroRandom}`)
            }
            break;

        case pedidoNumero === 0 || pedidoNumero > 6:
            alert("Ingrese un numero entre 1 y 6")
            lanzarDados()
            break;

        default:
            alert("Caracter no valido, intente de nuevo")
            lanzarDados()
            break;
    }
}
lanzarDados()