
//condicion inicial para el bucle while
let condicion = false

//bucle que inicializa la app
while (condicion == false) {
    //consulta inicial
    let edad = parseInt(prompt("Ingresar edad"))
    
    //condicional evalua edad ingresada
    if (edad < 18) {
        alert("No puedes ingresar")
        condicion = true
    } else if(edad >= 18){
        alert("Puedes ingresar")
        condicion = true
    } else {
        alert("Ingrese un numero valido")
    }
}
