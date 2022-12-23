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

  mostrarusuarios(){
    let current = this.head;
    let i = 1;
    if(current){
      document.getElementById("PANTALLA-USUARIOS").innerHTML = "";
      document.getElementById("PANTALLA-USUARIOS").innerHTML +=    '<h5 id="texto3">AGREGAR AMIGOS</h5>'
      var newDiv = document.createElement("div");
      newDiv.id = "spanAB" + (i) ;
      var respuesta = document.getElementById("PANTALLA-USUARIOS");
      respuesta.appendChild(newDiv);
      let doc = document.getElementById("spanAB" + (i));

      while(current ){
        if(current.admin == true){
          current = current.next;
        }else{
        doc.innerHTML +=`

        <div class="card"  id="artis2">
        <img class="card-img-top" src="https://cdn-icons-png.flaticon.com/512/560/560216.png">
        <div class="card-body" >
        <h3  class="card-title">${current.name}</h3>
        <ul class="list-group list-group-flush">
        <li class="list-group-item">Numero: ${current.phone}</li>
        <li class="list-group-item">Username: ${current.username}</li>
        <li class="list-group-item">Dpi: ${current.dpi}</li>
      </ul>
        </div>
        <button id="${current.username}" class="btn btn-primary" onclick="agregarusuario('${current.name}','${current.username}','${current.dpi}','${current.phone}')"  >AGREGAR</button>
        <button id="${current.username}" class="btn btn-danger" onclick="bloquearusuario('${current.name}','${current.username}','${current.dpi}','${current.phone}')"  >BLOQUEAR</button>
      </div>
      `;
        current = current.next;
      }
    }

    }else{
      swal("erro", "No hay usuarios","error")
    }

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
      graphviz += "cliente" + i + '[label="' + current.name + '"];\n';

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
//ARBOL BINARIO CODIGO


class ArbolB{

  constructor(data){

      this.data = data;
      this.left = null;
      this.right = null;

  }

  //Getters
  getData(){

      return this.data;
  }

  getLeft(){

      return this.left;
  }

  getRight(){

      return this.right;
  }

  //Setters
  setData(data){

      this.data = data;
  }

  setLeft(left){

      this.left = left;
  }

  setRight(right){

      this.right = right;
  }
}
class arbolbinario{

  constructor(){

      this.root = null;
      this.graphviz = '';

  }


  add(data){

      if(this.root == null){

          let newNode = new ArbolB(data);
          this.root = newNode;
      }else{

          this._add(this.root, data);
      }


  }

  _add(node, data){

      if(data.name < node.getData().name){

          if(node.getLeft() == null){
              let newNode =  new ArbolB(data);
              node.setLeft(newNode);

          }else{
              this._add(node.getLeft(), data);
          }


      }else if(data.name > node.getData().name){

          if(node.getRight() == null){
              let newNode =  new BSTreeNode(data);
              node.setRight(newNode);

          }else{
              this._add(node.getRight(), data);

          }

      }else{

          console.log('Se enconstro un elemento igual al que se quiere insetar, insercción fallida.')
      }
  }

 
  //Graphviz
  graph(idDiv){

      this.graphviz = '';
      this.graphviz = ' digraph SimpleList{\nnode[shape= record, fillcolor="#FFFFFF", style= filled];\nbgcolor = "#CD1CED ";\nranksep = 0.5;\nnodesep = 0.5;\nsubgraph cluster_A{\nlabel = "PODCAST";\nbgcolor = "#BC70FC";\nfontcolor ="#3A0964";\nfontsize = 100;\n\n ';

      this.preordenGraph();

      this.graphviz += '}\n}';


      let id = '#'+idDiv;

      d3.select(id).graphviz()
          
          .width(2000)
          .height(1500)
          .zoom(true)
          .fit(true)
          .renderDot(this.graphviz)

  }

  preordenGraph(){

      if(this.root == null){

          console.log('No se ha insertado nada en el BSTree.');
      }else{

          this._preordenGraph(this.root);
      }
  }

  _preordenGraph(node){

      if(node != null){

          if(node.getLeft() != null){

              this.graphviz += node.getData().duration+ '[label="' + node.getData().name + '"];\n';
              this.graphviz += node.getLeft().getData().duration + '[label="' + node.getLeft().getData().name+ '"];\n';
              this.graphviz += node.getData().duration + ' -> ' + node.getLeft().getData().duration+ '\n';
          }
          if(node.getRight() != null){
              
              this.graphviz += node.getData().duration + '[label="' + node.getData().name+ '"];\n';
              this.graphviz += node.getRight().getData().duration + '[label="' + node.getRight().getData().name + '"];\n';
              this.graphviz += node.getData().duration + ' -> ' + node.getRight().getData().duration + '\n';
          }
          this._preordenGraph(node.getLeft());
          this._preordenGraph(node.getRight());
      }


  }

  //Cards

  //Inorden
  //Preorden
  preordenCard(idDiv){

      if(this.root == null){

          console.log('No se ha insertado nada en el BSTree.');
      }else{

          this._preordenCard(this.root, idDiv);
      }
  }

  _preordenCard(node, idDiv){

      if(node != null){

          //
         
         
        doc44.innerHTML +=`

        <div class="card"  id="artis2">
        <img class="card-img-top" src="https://cdn-icons-png.flaticon.com/512/1312/1312585.png">
        <div class="card-body" >
        <h3  class="card-title">${node.getData().name}</h3>
        <ul class="list-group list-group-flush">
        <li class="list-group-item">Duracion: ${node.getData().duration}</li>
        <li class="list-group-item">topic: ${node.getData().topic}</li>
       
      </ul>
        </div>

      </div>
      `;

          //
          this._preordenCard(node.getLeft(), idDiv);
          this._preordenCard(node.getRight(), idDiv);
      }


  }

 
 
}

function reproducirmusica(){
  window.onSpotifyWebPlaybackSDKReady = () => {
    const token = '[My Spotify Web API access token]';
    const player = new Spotify.Player({
      name: 'Web Playback SDK Quick Start Player',
      getOAuthToken: cb => { cb(token); }
    });
  }
}


























//------------------------------------



//MATRIZ DISPERSA ---------------------------------------------

// MATRIZ DISPERSA
class NodoMatriz {
  constructor(x, y, obj,cancion) {
      this.next = null;
      this.prev = null;
      this.up = null;
      this.down = null;

      this.x = x;
      this.y = y;
      this.obj = obj;
      this.cancion = cancion;
  }
}

class NodoHeader {
  constructor(pos) {
      this.next = null;
      this.prev = null;

      this.access = null;

      this.pos = pos;
  }
}


class Matriz {
  constructor() {
      this.colsList = new Header();
      this.rowsList = new Header();
  }
  buscar(mes, dia){
    let auxc = this.rowsList.head;
    while (auxc != null) {
      if(auxc == null){
        swal("cancion no encontrada","agrega la cancion","error")
      }else{
      let aux = auxc.access;

      while (aux != null) {
       
      
      
        if(aux.x == mes && aux.y == dia){
         
       
         
            swal("cancion encontrada", "Artista: "+aux.cancion + " " + "cancion: " +aux.obj,"success")
           
        }
   
      
     
        aux = aux.next;
      

       
      
    }
  }
      auxc = auxc.next;
  }
}

  insertar(x, y, obj,cancion) {
      let cell = new NodoMatriz(x, y, obj,cancion);

      let columna = this.colsList.getHeader(y);
      if (columna == null) {
          columna = new NodoHeader(y);
          this.colsList.setHeader(columna);
          columna.access = cell;
      } else if (x < columna.access.x) {
          cell.down = columna.access;
          columna.access.up = cell;
          columna.access = cell;
      } else {
          let aux = columna.access;
          while (aux.down != null) {
              if (x < aux.down.x) {
                  cell.down = aux.down;
                  aux.down.up = cell;
                  aux.down = cell;
                  cell.up = aux;
                  break;
              }
              aux = aux.down;
          }

          if (aux.down == null) {
              aux.down = cell;
              cell.up = aux;
          }
      }

      let row = this.rowsList.getHeader(x);
      if (row == null) {
          
          row = new NodoHeader(x);
          this.rowsList.setHeader(row);
          row.access = cell;
      
      } else if (y < row.access.y) {
          cell.next = row.access;
          row.access.prev = cell;
          row.access = cell;
      } else {
          let aux = row.access;
          while (aux.next != null) {
              if (y < aux.next.y) {
                  cell.next = aux.next;
                  aux.next.prev = cell;
                  aux.next = cell;
                  cell.prev = aux;
                  break;
              }
              aux = aux.next;
          }

          if (aux.next == null) {
              aux.next = cell;
              cell.prev = aux;
          }
      }

      swal("Exito","DATOS CARGADOS","success")
  }

  exportRender() {
      console.log(this.configraph());
      d3.select("#showBST").graphviz()
      .width(900)
      .height(500)
      .renderDot(this.configraph())
  }


  configraph() {
      let temp = "";
      temp +=  'digraph SimpleList{\nnode[shape= box, fillcolor="#FFFFFF", style= filled];\nbgcolor = "#CD1CED ";\nranksep = 0.5;\nnodesep = 0.5;\nsubgraph cluster_A{\nlabel = "MUSICA";\nbgcolor = "#BC70FC";\nfontcolor ="#3A0964";\nfontsize = 100;\n\n ';
   

      temp += this.nodoX();
      temp += this.ColbyR();
      temp += this.nodoY();
      temp += this.RowsbyR();



      temp += this.renderNodes();

      temp += this.graphRanks();




      temp += "}}";
      return temp.toString();
  }

  nodoX() {
      let temp = "";
      let auxc = this.colsList.head;
      
      temp += "CABEZA -> ";
      temp += auxc.pos;
      temp += ";\n";

      while (auxc != null) {

          temp += auxc.pos;
          temp += "[group =";
          temp += auxc.pos;
          temp += ", fillcolor=antiquewhite2 ];\n";

          if (auxc.next != null) {
   
              temp += auxc.pos;
              temp += " -> ";
              temp += auxc.next.pos;
              temp += ";\n";
          }
          auxc = auxc.next;
      }
      auxc = this.colsList.head;
      temp += "{ rank = same; CABEZA;";

      while (auxc != null) {
   
          temp += auxc.pos;
          temp += ";";

          auxc = auxc.next;
      }
      temp += "}\n";

      return temp.toString();
  }

  nodoY() {
      let temp = "";

      let auxr = this.rowsList.head;
      temp += "CABEZA -> ";
      temp += auxr.pos;
      temp += ";\n";

      while (auxr != null) {
     
          temp += auxr.pos;

          temp += "[group=1, fillcolor=antiquewhite2 ];\n";

          if (auxr.next != null) {
           
              temp += auxr.pos;
              temp += " -> ";
              temp += auxr.next.pos;
              temp += ";\n";
          }
          auxr = auxr.next;
      }
      return temp.toString();
  }

  renderNodes() {
      let temp = "";
      let auxc = this.colsList.head;
      while (auxc != null) {
          let aux = auxc.access;
  
          while (aux != null) {
          
              temp += "X";
              temp += aux.x;
              temp += "Y";
              temp += aux.y;
              temp += '[label="';
              temp +="Artista: ";
              temp += aux.cancion ;
              temp += " "
              temp +="Cancion: ";
              temp += aux.obj;
              temp += '", group=';
              temp += aux.y;
              temp += "];\n";

              aux = aux.down;
          }
          auxc = auxc.next;
      }
      return temp.toString();
  }

  ColbyR() {
      let temp = "";
      let temp2 = "";
      let auxc = this.colsList.head;
      while (auxc != null) {
          if (auxc.access != null) {
       
              temp += auxc.pos;
              temp += " -> ";
              temp += "X";
              temp += auxc.access.x;
              temp += "Y";
              temp += auxc.access.y;
              temp += ";\n";
          }
          let aux = auxc.access;
          while (aux != null) {
              if (aux.down != null) {
                  if(aux.x == aux.down.x){

                  }else{
                  temp2 += "X";
                  temp2 += aux.x;
                  temp2 += "Y";
                  temp2 += aux.y;
                  temp2 += " -> ";
                  temp2 += "X";
                  temp2 += aux.down.x;
                  temp2 += "Y";
                  temp2 += aux.down.y;
                  temp2 += ";\n";
                  }
              }
              aux = aux.down;
          }
          auxc = auxc.next;
      }
      temp += temp2;
      return temp.toString();
  }

  RowsbyR() {
      let temp = "";
      let temp2 = "";
      let auxr = this.rowsList.head;
      while (auxr != null) {
          if (auxr.access != null) {
           
                  temp += auxr.pos;
                  temp += " -> ";
                  temp += "X";
                  temp += auxr.access.x;
                  temp += "Y";
                  temp += auxr.access.y;
                  temp += ";\n";
             
          
              
          }
          let aux = auxr.access;
          while (aux != null) {
              if (aux.next != null) {
                  if(aux.y == aux.next.y){

                  }else{

                  temp2 += "X";
                  temp2 += aux.x;
                  temp2 += "Y";
                  temp2 += aux.y;
                  temp2 += " -> ";
                  temp2 += "X";
                  temp2 += aux.next.x;
                  temp2 += "Y";
                  temp2 += aux.next.y;
                  temp2 += ";\n";
                  }
              }
              aux = aux.next;
          }
          auxr = auxr.next;
      }
      temp += temp2;
      return temp.toString();
  }

  graphRanks() {
      let temp = "";
      let auxr = this.rowsList.head;
      while (auxr != null) {
          temp += "{ rank = same; ";
          temp += auxr.pos;
          temp += ";";

          let aux = auxr.access;
          while (aux != null) {
              temp += "X";
              temp += aux.x;
              temp += "Y";
              temp += aux.y;
              temp += ";";

              aux = aux.next;
          }
          temp += "}\n";

          auxr = auxr.next;
      }
      return temp.toString();
  }
}

class Header {
  constructor() {
      this.head = null;
  }

  isEmpty() {
      return this.head == null;
  }

  getHeader(pos) {
      let aux = this.head;
      while (aux != null) {
          if (aux.pos == pos) return aux;
          aux = aux.next;
      }
      return null;
  }

  setHeader(node) {
      if (this.isEmpty()) {
          this.head = node;
      } else if (node.pos < this.head.pos) {
          node.next = this.head;
          this.head.prev = node;
          this.head = node;
      } else {
          let aux = this.head;
          while (aux.next != null) {
              if (node.pos < aux.next.pos) {
                  node.next = aux.next;
                  aux.next.prev = node;
                  node.prev = aux;
                  aux.next = node;
                  break;
              }
              aux = aux.next;
          }

          if (aux.next == null) {
              aux.next = node;
              node.prev = aux;
          }
      }
  }
}










//-------------------------------------------------------------------
//COLA PARA BLOQUEADOS

class UsuarioBloqueados{
  constructor(usuario){
    this.usuario = usuario;
    this.next = null;
    this.prev = null;
    this.down = new bloqueados1();
  }
}

class bloqueados1{
  constructor(name,username,phone,dpi){
    this.name = name;
    this.username = username;
    this.phone = phone;
    this.dpi = dpi;
    this.next = null;
  }
}
class listabloqueados{
  constructor(){
    this.head = null;
    this.tail = null;
    this.size = 0;
    this.size2 = 0;
  }
  graph(idDiv){
    let graphviz =
    'digraph SimpleList{\nnode[shape= record, fillcolor="#FFFFFF", style= filled];\nbgcolor = "#CD1CED ";\nranksep = 0.0;\nnodesep = 0.0;\nsubgraph cluster_A{\nlabel = "LISTA AMIGOS";\nbgcolor = "#BC70FC";\nfontcolor ="#3A0964";\nfontsize = 100;\n\n ';

    //we create the customer nodes
    let aux = this.head;
   

    let i = 1;
    while(aux){
      let current2 = aux.down;
      if(aux.usuario == USUARIO){
        while(current2){
          graphviz += "Lista" + i + '[label="' + current2.name+ '"];\n';
          current2= current2.next;
          i++;
        
       
        }
        
      }
      aux = aux.next;
     
     
    }

    aux = this.head;
    i = 1;
    let H = 0;
    while(aux){
      let current2 = aux.down;
      if(aux.usuario == USUARIO){
        while(current2){
          if(current2.next != null){
            graphviz += "Lista" + i + " -> Lista" + (i + 1) + "\n";
            
          }
          i++;
            current2 = current2.next;
       
        
          
        
        }
      }
      aux = aux.next;
    }
  
      graphviz += "\n\n}\n}";

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
  
  print(){
    let current = this.head;
    let i = 1;
    let graph = ""
    document.getElementById("Mostrar-bloqueados").innerHTML = "";
    document.getElementById("Mostrar-bloqueados").innerHTML += '<h5 id="texto3">USUARIOS BLOQUEADOS</h5>'
    while(current){
      if(current.usuario == USUARIO){
        var newDiv = document.createElement("div");
        newDiv.id = "spanACD" + (i) ;
        var respuesta = document.getElementById("Mostrar-bloqueados");
        respuesta.appendChild(newDiv);
        let doc = document.getElementById("spanACD" + (i));
        let current4 = current.down;
        while(current4){
          doc.innerHTML +=`

          <div class="card"  id="artis2">
          <img class="card-img-top" src="https://cdn-icons-png.flaticon.com/512/2206/2206391.png">
          <div class="card-body" >
          <h3  class="card-title">${current4.name}</h3>
          <ul class="list-group list-group-flush">
          <li class="list-group-item">Numero: ${current4.phone}</li>
          <li class="list-group-item">Username: ${current4.username}</li>
          <li class="list-group-item">Dpi: ${current4.dpi}</li>
        </ul>
          </div>
  
        </div>
        `;
          current4 = current4.next;

        }
      }
      current = current.next;

    }
 
  }
  verificarUsuario(usuario){
    let current = this.head;
    while(current != null){
      if(current.usuario == USUARIO){
        return true;
      }else{
        current = current.next;
      }
    }
    return false;
  }
  add(usuario1){
    if(this.verificarUsuario(usuario1)){
      
    }else{
      const newNode = new UsuarioBloqueados(USUARIO)
      if(this.head){
        this.size2 = 0;
        newNode.next = this.head;
        this.head.prev= newNode;
        this.head = newNode;
      }else{
        this.head = newNode;
        this.tail = newNode;
      }
      this.size++;

  

    }
    
  }

  addbloqueados1(name,username,dpi,phone){
    let current = this.head;
    while(current != null){
      if(current.usuario == USUARIO){
     
 
        if(this.verificarbloqueado(username)){
          swal("error","USUARIO YA BLOQUEADO", "error")
        }else{
          
       
    
        
          var newNode = new bloqueados1(name,username,dpi,phone);
          let current3 = current.down;
          if(this.size2 > 0){
            while(current3.next){
              current3= current3.next;
            }
         
            current3.next = newNode;
          }else{
            current.down = newNode;
          }
          this.size2++;
          swal("succes","USUARIO BLOQUEADO CON EXITO", "sucess")
          }
        
        
      }
      current = current.next;

    }
  }

  addbloqueados(name,username,dpi,phone){
    let current = this.head;
    while(current != null){
      if(current.usuario == USUARIO){
     
 
        if(this.verificarbloqueado(username)){
          swal("error","USUARIO YA BLOQUEADO", "error")
        }else{
          if(listaamigos1.verificaramigos(username)){
            swal("error", "No puedes bloquear a este Usuario, porque ya lo tienes agregado como amigo, bloquealo desde ahi","error")

          }else{
       
    
        
          var newNode = new bloqueados1(name,username,dpi,phone);
          let current3 = current.down;
          if(this.size2 > 0){
            while(current3.next){
              current3= current3.next;
            }
         
            current3.next = newNode;
          }else{
            current.down = newNode;
          }
          this.size2++;
          swal("succes","USUARIO BLOQUEADO CON EXITO", "sucess")
          }
        }
        
      }
      current = current.next;

    }
  
  
  }
  verificarbloqueado(usuario1){
    let current = this.head;
  
    while(current !=null){
      if(current.usuario== USUARIO){
        let current2 = current.down;
        while(current2){
          if(current2.username== usuario1){
            return true;
          }
          current2 = current2.next;
        }
      }
      current = current.next;
    }
    return false;
  }
  desbloquerusuario(){
    let current = this.head;
    let curren3 = current.down;
    if(this.size2 > 0){
      this.size2--;
      var temp =  current.down;
      current.down = current.down.next;

    }else{
      return null;
    }

  }

  
}

class amigos1{
  constructor(name,username,phone,dpi){
    this.name = name;
    this.username = username;
    this.phone = phone;
    this.dpi = dpi;
    this.next = null;
  
  }
}


// PILA PARA AMIGOS

class Usuarioamigos{
  constructor(Usuario){
    this.usuario = Usuario;
    this.down = new amigos1();
    this.next = null;
    this.prev = null;

  }
  
  
}

class listaamigos{
  constructor(){
    this.head = null;
    this.tail = null;
    this.size = 0;
    this.size2 = 0;

  }
  eliminaramigo1(){
    let current = this.head;
    let aux = current.down
    if(aux != null){
      this.size2--;
      var temp = aux;
      current.down = temp.next;
    }else{
      return null
    }
    }

  bloquearamigo33(){
    let current = this.head;
    let aux = current.down;
    if(aux != null){
      this.size2--;
    
      var temp = aux;
      colabloqueados.add()
      colabloqueados.addbloqueados1(temp.name,temp.username,temp.dpi,temp.phone);
      current.down = temp.next;
    
      
    }else{
      return null;
    }
  }
  add(usuario1){
    if(this.verificarUsuario(usuario1)){
     
    }else{
      if(colabloqueados.verificarbloqueado(usuario1)){
        swal("Error","No puedes agregar este Usuario, desbloquealo", "error");
      }else{


      const newNode = new Usuarioamigos(USUARIO)
      if(this.head){
        newNode.next = this.head;
        this.head.prev= newNode;
        this.head = newNode;
      }else{
        this.head = newNode;
        this.tail = newNode;
      }
      this.size++;
    }
  

    }
  }
  verificarUsuario(usuario){
    let current = this.head;
    while(current != null){
      if(current.usuario == USUARIO){
        return true;
      }else{
        current = current.next;
      }
    }
    return false;
  }
  
  addamigos(usuario5,username5,dpi5,numero5){
    let temporalcabeza = this.head;
    while(temporalcabeza != null){
      if(temporalcabeza.usuario ==USUARIO){
        if(this.verificaramigos(username5)){
          swal("oops","El ya es tu amigo", "error")
        }else{
          if(colabloqueados.verificarbloqueado(username5)){
            swal("oops","NO PUEDES AGREGAR A ESTE USUARIO, porque esta bloqueado, desbloquealo", "error")
          }else{
        
        var nuevacancion = new amigos1(usuario5,username5,numero5,dpi5)
        var iniciousuarios = temporalcabeza.down;
      
        if(temporalcabeza.down){
          temporalcabeza.down = nuevacancion;
          temporalcabeza.down.next = iniciousuarios;
        }else{
          temporalcabeza.down = nuevacancion;
        }
        this.size2++;
        swal(
          "GUARDADO",
          "AMIGO AGREGADO CORRECTAMENTE" + " " + "Amigo numero" + this.size2,
    
          "success"
        );
     

        
          }
      

          
        }
      }
    
      temporalcabeza = temporalcabeza.next;
    }

  }
  graph(idDiv){
    let graphviz =
    'digraph SimpleList{\nnode[shape= record, fillcolor="#FFFFFF", style= filled];\nbgcolor = "#CD1CED ";\nranksep = 0.0;\nnodesep = 0.0;\nsubgraph cluster_A{\nlabel = "LISTA AMIGOS";\nbgcolor = "#BC70FC";\nfontcolor ="#3A0964";\nfontsize = 100;\n\n ';

    //we create the customer nodes
    let aux = this.head;
   

    let i = 1;
    while(aux){
      let current2 = aux.down;
      if(aux.usuario == USUARIO){
        while(current2!= null){
          graphviz += "Lista" + i + '[label="' + current2.name+ '"];\n';
          current2= current2.next;
          i++;
        
       
        }
        
      }
      aux = aux.next;
     
     
    }

    aux = this.head;
    i = 1;
    let H = 0;
    while(aux){
      let current2 = aux.down;
      if(aux.usuario == USUARIO){
        while(current2.next){
       
            graphviz += "Lista" + i + " -> Lista" + (i + 1) + "\n";
            
         
          i++;
            current2 = current2.next;
       
        
          
        
        }
      }
      aux = aux.next;
    }
  
      graphviz += "\n\n}\n}";

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

  verificaramigos(usuario3){

    let current = this.head;
    while(current != null){
      if(current.usuario== USUARIO){
    
        
        let current2 = current.down;
        while(current2){
          if(current2.username == usuario3){
            return true;
          }
          current2 = current2.next;
         
        
        }
      }
      current = current.next;
    }
    return false;
  
  }
  print2(){
    let i = 1;
    let aux = this.head;
    document.getElementById("PANTALLA-AMIGOS").innerHTML = "";
    document.getElementById("PANTALLA-AMIGOS").innerHTML += '<h5 id="texto3">AMIGOS AGREGADOS</h5>'
    while(aux){
      let current2 = aux.down;
      if(aux.usuario== USUARIO){
        var newDiv = document.createElement("div");
        newDiv.id = "spanAC" + (i) ;
        var respuesta = document.getElementById("PANTALLA-AMIGOS");
        respuesta.appendChild(newDiv);
        let doc = document.getElementById("spanAC" + (i));
        while(current2.next){
          doc.innerHTML +=`

        <div class="card"  id="artis2">
        <img class="card-img-top" src="https://cdn-icons-png.flaticon.com/512/3429/3429199.png">
        <div class="card-body" >
        <h3  class="card-title">${current2.name}</h3>
        <ul class="list-group list-group-flush">
        <li class="list-group-item">Numero: ${current2.phone}</li>
        <li class="list-group-item">Username: ${current2.username}</li>
        <li class="list-group-item">Dpi: ${current2.dpi}</li>
      </ul>
        </div>

      </div>
      `;
        current2 = current2.next;


        }
        
      }
      
      aux = aux.next;
    }
    let doc = document.getElementById("spanAC" + (i));

    

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

    return this.name;
}

getNext(){

    return this.next;
}
 setData(data){

        this.name = data;
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
  //FUNCIONAMIENTO QUICKSTORT
  getNodo(pos){
		let temp = this.head;
		for(let i = 0; i<pos;i++){
			temp = temp.next;
		}
		return temp;
	}

  quicksort(){
    this.ordenar(0,this.size-1)
  }
  ordenar(min,max) {
    if (min < max) {
  
      let pos = this.partir(min, max);
      console.log("pos", pos)
      this.ordenar(min, pos - 1);
      this.ordenar(pos + 1, max);
    }}

    partir(min,max){
      let pivote = this.getNodo(max).name;
      
      let i = (min - 1);
      
      for(let j = min; j <= max - 1; j++){
        if(this.getNodo(j).name > pivote){
          i++;
          this.change(i,j);
        }
      }
      this.change(i + 1, max);
      return (i + 1);
    }

    change(pos1,pos2){
      let valor = this.getNodo(pos1).name;
      this.getNodo(pos1).name  = this.getNodo(pos2).name;
      this.getNodo(pos2).name = valor;

      let valor2 = this.getNodo(pos1).down;
      this.getNodo(pos1).down = this.getNodo(pos2).down
      this.getNodo(pos2).down = valor2;
    }
  









  //_________________________________

  

  bubbleSort(){
    // let current = this.head;
    // let gr = ""
    // while(current != null){
    //   gr+="artista: " + current.name + "   "; 
    //   current = current.next;

    // }
    // swal("oops","1 "+ gr, "sucess")

  

    let temp;
    let temp2;

    for(let i = 0; i < this.size; i++){

        let current = this.head;


        while(current.next != null){
        
            
            let current2 = current;
            current2 = current2.next;
          
        
            
            if(current.name > current2.name){
              
              
              temp = current.name;
              temp2 = current2.name
              let aux1 = current2.down;
              let aux2 = current.down;
              let country1 = current.country
              let country2 = current2.country
              let age1 = current.age;
              let age2 = current2.age;
              
              current.name = temp2;
              current2.name= temp;

              current.down = aux1;
              current2.down = aux2

              current.age = age2;
              current2.age = age1;

              current.country = country2;
              current2.country = country1;
              
          
                     
 
            }
             
                     
 
              
              
            current  = current.next;
            }

          

    }
  
         
   
  
 

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
     newNode.next = this.head;
     this.head = newNode;
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

class cancion1{
  constructor(artista2,cancion){
    this.artista2 = artista2;
    this.cancion = cancion;
    this.next = null;
    this.prev = null;
  

  
  }

}
class listadoblecanciones{
  constructor(){
    this.head = null;
    this.tail = null;
    this.size = 0;

    
  }
 
addUsuario(){
    if(this.verificarUsuario(USUARIO)){
      
      return "nada"
    }else{
      const newNode = new cancion1(USUARIO);
   
   

      if(this.head){
        newNode.next = this.head;
        this.head.prev = newNode;
        this.head = newNode;
      }else{
        this.head = newNode;
        this.tail = newNode;
      }
      this.size++;
      swal(
        "GUARDADO",
       "cancionguardada" +this.size,
        "success"
      );
     
    }
  }

  verificarUsuario(nombre){
    let current = this.head;
    while(current!=null){
      
      if(current.usuario == nombre){
        return true;
      }else{
        return false;
      }

    }
  }




  
}
// lista para canciones




class Playlist {
  constructor(usuario) {
    this.usuario = usuario;
    this.next = null;
    this.prev = null;
    this.list2 = new listadoblecanciones();
  
  
  }
}
let constantemusica = 0
class listadobleplaylist {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
    this.size2 = 0;
    
  }
  verificarcancion(cancion2){
    let current = this.head;
    while(current){
      if(current.usuario == USUARIO){
        let current2 = this.head.list2;
        let current3 = current2.head;
        while(current3){
          if (current3.cancion == cancion2){
            return true;
          }else{
         
          }
          current3 = current3.next;
          if(current3 == this.head.list2.head){
            return false;
          }
         
        }
      }
      current = current.next;
    }
  }
  

    addcanciones(artista1,cancion2){
    if (this.verificarcancion(cancion2)){
      swal(
        "GUARDADO",
       "LA CANCION YA EXISTE EN LA PLAYLIST",
  
        "error"
      );
      }else{

    let current = this.head;
    while(current != null){
     
     if(current.usuario== USUARIO){
        

       var newNode= new cancion1(artista1,cancion2);
       if(current.list2.head){
        newNode.next =  current.list2.head
        current.list2.head.prev = newNode;
        current.list2.head = newNode;
       }else{
        current.list2.head = newNode;
        current.list2.tail = newNode;
       }
       current.list2.head.prev= current.list2.tail;
       current.list2.tail.next = current.list2.head;
       
       
      
     
       this.size2++;
       swal(
         "GUARDADO",
        "cancionguardada" +this.size2,
         "success"
       );
   }
   current = current.next;


 }
}
}
  
  addUsuario(){
    if(this.verificarUsuario(USUARIO)){
      
      return "nada"
    }else{
      const newNode = new Playlist(USUARIO);
      if(this.head){
        newNode.next = this.head;
        this.head.prev = newNode;
        this.head = newNode;
      }else{
        this.head = newNode;
        this.tail = newNode;
      }
      this.size++;
     
     
    }
  }

  verificarUsuario(nombre){
    let current = this.head;
    while(current!=null){
      
      if(current.usuario == nombre){
        return true;
      }else{
        return false;
      }

    }
  }

  

  // add(usuario, name,artist) {
 

  //   const newNode = new  Playlist(usuario,name,artist);

  //   if(this.head){
  //     newNode.next = this.head;
  //     this.head.prev = newNode;
  //     this.head = newNode;
   

  //   }else{
  //     this.head = newNode;
  //     this.tail = newNode;

  //   };
  //   this.head.prev = this.tail;
  //   this.tail.next = this.head;
  //   this.size++;
  //   swal(
  //     "GUARDADO",
  //     "Cancion CREADO CORRECTAMENTE" + " " + "Cancion numero" + this.size,

  //     "success"
  //   );
  // }
  setartist(){
    return this.head;
  }
  print(){
    let i = 1;
    let aux = this.head;
    document.getElementById("PANTALLA-PLAYLIST").innerHTML = "";
    while(aux){
   
      let current2 = aux.list2.head;
      
      if(aux.usuario == USUARIO){
      
        var newDiv = document.createElement("div");
        newDiv.id = "spanA" + (i) ;
        var respuesta = document.getElementById("PANTALLA-PLAYLIST");
        respuesta.appendChild(newDiv);
        let doc = document.getElementById("spanA" + (i));
       
        while(current2){

          
     
       
         if(i == 1){
            
          doc.innerHTML +=`

          <div class="card"  id="artis">
          <img class="card-img-top" src="https://img.icons8.com/color/512/music-heart--v2.png">
          <div class="card-body">
          <h3  class="card-title">${current2.artista2}</h3>
            <h4 id=PRINCIPAL-CANCION class="card-title">${current2.cancion}</h4>
          </div>
        </div>
        `;
          i++;
          current2 = current2.next;
          if(current2 == aux.list2.head){
            break;
          }
        }else{
          doc.innerHTML +=`

          <div class="card"  id="artis">
          <img class="card-img-top" src="https://img.icons8.com/color/512/music-heart--v2.png">
          <div class="card-body">
          <h3  class="card-title">${current2.artista2}</h3>
            <h4 class="card-title">${current2.cancion}</h4>
          </div>
        </div>
        `;
          i++;
          current2 = current2.next;
          if(current2 == aux.list2.head){
            break;
          }
          if (i == 4){
            break;
          }


        }

          
        
      
          

         
        }
      }
      aux = aux.next;
    }
  }
 
  
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
      let current2 = aux.list2.head;
      if(aux.usuario == USUARIO){
        while(current2){
          graphviz += "playlist" + i + '[label="' + current2.cancion+ '"];\n';
          current2= current2.next;
          i++;
          if(current2 == aux.list2.head){
            break;
          }
       
        }
        
      }
      aux = aux.next;
     
     
    }

    aux = this.head;
    i = 1;
    let H = 0;
    while(aux){
      let current2 = aux.list2.head;
      if(aux.usuario == USUARIO){
        while(current2){
          if(current2.next == aux.list2.head){
            graphviz += "playlist" + (1)+ " -> playlist" + (i) + "\n";
          graphviz += "playlist" + (i)+ " -> playlist" + (1) + "\n";
            H = i;
            break;
           }
          graphviz += "playlist" + i + " -> playlist" + (i + 1) + "\n";
           graphviz += "playlist" + (i+1) +"-> playlist" + i +"\n";
           i++;
           current2 = current2.next;
           
          
        }
      }
      aux = aux.next;
    }
    // aux = this.head;
    // i = 1;
    // while(aux){
    
    //   if(aux.next == this.head){
    //     graphviz += "playlist" + (1)+ " -> playlist" + (i) + "\n";
    //     graphviz += "playlist" + (i)+ " -> playlist" + (1) + "\n";
    //     break;
    //   }else{
    //     graphviz += "playlist" + i + " -> playlist" + (i + 1) + "\n";
    //    graphviz += "playlist" + (i+1) +"-> playlist" + i +"\n";

    //  aux = aux.next;
    //  i++;
    //   }
    // }


 

      graphviz += "\n";

      aux = this.head;
      i = 1;

   
      graphviz += "{rank = same; playlist" + i;

      i++;

      for(i = 2; i<= H; i++){
        graphviz += "; playlist" + i;
      }
      // while (aux) {
      //   // en esta parte agreagamos el valor de cliente con la posicion i
      //   if(aux == this.head){
      //     break;
      //   }
      //   graphviz += "; playlist" + i;

      //   i++;
      //   aux = aux.next;
       
      // }

      graphviz += "}\n\n}\n}";

    // console.log(graphviz);

    let id = "#" + idDiv;

    d3.select(id) //creamos con d3 el rendeDot y el paragrah
      .graphviz()

      .width(2000)
      .height(1500)
      .zoom(true)
      .fit(true)
      .renderDot(graphviz);


    swal("suc", "grapbhiz" + " " + graphviz,"sucess")

  }
  verificar_lista1(){

    if(this.head){
      return true;
    }else{
     return false
    }
  }
  movederecha(NOMBRE){
  




    let i = 1;
    let aux = this.head;
    document.getElementById("PANTALLA-PLAYLIST").innerHTML = "";
    while(aux){
      let current2 = aux.list2.head;
      if(aux.usuario == USUARIO){
        var newDiv = document.createElement("div");
        newDiv.id = "spanA" + (i) ;
        var respuesta = document.getElementById("PANTALLA-PLAYLIST");
        respuesta.appendChild(newDiv);
        let doc = document.getElementById("spanA" + (i));
        while(current2){
          if(current2.cancion == NOMBRE){
            let current3 = current2;
            current3 = current3.next;
            let current4 = current3;
            current4 = current4.next;
            let current5 = current4;
            current5 = current5.next;
            doc.innerHTML +=`

          <div class="card"  id="artis">
          <img class="card-img-top" src="https://img.icons8.com/color/512/music-heart--v2.png">
          <div class="card-body">
          <h3  class="card-title">${current3.artista2}</h3>
            <h4 id=PRINCIPAL-CANCION class="card-title">${current3.cancion}</h4>
          </div>
        </div>
        `;
        doc.innerHTML +=`

          <div class="card"  id="artis">
          <img class="card-img-top" src="https://img.icons8.com/color/512/music-heart--v2.png">
          <div class="card-body">
          <h3  class="card-title">${current4.artista2}</h3>
            <h4 id=PRINCIPAL-CANCION class="card-title">${current4.cancion}</h4>
          </div>
        </div>
        `;
        doc.innerHTML +=`

        <div class="card"  id="artis">
        <img class="card-img-top" src="https://img.icons8.com/color/512/music-heart--v2.png">
        <div class="card-body">
        <h3  class="card-title">${current5.artista2}</h3>
          <h4 id=PRINCIPAL-CANCION class="card-title">${current5.cancion}</h4>
        </div>
      </div>
      `;

      break;
          
          


          }else{
            current2 =current2.next;
          }
        }
      }
      aux = aux.next;
    }
  

  }
  moveizquierda(NOMBRE){
     let i = 1;
    let aux = this.head;
    document.getElementById("PANTALLA-PLAYLIST").innerHTML = "";
    while(aux){
      let current2 = aux.list2.head;
      if(aux.usuario == USUARIO){
        var newDiv = document.createElement("div");
        newDiv.id = "spanA" + (i) ;
        var respuesta = document.getElementById("PANTALLA-PLAYLIST");
        respuesta.appendChild(newDiv);
        let doc = document.getElementById("spanA" + (i));
        while(current2){
          if(current2.cancion == NOMBRE){
            let current3 = current2;
            let currentreg = current2;
            currentreg = currentreg.prev;
            current3 = current3.next;
            let current4 = current3;
            current4 = current4.next;
            let current5 = current4;
            current5 = current5.next;
            doc.innerHTML +=`

          <div class="card"  id="artis">
          <img class="card-img-top" src="https://img.icons8.com/color/512/music-heart--v2.png">
          <div class="card-body">
          <h3  class="card-title">${currentreg.artista2}</h3>
            <h4 id=PRINCIPAL-CANCION class="card-title">${currentreg.cancion}</h4>
          </div>
        </div>
        `;
        doc.innerHTML +=`

          <div class="card"  id="artis">
          <img class="card-img-top" src="https://img.icons8.com/color/512/music-heart--v2.png">
          <div class="card-body">
          <h3  class="card-title">${current2.artista2}</h3>
            <h4 id=PRINCIPAL-CANCION class="card-title">${current2.cancion}</h4>
          </div>
        </div>
        `;
        doc.innerHTML +=`

        <div class="card"  id="artis">
        <img class="card-img-top" src="https://img.icons8.com/color/512/music-heart--v2.png">
        <div class="card-body">
        <h3  class="card-title">${current3.artista2}</h3>
          <h4 id=PRINCIPAL-CANCION class="card-title">${current3.cancion}</h4>
        </div>
      </div>
      `;

      break;
          
          


          }else{
            current2 =current2.next;
          }
        }
      }
      aux = aux.next;
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
let listaamigos1 = new listaamigos();
let colabloqueados = new listabloqueados();
const matrizDispersa = new Matriz();
var abb = new arbolbinario();

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
  document.getElementById("PANTALLA-USUARIOS").style.display = "none";
  document.getElementById("grafoamigos").style.display = "none";
  document.getElementById("PANTALLA-AMIGOS").style.display = "none";
  document.getElementById("PANTALLA-BLOQUEADOS").style.display = "none";
  document.getElementById("Mostrar-bloqueados").style.display = "none";
  document.getElementById("PANTALLA-PODCAST").style.display = "none";
  document.getElementById("showHashTableG1").style.display = "none";
  document.getElementById("agregar-podcast").style.display = "none";
  

}

function cargar_matriz(e){
  var archivo = e.target.files[0];
  document.getElementById("MusicaFile").files[0]
  if (!archivo) {
    return;
  }
  let lector = new FileReader();
  lector.onload = function (e) {
    let contenido = e.target.result;

    const _clients = JSON.parse(contenido);

    for (const i in _clients) {
      let client1 = _clients[i];
      matrizDispersa.insertar(client1.month,
        client1.day,
        client1.song,
        client1.artist
     
      );
    }
  };
  lector.readAsText(archivo);

}
document
  .getElementById("MusicaFile")
  .addEventListener("change", cargar_matriz, false);

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
 // cargar podcast 

 function cargar_podcast(e) {
  var archivo = e.target.files[0];
  document.getElementById("podcastFile").files[0];

  if (!archivo) {
    return;
  }
  let lector = new FileReader();

  lector.onload = function (e) {
    let contenido = e.target.result;

    const _artis = JSON.parse(contenido);

    for (const i in _artis) {
      let artis1 = _artis[i];
      abb.add(artis1)
   
    }
  };

  lector.readAsText(archivo);
}
document
  .getElementById("podcastFile")
  .addEventListener("change", cargar_podcast, false);




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
function showBSTree(){
  document.getElementById("showHashTableG").style.display = "none";
  document.getElementById("showSimpleListG").style.display = "none";
  document.getElementById("showBST").style.display = "block";
  document.getElementById("showAVL").style.display = "none";
  matrizDispersa.exportRender()
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
  document.getElementById("PANTALLA-USUARIOS").style.display = "none";
  document.getElementById("PANTALLA-AMIGOS").style.display = "none";
  document.getElementById("grafoamigos").style.display = "none";
  document.getElementById("PANTALLA-BLOQUEADOS").style.display = "none";
  document.getElementById("Mostrar-bloqueados").style.display = "none";
  document.getElementById("mostrar-calendar").style.display = "block";
  document.getElementById("PANTALLA-PODCAST").style.display = "none";
  document.getElementById("showHashTableG1").style.display = "none";
  document.getElementById("agregar-podcast").style.display = "none";

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
  document.getElementById("PANTALLA-USUARIOS").style.display = "none";
  document.getElementById("PANTALLA-AMIGOS").style.display = "none";
  document.getElementById("grafoamigos").style.display = "none";
  document.getElementById("PANTALLA-BLOQUEADOS").style.display = "none";
  document.getElementById("Mostrar-bloqueados").style.display = "none";
  document.getElementById("mostrar-calendar").style.display = "none";
  document.getElementById("PANTALLA-PODCAST").style.display = "none";
  document.getElementById("showHashTableG1").style.display = "none";
  document.getElementById("agregar-podcast").style.display = "none";
  artistas.printartistas();
  
  artistas.graph("showSimpleListG1");

}

function agregarcancion(artista,cancion){
  playlist1.addUsuario(USUARIO)
   playlist1.addcanciones(artista,cancion)
}



function bubbleSort(){
  artistas.bubbleSort();
  artistas.printartistas();
  artistas.graph("showSimpleListG1");
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
   document.getElementById("mostrar-calendar").style.display = "none";

  
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
  document.getElementById("PANTALLA-USUARIOS").style.display = "none";
  document.getElementById("PANTALLA-AMIGOS").style.display = "none";
  document.getElementById("grafoamigos").style.display = "none";
  document.getElementById("PANTALLA-BLOQUEADOS").style.display = "none";
  document.getElementById("Mostrar-bloqueados").style.display = "none";
  document.getElementById("mostrar-calendar").style.display = "none";
  document.getElementById("PANTALLA-PODCAST").style.display = "none";
  document.getElementById("showHashTableG1").style.display = "none";

  
  playlist1.print();
  playlist1.graph("showSimpleListG2")

}

function goizquierda(){
  let cancion = document.getElementById("PRINCIPAL-CANCION").innerHTML;
  // swal("oops","hola"+ ""+ cancion, "sucess")
  playlist1.moveizquierda(cancion);
}
function goderecha(){
  let cancion = document.getElementById("PRINCIPAL-CANCION").innerHTML;
  playlist1.movederecha(cancion)
}

function amigos(){
  document.getElementById("PANTALLA-PLAYLIST").style.display = "none";
  document.getElementById("Botones-playlist").style.display = "none";
  document.getElementById("Ordenar").style.display = "none";
  document.getElementById("formulario").style.display = "none";
  document.getElementById("PANTALLA-ARTISTAS").style.display = "none";
  document.getElementById("PANTALLA-MUSICA").style.display = "none";
  document.getElementById("showSimpleListG1").style.display = "none";
  document.getElementById("showSimpleListG2").style.display = "none";
  document.getElementById("PANTALLA-USUARIOS").style.display = "block";
  document.getElementById("PANTALLA-AMIGOS").style.display = "block";
  document.getElementById("grafoamigos").style.display = "block";
  document.getElementById("PANTALLA-BLOQUEADOS").style.display = "none";
  document.getElementById("Mostrar-bloqueados").style.display = "none";
  document.getElementById("mostrar-calendar").style.display = "none";
  document.getElementById("PANTALLA-PODCAST").style.display = "none";
  document.getElementById("showHashTableG1").style.display = "none";


  
  clientes.mostrarusuarios();
  listaamigos1.graph("showSimpleListG4")
  listaamigos1.print2();

  
}
function bloqueados(){
  document.getElementById("PANTALLA-BLOQUEADOS").style.display = "block";
  document.getElementById("Mostrar-bloqueados").style.display = "block";
  document.getElementById("PANTALLA-PLAYLIST").style.display = "none";
  document.getElementById("Botones-playlist").style.display = "none";
  document.getElementById("Ordenar").style.display = "none";
  document.getElementById("formulario").style.display = "none";
  document.getElementById("PANTALLA-ARTISTAS").style.display = "none";
  document.getElementById("PANTALLA-MUSICA").style.display = "none";
  document.getElementById("showSimpleListG1").style.display = "none";
  document.getElementById("showSimpleListG2").style.display = "none";
  document.getElementById("PANTALLA-USUARIOS").style.display = "none";
  document.getElementById("PANTALLA-AMIGOS").style.display = "none";
  document.getElementById("grafoamigos").style.display = "none";
  document.getElementById("mostrar-calendar").style.display = "none";
  document.getElementById("PANTALLA-PODCAST").style.display = "none";
  document.getElementById("showHashTableG1").style.display = "none";
  document.getElementById("agregar-podcast").style.display = "none";
  colabloqueados.print();
  colabloqueados.graph("showSimpleListG5");
}

function agregarusuario(usuario4,username4,dpi4,numero4){

  listaamigos1.add(username4);
  listaamigos1.addamigos(usuario4,username4,dpi4,numero4);
  listaamigos1.graph("showSimpleListG4")
  listaamigos1.print2();
  

}
function bloquearusuario(usuario,username,dpi,numero){

  colabloqueados.add();

  colabloqueados.addbloqueados(usuario,username,dpi,numero)
   colabloqueados.print();
} 
function eliminaramigo(){
  listaamigos1.eliminaramigo1();
  listaamigos1.graph("showSimpleListG4")
  listaamigos1.print2();
}

function bloquearamigo(){
  listaamigos1.bloquearamigo33();
  listaamigos1.graph("showSimpleListG4")
  listaamigos1.print2();
}
function DESBLOQUEAR(){
  colabloqueados.desbloquerusuario();
  colabloqueados.print();
  colabloqueados.graph("showSimpleListG5");

}
function quickSort(){
  artistas.quicksort();
  artistas.printartistas();
  artistas.graph("showSimpleListG1");
}

function PROGRAMAR(){
  let mes = document.getElementById("month").value;
  let day = document.getElementById("day").value;
  let namecancion = document.getElementById("name-cancion").value;
  matrizDispersa.insertar(mes,day,namecancion,USUARIO)
}

function calendarbus(){
  let mes = document.getElementById("month1").value;
  let day = document.getElementById("day1").value;

  matrizDispersa.buscar(mes,day);

}
let temp1
let contador = 1;
function showARBOL(){
  document.getElementById("showHashTableG").style.display = "block";
  document.getElementById("showSimpleListG").style.display = "none";
  document.getElementById("showBST").style.display = "none";
  document.getElementById("showAVL").style.display = "none";
 

  abb.graph("showHashTableG");
}



function podcast(){
  document.getElementById("PANTALLA-MUSICA").style.display = "none";
  document.getElementById("PANTALLA-ARTISTAS").style.display = "none";
  document.getElementById("Ordenar").style.display = "none";
  document.getElementById("formulario").style.display = "none";
  document.getElementById("PANTALLA-PLAYLIST").style.display = "none";
  document.getElementById("Botones-playlist").style.display = "none";
  document.getElementById("showSimpleListG1").style.display = "none";
  document.getElementById("showSimpleListG2").style.display = "none";
  document.getElementById("PANTALLA-USUARIOS").style.display = "none";
  document.getElementById("PANTALLA-AMIGOS").style.display = "none";
  document.getElementById("grafoamigos").style.display = "none";
  document.getElementById("PANTALLA-BLOQUEADOS").style.display = "none";
  document.getElementById("Mostrar-bloqueados").style.display = "none";
  document.getElementById("mostrar-calendar").style.display = "none";
  document.getElementById("PANTALLA-PODCAST").style.display = "block";
  document.getElementById("showHashTableG1").style.display = "block";
  document.getElementById("agregar-podcast").style.display = "block";
  abb.graph("showHashTableG1");
  abb.preordenCard("#pre")
}

function agregarpodcast(){
  let name = document.getElementById("name-podcast").value;
  let duration = document.getElementById("name-duracion33").value;
  let topic = document.getElementById("name-topic").value;
  let Guests = document.getElementById("name-Guests").value;
  let obj = null
  obj ={
    name: name,
    topic: topic,
    duration: duration,
    guests: Guests
  };

 
  
  abb.add(obj)

  abb.preordenCard("#pre")
  abb.graph("showHashTableG1");
 document.getElementById("name-podcast").value = "";
  document.getElementById("name-duracion33").value =" ";
document.getElementById("name-topic").value ="";
 document.getElementById("name-Guests").value ="";
}

var newDiv33 = document.createElement("div");
newDiv33.id = "spanACD1";
var respuesta = document.getElementById("PANTALLA-PODCAST");
respuesta.appendChild(newDiv33);
let doc44 = document.getElementById("spanACD1");