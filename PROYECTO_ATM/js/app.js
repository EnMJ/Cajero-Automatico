/**Crea una aplicación web con JavaScript donde simulemos la interacción con un cajero automático.
Al ingresar al cajero, puedes seleccionar la cuenta con la que deseas interactuar. Deben existir al menos tres cuentas:
Persona 1
Persona 2
Persona 3
Para esto, puedes trabajar con un arreglo de objetos como el siguiente:

var cuentas = [
  { nombre: “Mali”, saldo: 200 }
  { nombre: “Gera”, saldo: 290 }
  { nombre: “Maui”, saldo: 67 }
];

Al seleccionar una cuenta, debes ingresar el password asociado a la cuenta. Si el password es incorrecto, debes notificar al usuario y permitirle intentarlo nuevamente. Si el password es correcto, debes mostrar las siguientes opciones:
Consultar saldo
Ingresar monto
Retirar Monto
Al seleccionar consultar saldo, debe mostrar en pantalla el saldo actual de la cuenta
Al seleccionar ingresar monto, el usuario debe escribir el monto a ingresar. Al ingresar el monto, debe mostrarle al usuario el monto ingresado y el nuevo saldo total.
Al seleccionar retirar monto, el usuario debe escribir el monto a retirar. Al retirar el monto, debe mostrarle al usuario el monto retirado y el nuevo saldo total.
Como regla de negocio, una cuenta no debe de tener más de $990 y menos de $10. Es necesario hacer las validaciones pertinentes para que no se rompa esta regla de negocio.**/

// var cuentas = [
//     { nombre: “Mali”, saldo: 200 }
//     { nombre: “Gera”, saldo: 290 }
//     { nombre: “Maui”, saldo: 67 }
//   ];

var usuario, contraseña;

const cuentas = [
  {id: 0, usuario:"MALI", password:"asdf", saldo:200,},
  {id: 1, usuario:"ENRIQUE", password:"qwer", saldo:850,},
  {id: 2, usuario:"GERA", password:"1234", saldo:290,},  
  {id: 3, usuario:"MAUI", password:"4567", saldo:67,}
]

var indice = -1;

var htmlInicio = '<button onclick="iniciar()">Continuar</button>';

var htmlRespuesta = '<p id="texto"></p><button onclick="operaciones()">Volver</button>';

  //Se valida que la informaicón del usuario es correcta

function iniciar(){
   // capturamos la información del usuario
 
   usuarioActivo = document.getElementById('usuario').value.toUpperCase();
   contraseñaActivo = document.getElementById('contraseña').value;

  for (var i = 0; i < cuentas.length; i++) {
    if (usuarioActivo === cuentas[i].usuario) {
          // Si existe el usuario, guardar el indiceCuenta, verificar contraseña y romper el loop de fuera
          
          var indiceCuenta = i;
          // START Verificar contraseña
          var pwCuenta;
          while (pwCuenta !== cuentas[indiceCuenta].password) {
              pwCuenta = contraseñaActivo;
              if (pwCuenta === null) {
                  indiceCuenta === -1;
                  break;
              } else if (pwCuenta === cuentas[indiceCuenta].password) {
                  operaciones();
                  // Sacar el valor de indice
                  indice = indiceCuenta;
              } else {
                  alert("La contraseña no es correcta. Intenta nuevamente.");
                  break;
              };
          };
          // END Verificar contraseña
          break;
      } 
    else if (i === cuentas.length-1) {
        // Al haber revisado todo el array y no encontrar el usuario, reiniciar el loop y mostrar mensaje
        // El loop reinicia con i=-1 porque al volver "arriba", se le suma 1, quedando en 0 de nuevo
        alert("No se ha encontrado un usuario con este nombre. Intenta nuevamente.");
    }
  };
}

function operaciones() {

  // Cambiamos los estilos de los paneles para mostrar u ocultar
  panelBarra = document.getElementById('barra-nav');
  panelInicio = document.getElementById('inicio');

  panelInicio.classList.remove('visible');
  panelInicio.classList.add('invisible');

  panelBarra.classList.remove('invisible');
  panelBarra.classList.add('visible');

  panelMenu = document.getElementById('menu');

  panelMenu.classList.remove('invisible');
  panelMenu.classList.add('visible');

  document.getElementById('bienvenido').innerText='QUE GUSTO TENERTE AQUI  ' + usuarioActivo;

  htmlBack = '<h3 id="back">Selecciona la acción que deseas realizar</h3>';
  document.getElementById("back").innerHTML = htmlBack

}
  function Consultar(){
    var textToShow = ("El saldo disponible en la cuenta es de: <b>$"+cuentas[indice].saldo+"</b>");
    document.getElementById("back").innerHTML = htmlRespuesta
    document.getElementById("bienvenido").innerHTML = textToShow;
  }

  function Depositar(){
    var saldoActual = cuentas[indice].saldo;
      while (saldoActual === cuentas[indice].saldo) {
          var mensajeMonto = prompt("Monto a ingresar:");
          var monto = Number(mensajeMonto);
          if (mensajeMonto === null) {
              break;
          } else if ((isNaN(monto)===true)||(monto <= 0)) {
              alert("Por favor, ingrese un monto válido.");
          } else {
              var nuevoSaldo = monto + saldoActual
              if (nuevoSaldo>990) {
                  var restante = 990 - saldoActual
                  alert("Disculpa, " + usuarioActivo + ". Tu saldo actual es de $"+saldoActual+", al ingresar $"+monto+ " se superaría el máximo de $990. Solo se te podría permitir depositar: $" +restante);
              } else {
                  var textToShow = ("El monto ingresado es de <b>$"+monto+"</b>. Su nuevo saldo es de <b>$"+nuevoSaldo+"</b>.");
                  cuentas[indice].saldo =  nuevoSaldo;
                  document.getElementById("cajero").innerHTML = htmlRespuesta;
                  document.getElementById("texto").innerHTML = textToShow
              };
          };
      };
  };

  function Retirar (){
    
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

  function Salir() {

    panelBarra = document.getElementById('barra-nav');
    panelInicio = document.getElementById('inicio');
    panelMenu = document.getElementById('menu');

    panelBarra.classList.remove('visible');
    panelBarra.classList.add('invisible');


    document.getElementById('bienvenido').innerText='VUELVE PRONTO ' + usuarioActivo;

    htmlBack = '<button onclick="Salirr()" type="button" class="btn btn-dark">Salir</button>';
    document.getElementById("back").innerHTML = htmlBack
  };

  function Salirr(){
    panelMenu.classList.remove('visible');
    panelMenu.classList.add('invisible');

    panelInicio.classList.remove('invisible');
    panelInicio.classList.add('visible');
  }  



          

