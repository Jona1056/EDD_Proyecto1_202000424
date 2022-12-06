// --------------------------------------------------
// LISTA ENLAZADA PARA CLIENTES Y ADMINISTRADORES
class Cliente {
  constructor(dpi, name, username, password, phone, admin, next) {
    this.dpi = dpi;
    this.name = name;
    this.username = username;
    this.password = password;
    this.phone = phone;
    this.admin = admin;
    this.next = next;
  }
}

class listaenlazada {
  constructor() {
    this.head = null;
    this.size = 0;
  }
  add(dpi1, name1, username1, password1, phone1, admin1) {
    const Nodo = new Cliente(
      dpi1,
      name1,
      username1,
      password1,
      phone1,
      admin1,
      null
    );
    if (!this.head) {
      this.head = Nodo;
    } else {
      let registro = this.head;
      while (registro.next) {
        registro = registro.next;
        swal(
          "GUARDADO",
          "USUARIO CREADO CORRECTAMENTE" + "DPI: " + registro.dpi + 
          + "NOMBRE "+ registro.username
          + "password" + registro.password,
          "success"
        );
      }
      registro.next = Nodo;
    }
    this.size++;
   
  }
  login_us(user, passw) {
    if (!this.size) {
      swal("Error", "NO HAY USUARIOS", "error");
    } else {
      let recorrido = this.head;
      while (recorrido) {
        console.log(recorrido.username)
        if (user == recorrido.username && passw == recorrido.password) {
          document.getElementById("LOGIN-1").style.display = "none";
          document.getElementById("PANTALLA-USUARIO").style.display = "block";
          return "dato enocntrado";
        } else {
          recorrido = recorrido.next;
        }
        if (!recorrido) {
          swal("Error", "USUARIO NO ENCONTRADO", "error");
          return "error";
        }
      }
    }
  }
  show(){
    if(!this.size){
     return "Hola"
    }else{
      let recorrido = This.head;
      while (recorrido){
        console.log(recorrido.username)
      }
    }
  }
  
  }


//VARIABLES
const admin = {
  dpi: 2654568452521,
  nombre_completo: "Oscar Armin",
  nombre_usuario: "EDD",
  contrasenia: "123",
  telefono: "+502 (123) 123-4567",
};
let clientes = new listaenlazada();
// ---------------------------------------------------------------

function login() {
  let user = document.getElementById("name1").value;
  let password = document.getElementById("password1").value;
  let check = document.getElementById("check1").checked;

  if (user == "" || password == "") {
    swal("Oops!", "LLENE TODOS LOS CAMPOS", "error");
  } else {
    if (check) {
      if (user == admin.nombre_usuario && password == admin.contrasenia) {
        document.getElementById("LOGIN-1").style.display = "none";
        document.getElementById("PANTALLA-ADMINISTRADOR").style.display =
          "block";
      } else {
        swal("Oops!", "ADMINISTRADOR NO ENCONTRADO", "error");
      }
    } else {
      clientes.login_us(user, password);
    }
  }
}
function gocreatecount() {
  document.getElementById("name1").value = "";
  document.getElementById("password1").value = "";
  document.getElementById("LOGIN-1").style.display = "none";
  document.getElementById("createAcount").style.display = "block";
}

function crearCuenta() {
  let usuario = document.getElementById("User-name").value;
  let nombre = document.getElementById("User-nombre").value;
  let dpi = document.getElementById("User-dpi").value;
  let tel = document.getElementById("User-telefono").value;
  let pass = document.getElementById("password2").value;
  x = dpi.toString().length;
  if (usuario == "" || nombre == "" || dpi == "" || tel == "" || pass == "") {
    swal("Oops!", "LLENE TODOS LOS CAMPOS", "error");
  } else {
    if (x != 13) {
      swal("Oops!", "DPI INVALIDO", "error");
    } else {
      clientes.add(dpi, nombre, usuario, pass, tel, false);

      document.getElementById("User-name").value = "";
      document.getElementById("User-nombre").value = "";
      document.getElementById("User-dpi").value = "";
      document.getElementById("User-telefono").value = "";
      document.getElementById("password2").value = "";
      signOff();
    }
  }
}

function signOff() {
  document.getElementById("LOGIN-1").style.display = "block";
  document.getElementById("createAcount").style.display = "none";
}
function signoff1(){
    document.getElementById("name1").value = "";
    document.getElementById("password1").value = "";
    document.getElementById("LOGIN-1").style.display = "block";
    document.getElementById("PANTALLA-ADMINISTRADOR").style.display = "none";
}


function cargar_usuarios(e){
    var archivo = e.target.files[0];
    document.getElementById('UsuariosFile').files[0];
    if (!archivo){
      return;
    }
    let lector = new FileReader();
    lector.onload = function(e){
      let contenido = e.target.result;
      const _clients = JSON.parse(contenido);

      for(const i in _clients){
        let client1 = _clients[i];
        clientes.add(client1.dpi,client1.nombre_completo,client1.nombre_usuario,client1.contrasenia,client1.telefono,false);
      }
    }
    lector.readAsText(archivo);

}
document.getElementById("UsuariosFile").addEventListener("change", cargar_usuarios, false);

