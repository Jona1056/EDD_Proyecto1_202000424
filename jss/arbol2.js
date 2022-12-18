class BSTreeNode{

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



class BSTree{

    constructor(){

        this.root = null;
        this.graphviz = '';

    }


    add(data){

        if(this.root == null){

            let newNode = new BSTreeNode(data);
            this.root = newNode;
        }else{

            this._add(this.root, data);
        }


    }
  
    _add(node, data){

        if(data.dni < node.getData().dni){

            if(node.getLeft() == null){
                let newNode =  new BSTreeNode(data);
                node.setLeft(newNode);

            }else{
                this._add(node.getLeft(), data);
            }


        }else if(data.dni > node.getData().dni){

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

    //Tours

    //Inorden
    inorden(){

        if(this.root == null){

            console.log('No se ha insertado nada en el BSTree.');
        }else{

            this._inorden(this.root);
        }
    }

    _inorden(node){

        if(node != null){

            this._inorden(node.getLeft());
            console.log(node.getData() + ' ');
            this._inorden(node.getRight());
        }

    }

    inordenR(){

        if(this.root == null){

            console.log('No se ha insertado nada en el BSTree.');
        }else{

            this._inordenR(this.root);
        }
    }

    _inordenR(node){

        if(node != null){

            this._inordenR(node.getRight());
            console.log(node.getData() + ' ');
            this._inordenR(node.getLeft());
        }

    }

    //Preorden
    preorden(){

        if(this.root == null){

            console.log('No se ha insertado nada en el BSTree.');
        }else{

            this._preorden(this.root);
        }
    }

    _preorden(node){

        if(node != null){

            console.log(node.getData() + ' ');
            this._preorden(node.getLeft());
            this._preorden(node.getRight());
        }


    }

    //PostOrden
    postorden(){

        if(this.root == null){

            console.log('No se ha insertado nada en el BSTree.');
        }else{

            this._postorden(this.root);
        }
    }

    _postorden(node){

        if(node != null){

            this._postorden(node.getLeft());
            this._postorden(node.getRight());
            console.log(node.getData() + ' ');
            
        }


    }

    //Graphviz
    graph(idDiv){

        this.graphviz = '';
        this.graphviz = 'digraph BST{\nnode[shape= box, fillcolor="#FFFFFF", style= filled];\nbgcolor = "#00FF7F";\nranksep = 0.5;\nnodesep = 0.5;\nsubgraph cluster_A{\nlabel = "Actores";\nbgcolor = "#20B2AA";\nfontcolor = white;\nfontsize = 30;\n\n ';

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

                this.graphviz += node.getData().dni + '[label="' + node.getData().nombre_actor + '"];\n';
                this.graphviz += node.getLeft().getData().dni + '[label="' + node.getLeft().getData().nombre_actor + '"];\n';
                this.graphviz += node.getData().dni + ' -> ' + node.getLeft().getData().dni + '\n';
            }
            if(node.getRight() != null){
                
                this.graphviz += node.getData().dni + '[label="' + node.getData().nombre_actor + '"];\n';
                this.graphviz += node.getRight().getData().dni + '[label="' + node.getRight().getData().nombre_actor + '"];\n';
                this.graphviz += node.getData().dni + ' -> ' + node.getRight().getData().dni + '\n';
            }
            this._preordenGraph(node.getLeft());
            this._preordenGraph(node.getRight());
        }


    }

    //Cards

    //Inorden
    inordenCard(idDiv){

        if(this.root == null){

            console.log('No se ha insertado nada en el BSTree.');
        }else{

            this._inordenCard(this.root, idDiv);
        }
    }

    _inordenCard(node, idDiv){

        if(node != null){

            this._inordenCard(node.getLeft(), idDiv);

            //
            
            let card = document.querySelector(idDiv);
            

            let newDiv = document.createElement("div");
            card.innerHTML += `
            <div class="card" id="cardsActorsUser">
                <div class="card-body">

                    <div id="movieName">
                        <img src="https://cdn-icons-png.flaticon.com/512/475/475283.png" id="imageP">
                        <h4>${node.getData().nombre_actor}</h4>

                    </div>  

                    <div id="description">
                        <h5 class="card-title">Descripción</h5>
                        <p class="card-text">${node.getData().descripcion}</p>

                    </div>
                </div>
            </div>`;

            //

            this._inordenCard(node.getRight(), idDiv);
        }

    }

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
            
            let card = document.querySelector(idDiv);
            

            let newDiv = document.createElement("div");
            card.innerHTML += `
            <div class="card" id="cardsActorsUser">
                <div class="card-body">

                    <div id="movieName">
                        <img src="https://cdn-icons-png.flaticon.com/512/475/475283.png" id="imageP">
                        <h4>${node.getData().nombre_actor}</h4>

                    </div>  

                    <div id="description">
                        <h5 class="card-title">Descripción</h5>
                        <p class="card-text">${node.getData().descripcion}</p>

                    </div>
                </div>
            </div>`;

            //
            this._preordenCard(node.getLeft(), idDiv);
            this._preordenCard(node.getRight(), idDiv);
        }


    }

    //PostOrden
    postordenCard(idDiv){

        if(this.root == null){

            console.log('No se ha insertado nada en el BSTree.');
        }else{

            this._postordenCard(this.root, idDiv);
        }
    }

    _postordenCard(node, idDiv){

        if(node != null){

            this._postordenCard(node.getLeft(), idDiv);
            this._postordenCard(node.getRight(), idDiv);
            //
            
            let card = document.querySelector(idDiv);
            

            let newDiv = document.createElement("div");
            card.innerHTML += `
            <div class="card" id="cardsActorsUser">
                <div class="card-body">

                    <div id="movieName">
                        <img src="https://cdn-icons-png.flaticon.com/512/475/475283.png" id="imageP">
                        <h4>${node.getData().nombre_actor}</h4>

                    </div>  

                    <div id="description">
                        <h5 class="card-title">Descripción</h5>
                        <p class="card-text">${node.getData().descripcion}</p>

                    </div>
                </div>
            </div>`;

            //
            
        }


    }
}

let bs = new BSTree();
bs.add( "jonatan");
bs.add("leonel")
bs.add("garcia")
bs.add("arana")

bs.preorden();