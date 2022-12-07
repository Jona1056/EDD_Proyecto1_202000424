class Artista {
    constructor(name, age, country, lista, next, prev) {
      this.name = name;
      this.age = age;
      this.country = country;
      this.lista = lista;
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
    add(name1, age1, country1,list) {
      const newNode = new Artista(name1, age1, country1, list, null, null);
      if(this.head){
        newNode.next = this.head;
        this.head.prev = newNode;
        this.head = newNode;
    
  
      }else{
        this.head = newNode;
        this.tail = newNode;
      
      };
      this.size++;
    } 
  
    
  }
  const listadoble = new listadobleartista();
  listadoble.add(1,2,3,[1,2,3]);
  listadoble.add(1,1,1,[1,2,3]);
  listadoble.add(3,4,4,[1,2,3]);
  listadoble.add(5,5,5,[1,2,3]);
  listadoble.add(3,1,1,[1,2,3]);
  console.log(listadoble);