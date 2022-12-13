class Playlist {
  constructor(artist, name, duration, gender) {
    this.artist =artist;
    this.name = name;
    this.duration = duration;;
    this.gender= gender;
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
 

  

  add(artist,name1, duration,gen) {
 

    const newNode = new Playlist(artist, name1, duration, gen);

    if(this.head){
      newNode.next = this.head;
      newNode.next = this.head;
      this.head.prev= newNode;
      this.head = newNode;
      this.head.prev = this.tail ;
      this.tail.next = this.head;

    }else{
      this.head = newNode;
      this.tail = newNode;

    };
    this.size++;
 
  }
  setartist(){
    return this.head;
  }
  print(){
    let current = this.head;
    let result = "";
    while(current){
      if (!current.next){
        result+=current.name;
        current = current.next;
      }else{
        result+=current.name + "<->";
        current = current.next;
      }

    };
    return result;
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
    let final = this.tail;
    let i = 1;
    while(aux){
      graphviz += "artista" + i + '[label="' + aux.name+ '"];\n';
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
          break;
        }else{
          graphviz += "artista" + i + " -> artista" + (i + 1) + "\n";
        graphviz += "artista" + (i+1) +"-> artista" + i +"\n";

        aux = aux.next;
        i++;
        }

      }

      graphviz += "\n";

      aux = this.head.next;
      i = 1;

      graphviz += "{rank = same; artista" + i;

      i++;
      while (aux) {
        // en esta parte agreagamos el valor de cliente con la posicion i
        graphviz += "; artista" + i;

        i++;
        aux = aux.next;
        if(aux == this.head){
          break;
        }
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
  verificar_lista1(){

    if(this.head){
      return true;
    }else{
     return false
    }
  }

}
let lista = new listadobleplaylist();
lista.add("jonatan","mia","guate","rock")


console.log(lista.print());