

const contenido = document.getElementById("contenido")
const horarios = document.getElementById("horarios")
const menu = document.getElementById("menu")
const carrito = document.getElementById("carrito")
const menu_flotante = document.getElementById("menu-flotante")
const alert_add = document.getElementById("alert-add")
const ubicacion = document.getElementById("ubicacion")

let lista = []

horarios.addEventListener("click", ()=>{
    contenido.innerHTML = `

    <div class="horarios">
        <div>
            <p>Jueves:</p>
            <p>Viernes:</p>
            <p>Sabado:</p>
            <p>Domingo:</p>
            <p>Lunes:</p>
            <p>Martes:</p>
            <p>Miércoles:</p>
        </div>

        <div>
            <p>20:00 a 00:00</p>
            <p>20:00 a 00:00</p>
            <p>20:00 a 00:00</p>
            <p>20:00 a 00:00</p>
            <p>CERRADO</p>
            <p>CERRADO</p>
            <p>CERRADO</p>
        </div>
    </div>`
})

// CONTAR CUANTAS VECES SE REPITE UN NÚMERO EN UNA LISTA
function contador(lista, num){
    let contador = lista.filter(valor => valor === num).length;

    return contador
}

// REALIZAR PEDIDO
function enviarDatosWhatsapp(){

    let direccion = ubicacion.value

    if(direccion != ""){
        let texto = "Hola! Para pedir"

        if(lista.includes(1)){
            let cantidad = contador(lista,1)
            texto += `, ${cantidad} Hamburguesa común`
        }if(lista.includes(2)){
            let cantidad = contador(lista,2)
            texto += `, ${cantidad} Hamburguesa La liviana`
        }if(lista.includes(3)){
            let cantidad = contador(lista,3)
            texto += `, ${cantidad} Hamburguesa Cheeseburguer`
        }if(lista.includes(4)){
            let cantidad = contador(lista,4)
            texto += `, ${cantidad} Hamburguesa completa`
        }if(lista.includes(5)){
            let cantidad = contador(lista,5)
            texto += `, ${cantidad} Hamburguesa Doble de riesgo`
        }if(lista.includes(6)){
            let cantidad = contador(lista,6)
            texto += `, ${cantidad} Hamburguesa Sweet candy`
        }if(lista.includes(7)){
            let cantidad = contador(lista,7)
            texto += `, ${cantidad} Hat trick`
        }if(lista.includes(8)){
            let cantidad = contador(lista,8)
            texto += `, ${cantidad} Hamburguesa Tríada Mística`
        }if(lista.includes(9)){
            let cantidad = contador(lista,9)
            if(cantidad == 1){
                texto += `, una Porción de papas fritas`
            }else{
                texto += `, ${cantidad} Porciones de papas fritas`
            }
        }if(lista.includes(10)){
            let cantidad = contador(lista,10)
            if(cantidad == 1){
                texto += `, una Porción de aros de cebolla`
            }else{
                texto += `, ${cantidad} Porciones de aros de cebolla`
            }
        }if(lista.includes(11)){
            let cantidad = contador(lista,11)
            if(cantidad == 1){
                texto += `, una Porción de Nuggets veganas`
            }else{
                texto += `, ${cantidad} Porciones de Nuggets veganas`
            }
        }

        // Comprobar para añadir el "y" 
        if(repeatNum(lista)){
            texto += `.
Para ${direccion}`
        }else{
            texto = modText(texto)+`
Para ${direccion}`
        }

        window.location.href = `https://wa.me/+59894352630/?text=${texto}`;

        cerrarMenu()

    }
}

// comprobar si un array se repiten los números
function repeatNum(lista){

    num = lista[0]
    done = true

    for(i=0; i<lista.length; i++){
        if(lista[i] !== num){
            done = false
        }    
    }

    return done

}

// añadir "y"
function modText(texto){
    lista = texto.split(",");
    txt = lista[0].trim();

    if(lista.length>1){
        for(i=1;i<lista.length-1;i++){
            txt+= ", " + lista[i].trim();
        }
        txt+= " y " + lista[lista.length-1].trim() + ".";
    }
    else{
        txt += ".";
    }
    return txt;
}

// Variable global
let timer;

// AÑADIR AL CARRITO
function addCarrito(num){

    alert_add.classList.add('mostrar');

    alert_add.style.display = "";

    lista.push(num)

    let cantidad = lista.length

    carrito.innerHTML = `<i class="fa-solid fa-cart-shopping"></i> Carrito (${cantidad})`

    // Eliminar si el temporizador está marchando
    if(timer){
        clearTimeout(timer)
    }
    
    // Establecer un temporizador para desaparecer después de 3 segundos
    timer = setTimeout(function() {
        alert_add.classList.remove('mostrar');
    }, 3000); // Tiempo que va a esperar antes de ejecutar la función
}

