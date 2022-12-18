class Nodo{
    constructor(_valor,topic,duration,guests){
        this.valor=_valor;
        this.topic = topic;
        this.duration = duration;
        this.guests = guests;
        this.izquierda = null;
        this.derecha = null;
    }
}

class ABB{
    constructor(){
        this.raiz = null;
    }
    //metodo insertar
    insertar(_valor,topic,duration,guests){
        this.raiz = this.add(_valor,topic,duration,guests, this.raiz);
    }
    //metodo insertar recursivo
    add(_valor,topic,duration,guests, nodo){
        if(nodo == null){
            return new Nodo(_valor,topic,duration,guests);
        }else{
            if(_valor > nodo.valor){
                nodo.derecha = this.add(_valor,topic,duration,guests, nodo.derecha);
            }else{
                nodo.izquierda = this.add(_valor,topic,duration,guests, nodo.izquierda);
            }
        }
        return nodo;
    }
    
    //preorden
    preorden(){
        this.pre_orden(this.raiz);
    }

    pre_orden(nodo){
        if(nodo!=null){
            console.log("Valor:",nodo.valor);
            this.pre_orden(nodo.izquierda);
            this.pre_orden(nodo.derecha);
        }
    }
    //inorden
    inorden(){
        this.in_orden(this.raiz);
    }
    
    in_orden(nodo){
        if(nodo!=null){
            this.in_orden(nodo.izquierda);
            console.log("Valor:",nodo.valor);
            this.in_orden(nodo.derecha);
        }
    }

    //postorden
    posorden(){
        this.pos_orden(this.raiz);
    }
    
    pos_orden(nodo){
        if(nodo!=null){
            this.pos_orden(nodo.izquierda);
            this.pos_orden(nodo.derecha);
            console.log("Valor:",nodo.valor);           
        }
    }
}

var abb = new ABB();
abb.insertar("Jonatan",1);
abb.insertar("Andres");
abb.insertar("Enrique");


console.log("Recorrido in orden")
abb.inorden();
console.log("Recorrido pre orden")
abb.preorden();
console.log("Recorrido post orden")
abb.posorden();