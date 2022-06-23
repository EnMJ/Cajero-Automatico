/*
---------------
Lista de funciones en los botones:

Volver --> operaciones()
Iniciar sesión --> login()
Consultar saldo --> consultarDisponible()
Ingresar monto --> ingresar()
Retirar monto --> retirar()
Salir --> salir()
Crea cuenta --> crearCuenta()
---------------
Lista de pantallas:

htmlInicio
htmlOperaciones
htmlRespuesta
---------------
*/

var cuentas = [
    { nombre: "Mali", saldo: 200, password: 'helloworld' },
    { nombre: "Gera", saldo: 290, password: 'l33t' },
    { nombre: "Maui", saldo: 67, password: '123' }
];
var indice = -1;


// START Variables con las "pantallas" en HTML

// Ingresar/Crear cuenta
var htmlInicio = '<button onclick="login()">Iniciar sesión</button> <button onclick="crearCuenta()">Crear cuenta</button>';
// Consultar/Ingresar/Retirar/Salir
var htmlOperaciones = '<p>Elija la operación a realizar:</p><button onclick="consultarDisponible()">Consultar saldo</button> <button onclick="ingresar()">Ingresar monto</button> <button onclick="retirar()">Retirar monto</button> <button onclick="salir()">Salir</button>';
// Resultado / Volver
var htmlRespuesta = '<p id="texto"></p><button onclick="operaciones()">Volver</button>';
// 
// END Variables con las "pantallas" en HTML 
//-------------------------------------------
// START Funciones de los botones
function operaciones() {
    document.getElementById("cajero").innerHTML = htmlOperaciones;
};

function login() { 
    var nombreCuenta;
    for (var i = 0; i < cuentas.length; i++) {
        // Cuando el loop acaba de iniciar o reinicia, pedir el nombre de usuario
        if (i===0) {
            nombreCuenta=prompt("Ingrese su nombre de usuario:");
        };
        //---------------------------------------------------------------
        if (nombreCuenta === null) {
            // Si el usuario da clic en cancelar, romper el loop
            break;
        } else if (nombreCuenta === cuentas[i].nombre) {
            // Si existe el usuario, guardar el indiceCuenta, verificar contraseña y romper el loop de fuera
            
            var indiceCuenta = i;
            // START Verificar contraseña
            var pwCuenta;
            while (pwCuenta !== cuentas[indiceCuenta].password) {
                pwCuenta = prompt('Accediendo a la cuenta de "' + cuentas[indiceCuenta].nombre + '". Ingrese su contraseña:');
                if (pwCuenta === null) {
                    indiceCuenta === -1;
                    break;
                } else if (pwCuenta === cuentas[indiceCuenta].password) {
                    operaciones();
                    // Sacar el valor de indice
                    indice = indiceCuenta;
                } else {
                    alert("La contraseña no es correcta. Intente nuevamente.");
                };
            };
            // END Verificar contraseña
            break;
        } else if (i === cuentas.length-1) {
            // Al haber revisado todo el array y no encontrar el usuario, reiniciar el loop y mostrar mensaje
            // El loop reinicia con i=-1 porque al volver "arriba", se le suma 1, quedando en 0 de nuevo
            alert("No se ha encontrado un usuario con este nombre. Intente nuevamente.");
            i=-1;
        };
    };
};