// ELIMINAR DEL CARRITO
function delCarrito(num){
    const divDel = document.getElementById(`${num}`)
    divDel.parentNode.removeChild(divDel)

    lista.splice(lista.indexOf(num), 1);

    let cantidad = lista.length

    carrito.innerHTML = `<i class="fa-solid fa-cart-shopping"></i> Carrito (${cantidad})`

}

// CAMBIAR COLOR SOLO A CARRITO
function cambiarCarrito(){
    datosCarrito()
    horarios.style.color = "";
    menu.style.color = "";
    carrito.style.color = "#ffe054";
}

// CAMBIAR COLORES DE NAVBAR 
function cambiarColor(e){
   
    horarios.style.color = "";
    menu.style.color = "";
    carrito.style.color = "";

    e.style.color = "#ffe054";

}

// CERRAR MENU
function cerrarMenu(){
    menu_flotante.style.display = "none";
}

function hacerPedido(){
    if(lista.length > 0){
        menu_flotante.style.display = "";
    }
}


// CARRITO 
carrito.addEventListener("click", datosCarrito);

// DATOS
function datosCarrito(){
    alert_add.classList.remove('mostrar');
    contenido.innerHTML = `
    <div class="menu-content">
        <h2>Tus pedidos</h2>
        <div class="menu" id="menuBurguer"></div>
        <div class="pedido" onclick="hacerPedido()"><button class="btn">Realizar pedido</button></div>
    </div>`

    const menu = document.getElementById("menuBurguer")

    lista.forEach(e => {

        if(e == 1){
            menu.innerHTML += `<div class="card" id="1">
        <div class="card-content">
            <div>
                <div class="card-name">
                    <h3>Común </h3>
                    <h3 style="color: #95ff58;">$260</h3>
                </div>
                
                <p>Hamburguesa Next de Etosha, pepinillo, cebolla picada, ketchup y mostaza</p>
                
            </div>
            
            <a onclick="delCarrito(1)">Quitar del carrito</a>
        </div>
        
        
        <img src="./img/burger.PNG" alt="" class="burger">
    </div>`
        }else if(e == 2){
            menu.innerHTML += `<div class="card" id="2">
            <div class="card-content">
                <div>
                    <div class="card-name">
                        <h3>La Liviana </h3>
                        <h3 style="color: #95ff58;">$270</h3>
                        
                    </div>
                    <p>Hamburguesa Next de Etosha, pepinillo, tomate, lechuga, cebolla picada, zanahoria rallada y mayonesa</p>    
                </div>
                <a onclick="delCarrito(2)">Quitar del carrito</a>
            </div>
            
            
            <img src="./img/burger.PNG" alt="" class="burger">
        </div>`
        }else if(e == 3){
            menu.innerHTML += `<div class="card" id="3">
            <div class="card-content">
                <div>
                    <div class="card-name">
                        <h3>Cheeseburguer </h3>
                        <h3 style="color: #95ff58;">$300</h3>
                        
                    </div>
                    <p>Hamburguesa Next de Etosha, cheddar vegano, pepinillo, cebolla picada, ketchup y mostaza</p>
                </div>
                
                <a onclick="delCarrito(3)">Quitar del carrito</a>
            </div>
            
            
            <img src="./img/burger.PNG" alt="" class="burger">
        </div>`
        }else if(e == 4){
            menu.innerHTML += `<div class="card" id="4">
            <div class="card-content">
                <div>
                    <div class="card-name">
                        <h3>Completa </h3>
                        <h3 style="color: #95ff58;">$320</h3>
                        
                    </div>
                    <p>Hamburguesa Next de Etosha, cheddar vegano, muzza vegana, pepinillo, tomate, lechuga, cebolla picada, mayonesa y ketchup</p>
                </div>
                
                <a onclick="delCarrito(4)">Quitar del carrito</a>
            </div>
            
            
            <img src="./img/burger.PNG" alt="" class="burger">
        </div>`
        }else if(e == 5){
            menu.innerHTML += `<div class="card" id="5">
            <div class="card-content">
                <div>
                    <div class="card-name">
                        <h3>Doble de riesgo </h3>
                        <h3 style="color: #95ff58;">$390</h3>
                    </div>
                    
                    <p>Doble hamburguesa Next de Etosha, doble cheddar vegano, doble muzza vegana, pepinillo, cebolla picada, ketchup y mostaza</p>
                    
                </div>
                
                <a onclick="delCarrito(5)">Quitar del carrito</a>
            </div>
            
            
            <img src="./img/burger.PNG" alt="" class="burger">
        </div>`
        }else if(e == 6){
            menu.innerHTML += `<div class="card" id="6">
            <div class="card-content">
                <div>
                    <div class="card-name">
                        <h3>Sweet candy </h3>
                        <h3 style="color: #95ff58;">$390</h3>
                    </div>
                    
                    <p>Doble hamburguesa Next de Etosha, cheddar vegano, muzza vegana, cebolla caramelizada, morrón salteado, jarabe de agave, salsa barbacoa</p>
                    
                </div>
                
                <a onclick="delCarrito(6)">Quitar del carrito</a>
            </div>
            
            
            <img src="./img/burger.PNG" alt="" class="burger">
        </div>`
        }else if(e == 7){
            menu.innerHTML += `<div class="card" id="7">
            <div class="card-content">
                <div>
                    <div class="card-name">
                        <h3>Hat trick </h3>
                        <h3 style="color: #95ff58;">$460</h3>
                    </div>
                    
                    <p>Triple hamburguesa Next de Etosha, triple cheddar vegano, pepinillo, aceitunas picadas,cebolla picada, lechuga, tomate, ketchup y mostaza</p>
                    
                </div>
                
                <a onclick="delCarrito(7)">Quitar del carrito</a>
            </div>
            
            
            <img src="./img/burger.PNG" alt="" class="burger">
        </div>`
        }else if(e == 8){
            menu.innerHTML += `<div class="card" id="8">
            <div class="card-content">
                <div>
                    <div class="card-name">
                        <h3>Tríada Mística </h3>
                        <h3 style="color: #95ff58;">$460</h3>
                    </div>
                    
                    <p>Triple hamburguesa Next de Etosha, triple cheddar vegano, triple muzza vegana, cebolla caramelizada, mayonesa, tomate, mostaza y salsa barbacoa</p>
                    
                </div>
                
                <a onclick="delCarrito(8)">Quitar del carrito</a>
            </div>
            
            
            <img src="./img/burger.PNG" alt="" class="burger">
        </div>`
        }else if(e == 9){
            menu.innerHTML += `<div class="card" id="9">
            <div class="card-content">
                <div>
                    <div class="card-name">
                        <h3>Porciones de fritas </h3>
                        <h3 style="color: #95ff58;">$160</h3>
                    </div>
                </div>
                
                <a onclick="delCarrito(9)">Quitar del carrito</a>
            </div>
            
            
            <img src="./img/papasFritas.jpg" alt="" class="burger">
        </div>`
        }else if(e == 10){
            menu.innerHTML += `<div class="card" id="10">
            <div class="card-content">
                <div>
                    <div class="card-name">
                        <h3>Aros de cebolla </h3>
                        <h3 style="color: #95ff58;">$180</h3>
                    </div>
                </div>
                
                <a onclick="delCarrito(10)">Quitar del carrito</a>
            </div>
            
            
            <img src="./img/arosCebolla.jpg" alt="" class="burger">
        </div>`
        }else if(e == 11){
            menu.innerHTML += `<div class="card" id="11">
            <div class="card-content">
                <div>
                    <div class="card-name">
                        <h3>Nuggets veganas </h3>
                        <h3 style="color: #95ff58;">$200</h3>
                    </div>
                </div>
                
                <a onclick="delCarrito(11)">Quitar del carrito</a>
            </div>
            
            
            <img src="./img/nuggets.jpg" alt="" class="burger">
        </div>`
        }
        
    });
}

