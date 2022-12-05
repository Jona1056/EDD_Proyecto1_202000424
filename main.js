// --------------------------------------------------
// LISTA ENLAZADA PARA CLIENTES Y ADMINISTRADORES
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
        alert(this.size);
        
    };
    
}


//VARIABLES
const admin = {"dpi":  2354168452525, "nombre_completo":  "WIlfred Perez", "nombre_usuario": "EDD", "correo":  "wilfred@gmail.com", "contrasenia":  "123", "telefono": "+502 (123) 123-4567"};
let clientes = new listaenlazada();
// ---------------------------------------------------------------








function login(){

    let user = document.getElementById("name1").value;
    let password = document.getElementById("password1").value;

    if (user == ""  || password==""){
        swal("Oops!", "LLENE TODOS LOS CAMPOS", "error");
    }else{
        document.getElementById('LOGIN-1').style.display = "none";
        document.getElementById('PANTALLA-USUARIO').style.display = "block";
    }

    
}

function gocreatecount(){

    document.getElementById('LOGIN-1').style.display = "none";
    document.getElementById('createAcount').style.display = "block";
   
}

function crearCuenta(){
    let usuario = document.getElementById("User-name").value;
    let nombre = document.getElementById("User-nombre").value;
    let dpi = document.getElementById("User-dpi").value;
    let tel= document.getElementById("User-telefono").value;
    let pass= document.getElementById("password2").value;
    x = dpi.toString().length
    if(usuario == "" || nombre == "" || dpi== "" || tel=="" ||pass==""){
        swal("Oops!", "LLENE TODOS LOS CAMPOS", "error");
    }else{
    


        if(x != 13){
            swal("Oops!", "DPI INVALIDO", "error");
        }
        else{
            clientes.add(dpi,nombre,usuario,pass,tel,false);
           
        }
    }

}

function signOff(){
    document.getElementById('LOGIN-1').style.display = "block";
    document.getElementById('createAcount').style.display = "none";
}








