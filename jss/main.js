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
      }
      registro.next = Nodo;
    }
    this.size++;
    swal(
      "GUARDADO",
      "USUARIO CREADO CORRECTAMENTE" + " " + "Usuario Numero" + this.size,

      "success"
    );
  }
  login_us(user, passw) {
    if (!this.size) {
      swal("Error", "NO HAY USUARIOS", "error");
    } else {
      let recorrido = this.head;
      while (recorrido) {
        console.log(recorrido.username);
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
  show() {
    if (!this.size) {
      return "Hola";
    } else {
      let recorrido = this.head;
      while (recorrido) {
        console.log(recorrido.username);
      }
    }
  }
  graph(idDiv) {
    // creamos la variable del diagraph
    let graphviz =
      'digraph SimpleList{\nnode[shape= box, fillcolor="#FFFFFF", style= filled];\nbgcolor = "#CD1CED ";\nranksep = 0.5;\nnodesep = 0.5;\nsubgraph cluster_A{\nlabel = "Clientes";\nbgcolor = "#BC70FC";\nfontcolor ="#3A0964";\nfontsize = 30;\n\n ';

    //we create the customer nodes
    let current = this.head;
    let i = 1;

    while (current != null) {
      // recorremos la lista hasta que sea null y agregamos un indicie cliente1
      graphviz += "cliente" + i + '[label="' + current.password + '"];\n';

      i++;
      current = current.next;
    }

    graphviz += "\n";

    //we point the customer nodes

    current = this.head;
    i = 1;

    while (current != null) {
      // aqui de igual manera hasta que sea null y agragemos el indice
      if (current.next != null) {
        graphviz += "cliente" + i + " -> cliente" + (i + 1) + "\n";
      }

      i++;
      current = current.next;
    }

    graphviz += "\n";

    //we aling the nodes

    current = this.head.next;
    i = 1;

    graphviz += "{rank = same; cliente" + i;

    i++;

    while (current != null) {
      // en esta parte agreagamos el valor de cliente con la posicion i
      graphviz += "; cliente" + i;

      i++;
      current = current.next;
    }

    graphviz += "};\n\n}\n}";

    console.log(graphviz);

    let id = "#" + idDiv;

    d3.select(id) //creamos con d3 el rendeDot y el paragrah
      .graphviz()

      .width(2000)
      .height(1500)
      .zoom(true)
      .fit(true)
      .renderDot(graphviz);
  }
}

// LISTA PARA ARTISTAS
class Artista {
  constructor(name, age, country, next, prev) {
    this.name = name;
    this.age = age;
    this.country = country;
    this.lista = new listadobleCanciones();
    this.next = next;
    this.prev = prev;

    //
  }
}
class listadobleartista {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }
  add(name1, age1, country1) {
    const newNode = new Artista(name1, age1, country1, null, null, null);
    if (this.head) {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    } else {
      this.head = newNode;
      this.tail = newNode;
    }
    this.size++;
    swal(
      "GUARDADO",
      "USUARIO CREADO CORRECTAMENTE" + " " + "artista numero" + this.size,

      "success"
    );
  }
}

//lista para canciones

class Canciones {
  contructor(artist, name, duration, gender, next, prev) {
    this.artist = artist;
    this.name = name;
    this.duration = duration;
    this.gender = gender;
    this.next = next;
    this.prev = prev;
  }
}
class listadobleCanciones {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
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
let artistas = new listadobleartista();
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
      digest = sha256(password);
      clientes.login_us(user, digest);
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
function signoff1() {
  document.getElementById("name1").value = "";
  document.getElementById("password1").value = "";
  document.getElementById("LOGIN-1").style.display = "block";
  document.getElementById("PANTALLA-ADMINISTRADOR").style.display = "none";
}

function cargar_usuarios(e) {
  var archivo = e.target.files[0];
  document.getElementById("UsuariosFile").files[0];

  if (!archivo) {
    return;
  }
  let lector = new FileReader();
  lector.onload = function (e) {
    let contenido = e.target.result;
    const _clients = JSON.parse(contenido);

    for (const i in _clients) {
      let client1 = _clients[i];
      digest = sha256(client1.contrasenia);
      clientes.add(
        client1.dpi,
        client1.nombre_completo,
        client1.nombre_usuario,
        digest,
        client1.telefono,
        false
      );
    }
  };
  lector.readAsText(archivo);
}
document
  .getElementById("UsuariosFile")
  .addEventListener("change", cargar_usuarios, false);

function cargar_artistas(e) {
  var archivo = e.target.files[0];
  document.getElementById("ArtistaFile").files[0];

  if (!archivo) {
    return;
  }
  let lector = new FileReader();

  lector.onload = function (e) {
    let contenido = e.target.result;
   
    const _artis = JSON.parse(contenido);
  
    for (const i in _artis) {
      let artis1 = _artis[i];

      artistas.add(artis1.name1, artis1.age1, artis1.country);
    }
  };
  lector.readAsText(archivo);
}
document
  .getElementById("ArtistaFile")
  .addEventListener("change", cargar_artistas, false);

function showSimpleList() {
  clientes.graph("showSimpleListG");
  document.getElementById("showHashTableG").style.display = "none";
  document.getElementById("showSimpleListG").style.display = "block";
  document.getElementById("showBST").style.display = "none";
  document.getElementById("showAVL").style.display = "none";
}
function showAVLTree() {
  movies.graph("showAVL");
  document.getElementById("showHashTableG").style.display = "none";
  document.getElementById("showSimpleListG").style.display = "none";
  document.getElementById("showBST").style.display = "none";
  document.getElementById("showAVL").style.display = "block";
}