// MENU
menu.addEventListener("click", ()=>{
    contenido.innerHTML = `<div class="menu-content">
<h2>Hamburguesas</h2>
<div class="menu">

    <div class="card">
        <div class="card-content">
            <div>
                <div class="card-name">
                    <h3>Común </h3>
                    <h3 style="color: #95ff58;">$260</h3>
                </div>
                
                <p>Hamburguesa Next de Etosha, pepinillo, cebolla picada, ketchup y mostaza</p>
                
            </div>
            
            <a onclick="addCarrito(1)">Añadir al carrito</a>
        </div>
        
        
        <img src="./img/burger.PNG" alt="" class="burger">
    </div>
    
    <div class="card">
        <div class="card-content">
            <div>
                <div class="card-name">
                    <h3>La Liviana </h3>
                    <h3 style="color: #95ff58;">$270</h3>
                    
                </div>
                <p>Hamburguesa Next de Etosha, pepinillo, tomate, lechuga, cebolla picada, zanahoria rallada y mayonesa</p>    
            </div>
            <a onclick="addCarrito(2)">Añadir al carrito</a>
        </div>
        
        
        <img src="./img/burger.PNG" alt="" class="burger">
    </div>

    <div class="card">
        <div class="card-content">
            <div>
                <div class="card-name">
                    <h3>Cheeseburguer </h3>
                    <h3 style="color: #95ff58;">$300</h3>
                    
                </div>
                <p>Hamburguesa Next de Etosha, cheddar vegano, pepinillo, cebolla picada, ketchup y mostaza</p>
            </div>
            
            <a onclick="addCarrito(3)">Añadir al carrito</a>
        </div>
        
        
        <img src="./img/burger.PNG" alt="" class="burger">
    </div>

    <div class="card">
        <div class="card-content">
            <div>
                <div class="card-name">
                    <h3>Completa </h3>
                    <h3 style="color: #95ff58;">$320</h3>
                    
                </div>
                <p>Hamburguesa Next de Etosha, cheddar vegano, muzza vegana, pepinillo, tomate, lechuga, cebolla picada, mayonesa y ketchup</p>
            </div>
            
            <a onclick="addCarrito(4)">Añadir al carrito</a>
        </div>
        
        
        <img src="./img/burger.PNG" alt="" class="burger">
    </div>
</div>

<h2>Premium </h2>

<div class="menu">
    <div class="card">
        <div class="card-content">
            <div>
                <div class="card-name">
                    <h3>Doble de riesgo </h3>
                    <h3 style="color: #95ff58;">$390</h3>
                </div>
                
                <p>Doble hamburguesa Next de Etosha, doble cheddar vegano, doble muzza vegana, pepinillo, cebolla picada, ketchup y mostaza</p>
                
            </div>
            
            <a onclick="addCarrito(5)">Añadir al carrito</a>
        </div>
        
        
        <img src="./img/burger.PNG" alt="" class="burger">
    </div>

    <div class="card">
        <div class="card-content">
            <div>
                <div class="card-name">
                    <h3>Sweet candy </h3>
                    <h3 style="color: #95ff58;">$390</h3>
                </div>
                
                <p>Doble hamburguesa Next de Etosha, cheddar vegano, muzza vegana, cebolla caramelizada, morrón salteado, jarabe de agave, salsa barbacoa</p>
                
            </div>
            
            <a onclick="addCarrito(6)">Añadir al carrito</a>
        </div>
        
        
        <img src="./img/burger.PNG" alt="" class="burger">
    </div>

    <div class="card">
        <div class="card-content">
            <div>
                <div class="card-name">
                    <h3>Hat trick </h3>
                    <h3 style="color: #95ff58;">$460</h3>
                </div>
                
                <p>Triple hamburguesa Next de Etosha, triple cheddar vegano, pepinillo, aceitunas picadas,cebolla picada, lechuga, tomate, ketchup y mostaza</p>
                
            </div>
            
            <a onclick="addCarrito(7)">Añadir al carrito</a>
        </div>
        
        
        <img src="./img/burger.PNG" alt="" class="burger">
    </div>

    <div class="card">
        <div class="card-content">
            <div>
                <div class="card-name">
                    <h3>Tríada Mística </h3>
                    <h3 style="color: #95ff58;">$460</h3>
                </div>
                
                <p>Triple hamburguesa Next de Etosha, triple cheddar vegano, triple muzza vegana, cebolla caramelizada, mayonesa, tomate, mostaza y salsa barbacoa</p>
                
            </div>
            
            <a onclick="addCarrito(8)">Añadir al carrito</a>
        </div>
        
        
        <img src="./img/burger.PNG" alt="" class="burger">
    </div>
</div>

<h2>Guarniciones</h2>

<div class="menu">
    <div class="card">
        <div class="card-content">
            <div>
                <div class="card-name">
                    <h3>Porciones de fritas </h3>
                    <h3 style="color: #95ff58;">$160</h3>
                </div>
            </div>
            
            <a onclick="addCarrito(9)">Añadir al carrito</a>
        </div>
        
        
        <img src="./img/papasFritas.jpg" alt="" class="burger">
    </div>

    <div class="card">
        <div class="card-content">
            <div>
                <div class="card-name">
                    <h3>Aros de cebolla </h3>
                    <h3 style="color: #95ff58;">$180</h3>
                </div>
            </div>
            
            <a onclick="addCarrito(10)">Añadir al carrito</a>
        </div>
        
        
        <img src="./img/arosCebolla.jpg" alt="" class="burger">
    </div>

    <div class="card">
        <div class="card-content">
            <div>
                <div class="card-name">
                    <h3>Nuggets veganas </h3>
                    <h3 style="color: #95ff58;">$200</h3>
                </div>
            </div>
            
            <a onclick="addCarrito(11)">Añadir al carrito</a>
        </div>
        
        
        <img src="./img/nuggets.jpg" alt="" class="burger">
    </div>
</div>

</div>`
})

