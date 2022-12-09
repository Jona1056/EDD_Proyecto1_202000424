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
  login_admin(user, pasw) {
    if (!this.size) {
      return "Hola";
    } else {
      let recorrido = this.head;

      while (recorrido) {
        if (recorrido.admin) {
          if (user == recorrido.username && pasw == recorrido.password) {
            document.getElementById("LOGIN-1").style.display = "none";
            document.getElementById("PANTALLA-ADMINISTRADOR").style.display =
              "block";
            return "dato encontrado";
          } else {
            recorrido = recorrido.next;
          }
          if (!recorrido) {
            swal("Error", "ADMINISTRADOR NO ENCONTRADO", "error");
            return "error";
          }
        } else {
          if (!recorrido) {
            swal("Error", "ADMINISTRADOR NO ENCONTRADO", "error");
            return "error";
          }
          recorrido = recorrido.next;
        }
      }
    }
  }
  login_us(user, passw) {
    if (!this.size) {
      swal("Error", "NO HAY USUARIOS", "error");
    } else {
      let recorrido = this.head;
      while (recorrido) {
        if (!recorrido.admin) {
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
        } else {
          if (!recorrido) {
            swal("Error", "USUARIO NO ENCONTRADO", "error");
            return "error";
          }
          recorrido = recorrido.next;
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
  constructor(name, age, country) {
    this.name = name;
    this.age = age;
    this.country = country;
    this.next = null;
    this.down = new Cancion();
    this.prev = null;

    //
  }
}
class Cancion {
  constructor(artist, name, duration, gender) {
    this.artist = artist;
    this.name = name;
    this.duration = duration;
    this.gender = gender;
 
    this.next = null;


    //
  }
}
class listadobleartista {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
    this.size2 = 0;
  }
  addcanciones(artista1, name1, duration1, gender1) {
   
      let temporalcabeza = this.head;
     
      while(temporalcabeza != null){
       
       if(temporalcabeza.name == artista1){
        var nuevacancion = new Cancion(artista1, name1, duration1, gender1);
        var iniciocanciones = temporalcabeza.down;
       
        temporalcabeza.down = nuevacancion;
      
        nuevacancion.next = iniciocanciones;
        this.size2++;
     
       }
  
       
       
   
       temporalcabeza = temporalcabeza.next;
       
      }
      swal(
        "GUARDADO",
        "cancion CREADO CORRECTAMENTE" + " " + "cancion numero" + this.size2,
  
        "success"
      );
  
    
   
     
 
    
    // current = this.head;
  
    // const newNode1 = new Cancion(artista1, name1, duration1, gender1);
    // if (this.down) {
    //   newNode1.next = this.down;
    //   this.down.prev = newNode1;
    //   this.down = newNode1;
    // } else {
    //   this.down = newNode1;
    // }

    // this.size2++;
    // swal(
    //   "GUARDADO",
    //   "cancion CREADO CORRECTAMENTE" + " " + "cancion numero" + this.size2,

    //   "success"
    // );
  }
  add(name1, age1, country1) {
    const newNode = new Artista(name1, age1, country1);
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

  verificarlista() {
    if (this.head) {
      return true;
    } else {
      return false;
    }
  }
  graph(idDiv) {
    // creamos la variable del diagraph

    let graphviz =
      'digraph SimpleList{\nnode[shape= box, fillcolor="#FFFFFF", style= filled];\nbgcolor = "#CD1CED ";\nranksep = 0.5;\nnodesep = 0.5;\nsubgraph cluster_A{\nlabel = "MUSICA";\nbgcolor = "#BC70FC";\nfontcolor ="#3A0964";\nfontsize = 30;\n\n ';

    //we create the customer nodes
    let current = this.head;
    let current3 = current.down;
      
    
    let i = 1;

    while (current!= null) {
      // recorremos la lista hasta que sea null y agregamos un indicie cliente1
      graphviz += "artista" + i + '[label="' + current.name+ '"];\n';

      i++;
      current = current.next;
    }
    // let x = 1000;
    // while (current != null) {
    //   graphviz += "artista" + x + '[label="' + current.name + '"];\n';
    //   x++;
    //   current = current.next;
    // }

    // graphviz += "\n";

    // current = this.head;
    // x = 1000;
    // current = this.head;
    // down1 = current.down;
    
    //  i = 1;
    //  while(cirr != null){
    //   graphviz += "cancion" + i + " -> cancion" + (i + 1) + "\n";
    //   i++;
    // //   down1 = down1.next;
    //  }

    // while (current != null) {
    //   if (current.next != null) {
    //     graphviz += "artista" + x + " -> artista" + (x + 1) + "\n";
    //     graphviz += "artista" + (x + 1) + " -> artista" + x + "\n";
    //   }
    //   x++;
    //   current = current.next;
    // }
    // current = this.head;
    // x = 1000;
    // while (current != null) {
    //   let i = 1;
    //   current2 = this.down;
    //   while (current2 != null) {
    //     if (current2.artist == current.name) {
    //       graphviz += "artista" + x + " -> cancion" + i + "\n";
    //       graphviz += "cancion" + i + " -> artista" + x + "\n";
    //       break;
    //     }
    //     i++;
    //     current2 = current2.next;
    //   }
    //   x++;
    //   current = current.next;
    // }

    // let current3 = this.down;
    // i = 1;
    // while (current3 != null) {
    //   let k = 1;
    //   let current2 = this.down;
    //   let h = 1;
    //   while (current2 != null) {

    //     if (current3.artist == current2.artist) {
    //       if(k == i){
    //         let asdkf ="";
    //       }else{
           
    //         graphviz += "cancion" + k + " -> cancion" + i + "\n";
          
          
           
        
          

        
    //       }

    //     }
    //       k++;
    //     current2 = current2.next;
    //   }
  
    //   i++;
    //   current3 = current3.next;
    // }

    // current = this.head;
    // x = 1000;
    // while (current != null) {
    //   i = 1;
    //   current2 = this.down;
    //     while (current2) {
    //       if(current2.next != null) {
    //       if (current.name == current2.artist) {
    //           graphviz += "artista" + x + " -> cancion" + i + "\n";
    //           graphviz += "cancion" + i + " -> artista" + x + "\n";
    //         }
    //       i++;
    //       current2 = current2.next;
    //     }
    //   }

    //   x++;
    //   current = current.next;
    // }

    // let current3 = this.down;
    // let current4 = this.down;
    // i = 1;
    // let k = 1;
    // while(current3){
    //   i = 1;
    //   current4 = this.down;
    //   if(current3.next){
    //   while(current4){
    //     if(current4.next){
    //     if(current3.artist == current4.artist){

    //       graphviz += "cancion" + i + " -> cancion" + k + "\n";
    //       graphviz += "cancion" + k + " -> cancion" + i + "\n";

    //   }
    // }
    //   i++;
    //   current4 = current4.next;
    // }

    //   }
    //   k++;
    //   current3 = current3.next;
    // }
    graphviz += "\n";
    let current2 = this.head.next;
    i = 1;
    graphviz += "{rank = same; artista" + i;
    i++;
    while (current2 != null) {
      // en esta parte agreagamos el valor de cliente con la posicion i
      graphviz += "; artista" + i;

      i++;
      current2 = current2.next;
    }
    // graphviz += "}"
    // //
    // current2 = this.down.next;
    // i = 1;
    // graphviz += "{rank = same; cancion" + i;
    // i++;
    // while (current2 != null) {
    //   // en esta parte agreagamos el valor de cliente con la posicion i
    //   graphviz += "; cancion" + i;

    //   i++;
    //   current2 = current2.next;
    // }
    // /////////

    graphviz += "};\n\n}\n}";
    console.log(graphviz);
    swal("Oops!", graphviz, "error");
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

//lista para canciones

// class Playlist {
//   constructor(artist, name, duration, gender, next, prev) {
//     this.artist =artist;
//     this.name = name;
//     this.duration = duration;;
//     this.gender= gender;
//     this.next = next;
//     this.prev = prev;

//     //
//   }

// }
// class listadobleplaylist {
//   constructor() {
//     this.head = null;
//     this.tail = null;
//     this.size = 0;
//   }

//   add(name1, age1, country1,list) {

//     const newNode = new  Playlist(name1, age1, country1, list, null, null);

//     if(this.head){
//       newNode.next = this.head;
//       this.head.prev = newNode;
//       this.head = newNode;
//       this.head.prev = this.tail ;
//       this.tail.next = this.head;

//     }else{
//       this.head = newNode;
//       this.tail = newNode;

//     };
//     this.size++;
//     swal(
//       "GUARDADO",
//       "Cancion CREADO CORRECTAMENTE" + " " + "Cancion numero" + this.size,

//       "success"
//     );
//   }
//   setartist(){
//     return this.head;
//   }
//   print(){
//     let current = this.head;
//     let result = "";
//     while(current){
//       if (!current.next){
//         result+=current.name ;
//         current = current.next;
//       }else{
//         result+=current.name + "<->";
//         current = current.next;
//       }

//     };
//     return result;
//   }
//   printcircular(){
//     let aux = this.head;
//     let aux2 = this.tail;

//     console.log("el primer dato de la lista es un" + aux.name + " y el ultimo dato de la lista es " + aux.prev.prev.name);

//     while(aux){
//         console.log(aux.name);
//         aux = aux.next;
//         if (aux == this.head){
//            break;
//         }

//   }
// }
//   graph(idDiv){
//     // creamos la variable del diagraph

//     let graphviz =
//       'digraph SimpleList{\nnode[shape= box, fillcolor="#FFFFFF", style= filled];\nbgcolor = "#CD1CED ";\nranksep = 0.5;\nnodesep = 0.5;\nsubgraph cluster_A{\nlabel = "Artistas";\nbgcolor = "#BC70FC";\nfontcolor ="#3A0964";\nfontsize = 30;\n\n ';

//     //we create the customer nodes
//     let aux = this.head;
//     let final = this.tail;
//     let i = 1;
//     while(aux){
//       graphviz += "artista" + i + '[label="' + aux.name+ '"];\n';
//       aux = aux.next;
//       i++;
//       if (aux == this.head){

//          break;
//       }
//     }

//     aux = this.head;

//     i = 1;
//     while(aux){
//         if(aux.next == this.head){
//           break;
//         }else{
//           graphviz += "artista" + i + " -> artista" + (i + 1) + "\n";
//         graphviz += "artista" + (i+1) +"-> artista" + i +"\n";

//         aux = aux.next;
//         i++;
//         }

//       }

//       graphviz += "\n";

//       aux = this.head.next;
//       i = 1;

//       graphviz += "{rank = same; artista" + i;

//       i++;
//       while (aux) {
//         // en esta parte agreagamos el valor de cliente con la posicion i
//         graphviz += "; artista" + i;

//         i++;
//         aux = aux.next;
//         if(aux == this.head){
//           break;
//         }
//       }

//       graphviz += "};\n\n}\n}";

//     console.log(graphviz);

//     let id = "#" + idDiv;

//     d3.select(id) //creamos con d3 el rendeDot y el paragrah
//       .graphviz()

//       .width(2000)
//       .height(1500)
//       .zoom(true)
//       .fit(true)
//       .renderDot(graphviz);

//   }
//   verificar_lista1(){

//     if(this.head){
//       return true;
//     }else{
//      return false
//     }
//   }

// }
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
// let canciones = new listadobleplaylist();
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
        digest = sha256(password);
        clientes.login_admin(user, digest);
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
      digest = sha256(client1.password);
      clientes.add(
        client1.dpi,
        client1.name,
        client1.username,
        digest,
        client1.phone,
        client1.admin
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

      artistas.add(artis1.name, artis1.age, artis1.country);
    }
  };

  lector.readAsText(archivo);
}
document
  .getElementById("ArtistaFile")
  .addEventListener("change", cargar_artistas, false);

//creacion de canciones
function cargar_canciones(e) {
  if (!artistas.verificarlista()) {
    swal("Oops!", "NO HAY ARTISTAS", "error");
  } else {
    var archivo = e.target.files[0];
    document.getElementById("CancionesFile").files[0];

    if (!archivo) {
      return;
    }
    let lector = new FileReader();

    lector.onload = function (e) {
      let contenido = e.target.result;

      const _canc = JSON.parse(contenido);
    
      for (const i in _canc) {
        let can1 = _canc[i];

        artistas.addcanciones(
          can1.artist,
          can1.name,
          can1.duration,
          can1.gender
        );
      }
    };
    lector.readAsText(archivo);
  }
}
document
  .getElementById("CancionesFile")
  .addEventListener("change", cargar_canciones, false);

function showSimpleList() {
  clientes.graph("showSimpleListG");
  // canciones.graph("showSimpleListG")
  document.getElementById("showHashTableG").style.display = "none";
  document.getElementById("showSimpleListG").style.display = "block";
  document.getElementById("showBST").style.display = "none";
  document.getElementById("showAVL").style.display = "none";
}
function showAVLTree() {
  // let ver = canciones.verificar_lista1();
  // if (ver){
  artistas.graph("showAVL");
  // canciones.graph("showAVL")
  document.getElementById("showHashTableG").style.display = "none";
  document.getElementById("showSimpleListG").style.display = "none";
  document.getElementById("showBST").style.display = "none";
  document.getElementById("showAVL").style.display = "block";
  // }else{
  //   swal("Oops!", "CARGUE ARTISTAS Y CANCIONES", "error");
  // }
}
