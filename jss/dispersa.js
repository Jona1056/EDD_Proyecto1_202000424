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
    }

    exportRender() {
        console.log(this.configraph());
        d3.select("#lienzo").graphviz()
        .width(900)
        .height(500)
        .renderDot(this.configraph())
    }


    configraph() {
        let temp = "";
        temp += "digraph G{ node[shape=box style=filled]\n" + "subgraph cluster_p{\n";
        temp += 'label = "Matriz DISPERSA"' + 'edge[dir = "both"];\n';

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
                temp += aux.obj ;
                temp += aux.cancion;
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


const matrizDispersa = new Matriz();
matrizDispersa.insertar("December",1,"Hola","mia");


matrizDispersa.exportRender()