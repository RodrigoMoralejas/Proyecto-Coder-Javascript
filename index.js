alert("Elija un numero, tire un dado y pruebe su suerte. Presione ENTER para continuar")

//Inicio de app
const inicioJuego = () => {

    //Generacion de numero random
    let numeroRandom = Math.floor(Math.random() * 6 + 1)

    //Peticion de numeros y lanzamiento de dado
    const lanzarDados = () => {
        let pedidoNumero = parseInt(prompt("Escoja un numero del 1 al 6"))

        const playAgain = () => {
            let respuestaUsuario = prompt("Desea seguir jugando? SI o NO").toUpperCase()

            if (respuestaUsuario === "SI") {
                inicioJuego()
            } else if (respuestaUsuario === "NO") {
                alert("Gracias vuelvas prontos")
            } else {
                alert("Respuesta no valida")
                playAgain()
            }
        }

        //Evalua numero elegido con el numero random
        switch (true) {
            case pedidoNumero > 0 && pedidoNumero < 7:
                alert("Presione ENTER para lanzar el dado")
                if (pedidoNumero === numeroRandom) {
                    alert("Ganaste")
                    playAgain()
                } else {
                    alert(`Perdiste, el numero que salio es ${numeroRandom}`)
                    playAgain()
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
}
//Funcion que inicia el juego
inicioJuego()