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
              let welcome = 'Bienvenido ' + recorrido.username

              document.getElementById('welcomeb').innerHTML = welcome;
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
            USUARIO = recorrido.name;
            artistas.print_canciones(recorrido.name);
          
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
  getData(){

    return this.data;
}

getNext(){

    return this.next;
}
 setData(data){

        this.data = data;
    }

    setNext(next){

        this.next = next;
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
  bubbleSort(){
  
    // let temp;
    // let current2 = this.head;
    //  for(let i = 0; i < this.size; i++){
   
    
    //   let current = this.head;
 
    //      while(current.next != null){
          
        
    
    //       current2 = current.next;
    //          if(current.name > current2.name){
    //             temp = current;

    //              current= current2;
    //              current2 = temp;
          
    //          }
    //          current = current.next;
    //         }
    //  }
   
     swal("oops","artitas ordenado", "success")
 

 }

  print_canciones(usuario){
    let current = this.head;
    let i = 1;
    if (current){
      document.getElementById("PANTALLA-MUSICA").innerHTML = "";
      while (current != null){
        let current2 = current.down;
        if (current2 == null){
            break;
        }
        while(current2.next!=null){  
          if(current2.artist == current.name){ 
            let doc = document.getElementById("PANTALLA-MUSICA");
        doc.innerHTML +=`

        <div class="card" style="max-width: 10rem; min-width:10; width:10rem height:15rem;" id="libr">
        <img class="card-img-top" src="https://cdn-icons-png.flaticon.com/512/6000/6000271.png">
        <div class="card-body">
          <h4 class="card-title">${current2.artist}  </h4>
          <h4 class="card-title">${current2.name}  </h4>
          <button id="${current2.name}" class="btn btn-primary" onclick="agregarcancion('${current2.artist}','${current2.name}','${USUARIO}')" name=${current2.artist} >AGREGAR</button>
          </div>
      </div>
      `;   
            current2 = current2.next;
          }else{
        
            break;
          }
        }
        i++;
        current = current.next;
   
 
      }

    }else{
      swal("error","no hay canciones", "error")
    }

  }
  printartistas(){
    let current = this.head;
    let i = 1;
    if (current){
   
     
      document.getElementById("PANTALLA-ARTISTAS").innerHTML = "";
      while (current != null){
        var newDiv = document.createElement("div");
        newDiv.id = "span" + (i) ;
        var respuesta = document.getElementById("PANTALLA-ARTISTAS");
        respuesta.appendChild(newDiv);
   
    
        var el = document.getElementById("span"+ (i));
        el.setAttribute("style", " overflow: auto; width: 900px; height: 500px; margin-top:300px;   margin-left:400px; border-color: black;   border-style:solid;  margin-top: 10px;  margin-left: 50px; margin-right:50px;");
        let current2 = current.down;
        let doc = document.getElementById("span" + (i));
        doc.innerHTML +=`

        <div class="card" style="max-width: 13rem;" id="artis">
        <img class="card-img-top" src="https://cdn-icons-png.flaticon.com/512/7795/7795980.png">
        <div class="card-body">
          <h4 class="card-title">${current.name}</h4>
        </div>
      </div>
      `;
        
        
        
        if (current2 == null){
            break;
        }
        while(current2.next!=null){  
          if(current2.artist == current.name){ 
            let doc = document.getElementById("span" + (i));
        doc.innerHTML +=`

        <div class="card" style="max-width: 10rem; min-width:10; width:10rem;" id="libr">
        <img class="card-img-top" src="https://cdn-icons-png.flaticon.com/512/6000/6000271.png">
        <div class="card-body">
        <h4 class="card-title">${current2.artist}  </h4>
        <h4 class="card-title">${current2.name}  </h4>
        <button id="${current2.name}" class="btn btn-primary" onclick="agregarcancion('${current2.artist}','${current2.name}')" name=${current2.artist} >AGREGAR</button>
        </div>
      </div>
      `;
            
            current2 = current2.next;
          }else{
        
            break;
          }
        }
        i++;
        current = current.next;
   
 
      }

    }else{
      swal("error","no hay canciones", "error")
    }

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
  
    
  }
  add(name1, age1, country1) {

    if(this.verificarArtista(name1)){
      swal(
        "GUARDADO",
       " YA EXISTE EL ARTISTA",
  
        "success"
      );
    }else{

    
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
}

  verificarlista() {
    if (this.head) {
      return true;
    } else {
      return false;
    }
  }
  verificarArtista(nombre){
    let current = this.head;
    while(current != null) {
      if(current.name == nombre){
        return true;
      }else{
        return false;
      }
  }
}
  graph(idDiv) {
    // creamos la variable del diagraph

    let graphviz =
      'digraph SimpleList{\nnode[shape= box, fillcolor="#FFFFFF", style= filled];\nbgcolor = "#CD1CED ";\nranksep = 0.5;\nnodesep = 0.5;\nsubgraph cluster_A{\nlabel = "MUSICA";\nbgcolor = "#BC70FC";\nfontcolor ="#3A0964";\nfontsize = 100;\n\n ';

    //we create the customer nodes
    let current = this.head;

    let i = 1;
    while (current!= null){
      graphviz += "artista" + i + '[label="' + current.name+ '"];\n';

      i++;
      current = current.next;
    }
    let x = 1000;
    let current2 = this.head.down;
    current= this.head;
    while(current!=null){
     
      current2 = current.down;
      if(current2 == null){
        break;
      }
      while(current2.next!=null){
        graphviz += "cancion" + x+ '[label="' + current2.name+ '"];\n';

        x++;
        current2 = current2.next;

    }
    x = (x+100);
    current = current.next;

    
  }

  x = 1000;
  current2 = this.head.down;
  current= this.head;
  while(current!=null){
    if(current!=null){
    current2 = current.down;
  
    while(current2.next!=null){
     
       
      if(current2.artist == current.name){
        
   
        graphviz += "cancion" + x + " -> cancion" + (x + 1) + "\n";
        graphviz += "cancion" + (x+1) + " -> cancion" + x + "\n";
        x++;
        current2 = current2.next;
      
        
        
      }else{
    
        break;
      }
  
  
}

  }
  x = (x+100);
  current = current.next;
}
    
    

    i = 1;
    current = this.head;
    while (current != null) {
      if (current.next != null) {
        graphviz += "artista" + i + " -> artista" + (i + 1) + "\n";
        graphviz += "artista" + (i + 1) + " -> artista" + i + "\n";
      }
      i++;
      current = current.next;
    }

    i = 1;
    x = 1000;
    let y = 0;
    current = this.head;
    while(current != null){
      current2 = current.down;
      while(current2 != null){
        if(current2.artist == current.name){
          graphviz += "cancion" + x + " -> artista" + i + "\n";
          graphviz += "artista" + i + " -> cancion" + x + "\n";
          break;
        }else{
          break;
        }
    }
    y = 0;
      while(current2 != null){
        if(current2.artist == current.name){
          y++;
          current2 = current2.next;
        }else{
          break;
        }
      }
    
    i++;
    x = (x+y);
    x = (x+100);
    current = current.next;
  }

 
    current2 = this.head.next;
    i = 1;
    graphviz += "{rank = same; artista" + i;
    i++;
    while (current2 != null) {
      // en esta parte agreagamos el valor de cliente con la posicion i
      graphviz += "; artista" + i;

      i++;
      current2 = current2.next;
    }
    /////

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

// lista para canciones

class Playlist {
  constructor(artist, name,usuario) {
    this.artist =artist;
    this.name = name;
    this.usuario = usuario;
   
    this.next = null;
    this.prev = null;
  

    //
  }


}




class listadobleplaylist {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
    
  }
 

  

  add(usuario, name,artist) {
 

    const newNode = new  Playlist(usuario,name,artist);

    if(this.head){
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
   

    }else{
      this.head = newNode;
      this.tail = newNode;

    };
    this.head.prev = this.tail;
    this.tail.next = this.head;
    this.size++;
    swal(
      "GUARDADO",
      "Cancion CREADO CORRECTAMENTE" + " " + "Cancion numero" + this.size,

      "success"
    );
  }
  setartist(){
    return this.head;
  }
  print(){

    let current = this.head;
    let current6 = this.head;
    let current7= this.head;
    let i = 1;
    if (current){
     
   
     
      document.getElementById("PANTALLA-PLAYLIST").innerHTML = "";
      var newDiv = document.createElement("div");
      newDiv.id = "spanA" + (i) ;
      var respuesta = document.getElementById("PANTALLA-PLAYLIST");
      respuesta.appendChild(newDiv);
 
  
    
   
   
      let doc = document.getElementById("spanA" + (i));
      while (current){
      

        if (current.artist == USUARIO){
        
 
        doc.innerHTML +=`

        <div class="card"  id="artis">
        <img class="card-img-top" src="https://img.icons8.com/color/512/music-heart--v2.png">
        <div class="card-body">
        <h3 id=PRINCIPAL-CANCION class="card-title">${current.usuario}</h3>
          <h4 class="card-title">${current.name}</h4>
        </div>
      </div>
      `;
        current = current.next;
        if(current ==this.head){
          break;
        }

   
      }else{
        current = current.next;
        if(current == this.head){
          break;
        }
      }
      }

    }else{
      swal("error","no hay canciones", "error")
    }

  }
    // let current = this.head;
  
    // while(current){
      
    //   if (!current.next){
    //     result+=current.name ;
    //     current = current.next;
    //     if (current == this.head){
    //       break;
    //     }
    //   }else{
    //     result+=current.next + "<->";
    //     current = current.next;
    //     if (current = this.head){
    //       break;
    //     }
    //   }
      

    // };
   
    // swal("oops", "canciones" + result, "success");
  
  printcircular(){
    let aux = this.head;
    let aux2 = this.tail;

    console.log("el primer dato de la lista es un" + aux.name + " y el ultimo dato de la lista es " + aux.prev.prev.name);
    

    while(aux){
        console.log(aux.name);
        aux = aux.next;
        if (aux == this.head){
           break;
        }

  }
}
  graph(idDiv){
    // creamos la variable del diagraph

    let graphviz =
      'digraph SimpleList{\nnode[shape= box, fillcolor="#FFFFFF", style= filled];\nbgcolor = "#CD1CED ";\nranksep = 0.5;\nnodesep = 0.5;\nsubgraph cluster_A{\nlabel = "Artistas";\nbgcolor = "#BC70FC";\nfontcolor ="#3A0964";\nfontsize = 30;\n\n ';

    //we create the customer nodes
    let aux = this.head;

    let i = 1;
    while(aux){
      graphviz += "playlist" + i + '[label="' + aux.name+ '"];\n';
      aux = aux.next;
      i++;
      if (aux == this.head){

         break;
      }
    }
    aux = this.head;
    i = 1;
    while(aux){
      if(aux.next == this.head){
        graphviz += "playlist" + (1)+ " -> playlist" + (i) + "\n";
        graphviz += "playlist" + (i)+ " -> playlist" + (1) + "\n";
        break;
      }else{
        graphviz += "playlist" + i + " -> playlist" + (i + 1) + "\n";
       graphviz += "playlist" + (i+1) +"-> playlist" + i +"\n";

     aux = aux.next;
     i++;
      }
    }

    // aux = this.head;

    // i = 1;
    // while(aux){
    //     if(aux.next == this.head){
    //       break;
    //     }else{
    //       graphviz += "artista" + i + " -> artista" + (i + 1) + "\n";
    //     graphviz += "artista" + (i+1) +"-> artista" + i +"\n";

    //     aux = aux.next;
    //     i++;
    //     }

    //   }

      graphviz += "\n";

      aux = this.head.next;
      i = 1;

      graphviz += "{rank = same; playlist" + i;

      i++;
      while (aux) {
        // en esta parte agreagamos el valor de cliente con la posicion i
        if(aux == this.head){
          break;
        }
        graphviz += "; playlist" + i;

        i++;
        aux = aux.next;
       
      }

      graphviz += "};\n\n}\n}";

    // console.log(graphviz);

    let id = "#" + idDiv;

    d3.select(id) //creamos con d3 el rendeDot y el paragrah
      .graphviz()

      .width(2000)
      .height(1500)
      .zoom(true)
      .fit(true)
      .renderDot(graphviz);

  }
  verificar_lista1(){

    if(this.head){
      return true;
    }else{
     return false
    }
  }
  moveizquierda(NOMBRE){
    let current = this.head;
    let current6 = this.head;
    let current8 = this.head;
    let current7= this.head;
    let i = 1;
    while(current){
      if(current.usuario == NOMBRE){
     
        
      
      
        document.getElementById("PANTALLA-PLAYLIST").innerHTML = "";
        var newDiv = document.createElement("div");
        newDiv.id = "spanA" + (i) ;
        var respuesta = document.getElementById("PANTALLA-PLAYLIST");
        respuesta.appendChild(newDiv);
   
    
      
     
  
        let doc = document.getElementById("spanA" + (i));
        current6 = current.next;
        
        current8 = current6.next;
        current7 = current8.next;
        doc.innerHTML +=`

        <div class="card"  id="artis">
        <img class="card-img-top" src="https://img.icons8.com/color/512/music-heart--v2.png">
        <div class="card-body">
        <h3 id=PRINCIPAL-CANCION class="card-title">${current6.usuario}</h3>
          <h4 class="card-title">${current6.name}</h4>
        </div>
      </div>
      `;
      doc.innerHTML +=`

      <div class="card"  id="artis">
      <img class="card-img-top" src="https://img.icons8.com/color/512/music-heart--v2.png">
      <div class="card-body">
      <h3 class="card-title">${current8.usuario}</h3>
        <h4 class="card-title">${current8.name}</h4>
      </div>
    </div>
    `;
  
        doc.innerHTML +=`
          
        <div class="card"  id="artis">
        <img class="card-img-top" src="https://img.icons8.com/color/512/music-heart--v2.png">
        <div class="card-body">
          <h3  class="card-title">${current7.usuario}</h3>
          <h4 class="card-title">${current7.name}</h4>
        </div>
      </div>
      `;
   
 
      
      
  
  
      
    
    
    break;
      }else{
        current = current.next;
        if(current = this.head){
          break;
        }
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
let artistas = new listadobleartista();
var USUARIO = ""
var result = "";
let playlist1 = new listadobleplaylist();
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
          let welcome = 'Bienvenido ' + admin.nombre_completo

          document.getElementById('welcomeb').innerHTML = welcome;
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
      digest = sha256(pass);
      clientes.add(dpi, nombre, usuario, digest, tel, false);

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
function signoff2(){
  document.getElementById("name1").value = "";
  document.getElementById("password1").value = "";
  document.getElementById("LOGIN-1").style.display = "block";
  document.getElementById("PANTALLA-USUARIO").style.display = "none";
  document.getElementById("PANTALLA-ARTISTAS").style.display = "none";
  document.getElementById("Ordenar").style.display = "none";
  document.getElementById("formulario").style.display = "none";
  document.getElementById("showSimpleListG1").style.display = "none";

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

function musica(){
  document.getElementById("PANTALLA-MUSICA").style.display = "block";
  document.getElementById("PANTALLA-ARTISTAS").style.display = "none";
  document.getElementById("Ordenar").style.display = "none";
  document.getElementById("formulario").style.display = "none";
  document.getElementById("PANTALLA-PLAYLIST").style.display = "none";
  document.getElementById("Botones-playlist").style.display = "none";
  document.getElementById("showSimpleListG1").style.display = "none";
  document.getElementById("showSimpleListG2").style.display = "none";

  artistas.print_canciones();

}
function artista(){
  document.getElementById("Ordenar").style.display = "block";
  document.getElementById("formulario").style.display = "block";
  document.getElementById("PANTALLA-ARTISTAS").style.display = "block";
  document.getElementById("PANTALLA-MUSICA").style.display = "none";
  document.getElementById("PANTALLA-PLAYLIST").style.display = "none";
  document.getElementById("Botones-playlist").style.display = "none";
  document.getElementById("showSimpleListG1").style.display = "block";
  document.getElementById("showSimpleListG2").style.display = "none";
  artistas.printartistas();
  
  artistas.graph("showSimpleListG1");

}

function agregarcancion(artista,cancion,al){
  playlist1.add( USUARIO,cancion,artista)

}

function bubbleSort(){
  artistas.bubbleSort();
  // artistas.printartistas();
  // artistas.graph("PANTALLA-ARTISTAS");
}

function publicarcancion(){
  let namecancion = document.getElementById("name-cancion").value;
  let namealbum = document.getElementById("name-albun").value;
  let duracion = document.getElementById("name-duracion").value;
  let gen = document.getElementById("name-genero").value;
  artistas.add(USUARIO,"x","x")
  artistas.addcanciones(USUARIO,namecancion,duracion,gen)
  artistas.printartistas();
  
  artistas.graph("showSimpleListG1");
  document.getElementById("name-cancion").value ="";
  document.getElementById("name-albun").value ="";
 document.getElementById("name-duracion").value ="";
   document.getElementById("name-genero").value="";

  
}
function playlist(){
  document.getElementById("PANTALLA-PLAYLIST").style.display = "block";
  document.getElementById("Botones-playlist").style.display = "block";
  document.getElementById("Ordenar").style.display = "none";
  document.getElementById("formulario").style.display = "none";
  document.getElementById("PANTALLA-ARTISTAS").style.display = "none";
  document.getElementById("PANTALLA-MUSICA").style.display = "none";
  document.getElementById("showSimpleListG1").style.display = "none";
  document.getElementById("showSimpleListG2").style.display = "block";
  
  playlist1.print();
  playlist1.graph("showSimpleListG2")

}

function goizquierda(){
  let cancion = document.getElementById("PRINCIPAL-CANCION").innerHTML;
  // swal("oops","hola"+ ""+ cancion, "sucess")
  playlist1.moveizquierda(cancion);
}