class Cliente{
    constructor(dpi,name,username,password,phone,admin,next){
        this.dpi = dpi;
        this.name = name;
        this.username = username;
        this.password = password;
        this.phone = phone;
        this.admin = admin;
        this.next = next;
    };
};

class listaenlazada{
    constructor(){
        this.head = null;
        this.size = 0;
    };
    add(dpi1,name1,username1,password1,phone1,admin1){
        const Nodo = new Cliente(dpi1,name1,username1,password1,phone1,admin1, null);
        if (!this.head){
            this.head = Nodo
        }else{
            let registro = this.head;
            while(registro.next){
                registro = registro.next;
            };
            registro.next = Nodo;

        };
        this.size++;
    };
    
}

let list = new listaenlazada();
list.add(123123,"Jonatan","jona",1234,123123123,true);
list.add(1231212413,"andres","andres20",112334,12331,false);




function login(){
    alert("este es un mensaje ")
}