function crearCuenta() { 
    var existe = true;
    while (existe !== false) {
        var ccNombre = prompt("Ingrese el nombre de usuario que desea utilizar:");
        if (ccNombre !== null) {
            // Verificar si existe la cuenta
            for (var i = 0; i < cuentas.length; i++) {
                if (ccNombre === cuentas[i].nombre) {
                    existe = true;
                    alert("Este nombre de usuario ya existe.");
                    break;
                } else {
                    existe = false;
                };
            };
            // Seguir solo si no existe
            if (existe === false) {
                var ccPassword = prompt("Ingrese una contraseña:");
                if (ccPassword !== null) {
                    var ccSaldo=NaN;
                    while (isNaN(ccSaldo)===true) {
                        ccSaldo = prompt("Ingrese su saldo inicial:");
                        if (ccSaldo !== null) {
                            ccSaldo = Number(ccSaldo);
                            if (isNaN(ccSaldo)===true) {
                                alert("El valor ingresado no es numérico. Intente nuevamente.");
                            } else if (ccSaldo === null) {
                                break;
                            } else if (ccSaldo < 10) {
                                alert("El valor ingresado es menor que el monto mínimo. El monto mínimo que una cuenta debe tener en todo momento es de $10."); 
                                ccSaldo = NaN;                               
                            } else if (ccSaldo > 990) {
                                alert("El valor ingresado es mayor que el monto máximo. El monto máximo que una cuenta puede tener es de $990");
                                ccSaldo = NaN;                              
                            } else {
                                cuentas.push({ nombre: ccNombre, saldo: ccSaldo, password: ccPassword });
                                alert('Se ha guardado tu cuenta. Tu nombre de usuario es "'+ccNombre+'". Tu contraseña es "'+ccPassword+'". Tu saldo inicial es de $'+ccSaldo+'.')
                            };
                        } else {
                            break;
                        };
                    };
                };
            };
        } else {
            break;
        };
    };
};
function consultarDisponible() {
    var textToShow = ("El saldo disponible en la cuenta de "+"<b>"+cuentas[indice].nombre+"</b>"+" es de: <b>$"+cuentas[indice].saldo+"</b>");
    document.getElementById("cajero").innerHTML = htmlRespuesta
    document.getElementById("texto").innerHTML = textToShow;
};
function ingresar() {
    var saldoActual = cuentas[indice].saldo;
    while (saldoActual === cuentas[indice].saldo) {
        var strMonto = prompt("Monto a ingresar:");
        var monto = Number(strMonto);
        if (strMonto === null) {
            break;
        } else if ((isNaN(monto)===true)||(monto <= 0)) {
            alert("Por favor, ingrese un monto válido.");
        } else {
            var nuevoSaldo = monto + saldoActual
            if (nuevoSaldo>990) {
                alert("Su saldo actual es de $"+saldoActual+", al ingresar $"+monto+ " se superaría el máximo de $990. La operación no es permitida.");
            } else {
                var textToShow = ("El monto ingresado es de <b>$"+monto+"</b>. Su nuevo saldo es de <b>$"+nuevoSaldo+"</b>.");
                cuentas[indice].saldo =  nuevoSaldo;
                document.getElementById("cajero").innerHTML = htmlRespuesta;
                document.getElementById("texto").innerHTML = textToShow
            };
        };
    };
};
function retirar() {
    var saldoActual = cuentas[indice].saldo;
    while (saldoActual === cuentas[indice].saldo) {
        var strMonto = prompt("Monto a ingresar:");
        var monto = Number(strMonto);
        if (strMonto === null) {
            break;
        } else if ((isNaN(monto)===true)||(monto <= 0)) {
            alert("Por favor, ingrese un monto válido.");
        } else {
            var nuevoSaldo = saldoActual - monto;
            if (nuevoSaldo<10) {
                alert("Su saldo actual es de $"+saldoActual+". Al retirar $"+monto+ " la cuenta tendría menos de  $10. La operación no es permitida.");
            } else {
                var textToShow = ("El monto ingresado es de <b>$"+monto+"</b>. Su nuevo saldo es de <b>$"+nuevoSaldo+"</b>.");
                cuentas[indice].saldo =  nuevoSaldo;
                document.getElementById("cajero").innerHTML = htmlRespuesta;
                document.getElementById("texto").innerHTML = textToShow;
            };
        };
    };
};
function salir() {
    indice = -1;
    document.getElementById("cajero").innerHTML = htmlInicio;
};
// END Funciones de los botones
/*
//-------------------------------------------
Nota: Explicacion de crearCuenta()
//-------------------------------------------
Al hacer click en el boton:
1. Prompt pide el nombre de usuario
    1.1 si es texto (=no se cancelo), pasar a 1.2
    1.2 - si ya existe, mostrar alerta y volver a 1
        - si no existe, seguir a 2
2. Prompt pide la contraseña
    - si es texto, pasar a 3
3. Prompt pide el saldo inicial
    - si es un numero, pasar a 4
    - si es NaN, volver a 3
4. Alerta muestra que la cuenta fue creada. Muestra el nombre, la password y el saldo. El nuevo objeto se almacena en el array
*/


